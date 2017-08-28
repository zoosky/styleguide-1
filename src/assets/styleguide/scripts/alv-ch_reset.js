/**
 * Toolkit JavaScript
 */

'use strict';

// Reset CD Bund
$( document ).ready(function() {

	console.log('ready');
	var alvHeader = '<div class="alv-header alv-header--inverse bg-inverse">'+
		'<span class="alv-header__brand mb-0">'+
		'<img src="https://cdn.rawgit.com/alv-ch/styleguide/6306dee9/build/images/swiss.svg" width="20" height="20" class="d-inline-block" alt="Swiss Confederation">'+
		'Arbeitslosenversicherung ALV'+
		'</span>'+
		'</div>';

	var header = $('header').detach();


	$('.container.container-main').before(alvHeader);
	$('.container.container-main').before(header);
});
