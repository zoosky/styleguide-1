!function(t){function e(a){if(o[a])return o[a].exports;var i=o[a]={exports:{},id:a,loaded:!1};return t[a].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e){"use strict";$(document).ready(function(){$(".dropdown.yamm-fw").each(function(){var t=$(".container-main > .container").outerWidth(),e=$(this).offset().left,o=($(document).width()-t)/2,a=-(e-o);$(this).children(".dropdown-menu").css("left",a)});var t=new MobileDetect(window.navigator.userAgent);if($(".header.fixed-top").each(function(){var e=$(this).outerHeight(!0);$(this).hasClass("has-toolbar")&&!t.mobile()&&($(".header.fixed-top ~ .toolbar").css("top",e),e+=$(".header.fixed-top ~ .toolbar").outerHeight(!0)),$("body").css("margin-top",e)}),t.mobile()){if($(".toolbar-nav > .nav-title").click(function(){$(this).parent().toggleClass("show")}),$(".toolbar-nav > .nav-item").click(function(){$(this).parent().removeClass("show")}),!$(".subnavbar__toggler").length){var e="UNTERNAVIGATION";$(".breadcrumb-item.active").text()&&(e=$(".breadcrumb-item.active").text()),$(".subnavbar").prepend('<div class="subnavbar__toggler">'+e+"</div>")}$(".subnavbar").click(function(){$(this).toggleClass("show")}),$(".subnavbar-nav > .nav-item").click(function(){$(this).parent().removeClass("show")})}else $(".sticked--top").each(function(){$(this).css("top",$(this).offset().top)}),$(".sticked--top__parent").each(function(){$(this).css("top",$(this).parent().offset().top)})})}]);