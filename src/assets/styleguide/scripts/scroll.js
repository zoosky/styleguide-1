/**
 * Toolkit JavaScript
 */

'use strict';

$( document ).ready(function() {

	/*
	 * STICKIES:
	 * .sticked--top = fixed dom-top
	 * .sticked--width = fixed dom width
	 *
	 */
	$('.sticked--top').each(function(){
		var original = {
			height: $(this).outerHeight(true),
			width: $(this).outerWidth(true)
		};
		$(this).after('<div class="sticked--container" style="height: '+original.height+'px"></div>');
		$(this).addClass('sticked-item');
		$(this).css('top',$(this).offset().top);

		if ($(this).hasClass('sticked--width')){
			$(this).css('width',original.width);
		}
	});

});

