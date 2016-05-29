(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name generic
	 * @module generic
	 * @description
	 * Generic Module
	 * Contains generic scripts which are not available on Bower
	 * These are not app-specific but essential to the App.
	 *
	 * @example
	 * `angular.module('myApp',['generic']);`
	 *
	 */
	angular
		.module('generic', []);
}());
	(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name generic.service:Color
	 * @module generic
	 *
	 * @description
	 * Color processing beyond that covered by the THREEjs and d3js APIs.
	 *
	 */
	angular
		.module('generic')
		.factory('Color', Color);

	function Color() {
		// var rootObj = this;
		var rootObj = {};
		rootObj.re_ = {
		  // An X11 "rgb:ddd/ddd/ddd" value.
		  x11rgb: /^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,
		};
		// Named colors according to the stock X11 rgb.txt file.
		rootObj.colorNames = {
			// ADDED FOR ENSEMBL WEBCODE COLORS
			"transparent": "rgb(0, 0, 0)", // should be rgba...
			// "rust": "rgb(183, 65, 14)", // ORIGINAL ENSEMBL RUST
			"rust": "rgb(243, 137, 92)", // HALF INTENSITY OF RUST
			"stripes": "rgb(255, 54, 54)",
			"dark_blue": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue1": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue2": "rgb(173, 216, 230)", // FROM ENSEMBL DOCS = LIGHT BLUE
			"border:grey70": "rgb(179, 179, 179)", // FROM ENSEMBL ERROR? = GREY70
			// X11 COLOR NAMES
			"aliceblue": "rgb(240, 248, 255)", "antiquewhite": "rgb(250, 235, 215)", "antiquewhite1": "rgb(255, 239, 219)", "antiquewhite2": "rgb(238, 223, 204)", "antiquewhite3": "rgb(205, 192, 176)", "antiquewhite4": "rgb(139, 131, 120)", "aquamarine": "rgb(127, 255, 212)", "aquamarine1": "rgb(127, 255, 212)", "aquamarine2": "rgb(118, 238, 198)", "aquamarine3": "rgb(102, 205, 170)", "aquamarine4": "rgb(69, 139, 116)", "azure": "rgb(240, 255, 255)", "azure1": "rgb(240, 255, 255)", "azure2": "rgb(224, 238, 238)", "azure3": "rgb(193, 205, 205)", "azure4": "rgb(131, 139, 139)", "beige": "rgb(245, 245, 220)", "bisque": "rgb(255, 228, 196)", "bisque1": "rgb(255, 228, 196)", "bisque2": "rgb(238, 213, 183)", "bisque3": "rgb(205, 183, 158)", "bisque4": "rgb(139, 125, 107)", "black": "rgb(0, 0, 0)", "blanchedalmond": "rgb(255, 235, 205)", "blue": "rgb(0, 0, 255)", "blue1": "rgb(0, 0, 255)", "blue2": "rgb(0, 0, 238)", "blue3": "rgb(0, 0, 205)", "blue4": "rgb(0, 0, 139)", "blueviolet": "rgb(138, 43, 226)", "brown": "rgb(165, 42, 42)", "brown1": "rgb(255, 64, 64)", "brown2": "rgb(238, 59, 59)", "brown3": "rgb(205, 51, 51)", "brown4": "rgb(139, 35, 35)", "burlywood": "rgb(222, 184, 135)", "burlywood1": "rgb(255, 211, 155)", "burlywood2": "rgb(238, 197, 145)", "burlywood3": "rgb(205, 170, 125)", "burlywood4": "rgb(139, 115, 85)", "cadetblue": "rgb(95, 158, 160)", "cadetblue1": "rgb(152, 245, 255)", "cadetblue2": "rgb(142, 229, 238)", "cadetblue3": "rgb(122, 197, 205)", "cadetblue4": "rgb(83, 134, 139)", "chartreuse": "rgb(127, 255, 0)", "chartreuse1": "rgb(127, 255, 0)", "chartreuse2": "rgb(118, 238, 0)", "chartreuse3": "rgb(102, 205, 0)", "chartreuse4": "rgb(69, 139, 0)", "chocolate": "rgb(210, 105, 30)", "chocolate1": "rgb(255, 127, 36)", "chocolate2": "rgb(238, 118, 33)", "chocolate3": "rgb(205, 102, 29)", "chocolate4": "rgb(139, 69, 19)", "coral": "rgb(255, 127, 80)", "coral1": "rgb(255, 114, 86)", "coral2": "rgb(238, 106, 80)", "coral3": "rgb(205, 91, 69)", "coral4": "rgb(139, 62, 47)", "cornflowerblue": "rgb(100, 149, 237)", "cornsilk": "rgb(255, 248, 220)", "cornsilk1": "rgb(255, 248, 220)", "cornsilk2": "rgb(238, 232, 205)", "cornsilk3": "rgb(205, 200, 177)", "cornsilk4": "rgb(139, 136, 120)", "cyan": "rgb(0, 255, 255)", "cyan1": "rgb(0, 255, 255)", "cyan2": "rgb(0, 238, 238)", "cyan3": "rgb(0, 205, 205)", "cyan4": "rgb(0, 139, 139)", "darkblue": "rgb(0, 0, 139)", "darkcyan": "rgb(0, 139, 139)", "darkgoldenrod": "rgb(184, 134, 11)", "darkgoldenrod1": "rgb(255, 185, 15)", "darkgoldenrod2": "rgb(238, 173, 14)", "darkgoldenrod3": "rgb(205, 149, 12)", "darkgoldenrod4": "rgb(139, 101, 8)", "darkgray": "rgb(169, 169, 169)", "darkgreen": "rgb(0, 100, 0)", "darkgrey": "rgb(169, 169, 169)", "darkkhaki": "rgb(189, 183, 107)", "darkmagenta": "rgb(139, 0, 139)", "darkolivegreen": "rgb(85, 107, 47)", "darkolivegreen1": "rgb(202, 255, 112)", "darkolivegreen2": "rgb(188, 238, 104)", "darkolivegreen3": "rgb(162, 205, 90)", "darkolivegreen4": "rgb(110, 139, 61)", "darkorange": "rgb(255, 140, 0)", "darkorange1": "rgb(255, 127, 0)", "darkorange2": "rgb(238, 118, 0)", "darkorange3": "rgb(205, 102, 0)", "darkorange4": "rgb(139, 69, 0)", "darkorchid": "rgb(153, 50, 204)", "darkorchid1": "rgb(191, 62, 255)", "darkorchid2": "rgb(178, 58, 238)", "darkorchid3": "rgb(154, 50, 205)", "darkorchid4": "rgb(104, 34, 139)", "darkred": "rgb(139, 0, 0)", "darksalmon": "rgb(233, 150, 122)", "darkseagreen": "rgb(143, 188, 143)", "darkseagreen1": "rgb(193, 255, 193)", "darkseagreen2": "rgb(180, 238, 180)", "darkseagreen3": "rgb(155, 205, 155)", "darkseagreen4": "rgb(105, 139, 105)", "darkslateblue": "rgb(72, 61, 139)", "darkslategray": "rgb(47, 79, 79)", "darkslategray1": "rgb(151, 255, 255)", "darkslategray2": "rgb(141, 238, 238)", "darkslategray3": "rgb(121, 205, 205)", "darkslategray4": "rgb(82, 139, 139)", "darkslategrey": "rgb(47, 79, 79)", "darkturquoise": "rgb(0, 206, 209)", "darkviolet": "rgb(148, 0, 211)", "debianred": "rgb(215, 7, 81)", "deeppink": "rgb(255, 20, 147)", "deeppink1": "rgb(255, 20, 147)", "deeppink2": "rgb(238, 18, 137)", "deeppink3": "rgb(205, 16, 118)", "deeppink4": "rgb(139, 10, 80)", "deepskyblue": "rgb(0, 191, 255)", "deepskyblue1": "rgb(0, 191, 255)", "deepskyblue2": "rgb(0, 178, 238)", "deepskyblue3": "rgb(0, 154, 205)", "deepskyblue4": "rgb(0, 104, 139)", "dimgray": "rgb(105, 105, 105)", "dimgrey": "rgb(105, 105, 105)", "dodgerblue": "rgb(30, 144, 255)", "dodgerblue1": "rgb(30, 144, 255)", "dodgerblue2": "rgb(28, 134, 238)", "dodgerblue3": "rgb(24, 116, 205)", "dodgerblue4": "rgb(16, 78, 139)", "firebrick": "rgb(178, 34, 34)", "firebrick1": "rgb(255, 48, 48)", "firebrick2": "rgb(238, 44, 44)", "firebrick3": "rgb(205, 38, 38)", "firebrick4": "rgb(139, 26, 26)", "floralwhite": "rgb(255, 250, 240)", "forestgreen": "rgb(34, 139, 34)", "gainsboro": "rgb(220, 220, 220)", "ghostwhite": "rgb(248, 248, 255)", "gold": "rgb(255, 215, 0)", "gold1": "rgb(255, 215, 0)", "gold2": "rgb(238, 201, 0)", "gold3": "rgb(205, 173, 0)", "gold4": "rgb(139, 117, 0)", "goldenrod": "rgb(218, 165, 32)", "goldenrod1": "rgb(255, 193, 37)", "goldenrod2": "rgb(238, 180, 34)", "goldenrod3": "rgb(205, 155, 29)", "goldenrod4": "rgb(139, 105, 20)", "gray": "rgb(190, 190, 190)", "gray0": "rgb(0, 0, 0)", "gray1": "rgb(3, 3, 3)", "gray10": "rgb(26, 26, 26)", "gray100": "rgb(255, 255, 255)", "gray11": "rgb(28, 28, 28)", "gray12": "rgb(31, 31, 31)", "gray13": "rgb(33, 33, 33)", "gray14": "rgb(36, 36, 36)", "gray15": "rgb(38, 38, 38)", "gray16": "rgb(41, 41, 41)", "gray17": "rgb(43, 43, 43)", "gray18": "rgb(46, 46, 46)", "gray19": "rgb(48, 48, 48)", "gray2": "rgb(5, 5, 5)", "gray20": "rgb(51, 51, 51)", "gray21": "rgb(54, 54, 54)", "gray22": "rgb(56, 56, 56)", "gray23": "rgb(59, 59, 59)", "gray24": "rgb(61, 61, 61)", "gray25": "rgb(64, 64, 64)", "gray26": "rgb(66, 66, 66)", "gray27": "rgb(69, 69, 69)", "gray28": "rgb(71, 71, 71)", "gray29": "rgb(74, 74, 74)", "gray3": "rgb(8, 8, 8)", "gray30": "rgb(77, 77, 77)", "gray31": "rgb(79, 79, 79)", "gray32": "rgb(82, 82, 82)", "gray33": "rgb(84, 84, 84)", "gray34": "rgb(87, 87, 87)", "gray35": "rgb(89, 89, 89)", "gray36": "rgb(92, 92, 92)", "gray37": "rgb(94, 94, 94)", "gray38": "rgb(97, 97, 97)", "gray39": "rgb(99, 99, 99)", "gray4": "rgb(10, 10, 10)", "gray40": "rgb(102, 102, 102)", "gray41": "rgb(105, 105, 105)", "gray42": "rgb(107, 107, 107)", "gray43": "rgb(110, 110, 110)", "gray44": "rgb(112, 112, 112)", "gray45": "rgb(115, 115, 115)", "gray46": "rgb(117, 117, 117)", "gray47": "rgb(120, 120, 120)", "gray48": "rgb(122, 122, 122)", "gray49": "rgb(125, 125, 125)", "gray5": "rgb(13, 13, 13)", "gray50": "rgb(127, 127, 127)", "gray51": "rgb(130, 130, 130)", "gray52": "rgb(133, 133, 133)", "gray53": "rgb(135, 135, 135)", "gray54": "rgb(138, 138, 138)", "gray55": "rgb(140, 140, 140)", "gray56": "rgb(143, 143, 143)", "gray57": "rgb(145, 145, 145)", "gray58": "rgb(148, 148, 148)", "gray59": "rgb(150, 150, 150)", "gray6": "rgb(15, 15, 15)", "gray60": "rgb(153, 153, 153)", "gray61": "rgb(156, 156, 156)", "gray62": "rgb(158, 158, 158)", "gray63": "rgb(161, 161, 161)", "gray64": "rgb(163, 163, 163)", "gray65": "rgb(166, 166, 166)", "gray66": "rgb(168, 168, 168)", "gray67": "rgb(171, 171, 171)", "gray68": "rgb(173, 173, 173)", "gray69": "rgb(176, 176, 176)", "gray7": "rgb(18, 18, 18)", "gray70": "rgb(179, 179, 179)", "gray71": "rgb(181, 181, 181)", "gray72": "rgb(184, 184, 184)", "gray73": "rgb(186, 186, 186)", "gray74": "rgb(189, 189, 189)", "gray75": "rgb(191, 191, 191)", "gray76": "rgb(194, 194, 194)", "gray77": "rgb(196, 196, 196)", "gray78": "rgb(199, 199, 199)", "gray79": "rgb(201, 201, 201)", "gray8": "rgb(20, 20, 20)", "gray80": "rgb(204, 204, 204)", "gray81": "rgb(207, 207, 207)", "gray82": "rgb(209, 209, 209)", "gray83": "rgb(212, 212, 212)", "gray84": "rgb(214, 214, 214)", "gray85": "rgb(217, 217, 217)", "gray86": "rgb(219, 219, 219)", "gray87": "rgb(222, 222, 222)", "gray88": "rgb(224, 224, 224)", "gray89": "rgb(227, 227, 227)", "gray9": "rgb(23, 23, 23)", "gray90": "rgb(229, 229, 229)", "gray91": "rgb(232, 232, 232)", "gray92": "rgb(235, 235, 235)", "gray93": "rgb(237, 237, 237)", "gray94": "rgb(240, 240, 240)", "gray95": "rgb(242, 242, 242)", "gray96": "rgb(245, 245, 245)", "gray97": "rgb(247, 247, 247)", "gray98": "rgb(250, 250, 250)", "gray99": "rgb(252, 252, 252)", "green": "rgb(0, 255, 0)", "green1": "rgb(0, 255, 0)", "green2": "rgb(0, 238, 0)", "green3": "rgb(0, 205, 0)", "green4": "rgb(0, 139, 0)", "greenyellow": "rgb(173, 255, 47)", "grey": "rgb(190, 190, 190)", "grey0": "rgb(0, 0, 0)", "grey1": "rgb(3, 3, 3)", "grey10": "rgb(26, 26, 26)", "grey100": "rgb(255, 255, 255)", "grey11": "rgb(28, 28, 28)", "grey12": "rgb(31, 31, 31)", "grey13": "rgb(33, 33, 33)", "grey14": "rgb(36, 36, 36)", "grey15": "rgb(38, 38, 38)", "grey16": "rgb(41, 41, 41)", "grey17": "rgb(43, 43, 43)", "grey18": "rgb(46, 46, 46)", "grey19": "rgb(48, 48, 48)", "grey2": "rgb(5, 5, 5)", "grey20": "rgb(51, 51, 51)", "grey21": "rgb(54, 54, 54)", "grey22": "rgb(56, 56, 56)", "grey23": "rgb(59, 59, 59)", "grey24": "rgb(61, 61, 61)", "grey25": "rgb(64, 64, 64)", "grey26": "rgb(66, 66, 66)", "grey27": "rgb(69, 69, 69)", "grey28": "rgb(71, 71, 71)", "grey29": "rgb(74, 74, 74)", "grey3": "rgb(8, 8, 8)", "grey30": "rgb(77, 77, 77)", "grey31": "rgb(79, 79, 79)", "grey32": "rgb(82, 82, 82)", "grey33": "rgb(84, 84, 84)", "grey34": "rgb(87, 87, 87)", "grey35": "rgb(89, 89, 89)", "grey36": "rgb(92, 92, 92)", "grey37": "rgb(94, 94, 94)", "grey38": "rgb(97, 97, 97)", "grey39": "rgb(99, 99, 99)", "grey4": "rgb(10, 10, 10)", "grey40": "rgb(102, 102, 102)", "grey41": "rgb(105, 105, 105)", "grey42": "rgb(107, 107, 107)", "grey43": "rgb(110, 110, 110)", "grey44": "rgb(112, 112, 112)", "grey45": "rgb(115, 115, 115)", "grey46": "rgb(117, 117, 117)", "grey47": "rgb(120, 120, 120)", "grey48": "rgb(122, 122, 122)", "grey49": "rgb(125, 125, 125)", "grey5": "rgb(13, 13, 13)", "grey50": "rgb(127, 127, 127)", "grey51": "rgb(130, 130, 130)", "grey52": "rgb(133, 133, 133)", "grey53": "rgb(135, 135, 135)", "grey54": "rgb(138, 138, 138)", "grey55": "rgb(140, 140, 140)", "grey56": "rgb(143, 143, 143)", "grey57": "rgb(145, 145, 145)", "grey58": "rgb(148, 148, 148)", "grey59": "rgb(150, 150, 150)", "grey6": "rgb(15, 15, 15)", "grey60": "rgb(153, 153, 153)", "grey61": "rgb(156, 156, 156)", "grey62": "rgb(158, 158, 158)", "grey63": "rgb(161, 161, 161)", "grey64": "rgb(163, 163, 163)", "grey65": "rgb(166, 166, 166)", "grey66": "rgb(168, 168, 168)", "grey67": "rgb(171, 171, 171)", "grey68": "rgb(173, 173, 173)", "grey69": "rgb(176, 176, 176)", "grey7": "rgb(18, 18, 18)", "grey70": "rgb(179, 179, 179)", "grey71": "rgb(181, 181, 181)", "grey72": "rgb(184, 184, 184)", "grey73": "rgb(186, 186, 186)", "grey74": "rgb(189, 189, 189)", "grey75": "rgb(191, 191, 191)", "grey76": "rgb(194, 194, 194)", "grey77": "rgb(196, 196, 196)", "grey78": "rgb(199, 199, 199)", "grey79": "rgb(201, 201, 201)", "grey8": "rgb(20, 20, 20)", "grey80": "rgb(204, 204, 204)", "grey81": "rgb(207, 207, 207)", "grey82": "rgb(209, 209, 209)", "grey83": "rgb(212, 212, 212)", "grey84": "rgb(214, 214, 214)", "grey85": "rgb(217, 217, 217)", "grey86": "rgb(219, 219, 219)", "grey87": "rgb(222, 222, 222)", "grey88": "rgb(224, 224, 224)", "grey89": "rgb(227, 227, 227)", "grey9": "rgb(23, 23, 23)", "grey90": "rgb(229, 229, 229)", "grey91": "rgb(232, 232, 232)", "grey92": "rgb(235, 235, 235)", "grey93": "rgb(237, 237, 237)", "grey94": "rgb(240, 240, 240)", "grey95": "rgb(242, 242, 242)", "grey96": "rgb(245, 245, 245)", "grey97": "rgb(247, 247, 247)", "grey98": "rgb(250, 250, 250)", "grey99": "rgb(252, 252, 252)", "honeydew": "rgb(240, 255, 240)", "honeydew1": "rgb(240, 255, 240)", "honeydew2": "rgb(224, 238, 224)", "honeydew3": "rgb(193, 205, 193)", "honeydew4": "rgb(131, 139, 131)", "hotpink": "rgb(255, 105, 180)", "hotpink1": "rgb(255, 110, 180)", "hotpink2": "rgb(238, 106, 167)", "hotpink3": "rgb(205, 96, 144)", "hotpink4": "rgb(139, 58, 98)", "indianred": "rgb(205, 92, 92)", "indianred1": "rgb(255, 106, 106)", "indianred2": "rgb(238, 99, 99)", "indianred3": "rgb(205, 85, 85)", "indianred4": "rgb(139, 58, 58)", "ivory": "rgb(255, 255, 240)", "ivory1": "rgb(255, 255, 240)", "ivory2": "rgb(238, 238, 224)", "ivory3": "rgb(205, 205, 193)", "ivory4": "rgb(139, 139, 131)", "khaki": "rgb(240, 230, 140)", "khaki1": "rgb(255, 246, 143)", "khaki2": "rgb(238, 230, 133)", "khaki3": "rgb(205, 198, 115)", "khaki4": "rgb(139, 134, 78)", "lavender": "rgb(230, 230, 250)", "lavenderblush": "rgb(255, 240, 245)", "lavenderblush1": "rgb(255, 240, 245)", "lavenderblush2": "rgb(238, 224, 229)", "lavenderblush3": "rgb(205, 193, 197)", "lavenderblush4": "rgb(139, 131, 134)", "lawngreen": "rgb(124, 252, 0)", "lemonchiffon": "rgb(255, 250, 205)", "lemonchiffon1": "rgb(255, 250, 205)", "lemonchiffon2": "rgb(238, 233, 191)", "lemonchiffon3": "rgb(205, 201, 165)", "lemonchiffon4": "rgb(139, 137, 112)", "lightblue": "rgb(173, 216, 230)", "lightblue1": "rgb(191, 239, 255)", "lightblue2": "rgb(178, 223, 238)", "lightblue3": "rgb(154, 192, 205)", "lightblue4": "rgb(104, 131, 139)", "lightcoral": "rgb(240, 128, 128)", "lightcyan": "rgb(224, 255, 255)", "lightcyan1": "rgb(224, 255, 255)", "lightcyan2": "rgb(209, 238, 238)", "lightcyan3": "rgb(180, 205, 205)", "lightcyan4": "rgb(122, 139, 139)", "lightgoldenrod": "rgb(238, 221, 130)", "lightgoldenrod1": "rgb(255, 236, 139)", "lightgoldenrod2": "rgb(238, 220, 130)", "lightgoldenrod3": "rgb(205, 190, 112)", "lightgoldenrod4": "rgb(139, 129, 76)", "lightgoldenrodyellow": "rgb(250, 250, 210)", "lightgray": "rgb(211, 211, 211)", "lightgreen": "rgb(144, 238, 144)", "lightgrey": "rgb(211, 211, 211)", "lightpink": "rgb(255, 182, 193)", "lightpink1": "rgb(255, 174, 185)", "lightpink2": "rgb(238, 162, 173)", "lightpink3": "rgb(205, 140, 149)", "lightpink4": "rgb(139, 95, 101)", "lightsalmon": "rgb(255, 160, 122)", "lightsalmon1": "rgb(255, 160, 122)", "lightsalmon2": "rgb(238, 149, 114)", "lightsalmon3": "rgb(205, 129, 98)", "lightsalmon4": "rgb(139, 87, 66)", "lightseagreen": "rgb(32, 178, 170)", "lightskyblue": "rgb(135, 206, 250)", "lightskyblue1": "rgb(176, 226, 255)", "lightskyblue2": "rgb(164, 211, 238)", "lightskyblue3": "rgb(141, 182, 205)", "lightskyblue4": "rgb(96, 123, 139)", "lightslateblue": "rgb(132, 112, 255)", "lightslategray": "rgb(119, 136, 153)", "lightslategrey": "rgb(119, 136, 153)", "lightsteelblue": "rgb(176, 196, 222)", "lightsteelblue1": "rgb(202, 225, 255)", "lightsteelblue2": "rgb(188, 210, 238)", "lightsteelblue3": "rgb(162, 181, 205)", "lightsteelblue4": "rgb(110, 123, 139)", "lightyellow": "rgb(255, 255, 224)", "lightyellow1": "rgb(255, 255, 224)", "lightyellow2": "rgb(238, 238, 209)", "lightyellow3": "rgb(205, 205, 180)", "lightyellow4": "rgb(139, 139, 122)", "limegreen": "rgb(50, 205, 50)", "linen": "rgb(250, 240, 230)", "magenta": "rgb(255, 0, 255)", "magenta1": "rgb(255, 0, 255)", "magenta2": "rgb(238, 0, 238)", "magenta3": "rgb(205, 0, 205)", "magenta4": "rgb(139, 0, 139)", "maroon": "rgb(176, 48, 96)", "maroon1": "rgb(255, 52, 179)", "maroon2": "rgb(238, 48, 167)", "maroon3": "rgb(205, 41, 144)", "maroon4": "rgb(139, 28, 98)", "mediumaquamarine": "rgb(102, 205, 170)", "mediumblue": "rgb(0, 0, 205)", "mediumorchid": "rgb(186, 85, 211)", "mediumorchid1": "rgb(224, 102, 255)", "mediumorchid2": "rgb(209, 95, 238)", "mediumorchid3": "rgb(180, 82, 205)", "mediumorchid4": "rgb(122, 55, 139)", "mediumpurple": "rgb(147, 112, 219)", "mediumpurple1": "rgb(171, 130, 255)", "mediumpurple2": "rgb(159, 121, 238)", "mediumpurple3": "rgb(137, 104, 205)", "mediumpurple4": "rgb(93, 71, 139)", "mediumseagreen": "rgb(60, 179, 113)", "mediumslateblue": "rgb(123, 104, 238)", "mediumspringgreen": "rgb(0, 250, 154)", "mediumturquoise": "rgb(72, 209, 204)", "mediumvioletred": "rgb(199, 21, 133)", "midnightblue": "rgb(25, 25, 112)", "mintcream": "rgb(245, 255, 250)", "mistyrose": "rgb(255, 228, 225)", "mistyrose1": "rgb(255, 228, 225)", "mistyrose2": "rgb(238, 213, 210)", "mistyrose3": "rgb(205, 183, 181)", "mistyrose4": "rgb(139, 125, 123)", "moccasin": "rgb(255, 228, 181)", "navajowhite": "rgb(255, 222, 173)", "navajowhite1": "rgb(255, 222, 173)", "navajowhite2": "rgb(238, 207, 161)", "navajowhite3": "rgb(205, 179, 139)", "navajowhite4": "rgb(139, 121, 94)", "navy": "rgb(0, 0, 128)", "navyblue": "rgb(0, 0, 128)", "oldlace": "rgb(253, 245, 230)", "olivedrab": "rgb(107, 142, 35)", "olivedrab1": "rgb(192, 255, 62)", "olivedrab2": "rgb(179, 238, 58)", "olivedrab3": "rgb(154, 205, 50)", "olivedrab4": "rgb(105, 139, 34)", "orange": "rgb(255, 165, 0)", "orange1": "rgb(255, 165, 0)", "orange2": "rgb(238, 154, 0)", "orange3": "rgb(205, 133, 0)", "orange4": "rgb(139, 90, 0)", "orangered": "rgb(255, 69, 0)", "orangered1": "rgb(255, 69, 0)", "orangered2": "rgb(238, 64, 0)", "orangered3": "rgb(205, 55, 0)", "orangered4": "rgb(139, 37, 0)", "orchid": "rgb(218, 112, 214)", "orchid1": "rgb(255, 131, 250)", "orchid2": "rgb(238, 122, 233)", "orchid3": "rgb(205, 105, 201)", "orchid4": "rgb(139, 71, 137)", "palegoldenrod": "rgb(238, 232, 170)", "palegreen": "rgb(152, 251, 152)", "palegreen1": "rgb(154, 255, 154)", "palegreen2": "rgb(144, 238, 144)", "palegreen3": "rgb(124, 205, 124)", "palegreen4": "rgb(84, 139, 84)", "paleturquoise": "rgb(175, 238, 238)", "paleturquoise1": "rgb(187, 255, 255)", "paleturquoise2": "rgb(174, 238, 238)", "paleturquoise3": "rgb(150, 205, 205)", "paleturquoise4": "rgb(102, 139, 139)", "palevioletred": "rgb(219, 112, 147)", "palevioletred1": "rgb(255, 130, 171)", "palevioletred2": "rgb(238, 121, 159)", "palevioletred3": "rgb(205, 104, 137)", "palevioletred4": "rgb(139, 71, 93)", "papayawhip": "rgb(255, 239, 213)", "peachpuff": "rgb(255, 218, 185)", "peachpuff1": "rgb(255, 218, 185)", "peachpuff2": "rgb(238, 203, 173)", "peachpuff3": "rgb(205, 175, 149)", "peachpuff4": "rgb(139, 119, 101)", "peru": "rgb(205, 133, 63)", "pink": "rgb(255, 192, 203)", "pink1": "rgb(255, 181, 197)", "pink2": "rgb(238, 169, 184)", "pink3": "rgb(205, 145, 158)", "pink4": "rgb(139, 99, 108)", "plum": "rgb(221, 160, 221)", "plum1": "rgb(255, 187, 255)", "plum2": "rgb(238, 174, 238)", "plum3": "rgb(205, 150, 205)", "plum4": "rgb(139, 102, 139)", "powderblue": "rgb(176, 224, 230)", "purple": "rgb(160, 32, 240)", "purple1": "rgb(155, 48, 255)", "purple2": "rgb(145, 44, 238)", "purple3": "rgb(125, 38, 205)", "purple4": "rgb(85, 26, 139)", "red": "rgb(255, 0, 0)", "red1": "rgb(255, 0, 0)", "red2": "rgb(238, 0, 0)", "red3": "rgb(205, 0, 0)", "red4": "rgb(139, 0, 0)", "rosybrown": "rgb(188, 143, 143)", "rosybrown1": "rgb(255, 193, 193)", "rosybrown2": "rgb(238, 180, 180)", "rosybrown3": "rgb(205, 155, 155)", "rosybrown4": "rgb(139, 105, 105)", "royalblue": "rgb(65, 105, 225)", "royalblue1": "rgb(72, 118, 255)", "royalblue2": "rgb(67, 110, 238)", "royalblue3": "rgb(58, 95, 205)", "royalblue4": "rgb(39, 64, 139)", "saddlebrown": "rgb(139, 69, 19)", "salmon": "rgb(250, 128, 114)", "salmon1": "rgb(255, 140, 105)", "salmon2": "rgb(238, 130, 98)", "salmon3": "rgb(205, 112, 84)", "salmon4": "rgb(139, 76, 57)", "sandybrown": "rgb(244, 164, 96)", "seagreen": "rgb(46, 139, 87)", "seagreen1": "rgb(84, 255, 159)", "seagreen2": "rgb(78, 238, 148)", "seagreen3": "rgb(67, 205, 128)", "seagreen4": "rgb(46, 139, 87)", "seashell": "rgb(255, 245, 238)", "seashell1": "rgb(255, 245, 238)", "seashell2": "rgb(238, 229, 222)", "seashell3": "rgb(205, 197, 191)", "seashell4": "rgb(139, 134, 130)", "sienna": "rgb(160, 82, 45)", "sienna1": "rgb(255, 130, 71)", "sienna2": "rgb(238, 121, 66)", "sienna3": "rgb(205, 104, 57)", "sienna4": "rgb(139, 71, 38)", "skyblue": "rgb(135, 206, 235)", "skyblue1": "rgb(135, 206, 255)", "skyblue2": "rgb(126, 192, 238)", "skyblue3": "rgb(108, 166, 205)", "skyblue4": "rgb(74, 112, 139)", "slateblue": "rgb(106, 90, 205)", "slateblue1": "rgb(131, 111, 255)", "slateblue2": "rgb(122, 103, 238)", "slateblue3": "rgb(105, 89, 205)", "slateblue4": "rgb(71, 60, 139)", "slategray": "rgb(112, 128, 144)", "slategray1": "rgb(198, 226, 255)", "slategray2": "rgb(185, 211, 238)", "slategray3": "rgb(159, 182, 205)", "slategray4": "rgb(108, 123, 139)", "slategrey": "rgb(112, 128, 144)", "snow": "rgb(255, 250, 250)", "snow1": "rgb(255, 250, 250)", "snow2": "rgb(238, 233, 233)", "snow3": "rgb(205, 201, 201)", "snow4": "rgb(139, 137, 137)", "springgreen": "rgb(0, 255, 127)", "springgreen1": "rgb(0, 255, 127)", "springgreen2": "rgb(0, 238, 118)", "springgreen3": "rgb(0, 205, 102)", "springgreen4": "rgb(0, 139, 69)", "steelblue": "rgb(70, 130, 180)", "steelblue1": "rgb(99, 184, 255)", "steelblue2": "rgb(92, 172, 238)", "steelblue3": "rgb(79, 148, 205)", "steelblue4": "rgb(54, 100, 139)", "tan": "rgb(210, 180, 140)", "tan1": "rgb(255, 165, 79)", "tan2": "rgb(238, 154, 73)", "tan3": "rgb(205, 133, 63)", "tan4": "rgb(139, 90, 43)", "thistle": "rgb(216, 191, 216)", "thistle1": "rgb(255, 225, 255)", "thistle2": "rgb(238, 210, 238)", "thistle3": "rgb(205, 181, 205)", "thistle4": "rgb(139, 123, 139)", "tomato": "rgb(255, 99, 71)", "tomato1": "rgb(255, 99, 71)", "tomato2": "rgb(238, 92, 66)", "tomato3": "rgb(205, 79, 57)", "tomato4": "rgb(139, 54, 38)", "turquoise": "rgb(64, 224, 208)", "turquoise1": "rgb(0, 245, 255)", "turquoise2": "rgb(0, 229, 238)", "turquoise3": "rgb(0, 197, 205)", "turquoise4": "rgb(0, 134, 139)", "violet": "rgb(238, 130, 238)", "violetred": "rgb(208, 32, 144)", "violetred1": "rgb(255, 62, 150)", "violetred2": "rgb(238, 58, 140)", "violetred3": "rgb(205, 50, 120)", "violetred4": "rgb(139, 34, 82)", "wheat": "rgb(245, 222, 179)", "wheat1": "rgb(255, 231, 186)", "wheat2": "rgb(238, 216, 174)", "wheat3": "rgb(205, 186, 150)", "wheat4": "rgb(139, 126, 102)", "white": "rgb(255, 255, 255)", "whitesmoke": "rgb(245, 245, 245)", "yellow": "rgb(255, 255, 0)", "yellow1": "rgb(255, 255, 0)", "yellow2": "rgb(238, 238, 0)", "yellow3": "rgb(205, 205, 0)", "yellow4": "rgb(139, 139, 0)", "yellowgreen": "rgb(154, 205, 50)"
		};
		
		return {
			/**
			 * @ngdoc function
			 * @name generic.service:Color#testIfHex
			 * @methodOf generic.service:Color
			 * @kind function
			 *
			 * @description
			 * Test if color value is a CSS hex color value
			 * see https://chromium.googlesource.com/apps/libapps/+/master/libdot/js/lib_colors.js
			 *
			 * @param {value} v The color value to test.
			 * @return {boolean} true or false.
			 *
			 */
			testIfHex: function(v) {
				var isHex  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(v);
				return isHex;
			},
			/**
			 * @ngdoc function
			 * @name generic.service:Color#rgbToHex
			 * @methodOf generic.service:Color
			 * @kind function
			 *
			 * @description
			 * Convert RGB color triplet to CSS hex color value.
			 *
			 * @param {string} rgb The RGB color value to convert eg. "rgb(64,128,192)"
			 * @return {string} The corresponding CSS hex color eg. "#336699"
			 *
			 */
			rgbToHex: function(rgb) {
					var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(rgb);
					var r = parseInt(digits[2]);
					var g = parseInt(digits[3]);
					var b = parseInt(digits[4]);
					var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
				    return "#" + hex;
			},

			/**
			 * @ngdoc function
			 * @name generic.service:Color#nameToHex
			 * @methodOf generic.service:Color
			 * @kind function
			 *
			 * @description
			 * Convert X11 color name to CSS hex color value.
			 *
			 * @param {string} name The color name to convert eg.red
			 * @return {string} The corresponding CSS hex color eg.#ff0000
			 */
			nameToHex: function(name) {
				// name = name.replace('/#','/');
				var hexColor;
				var isHex = this.testIfHex(name);
				if (isHex) {
					return "#" + name;
				}
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.toLowerCase();
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.replace(/\s+/g, '');
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				return null;
			},

			/**
			 * @ngdoc function
			 * @name generic.service:Color#THREEColorsFromHex
			 * @methodOf generic.service:Color
			 * @kind function
			 *
			 * @description
			 * Convert Array of CSS hex color value to Array of THREE Colors
			 * eg. [#rrggbb,#rrggbb,#rrggbb,...] >>> [Color,Color,Color...]
			 *
			 * @param {Array} data Array of CSS hex colors.
			 * @return {Array} The corresponding THREE Color to Array of THREE Colors
			 */
			THREEColorsFromHex: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i--) {
					var color =  new THREE.Color(data[i]);
					colors.unshift(color);
				}
				return colors;
			},

			/**
			 * @ngdoc function
			 * @name generic.service:Color#vertexColorsFromTHREEColors
			 * @methodOf generic.service:Color
			 * @kind function
			 *
			 * @description
			 * Convert Float32 Array of RGB color components (for THREE Vertex Colors) from Array of THREE Colors
			 * eg. [#rrggbb,#rrggbb,#rrggbb,...] >>> [Color,Color,Color...]
			 *
			 * @param {Array} colors Array of THREE Colors.
			 * @return {Float32Array} Float32 Array of RGB color components
			 */
			vertexColorsFromTHREEColors: function(colors) {
				// Buffer Geomptry to be used as LineSegments so
				// colors stored as one per data-position-pair
				// so the array needs an RGB (*3) for each pair (*2)
				// ie. each distance needs to be replicated 6 times
				var vertexColors = new Float32Array( colors.length * 6 );
				for (var i = colors.length - 1; i >= 0; i--) {
					var pos = i * 6;
					var RGB = colors[i];
					vertexColors[pos  ] = RGB.r;
					vertexColors[pos+1] = RGB.g;
					vertexColors[pos+2] = RGB.b;
					vertexColors[pos+3] = RGB.r;
					vertexColors[pos+4] = RGB.g;
					vertexColors[pos+5] = RGB.b;
				}
				return vertexColors;
			},

		};
	}
})();
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name generic.service:Utils
	 * @module generic
	 *
	 * @description
	 * Generic javascript utilities.
	 *
	 */
	angular
		.module('generic')
		.factory('Utils', Utils);

	function Utils() {
		return {
			/**
			 * @ngdoc function
			 * @name generic.service:Utils#whatIsIt
			 * @methodOf generic.service:Utils
			 * @kind function
			 *
			 * @description
			 * A function that detrmines the type of object being passed.
			 * @link http://stackoverflow.com/a/11183002/1667410
			 *
			 * @param {Object} value to be returned.
			 * @returns {string} description of object type
			 * [ null | undefined | String | Array | Object | don't know ].
			 */
			whatIsIt: function(object) {
				var stringConstructor = "test".constructor;
				var arrayConstructor = [].constructor;
				var objectConstructor = {}.constructor;
				if (object === null) {
					return "null";
				}
				else if (object === undefined) {
					return "undefined";
				}
				else if (object.constructor === stringConstructor) {
					return "String";
				}
				else if (object.constructor === arrayConstructor) {
					return "Array";
				}
				else if (object.constructor === objectConstructor) {
					return "Object";
				}
				else {
					return "don't know";
				}
			}
		};
	}
})();
(function () {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name generic.directive:routeCssClassnames
	 * @scope
	 * @restrict A
	 * @element body
	 * @description
	 * Add a Class name as class to html body.
	 * @see http://stackoverflow.com/a/32574746/1667410
	 *
	 * @example
	 *	`<body route-css-classnames>`
	 *
	 */
	angular
		.module('generic')
		.directive('routeCssClassnames', routeCssClassnames);

	function routeCssClassnames($rootScope) {
		return {
			restrict: 'A',
			scope: {},
			link: function (scope, elem, attr, ctrl) {

				$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
					var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.cssClassnames) ? fromState.data.cssClassnames : null;
					var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.cssClassnames) ? toState.data.cssClassnames : null;

					// don't do anything if they are the same
					if (fromClassnames != toClassnames) {
						if (fromClassnames) {
							elem.removeClass(fromClassnames);
						}

						if (toClassnames) {
							elem.addClass(toClassnames);
						}
					}
				});
			}
		};
	}
}());
(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name ui
	 * @module ui
	 * @description
	 * UI Module
	 * User Interface compoments
	 *
	 * @requires d3js
	 * @example
	 * `angular.module('myApp',['ui']);`
	 *
	 */
	angular
		.module('ui', []);
}());
(function() {
	'use strict';
	angular
		.module('ui')
		.directive('uiDropzone', uiDropzone);

	function uiDropzone($log, $state, $parse) {    
		return {
			restrict: 'A',
			// template: '<div>uiDropzone is functioning</div>', // uncomment to test if directive is functioning
			link: function (scope, element, attrs) {

				var expression = attrs.dropzone;
				var accesor = $parse(expression);

				var onDragOver = function(e) {
					e.preventDefault();
					element.addClass("dragOver");
				};

				var onDragEnd = function(e) {
					e.preventDefault();
					element.removeClass("dragOver");
				};

				// OJO! UNTESTED CODE
				// var onDrop = function(e) {
				// 	e.stopPropagation();
				// 	e.preventDefault();
				// 	var files = e.dataTransfer.files;
				// 	for (var i = 0; i <= files.length; i++) {
				// 		var f = files[i];
				// 		var reader = new FileReader();
				// 		reader.readAsArrayBuffer(f);
				// 		reader.onload = (function(theFile) {
				// 			return function(e) {
				// 				var newFile = { name : theFile.name,
				// 					type : theFile.type,
				// 					size : theFile.size,
				// 					lastModifiedDate : theFile.lastModifiedDate
				// 				};
				// 				scope.addfile(newFile);
				// 			};
				// 		})(f);
				// 	}
				// };

				var loadFile = function (file) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						scope.$apply(function() {
							// HERE: call the parsed function correctly (with scope AND params object)
							accesor(scope, {$fileContent:onLoadEvent.target.result});
							scope.addDataset(onLoadEvent.target.result);
							// $state.go('dataset');
						});
					};
					reader.readAsText(file);
					$log.info("File loaded...");
				};

				element.bind("dragover", onDragOver)
							 .bind("dragleave", onDragEnd)
							 .bind("drop", function (e) {
									 onDragEnd(e);
									 loadFile(e.dataTransfer.files[0]);
							 });

				scope.$watch(expression, function () {
						element.attr("src", accesor(scope));
				});

				// element.bind("drop", onDrop);

			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('ui')
		.directive('uiLoader', uiLoader);

	function uiLoader($log, $state, $parse) {		
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
				var fn = $parse(attrs.uiLoader);
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						$log.info("Data loaded OK!");
						scope.$apply(function() {
						// HERE: call the parsed function correctly (with scope AND params object)
							fn(scope, {$fileContent:onLoadEvent.target.result});
							// $state.go('dataset');
						});
					};
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}
})();
(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name bioinformatics
	 * @module bioinformatics
	 * @description
	 * Bioinformatics Module
	 * Contains scripts which facilitate Bioinformatics
	 *
	 * @example
	 * `angular.module('myApp',['bioinformatics']);`
	 *
	 */
	angular
		.module('bioinformatics', []);
}());
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name bioinformatics.service:EnsemblColors
	 * @description
	 * Import and manage Genomic feature colors (eg. genes) from Ensembl etc.
	 *
	 * @requires ONLINE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('bioinformatics')
		.factory('EnsemblColors', EnsemblColors);

	function EnsemblColors(ONLINE, $log, $q, $http) {
		var colors = {};

		return {
			
			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#load
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Load feature colors as used in Emsembl.
			 * Derived from remote INI or local JSON
			 *
			 * @return {Object} colorData List of colors categorized by feature object type.
			 */
			load: function() {
				var self = this;
				var deferred = $q.defer();
				var dataUrl;
				if (ONLINE) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-colors.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var colorData;
					if (ONLINE) {
						colorData = self.colorsFromIni(data);
					} else {
						colorData = data;
					}
					colors = colorData;
					$log.debug("Ensembl webcode biotype colors retrieved Ensembl.");
					deferred.resolve(colorData);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#get
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Get colors ().
			 *
			 * @param {number} ref Reference to EnsemblColors object property.
			 * @return {colors} All colors or speccific from ref.
			 */
			get: function(ref) {
				if (!ref) {
					return colors;
				} else {
					return colors[ref];
				}
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:EnsemblColors#colorsFromIni
			 * @methodOf bioinformatics.service:EnsemblColors
			 * @kind function
			 *
			 * @description
			 * Extract colors from (Ensembl) INI files
			 * For example:
			 * @link https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			 * @link https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			 * or in TADkit:
			 * @link assets/defaults/ensembl-webcode-COLOUR.ini
			 *
			 * @param {number} text data.
			 * @return {Object} Generate 'colors list' Object from INI data.
			 */
			colorsFromIni: function(data) {
				var self = this;
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var colors = {};
				var lines = data.split(/\r\n|\r|\n/);
				var section = null;
				lines.forEach(function(line){
					if(regex.comment.test(line) || line === ""){
						return;
					}
					var match;
					if(regex.param.test(line)){
						match = line.match(regex.param);
						if(section){
							var hexColor = self.nameToHex( match[2] );
							colors[section][match[1]] = hexColor;
						}else{
							colors[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						colors[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return colors;
			}

		};
	}
})();
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name bioinformatics.service:FeaturesEnsembl
	 * @description
	 * Import and manage Genomic features (eg. genes) from Ensembl etc.
	 *
	 * @requires ONLINE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('bioinformatics')
		.factory('FeaturesEnsembl', FeaturesEnsembl);

	function FeaturesEnsembl(ONLINE, $log, $q, $http) {
		var features = {
			root: "http://rest.ensemblgenomes.org/",
			online : true,
			assembly: {},
			colors: {},
		};
		
		return {

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#ping
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Ping the Ensebl server to check if it is online
			 * Use before requesting data.
			 * @link https://github.com/Ensembl/ensembl-rest/wiki/Writing-Your-First-Client
			 *
			 * @return {boolean} Online status.
			 */
			ping: function() {
				$log.debug("Pinging Ensembl RESTful genomic data server...");
				var deferred = $q.defer();
				var dataUrl =  features.root + "info/ping?content-type=application/json";
				$http.get(dataUrl)
				.success(function(data){
					$log.debug(data);
					if (data.ping === 1) {
						features.online = true;
						$log.debug("Ensembl RESTful is contactable.");
					} else {
						features.online = false;
						// fail - see https://github.com/Ensembl/ensembl-rest/wiki/Writing-Your-First-Client
					}
					deferred.resolve(features.online);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#load
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Load genomic features from Emsembl.
			 * Use supplied address within layer format.
			 *
			 * @param {Array} layer Array of URL path separators.
			 * @param {Object} address Object containing URL path.
			 *
			 * @return {boolean} Online status.
			 */
			load: function(layer, address) {
				layer = layer || ["http://rest.ensemblgenomes.org/overlap/region/","species","/","chrom",":","chromStart","-","chromEnd","?feature=gene;content-type=application/json"];
				address = address || {species: "Drosophila melanogaster", speciesUrl: "drosophila_melanogaster", chrom: "chrX", chromStart: 15590000, chromEnd: 16600000};
				// TODO: clear odd colors while loading...
				var deferred = $q.defer();
				var dataUrl;

				var self = this;
				if (ONLINE) {
					dataUrl = layer.object.url[0] + address.speciesUrl + layer.object.url[2] + address.chrom + layer.object.url[4] + address.chromStart + layer.object.url[6] + address.chromEnd + layer.object.url[8];
				} else {
					dataUrl = "assets/offline/" + address.speciesUrl + "-genes.json";
				}
				$http.get(dataUrl)
				.success(function(data){
					var genes = self.setBiotypeStyle(data);
					layer.data = genes;
					var region = address.chrom + ":" + address.chromStart + "-" + address.chromEnd;
					var source = ONLINE ? "Ensembl" : "local storage";
					$log.info("Genes for " + address.species + " "+ region + " retreived from " + source + ".");
					 deferred.resolve(layer);
				});
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#setBiotypeStyle
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Add property biotypeStyle as biotype in lowercase.
			 * Used to idenify and color for CSS.
			 *
			 * @param {Object} genes Genes list (see FeaturesEnsembl.load).
			 * @return {Object} genes Genes list with added biotypeStyle property.
			 */
			setBiotypeStyle: function(genes) {
				// This generates a index in lowercase to be used in CSS styling
				// now running directly in segmentFeaturesEnsembl
				angular.forEach(genes, function(gene, key) {
					// var biotypeStyle = gene.biotype.replace(/_/g, '-').toLowerCase(); // SWAP underscores for dashes
					var biotypeStyle = gene.biotype.toLowerCase();
					gene.biotypeStyle = biotypeStyle;
				});
				return genes;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#setLengthBP
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Sum base pair lengths from top level regions.
			 *
			 * @param {Object} top_level_region Genes list (see FeaturesEnsembl.load).
			 * @return {number} lengthBP Length.
			 */
			setLengthBP: function(top_level_region) {
				var lengthBP = 0;
				var regionBPs = top_level_region;
				for (var regionBP in regionBPs) {
					if (regionBPs.hasOwnProperty(regionBP)) {
						for (var i = 0, j = regionBPs.length; i < j; i++) {
							lengthBP += regionBPs[i].length;
						}
					}
				}
				return lengthBP;
			},

			/**
			 * @ngdoc function
			 * @name bioinformatics.service:FeaturesEnsembl#get
			 * @methodOf bioinformatics.service:FeaturesEnsembl
			 * @kind function
			 *
			 * @description
			 * Get FeaturesEnsembl.
			 *
			 * @return {Object} features FeaturesEnsembl.
			 */
			get: function() {
					return features;
			}

		};
	}
})();
(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name genoverse
	 * @module genoverse
	 * @description
	 * Genoverse Module
	 * Contains generic scripts which are not available on Bower
	 * These are not app-specific but essential to the App.
	 *
	 * @example
	 * `angular.module('myApp',['genoverse']);`
	 *
	 */
	angular
		.module('genoverse', []);
}());
/**!
 * Genoverse Angular module implmenting
 * Genoverse http://wtsi-web.github.io/Genoverse/
 * @author  Mike Goodstadt  <mikegoodstadt@gmail.com>
 * @version 0.0.1
 */
(function() {
	'use strict';
	angular
		.module('genoverse')
		.factory('GenoverseService', GenoverseService);

	function GenoverseService(ONLINE, $log, $document, $q, $http, $timeout, $rootScope) {

		function loadConfig(config) {
			var deferred = $q.defer();
			if (!config) {
				var configUrl = "modules/genoverse/genoverse-config.txt";
				$http({
					url : configUrl,
					method : 'GET',
					transformResponse : undefined,
					responseType : 'text'
				})
				.success( function(configText) {
					console.log(configText);
					config = configText;
					$log.debug("Genoverse default config loaded from " + configUrl);
					deferred.resolve(config);
				});
				console.log("Genoverse default config loaded.");
			}
			return deferred.promise;
		}

		return {
			load: function(config) {
				config = config || "";

				$log.log("Genoverse loading...");
				var deferred = $q.defer();

				function loadScriptTags() {
					// Create a script tag with Genoverse as the source.
					// Call our onScriptLoad callback when it has loaded.
					var scriptTag = $document[0].createElement("script");
					scriptTag.type = "text/javascript";
					scriptTag.async = true;
					scriptTag.text = config;
					if (ONLINE) {
						scriptTag.src = 'http://wtsi-web.github.io/Genoverse/js/genoverse.combined.js';
					} else {
						scriptTag.src = 'assets/js/genoverse/js/genoverse.combined.js';
					}
					scriptTag.onreadystatechange = function () {
						if (this.readyState == 'complete') {
							onScriptLoad();	
						}
					};
					scriptTag.onload = onScriptLoad();

					var cssReset = $document[0].createElement("link");
					cssReset.rel = "stylesheet";
					cssReset.type = 'text/css';
					cssReset.href = "assets/js/genoverse/ng/genoverse-reset.css";

					var node = $document[0].getElementsByTagName('body')[0];
					node.appendChild(scriptTag);
					node.appendChild(cssReset);
				}

				function onScriptLoad() {
					$log.log("Genoverse loaded OK!");
					$timeout(function() {
					// $rootScope.$apply(function() {
						deferred.resolve(window.Genoverse);
					});
				}

				loadConfig(config);
				loadScriptTags();
				return deferred.promise;
			}
		};
	}
})();
(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name modeling
	 * @module modeling
	 * @description
	 * Modeling Module
	 * Contains scripts for (spatia) Modeling
	 *
	 * @example
	 * `angular.module('myApp',['modeling']);`
	 *
	 */
	angular
		.module('modeling', []);
}());
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Clusters
	 * @description Clustering of spatial datasets
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 *
	 */
	angular
		.module('modeling')
		.factory('Clusters', Clusters);

	function Clusters(VERBOSE, $log, $q) {
		var clusters = {
			loaded : [],
			current : {
				dataset : {},
				index : 0,
				cluster : 1,
				centroid : 1
			}		
		};
		return {
			/**
			 * @ngdoc function
			 * @name modeling.service:CLusters#set
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Loads Datset from supplied file or default.
			 * Waits for promise.
			 *
			 * @requires $log
			 * @requires $q
			 * @requires $http
			 *
			 * @param {string} [dataset] Dataset to load cluster from
			 * @returns {Object} Clusters as resolved promise.
			 */
			load: function(dataset) {
				dataset = dataset || "error";
				clusters.current.dataset = dataset;
				var self = this;
				var deferred = $q.defer();
				var sortClusters = self.sort(dataset);
				return $q.all([sortClusters])
				.then(function() {
					$log.debug("Defaults initialized.");
				});
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#groupClusters
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Group clusters of current dataset.
			 *
			 * @requires $log
			 *
			 * @returns {Object} Clusters.
			 */
			sort: function() {
				var self = this;
				for (var i = clusters.current.dataset.clusters.length - 1; i >= 0; i--) {
					var cluster = {};
					cluster.ref = i + 1;
					cluster.centroid = self.getCentroidRef(cluster.ref);
					cluster.list = clusters.current.dataset.clusters[i];
					cluster.centroidIndex = cluster.list.indexOf(cluster.centroid);
					cluster.data = [];
					for (var j = cluster.list.length - 1; j >= 0; j--) {
						var modelData;
						for (var k = clusters.current.dataset.models.length - 1; k >= 0; k--) {
							var model = clusters.current.dataset.models[k];
							if (parseInt(model.ref) == cluster.list[j]) {
								modelData = model.data;
								if (VERBOSE) $log.debug("Model " + model.ref + " in Cluster " + cluster.ref);
							}
						}
						if (modelData) cluster.data.unshift(modelData);
						else $log.error("Listed model not found!");
					}
					// Add cluster to cluster collection
					clusters.loaded.unshift(cluster);
				}
				clusters.current.ref = 1; // reset to first, which should contain most models
				return clusters;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#setCluster
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Sets the current cluster for the current dataset.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Array} Newly set current cluster.
			 */
			setCluster: function(ref) { // from cluster ref
				var self = this;
				ref = ref || 1; // from ref or just set as the first cluster
				clusters.current.index = ref - 1;
				var clusterCentroid = self.getCentroidRef(clusters.current.index);
				self.setCentroid(clusterCentroid);
				var cluster = self.getCluster();
				return cluster; // array of model indices
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#setCentroid
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Sets the current centroid for the current cluster.
			 *
			 * @param {number} [ref] Centroid reference.
			 * @returns {Array} Newly set current centroid.
			 */
			setCentroid: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef(); // from ref or from current cluster
				clusters.current.centroid = ref;
				var centroid = self.setModel(clusters.current.centroid);
				return centroid; // array of vertices
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#setModel
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Sets the current mdoel for the current dataset.
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Array} Newly set current model.
			 */
			setModel: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef();
				var model = self.getModel(ref - 1);
				// Store as current model for dataset in dataset.data
				clusters.current.dataset.data = model;
				return model; // array of vertices
			},


			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getGroupedClusters
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get groups clusters.
			 *
			 * @returns {Object} Clusters.
			 */
			get: function() {
				return clusters.loaded;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getCluster
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get clusters of ref or current.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Object} A cluster.
			 */
			getCluster: function(ref) { // from cluster ref
				ref = ref || clusters.current.ref;
				var cluster = clusters.loaded[ref - 1];
				return cluster; // array of model refs
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getClusterModels
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get model ref for cluster.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {Object} Clusters.
			 */
			getClusterModels: function(ref) {
				ref = ref || clusters.current.ref;
				var cluster = clusters.loaded[ref - 1];
				return cluster;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getCentroidRef
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get centroid ref from cluster ref.
			 *
			 * @param {number} [ref] Cluster reference.
			 * @returns {number} Model ref.
			 */
			getCentroidRef: function(ref) {
				ref = ref || clusters.current.ref;
				var centroid = clusters.current.dataset.centroids[ref - 1];
				return centroid;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getModel
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get model from ref or current id no ref supplied. eg. { ref:1 , data:1,2,3 }
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Object} Model.
			 */
			getModel: function(ref) { // from model ref
				var self = this;
				ref = ref || self.getCentroidRef();
				var model;
				for (var i = clusters.current.dataset.models.length - 1; i >= 0; i--) {
					if (clusters.current.dataset.models[i].ref == ref) model = clusters.current.dataset.models[i];
				}
				return model;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Clusters#getModelData
			 * @methodOf modeling.service:Clusters
			 * @kind function
			 *
			 * @description
			 * Get model data from model of ref.
			 *
			 * @param {number} [ref] Model reference.
			 * @returns {Array} Array of vertices.
			 */
			getModelData: function(ref) { // from model ref
				var self = this;
				var model = self.getModel(ref);
				return model.data; // array of model vertices
			}
		};
	}
})();
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Proximities
	 * @description
	 * A matrix of proximities for a set of vertices.
	 *
	 */
	angular
		.module('modeling')
		.factory('Proximities', Proximities);

	function Proximities(VERBOSE, $log) {
		// Matrix - n x m dimensions == particleCount */
		var proximities = {
			dimension: 0,
			positions: [],
			distances: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			positions: [],
			distances: []
		};

		return {

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#set
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Generate a matrix of proximity between points
			 * from vertices = array of point coordinates components
			 * up to minDistance = threshold for proximity
			 * eg. [u1,v1,z1,w1,y1,z1,x1,u2,v2,w2,x2,y2,z2 ... un,vn,wn,xn,yn,zn]
			 * 
			 * To be used by THREE.LineSegments( geometry, material )
			 * where LineSegments is the equivalent to GL_LINES in OpenGL terms.
			 * THREE.LineSegments will draw a series of pairs of segments
			 * ie. (u1,v1,w1) to (x1,y1,z1), (u2,v2,w2) to (x2,y2,z2), etc.
			 * 
			 * Stored in proximities object {positions:[],distances[]}
			 * as vertex components (rather than THREE.Vertex)
			 * for processing as THREE.BufferGeometry attributes:
			 * 'position' as positions; 'color' derived from distances.
			 *
			 * @param {Object} vertices A colleciton of vertices.
			 * @param {Object} [settings] Settings to override defaults.
			 * @returns {string} A collection of proximities.
			 */
			set: function (vertices, settings) {
				var defaults = {
					minDistance: 150,
					maxDistance: 400,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				this.maxDistance = this.getMaxDistance(vertices);

				var vertexpos = 0;
				var distancepos = 0;

				proximities.dimension = vertices.length / 3; // 3 == xyz components of vertices
				var lines = proximities.dimension * proximities.dimension; // matrix of all against all points
				var lineSegments = lines * 2; // pairs of points to make THREE.LineSegments
				
				// Matrix of positions of point pairs (*3 as xyz components)
				var positions = new Float32Array( lineSegments * 3 );
				// Matrix of distances between point pairs
				var distances = new Float32Array( lines );

				var dimensionIndex = proximities.dimension - 1;
				for (var i = dimensionIndex; i >= 0; i--) {

					// Check collision
					for (var j = dimensionIndex; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {
							if (VERBOSE && i === 0 && j === 0) $log.debug("i:"+i+" ("+vertices[i*3]+","+vertices[i*3+1]+","+vertices[i*3+2]+") j:"+j+" ("+vertices[j*3]+","+vertices[j*3+1]+","+vertices[j*3+2]+")");
							// FROM PARTICLE
							positions[ vertexpos++ ] = vertices[ i * 3     ]; // from u
							positions[ vertexpos++ ] = vertices[ i * 3 + 1 ]; // from v
							positions[ vertexpos++ ] = vertices[ i * 3 + 2 ]; // from w
							// TO PARTICLE
							positions[ vertexpos++ ] = vertices[ j * 3     ]; // to x
							positions[ vertexpos++ ] = vertices[ j * 3 + 1 ]; // to y
							positions[ vertexpos++ ] = vertices[ j * 3 + 2 ]; // to z

							// Distance as value (0.00-1.00) between (u,v,w) and (x,y,z)
							// is stored as RGB 0.00-1.00 (equal RGB ie greyscale)
							// for each position, start == end ie. not a gradient.

							// Can be added as 'color' to THREE.BufferGeometry
							// using THREE.BufferAttribute to store the array
							// but would need *6 to give RGB for each position.
							var distance = (1.0 - (dist / this.maxDistance)); // .toFixed(2)
							distances[ distancepos++ ] = distance;

						// }

					}
				}
				proximities.positions = positions;
				proximities.distances = distances;
				return proximities;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#getMaxDistance
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Itterate over a collection of vertices to find the maximum distance between any two.
			 *
			 * @param {Object} vertices A collection of verices.
			 * @returns {number} A distance in the model's scale.
			 */
			getMaxDistance: function(vertices) {
				// Where maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var maxDistCalc = 0;
				// var clusterGeometry = new THREE.BufferGeometry();
				// clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
				// clusterGeometry.computeBoundingSphere();
				var clusterDiameter = 500; //Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				return clusterDiameter;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#get
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Get the proximities (for a given particle/position if supplied).
			 *
			 * @param {number} [particle] Particle.
			 * @returns {Object} A collection of model proximities.
			 */
			get: function(particle) {
				particle = particle || 0; // 0 == return all
				if (particle > 0) {
					current.dimension = particle;
					var dataStart = (particle - 1) * proximities.dimension;
					var dataEnd = particle * proximities.dimension;
					current.positions = proximities.positions.subarray((dataStart * 2 * 3), (dataEnd * 2 * 3));
					current.distances = proximities.distances.subarray(dataStart, dataEnd);
					return current;
				} else {
					return proximities;
				}
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Proximities#getCurrent
			 * @methodOf modeling.service:Proximities
			 * @kind function
			 *
			 * @description
			 * Get the model proximities for the current particle/position.
			 *
			 * @return {Object} The collection of model proximities.
			 */
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name modeling.service:Restraints
	 * @description
	 * Restraints for Modeling.
	 *
	 */
	angular
		.module('modeling')
		.factory('Restraints', Restraints);

	function Restraints() {
		// Matrix - n x m dimensions == particleCount */
		var restraints = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		return {

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#set
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Sort the current model's restaints by type into a collection.
			 *
			 * @param {Object} datasetRestraints Dataset restraints.
			 * @param {number} [datasetDimension] Dataset dimension (i.e. position).
			 * @param {Object} [restraintTypes] Restraint types to override the default types.
			 * @returns {Object} A collection of model restraints.
			 */
			set: function (datasetRestraints, datasetDimension, restraintTypes) {
				if (!datasetRestraints) {
					$log.warn("No restaints supplied");
					return;
				}
				datasetDimension = datasetDimension || 0;
				restraints.dimension = datasetDimension;
				var defaultTypes = {
					harmonics: "H",
					lowerBounds: "L",
					upperBounds: "U",
					neighbours: "C"
				};
				restraintTypes = restraintTypes || {};
				angular.extend(this, angular.copy(defaultTypes), restraintTypes);

				for (var i = 0; i < datasetRestraints.length; i++) {
					if (datasetRestraints[i][2] == this.harmonics) restraints.harmonics.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.lowerBounds) restraints.lowerBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.upperBounds) restraints.upperBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == this.neighbours) restraints.neighbours.push(datasetRestraints[i]);
				}
				return restraints;
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#get
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Get the model's restraints (for a given particle/position if supplied).
			 *
			 * @param {number} [particle] A particle/position number (NOT index ie. >0).
			 * @returns {Object} A collection of model restraints.
			 */
			get: function(particle) {
				particle = particle || 0; // 0 == return all
				if (particle > 0) {
					current.dimension = particle;
					current.harmonics = [];
					current.lowerBounds = [];
					current.upperBounds = [];
					current.neighbours = [];
					angular.forEach(restraints, function(restraint, name) {
						if (name != "dimension") {
							for (var j = restraint.length - 1; j >= 0; j--) {
								// Test first restraint node as FROM
								if (restraint[j][0] == particle) {
									current[name].push(restraint[j]);
								}
								// Test second restraint node as TO
								// If TRUE reorder as FROM
								if (restraint[j][1] == particle) {
									var reorderedRestraint = [];
										reorderedRestraint.push(restraint[j][1]);
										reorderedRestraint.push(restraint[j][0]);
										reorderedRestraint.push(restraint[j][2]);
										reorderedRestraint.push(restraint[j][3]);
									current[name].push(reorderedRestraint);
								}
							}
						}
					});
					return current;
				} else {
					return restraints;
				}
			},

			/**
			 * @ngdoc function
			 * @name modeling.service:Restraints#getCurrent
			 * @methodOf modeling.service:Restraints
			 * @kind function
			 *
			 * @description
			 * Get the model's restraints at current particle/position.
			 *
			 * @return {Object} A collection of model restraints.
			 */
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function () {
	'use strict';
	/**
	 * @ngdoc overview
	 * @name visualization
	 * @module visualization
	 * @description
	 * Visualization Module
	 * Contains scripts for Visualization
	 *
	 * @requires d3js
	 * @example
	 * `angular.module('myApp',['visualization']);`
	 *
	 */
	angular
		.module('visualization', ['d3js']);
}());
(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name visualization.service:Networks
	 * @description
	 * Load app and initialize.
	 *
	 */
	angular
		.module('visualization')
		.factory('Networks', Networks);

	function Networks() {
		return {
			
			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#lineSegmentsRGB
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates an Array of RGB pairs to match Vertex pairs.
			 * eg. [R1,G1,B1,R2,G2,B2,R1,G1,B1,R3,G3,B3,...Rn,Gn,Bn,Rm,Gm,Bm]
			 * such that all color pairs are represented uniquely
			 * ie. one half of matrix where array length = (n^2-n)/2
			 * eg.  1 2 3 4
			 *      1  x x x  ==  1-2 1-3 1-4    3
			 *      2    x x  ==  2-3 2-4      + 2
			 *      3      x  ==  3-4          + 1
			 *      4         ==  ((4*4)-4)*0.5  = 6 pairs of colors
			 * Explanation: Networks can be visualized with THREE.LineSegments
			 * from THREE.BufferGeometry which stores Arrays of Vertex pairs.
			 *
			 * @param {Array} layer An array of features colors eg. restraints
			 * @param {Array} edgeCount An array of color RGB Pairs to match Vertex Pairs
			 *
			 */
			lineSegmentsRGB: function(layer, edgeCount) {
				var self = this;
				var featuresCount = layer.data.length;
				var colorPairs = new Float32Array(edgeCount * 6); // ie. * 2 (vertices) * 3 (RGB)
				for (var i = 0; i < featuresCount; i++) {
					var particle1 = layer.data[i][0];
					var particle2 = layer.data[i][1];
					var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount) * 6;
					var RGB = {"r":0.5,"g":0.5,"b":0.5};
					if (layer.object.id == "restraints"){
						var restraintsColors = {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
						RGB = self.getFeatureRGB(layer.data[i][2], restraintsColors);
					}
					// vertex 1
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b; pairIndex++;
					// vertex 2
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b;
				}
				colorPairs.name = "Network lineSegments RGB";
				return colorPairs;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#getFeatureRGB
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates a RGB color for a given code.
			 *
			 * @param {sting} code A code eg. [H | L | U | C]
			 * @param {Object} colors An Object relating keys to CSS/hex colors
			 * eg. {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
			 *
			 */
			getFeatureRGB: function(code, colors) {
				colors = colors || {"0":"#000000"};
				var RGB;
				angular.forEach(colors, function(color, key) {
					if (code == key) {
						RGB = new THREE.Color(color);
					}
				});
				return RGB;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#lineSegmentsAlpha
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Generates an Array of pairs of values (0.0-1.0) to match Vertex pairs.
			 *
			 * @param {Array} layer An array of features colors eg. restraints
			 * @param {Array} edgeCount An array of color RGB Pairs to match Vertex Pairs
			 * @returns {Array} A Float32 Array of alpha pairs.
			 *
			 */
			lineSegmentsAlpha: function(layer, edgeCount) {
				var self = this;
				var alphaPairs = new Float32Array(edgeCount * 2); // ie. * 2 (vertices)
				var defaultAlpha = 0.0;
				for (var h = alphaPairs.length - 1; h >= 0; h--) {
					alphaPairs[h] = defaultAlpha;
				}
				if (layer.data) {
					var featuresCount = layer.data.length;
					for (var i = 0; i < featuresCount; i++) {
						var particle1 = layer.data[i][0];
						var particle2 = layer.data[i][1];
						var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount);
						var alpha = (layer.data[i][3] * layer.data[i][3]) / 5;
						// if (layer.data[i][2] == ("U"||"C")) alpha = 0.0;
						alphaPairs[pairIndex] = alpha; pairIndex++;
						alphaPairs[pairIndex] = alpha;
					}
				}
				alphaPairs.name = "Network lineSegments Alphas";
				return alphaPairs;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Networks#getMatrixIndex
			 * @methodOf visualization.service:Networks
			 * @kind function
			 *
			 * @description
			 * Derives the Array index for a given position in a Matrix.
			 *
			 * @param {number} row Row number in Matrix
			 * @param {number} col Column number in Matrix
			 * @param {number} size Matrix size == array.length
			 * @returns {number} Index.
			 *
			 */
			getMatrixIndex: function(row, col, size) {
				var index = 0;
				var sigma = row - 1;
				for (var i = 0; i <= sigma; i++){
					index += (size - (size - i));
				}
				index += (col - row) - 1;
				return index;
			}
		};
	}
})();
 (function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name visualization.service:PathControls
	 * @description
	 * Generate controls for 3D paths from set of vertices.
	 *
	 */
	angular
		.module('visualization')
		.factory('PathControls', PathControls);

	function PathControls() {
		return {
			
			/**
			 * @ngdocs function
			 * @name visualization.service:PathControls#simple
			 * @methodOf visualization.service:PathControls
			 * @kind function
			 *
			 * @description
			 * Generate simple path controls from supplied vertices.
			 *
			 * @param {Array} vertices An array of vetices.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			simple: function(vertices, closed) {
				closed = closed || false;

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = [];
				for (var i = 0 ; i < totalParticles - 1 ; i++) {
					var baseParticle = vertices[i];
					var foreParticle = vertices[i + 1];
					var midCoord = new THREE.Vector3(0,0,0);
					midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midCoord).sub(baseParticle);
					if (i === 0 && !closed) { // insert backprojected first coord
						var preCoord;
						// if (closed) {
						// 	preCoord = vertices[totalParticles - 1];
						// } else {
							preCoord = new THREE.Vector3(0,0,0);
						// }
						preCoord.copy(baseParticle).sub(midOffset);
						pathControls.push(preCoord);
					}
					//pathControls.push(baseParticle);
					pathControls.push(midCoord);
					// if (i == totalParticles - 2) {
					// //	pathControls.push(foreParticle);
					// 	var chromEnd = new THREE.Vector3(0,0,0);
					// 	chromEnd.copy(foreParticle).add(midOffset);
					// 	pathControls.push(chromEnd);
					// };
					if (i == totalParticles - 2 && !closed) {
					//	pathControls.push(foreParticle);
						var chromEnd;
						// if (closed) {
						// 	chromEnd = vertices[0];
						// } else {
							chromEnd = new THREE.Vector3(0,0,0);
						// }
						chromEnd.copy(foreParticle).add(midOffset);
						pathControls.push(chromEnd);
					}
				}
				return pathControls;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:PathControls#cubic
			 * @methodOf visualization.service:PathControls
			 * @kind function
			 *
			 * @description
			 * Generate cubic path controls from supplied vertices.
			 *
			 * @param {Array} vertices An array of vetices.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			cubic: function(vertices, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var controlLength = 1; // variable for possible corner tweaking

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = {};
				pathControls.vertices = [];
				pathControls.colors = [];
				var previousOffset = new THREE.Vector3(0,0,0);

				// if (closed) {
				// 	var firstParticle = vertices[0];
				// 	var nthParticle = vertices[totalParticles - 1];
				// 	var closedControl = new THREE.Vector3(0,0,0);
				// 	if (closed) closedControl.addVectors(nthParticle, firstParticle).divideScalar(2);
				// }

				for (var i = 0 ; i < totalParticles ; i++) {

					var baseParticle = vertices[i];
					var foreParticle = new THREE.Vector3(0,0,0);
					if (i == totalParticles - 1) {
						if (closed) {
							// fore particle == first particle
							foreParticle = vertices[0];
						} else {
							// fore particle == extend same dist as to previous particle
							foreParticle.copy(baseParticle).addVectors(baseParticle, vertices[i - 1]);
						}
					} else {
						foreParticle = vertices[i + 1];
					}
					
					var midControl = new THREE.Vector3(0,0,0);
					// if (i == totalParticles - 1) {
					// 	if (closed) {
					// 		// use first particle mid point as closed chromatin...
					// 		midControl.copy(closedControl);
					// 	} else {
					// 		// use previous particle mid point as no more foreward...
					// 		midControl.addVectors(baseParticle, vertices[i - 1]).divideScalar(2);
					// 	}
					// } else {
						midControl.addVectors(baseParticle, foreParticle).divideScalar(2);
					// }
					
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midControl).sub(baseParticle);

					if (i === 0) {
						if (closed) {
							// set previous for first particle
							var previousControl =  new THREE.Vector3(0,0,0);
							previousControl.addVectors(vertices[totalParticles - 1], vertices[0]).divideScalar(2);
							previousOffset.copy(previousControl).sub(vertices[totalParticles - 1]);
						} else {
							previousOffset.copy(midOffset);
						}
					}

					var backControl = new THREE.Vector3(0,0,0);
					backControl.copy(baseParticle).sub(midOffset);

					var foreControl = new THREE.Vector3(0,0,0);
					foreControl.copy(baseParticle).add(previousOffset);

					// Node tangent
					var baseTangent =  new THREE.Vector3(0,0,0);
					baseTangent.subVectors(foreControl, backControl).divideScalar(controlLength);
					backControl.copy(baseParticle).sub(baseTangent);
					foreControl.copy(baseParticle).add(baseTangent);

					// Add controls to array
					pathControls.vertices.push(backControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));
					pathControls.vertices.push(baseParticle);
						pathControls.colors.push(new THREE.Color(0x000000));
					pathControls.vertices.push(foreControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));

					previousOffset = midOffset;
				}
				// add start and end controls
				// requires calc of join midway on cubicBezier between start and end
				var startBackControl = new THREE.Vector3(0,0,0);
				var startPoint = new THREE.Vector3(0,0,0);
				var endForeControl = new THREE.Vector3(0,0,0);
				var endPoint = new THREE.Vector3(0,0,0);

				var totalControls = pathControls.vertices.length;
				var p1 = pathControls.vertices[totalControls-2]; // last particle
				var p2 = pathControls.vertices[totalControls-1]; // last fore control
				var p3 = pathControls.vertices[0]; // first back control
				var p4 = pathControls.vertices[1]; // first particle
				if (closed) {
					// curve between start and end Controls
					var joinCurve = new THREE.CubicBezierCurve3(p1,p2,p3,p4);
					// split join curve in two
					var joinMidpoint = joinCurve.getPointAt(0.5);
					var joinTangent = joinCurve.getTangent(0.5).multiplyScalar(1);

					// NEEDS ROUNDING OFF TO NEAREST 0.5??? Math.round(num*2)/2;
					startBackControl.copy(joinMidpoint).sub(joinTangent);
					startPoint.copy(joinMidpoint);
					endForeControl.copy(joinMidpoint).add(joinTangent);
					endPoint.copy(joinMidpoint);
				} else {
					startBackControl.copy(p3);
					startPoint.copy(p3);
					endForeControl.copy(p2);
					endPoint.copy(p2);
				}
				pathControls.vertices.unshift(startBackControl);
					pathControls.colors.unshift(new THREE.Color(0xffff00));
				pathControls.vertices.unshift(startPoint);
					pathControls.colors.unshift(new THREE.Color(0xff0000));
				pathControls.vertices.push(endForeControl);
					pathControls.colors.push(new THREE.Color(0x00ffff));
				pathControls.vertices.push(endPoint);
					pathControls.colors.push(new THREE.Color(0x0000ff));

				return pathControls;
			}
		};
	}

})();
 (function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name visualization.service:Paths
	 * @description
	 * Generate 3D paths from set of control vertices.
	 *
	 */
	angular
		.module('visualization')
		.factory('Paths', Paths);

	function Paths() {
		return {
			
			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#splineNearFit
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a spline path from supplied control vertices.
			 * This is a near fit ie. it does NOT pass through the controls.
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			splineNearFit: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var splinePath;
				if (closed) {
					splinePath = new THREE.ClosedSplineCurve3(controls);
				} else {
					splinePath = new THREE.SplineCurve3(controls);			
				}
				// var splineDivisions = splinePath.getSpacedPoints(segments);
				return splinePath;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#spline
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a spline path from supplied control vertices.
			 * Constructed from curve segments passing through particle centers
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			spline: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var curvePath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (closed) {
					// REVISE THIS
					curvePath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var splineCurve = new THREE.SplineCurve3([p1,p23,p4]);
						curvePath.add(splineCurve);
					}
				}
				return curvePath;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#quadraticBezier
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a Bezier curve path from supplied control vertices.
			 * Constructed from curve segments passing through particle centers
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			quadraticBezier: function(controls, segments, closed) {
				closed = closed || false; // closed path
				var quadPath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (closed) {
					// REVISE THIS
					quadPath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var quadCurve = new THREE.QuadraticBezierCurve3(p1,p23,p4);
						quadPath.add(quadCurve);
					}
				}
				return quadPath;
			},			

			/**
			 * @ngdocs function
			 * @name visualization.service:Paths#cubicBezier
			 * @methodOf visualization.service:Paths
			 * @kind function
			 *
			 * @description
			 * Generate a cubic Bezier path from supplied control vertices
			 *  passing through control centers.
			 *
			 * ```controls[0] == start point
			 * controls[1] == start point fore control
			 * controls[2] == first particle back control
			 * controls[3] == first particle
			 * ...
			 * n == totalControls - 1
			 * controls[n-3] == last particle
			 * controls[n-2] == last particle fore control
			 * controls[n-1] == end point back control
			 * controls[n] == end point (if closed, end point == start point)```
			 * 
			 * @param {Array} vertices An array of vetices.
			 * @param {number} [segments] Number of segments.
			 * @param {boolean} [closed] Closed path.
			 * @returns {Array} Paths controls as an array of vertices.
			 *
			 */
			cubicBezier: function(controls, segments, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var cubicPath = new THREE.CurvePath();
				var totalControls = controls.length;
				var cubicCurveStart, cubicCurveEnd;

					for (var i = 0 ; i < totalControls - 1 ; i = i + 3) {

						var c1 = controls[i];
						var c2 = controls[i+1];
						var c3 = controls[i+2];
						var c4 = controls[i+3];

						var cubicCurve = new THREE.CubicBezierCurve3(c1,c2,c3,c4);
						 cubicPath.add(cubicCurve);
					}
				return cubicPath;
			}
		};
	}

})();
(function() {
	'use strict';
	angular
		.module('visualization')
		.factory('Segments', Segments);

	/**
	 * @ngdoc service
	 * @name visualization.service:Segments
	 * @description
	 * Methods for generating Arrays of colors.
	 *
	 * @requires VERBOSE
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires generic.Color
	 *
	 */
	function Segments(VERBOSE, $log, Color) {
		return {

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#gradientHCL
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors ranging between 2 colors.
			 * Using D3 HCL for correct perceptual model
			 * Data is an array of 2 hex colors eg. ff0000
			 * Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
			 * Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			gradientHCL: function(layer, count) {
				var gradient = [];
				var hexStart = layer.palette[0];
				var hexEnd = layer.palette[1];

				for (var i = count - 1; i >= 0; i--) {
					var step = i / count; // This should be between 0 and 1
					var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
					gradient.push(hex);
				}
				return gradient;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#gradientComponentRGB
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description UNUSED - 
			 * where layer.palette is an array of 2 hex colors eg. ["#ff0000","#0000ff"]
			 * output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			gradientComponentRGB: function(layer, count) {
				var gradient = [];
				// convert "#" to "0x" for following manipulation
				var hexStart = "0x" + layer.palette[0].substring(1);
				var hexEnd = "0x" + layer.palette[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;
					// convert hexStart to RGB components (0.0-255.0)
					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;
					// convert hexEnd to RGB components (0.0-255.0)
					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;
				// generate gradient as array of RGB component triplets
				for (var i = count - 1; i >= 0; i--) {
					step = i / count; // This should be between 0 and 1
					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);
					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#bicolor
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors ranging between 2 colors.
			 * if palette is not an array of hex colors then:
			 * colors derived from BigWig color and altColor
			 * featureTypes == single hex for use as color 
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			bicolor: function(layer, count) {
				var featureColor = layer.palette[0];
				var defaultColor = layer.palette[1];
				var colors = [];
				for(var i = 0; i < count; i++){
						var color;
						if (layer.data[i] === 1) {
							color = featureColor;
						} else {
							color = defaultColor;
						}
					colors.push(color);
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#matrix
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * Generate an array of colors from a matrix of values.
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			matrix: function(layer, count) {
				// where palette is array of hex colors
				var featureColor = layer.palette[0];
				var defaultColor = layer.palette[1];
				var colors = [];
				for (var i = layer.data.length - 1; i >= 0; i--) {
					var read = layer.data[i];
					var intensity = 1 - (read * read);
					var hex = d3.interpolateHsl(featureColor, defaultColor)(intensity);
					for(var j = 0; j < count; j++){
						colors.push(hex);
					}
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#bicolorVariable
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} segmentStart Start of segment.
			 * @param {number} segmentsCount Number of segments.
			 * @param {number} segmentLength Length of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			bicolorVariable: function(layer, segmentStart, segmentsCount, segmentLength) {
				var featureColor = layer.palette[0];
				var defaultColor = layer.palette[1];

				var features = layer.data;
				var colors = [];
				for(var i=0; i < segmentsCount; i++){
					var segmentColor = defaultColor;
					var segmentLower = segmentStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;

						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (features[j].read === 1) {
								segmentColor = featureColor;
							} else {
								segmentColor = defaultColor;
							}
						}
					}
					colors.push(segmentColor);
				}
				return colors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#featureGraph
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} count Number of segments.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			featureGraph: function(layer, count) {
				// where palette is array of hex colors
				var featureColor = "#ff0000";
				var defaultColor = "#000000";
				var segmentedColors = this.gradientHCL(layer, count);
				var layerColors = Color.THREEColorsFromHex(segmentedColors);
				var vertexColors = Color.vertexColorsFromTHREEColors(layerColors);
				return vertexColors;
			},

			/**
			 * @ngdocs function
			 * @name visualization.service:Segments#features
			 * @methodOf visualization.service:Segments
			 * @kind function
			 *
			 * @description
			 * 
			 * @param {Object} layer A collection of data.
			 * @param {number} segmentStart Start of segment.
			 * @param {number} segmentsCount Number of segments.
			 * @param {number} segmentLength Length of segments.
			 * @param {Object} featureTypes Types of features.
			 * @returns {Array} An array of CSS hex colors.
			 *
			 */
			features: function(layer, segmentStart, segmentsCount, segmentLength, featureTypes) {
				var features = layer.data;
				var colors = [];

				for(var i=0; i < segmentsCount; i++){

					var featuresPresent = []; 
					var segmentLower = segmentStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;
					var hex = "cccccc"; // Base color - ie if none found
					var color = "#" + hex; //parseInt(hex,16);

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;
						var inSegments = [];
						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (VERBOSE) $log.debug("Feature " + features[j].external_name + "("+j+") in fragment " + i );
							inSegments.push(i);
							var featureTypeKey = "biotype";
							var dominantFeatureType = "protein_coding";
							if (featuresPresent.length > 0) {
								// Simple weight - give preference to smaller segments
								if ( featuresPresent[0] == dominantFeatureType ) {
									// if already contains protein_coding, replace with...
									featuresPresent[0] = features[j][featureTypeKey].toLowerCase();
								} else {
									featuresPresent.push(features[j][featureTypeKey].toLowerCase());
								}
							} else {
								featuresPresent.push(features[j][featureTypeKey].toLowerCase());							
							}
						} else {
							if (VERBOSE && i === 3) $log.debug("No features in fragment " + i );
							if (VERBOSE && j === 0) $log.debug( JSON.stringify(segmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(segmentUpper)+", "+JSON.stringify(end) );
						}
						features[j].inSegments = inSegments;
					}
					for(var k=0; k<featuresPresent.length; k++){
						var feature = featuresPresent[0];
						if (feature in featureTypes) {
							hex = featureTypes[feature].match(/[a-f0-9]{6}/gi);
							color = "#" + hex; //parseInt(hex,16);
						} else {
							hex = "110100";
							color = "#" + hex; //parseInt(hex,16);
						}
					}
					colors.push(color);
				}
				return colors;
			}
		};
	}
})();