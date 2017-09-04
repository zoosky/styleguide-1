/**
 * Toolkit JavaScript
 */

'use strict';

$( document ).ready(function() {

	// MEGAMENU
	// todo refactor!
	var positionLeft = $('.nav-item.megamenu').offset().left;
	var marginMegamenu = ($(document).width() - 1540)/2;
	var diff = -(positionLeft - marginMegamenu);
	$('.nav-item.megamenu .dropdown-menu').css('left',diff);

	var md = new MobileDetect(window.navigator.userAgent);

	if (md.mobile()){
		// toggler toolbars
		$('.toolbar-nav > .nav-title').click(function(){
			$(this).parent().toggleClass('show');
		});

		$('.toolbar-nav > .nav-item').click(function(){
			$(this).parent().removeClass('show');
		});

		// toggler subnavigation
		//$('.subnavbar').attr('data-title',$('.breadcrumb-item.active').text());
		if (!$('.subnavbar__toggler').length) {
			var subnavTitle = 'UNTERNAVIGATION';
			if ($('.breadcrumb-item.active').text()){
				subnavTitle=$('.breadcrumb-item.active').text();
			}
			$('.subnavbar').prepend('<div class="subnavbar__toggler">' + subnavTitle + '</div>');
		}

		$('.subnavbar').click(function(){
			$(this).toggleClass('show');
		});

		$('.subnavbar-nav > .nav-item').click(function(){
			$(this).parent().removeClass('show');
		});
	}
	else {
		/*
		 * STICKIES:
		 * .sticked--top = fixed dom-top
		 * .sticked--bottom = fixed dom-bottom
		 */
		$('.sticked--top').each(function(){
			$(this).after('<div class="sticked--container" style="height: '+$(this).outerHeight(true)+'px"></div>');
			$(this).addClass('sticked-item');
			$(this).css('top',$(this).offset().top);
		});
	}

});

