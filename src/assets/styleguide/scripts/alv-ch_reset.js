/**
 * Toolkit JavaScript
 */

'use strict';

// Reset CD Bund
$( document ).ready(function() {

	var alvHeader = '<div class="alv-header alv-header--inverse bg-inverse">'+
		'<span class="alv-header__brand mb-0">'+
		'<img src="https://cdn.rawgit.com/alv-ch/styleguide/6306dee9/build/images/swiss.svg" width="20" height="20" class="d-inline-block" alt="Swiss Confederation">'+
		'&nbsp;Arbeitslosenversicherung ALV'+
		'</span>'+
		'</div>';

	var header = 	'<div class="header sticky-top">' +
		'<div class="navbar navbar-alv navbar-light bg-faded">' +
		'<div class="container"></div>' +
		'</div>' +
		'</div>';

	// lang-switcher
	$('.nav-lang').addClass('nav-item');
	$('.nav-lang > ul').addClass('navbar-nav').addClass('navbar--language-switcher');
	$('.nav-lang > ul > li').addClass('nav-item');
	$('.nav-lang > ul > li > a').addClass('nav-link');

	// main nav
	$('.nav-main > .navbar-nav > li').addClass('nav-item');
	$('.nav-main > .navbar-nav > li > a').addClass('nav-link');
	$('.nav-main').removeClass('navbar');
	var navi = $('.mod-mainnavigation').detach();

	$('.container-main').removeClass('container');
	$('.container-fluid').addClass('container');

	$('header').wrap(header);
	if (!$('.alv-header').length){
		$('.header').prepend(alvHeader);
	}

	$('.mod-searchfield').after(navi);

});
