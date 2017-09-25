/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	/**
	 * Toolkit JavaScript
	 */

	'use strict';

	$(document).ready(function () {

		/*
	  * MEGAMENU
	  */
		// todo refactor!
		if ($('.megamenu').length) {
			var containerWidth = $('body > .container').outerWidth();
			var positionLeft = $('.nav-item.megamenu').offset().left;
			var marginMegamenu = ($(document).width() - containerWidth) / 2;
			var diff = -(positionLeft - marginMegamenu);
			$('.nav-item.megamenu .dropdown-menu').css('left', diff);
		}

		/*
	  * RANGE SLIDER
	  */
		var rangeSlider = function rangeSlider() {
			var slider = $('.range-slider'),
			    range = $('.range-slider__range'),
			    value = $('.range-slider__value');

			slider.each(function () {

				value.each(function () {
					var value = $(this).prev().attr('value');
					$(this).html(value);
				});

				range.on('input', function () {
					$(this).next(value).html(this.value);
				});
			});
		};

		rangeSlider();

		var md = new MobileDetect(window.navigator.userAgent);

		if (md.mobile()) {
			// toggler toolbars
			$('.toolbar-nav > .nav-title').click(function () {
				$(this).parent().toggleClass('show');
			});

			$('.toolbar-nav > .nav-item').click(function () {
				$(this).parent().removeClass('show');
			});

			// toggler subnavigation
			if (!$('.subnavbar__toggler').length) {
				// todo define
				var subnavTitle = 'UNTERNAVIGATION';
				if ($('.breadcrumb-item.active').text()) {
					subnavTitle = $('.breadcrumb-item.active').text();
				}
				$('.subnavbar').prepend('<div class="subnavbar__toggler">' + subnavTitle + '</div>');
			}

			$('.subnavbar').click(function () {
				$(this).toggleClass('show');
			});

			$('.subnavbar-nav > .nav-item').click(function () {
				$(this).parent().removeClass('show');
			});
		} else {
			/*
	   * STICKIES:
	   * .sticked--top = fixed dom top
	   * .sticked--top__parent = fixed parent-dom top
	   *
	   */
			$('.sticked--top').each(function () {
				$(this).css('top', $(this).offset().top);
			});

			$('.sticked--top__parent').each(function () {
				$(this).css('top', $(this).parent().offset().top);
			});
		}
	});

/***/ })
/******/ ]);