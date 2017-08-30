/**
 * Toolkit JavaScript
 */

'use strict';

// todo refactor!

var positionLeft = $('.nav-item.megamenu').offset().left;
var marginMegamenu = ($(document).width() - 1540)/2;
var diff = -(positionLeft - marginMegamenu);
$('.nav-item.megamenu .dropdown-menu').css('left',diff);


$( document ).ready(function() {

	var md = new MobileDetect(window.navigator.userAgent);

	if (md.mobile()){
		console.log('mobile true');

		$('.toolbar-nav > .nav-title').click(function(){
			$(this).parent().toggleClass('show');
		});

		$('.toolbar-nav > .nav-item').click(function(){
			$(this).parent().removeClass('show');
		});
	}

});

