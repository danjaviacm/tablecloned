/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'cm\'">' + entity + '</span>' + html;
	}
	var icons = {
		'cm-motorcycle': '&#xe631;',
		'cm-team': '&#xe630;',
		'cm-growth': '&#xe62b;',
		'cm-master': '&#xe62c;',
		'cm-teamwork': '&#xe62d;',
		'cm-global': '&#xe62e;',
		'cm-big-smile': '&#xe62f;',
		'cm-stats': '&#xe62a;',
		'cm-sheet': '&#xe629;',
		'cm-pioneers': '&#xe623;',
		'cm-person-circle': '&#xe624;',
		'cm-multiple-documents': '&#xe625;',
		'cm-money-circle': '&#xe626;',
		'cm-insurance-company-technology': '&#xe627;',
		'cm-check-square': '&#xe628;',
		'cm-choose-hand': '&#xe622;',
		'cm-clock-schedule': '&#xe621;',
		'cm-attach-file': '&#xe620;',
		'cm-car': '&#xe61f;',
		'cm-coverage-technical-revision': '&#xe61b;',
		'cm-coverage-travel-assitence': '&#xe61a;',
		'cm-coverage-replacement-vehicle': '&#xe61c;',
		'cm-coverage-personal-accidents': '&#xe61d;',
		'cm-coverage-designated-driver': '&#xe61e;',
		'cm-prices': '&#xe616;',
		'cm-lock': '&#xe617;',
		'cm-clock-alarm': '&#xe618;',
		'cm-ab': '&#xe619;',
		'cm-tips': '&#xe612;',
		'cm-question-circle': '&#xe613;',
		'cm-news': '&#xe614;',
		'cm-multimedia': '&#xe615;',
		'cm-quote-pointer': '&#xe60f;',
		'cm-compare-circles': '&#xe610;',
		'cm-choose': '&#xe611;',
		'cm-question': '&#xe60e;',
		'cm-clock': '&#xe60d;',
		'cm-soat': '&#xe600;',
		'cm-search': '&#xe601;',
		'cm-save-money': '&#xe602;',
		'cm-personal-accidents-insurance': '&#xe603;',
		'cm-money': '&#xe604;',
		'cm-loan': '&#xe605;',
		'cm-life-insurance': '&#xe606;',
		'cm-insurances': '&#xe607;',
		'cm-credit-card': '&#xe608;',
		'cm-compare': '&#xe609;',
		'cm-cdt': '&#xe60a;',
		'cm-cars-insurance': '&#xe60b;',
		'cm-banks': '&#xe60c;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/cm-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
