/**
 * Toolkit JavaScript
 */

'use strict';

$( document ).ready(function() {

	/*
	 * MEGAMENU
	 */
	$('.dropdown.yamm-fw').each(function(){
		var containerWidth = $('.container-main > .container').outerWidth();
		var positionLeft = $(this).offset().left;
		var marginMegamenu = ($(document).width() - containerWidth) / 2;
		var diff = -(positionLeft - marginMegamenu);
		$(this).children('.dropdown-menu').css('left', diff);
	});

	var md = new MobileDetect(window.navigator.userAgent);

	/*
	 * FIXED-TOP
	 */
	$('.header.fixed-top').each(function(){
		var mt = $(this).outerHeight(true);
		if ($(this).hasClass('has-toolbar') && !md.mobile()){
			$('.header.fixed-top ~ .toolbar').css('top',mt);
			mt = mt + $('.header.fixed-top ~ .toolbar').outerHeight(true);
		}
		$('body').css('margin-top',mt);
	});

	if (md.mobile()){
		// toggler toolbars
		$('.toolbar-nav > .nav-title').click(function(){
			$(this).parent().toggleClass('show');
		});

		$('.toolbar-nav > .nav-item').click(function(){
			$(this).parent().removeClass('show');
		});

		// toggler subnavigation
		if (!$('.subnavbar__toggler').length) {
			// todo define
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
		 * .sticked--top = fixed dom top
		 * .sticked--top__parent = fixed parent-dom top
		 *
		 */
		$('.sticked--top').each(function(){
			$(this).css('top',$(this).offset().top);
		});

		$('.sticked--top__parent').each(function(){
			$(this).css('top',$(this).parent().offset().top);
		});
	}

});

