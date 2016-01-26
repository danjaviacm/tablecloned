const path = require( 'path' );
const CopyWebpackPlugin = require('copy-webpack-plugin');
const node_modules = path.resolve( __dirname, 'node_modules' );

const PATHS = {
	app: path.resolve(__dirname, 'src/main.js' ),
	build: path.resolve(__dirname, 'dist' ),
	main: path.resolve(__dirname, 'build/index.html' ),
	index: path.resolve(__dirname, 'dist/index.html' ),
	componentsPath: path.resolve(__dirname, 'src/components' )
};

module.exports = {

	entry: PATHS.app,

	output: {
		path: PATHS.build,
		filename: 'bundle.js',
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: [ 'react', 'es2015' ]
				}
			},

			// LESS
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},

			// SASS
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},

	plugins: [
        new CopyWebpackPlugin([
        
            { from: PATHS.main, to: PATHS.index },
            { from: PATHS.componentsPath, to: 'components' },

        ], {
            ignore: [
                // Doesn't copy any files with a txt extension     
                '*.txt'
            ]
        })
    ]
};