!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";$(document).ready(function(){$(".dropdown.yamm-fw").each(function(){var t=$(".container-main > .container").outerWidth(),e=$(this).offset().left,n=($(document).width()-t)/2,o=-(e-n);$(this).children(".dropdown-menu").css("left",o)});var t=new MobileDetect(window.navigator.userAgent);if(t.mobile()){if($(".toolbar-nav > .nav-title").click(function(){$(this).parent().toggleClass("show")}),$(".toolbar-nav > .nav-item").click(function(){$(this).parent().removeClass("show")}),!$(".subnavbar__toggler").length){var e="UNTERNAVIGATION";$(".breadcrumb-item.active").text()&&(e=$(".breadcrumb-item.active").text()),$(".subnavbar").prepend('<div class="subnavbar__toggler">'+e+"</div>")}$(".subnavbar").click(function(){$(this).toggleClass("show")}),$(".subnavbar-nav > .nav-item").click(function(){$(this).parent().removeClass("show")})}else $(".sticked--top").each(function(){$(this).css("top",$(this).offset().top)}),$(".sticked--top__parent").each(function(){$(this).css("top",$(this).parent().offset().top)})})}]);