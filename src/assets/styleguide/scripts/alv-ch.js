/**
 * Toolkit JavaScript
 */

'use strict';

// todo refactor!
var positionLeft = $('.nav-item.megamenu').offset().left;
var marginMegamenu = ($(document).width() - 1540)/2;
var diff = -(positionLeft - marginMegamenu);
$('.nav-item.megamenu .dropdown-menu').css('left',diff);

// Reset CD Bund
$( document ).ready(function() {
	var alvHeader = '<div class="alv-header alv-header--inverse bg-inverse">'+
		'<span class="alv-header__brand mb-0">'+
		'<img src="https://cdn.rawgit.com/alv-ch/styleguide/6306dee9/build/images/swiss.svg" width="20" height="20" class="d-inline-block" alt="Swiss Confederation">'+
		'Arbeitslosenversicherung ALV'+
		'</span>'+
		'</div>';

	var header = $('header').detach();


	$('.container.container-main').before($(alvHeader));
	$('.container.container-main').before(header);
});
