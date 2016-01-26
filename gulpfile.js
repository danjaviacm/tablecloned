var gulp = require('gulp')
var $ = require('gulp-load-plugins')()
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var del = require('del')
var path = require('path')
var merge = require('merge-stream')
var runSequence = require('run-sequence')
var browserSync = require('browser-sync')
var pagespeed = require('psi')
var argv = require('minimist')(process.argv.slice(2))
var rev = require('gulp-rev');
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var revDel = require('gulp-rev-remove-statics');

DEST = '../../segurosdigitales/static/react/table-ux31'
DEST_HTML = '../../applications/templates/applications/cars/quote/table-ux31'
//DEST_HTML = '../../segurosdigitales/static/react/table-ux31'
var RELEASE = !!argv.release
var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.0',
    'bb >= 10'
]

var handlebarOpts = {
    helpers: {
        assetCssPath: function (path, context) {
            return ['css', context.data.root.assetCssPath[path.split("/")[1]]].join("/");
        },
        assetJsPath: function (path, context) {
            return ['js', context.data.root.assetJsPath[path.split("/")[1]]].join("/");
        }
    }
};
var src = {}
var watch = false
var pkgs = (function () {
    var pkgs = {};
    var map = function (source) {
        for (var key in source) {
            pkgs[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
        }
    };
    map(require('./package.json').dependencies);
    return pkgs;
}())

gulp.task('default', ['serve'])
gulp.task('prd', ['serve_prd'])

gulp.task('clean', del.bind(null, [DEST]))

gulp.task('vendor', function () {
    return merge(
        gulp.src('src/fonts/**')
            .pipe(gulp.dest(DEST + '/fonts')),
        gulp.src('./node_modules/bootstrap/dist/fonts/**')
            .pipe(gulp.dest(DEST + '/fonts')),
        gulp.src('./node_modules/font-awesome/fonts/**')
            .pipe(gulp.dest(DEST + '/fonts')),
        gulp.src('./node_modules/frontendquillo/fonts/**')
            .pipe(gulp.dest(DEST + '/fonts'))
    )
})

gulp.task('assets', function () {
    src.assets = 'src/assets/**';
    return gulp.src(src.assets)
        .pipe($.changed(DEST))
        .pipe(gulp.dest(DEST))
        .pipe($.size({title: 'assets'}));
})

gulp.task('styles', function () {
    src.styles = 'src/styles/**/*.less'
    src.styles_components = 'src/components/**/*.less'
    return gulp.src('src/styles/main.less')
        .pipe($.plumber())
        .pipe($.less({
            sourceMap: !RELEASE,
            sourceMapBasepath: __dirname
        }))
        .on('error', console.error.bind(console))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe($.csscomb())
        .pipe($.minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(DEST + '/css'))
        .pipe(rev.manifest())
        .pipe(revDel({ dest: DEST + '/css/rev-manifest.json', suppress: true, force: true }))
        .pipe(gulp.dest(DEST + '/css'))
        .pipe($.size({title: 'styles'}))
})

gulp.task('bundle', function () {
    src.jsx = 'src/components/**/*.jsx'
    src.es6 = 'src/**/*.js'
    browserify({
        entries: './src/components/index.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe($.uglify())
        .pipe(rev())
        .pipe(gulp.dest(DEST + '/js'))
        .pipe(rev.manifest())
        .pipe(revDel({ dest: DEST + '/js/rev-manifest.json', suppress: true, force: true }))
        .pipe(gulp.dest(DEST + '/js'))
        .pipe($.size({title: 'bundle'}))
})

gulp.task('html', function () {
    var manifest = {
        assetJsPath: JSON.parse(fs.readFileSync(DEST + '/js/rev-manifest.json', 'utf8')),
        assetCssPath: JSON.parse(fs.readFileSync(DEST + '/css/rev-manifest.json', 'utf8'))
    }

    src.html = 'src/*.html'
    return gulp.src('src/index.html')
        .pipe(handlebars(manifest, handlebarOpts))
        // .pipe(gulp.dest(DEST_HTML))
        .pipe(gulp.dest(DEST))
})

gulp.task('htmlprd', function () {
    DEST_HTML = '../../applications/templates/applications/cars/quote/table-ux31'
    var handlebarOpts = {
        helpers: {
            assetCssPath: function (path, context) {
                return ['{{ STATIC_URL }}react/table-ux31/css', context.data.root.assetCssPath[path.split("/")[1]]].join("/");
            },
            assetJsPath: function (path, context) {
                return ['{{ STATIC_URL }}react/table-ux31/js', context.data.root.assetJsPath[path.split("/")[1]]].join("/");
            }
        }
    };
    var manifest = {
        assetJsPath: JSON.parse(fs.readFileSync(DEST + '/js/rev-manifest.json', 'utf8')),
        assetCssPath: JSON.parse(fs.readFileSync(DEST + '/css/rev-manifest.json', 'utf8'))
    }

    src.html = 'src/*.html'
    return gulp.src('src/index.html')
        .pipe(handlebars(manifest, handlebarOpts))
        .pipe(gulp.dest(DEST_HTML))
})

gulp.task('serve', function (cb) {
    src.manifestJsPatch = DEST + '/js/rev-manifest.json'
    src.manifestCssPatch = DEST + '/css/rev-manifest.json'
    var url = require('url')
    var fs = require('fs')
    watch = true

    runSequence('build', function () {
        browserSync({
            notify: false,
            logPrefix: 'RSK',
            port: 5000,
            server: {
                baseDir: DEST,
                middleware: function (req, res, cb) {
                    var uri = url.parse(req.url)
                    if (uri.pathname.length > 1 &&
                        path.extname(uri.pathname) == '' &&
                        fs.existsSync(DEST + uri.pathname + '.html')) {
                        req.url = uri.pathname + '.html' + (uri.search || '')
                    }
                    cb()
                }
            }
        })

        gulp.watch(src.assets, ['assets'])
        gulp.watch(src.styles, ['styles'])
        gulp.watch(src.styles_components, ['styles'])
        gulp.watch(src.html, ['html'])
        gulp.watch(src.manifestCssPatch, ['html'])
        gulp.watch(src.manifestJsPatch, ['html'])
        gulp.watch(src.jsx, ['bundle'])
        gulp.watch(src.es6, ['bundle'])
        gulp.watch(DEST + '/**/*.*', function (file) {
            browserSync.reload(path.relative(__dirname, file.path))
        })
        cb()
    })
})

gulp.task('serve_prd', function (cb) {
    DEST = '../../segurosdigitales/static/react/table-ux31'
    DEST_HTML = '../../segurosdigitales/static/react/table-ux31'

    src.manifestJsPatch = DEST + '/js/rev-manifest.json'
    src.manifestCssPatch = DEST + '/css/rev-manifest.json'
    var url = require('url')
    var fs = require('fs')
    watch = true

    runSequence('build_prd', function () {
        browserSync({
            notify: false,
            logPrefix: 'RSK',
            port: 5000,
            server: {
                baseDir: DEST,
                middleware: function (req, res, cb) {
                    var uri = url.parse(req.url)
                    if (uri.pathname.length > 1 &&
                        path.extname(uri.pathname) == '' &&
                        fs.existsSync(DEST + uri.pathname + '.html')) {
                        req.url = uri.pathname + '.html' + (uri.search || '')
                    }
                    cb()
                }
            }
        })

        gulp.watch(src.assets, ['assets'])
        gulp.watch(src.styles, ['styles'])
        gulp.watch(src.styles_components, ['styles'])
        gulp.watch(src.html, ['html'])
        gulp.watch(src.manifestCssPatch, ['html'])
        gulp.watch(src.manifestJsPatch, ['html'])
        gulp.watch(src.jsx, ['bundle'])
        gulp.watch(src.es6, ['bundle'])
        gulp.watch(DEST + '/**/*.*', function (file) {
            browserSync.reload(path.relative(__dirname, file.path))
        })
        cb()
    })
})

gulp.task('build', function (cb) {
    runSequence(['vendor', 'assets', 'styles', 'bundle', 'html'], cb);
});

gulp.task('build_prd', function (cb) {
    console.log('build_prd')
    runSequence(['vendor', 'assets', 'styles', 'bundle', 'html', 'htmlprd'], cb);
});
