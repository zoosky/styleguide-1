/**
 * Toolkit JavaScript
 */

'use strict';

// todo refactor!
var positionLeft = $('.nav-item.megamenu').offset().left;
var marginMegamenu = ($(document).width() - 1540)/2;
var diff = -(positionLeft - marginMegamenu);
$('.nav-item.megamenu .dropdown-menu').css('left',diff);
