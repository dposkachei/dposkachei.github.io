!function(){var s=document.querySelector(".nav-toggle"),i=document.querySelector(".nav-menu");s.addEventListener("click",function(){s.classList.toggle("is-active"),i.classList.toggle("is-active")})}(),$(document).ready(function(){$(".dropdown-link li:first-child").click(function(s){$(".dropdown-link").removeClass("is-tap-active"),$(this).parent().addClass("is-tap-active")}),$(".drop-link").click(function(s){$(this).hasClass("is-active")?($(this).parent().children(".drop-menu").css("display","none"),$(this).removeClass("is-active")):($(".drop-link").removeClass("is-active"),$(".drop-menu").css("display","none"),$(this).parent().children(".drop-menu").css("display","block"),$(this).addClass("is-active"))}),$(".is-icon a").click(function(s){var i=$(this);i.addClass("is-loading"),setTimeout(function(){i.removeClass("is-loading"),$("#notification-trigger").trigger("click")},3e3)}),$(".select select").change(function(s){var i=$(this).parent();i.addClass("is-loading"),setTimeout(function(){i.removeClass("is-loading"),$("#notification-trigger").trigger("click")},2e3)}),$(".level-item a").click(function(s){$(this).hasClass("is-active")||($(".level-item a").removeClass("is-active"),$(this).addClass("is-active"))}),$("#notification-trigger").click(function(s){$(this).addClass("active");var i=$(this).attr("data-notification");$(".notifications").css("display","block"),$(i).css("display","block")}),$(".notifications").on("click",".ns-close",function(s){$(this).parent().css("display","none")}),$(".trigger").click(function(s){var i=$(this).attr("data-dialog");$(i).addClass("dialog--open")}),$(".dialog__overlay").click(function(s){$(this).parent().removeClass("dialog--open")}),$(".dialog__close").click(function(s){var i=$(this).attr("data-dialog");$(i).removeClass("dialog--open")}),$(".tabs-menu li a").click(function(s){if(!$(this).parent().hasClass("is-active")){$(".tabs-menu li").removeClass("is-active"),$(this).parent().addClass("is-active");var i=$(this).parent().attr("data-section");$(".tabs-content").removeClass("is-active"),$(i).addClass("is-active")}}),$(".nav--desta button").click(function(s){if(!$(this).hasClass("nav__item--current")){$(".nav--desta button").removeClass("nav__item--current"),$(this).addClass("nav__item--current");var i=$(this).attr("article-id");$(".mockup-article").removeClass("article--current"),$(i).addClass("article--current");var i=$(this).attr("article-class");$(".mockup-slider").removeClass("mockup-slider--current"),$(i).addClass("mockup-slider--current")}}),$(".switch-gallery").click(function(s){$(".gallery-colums .is-3").each(function(s,i){$(this).addClass("is-2"),$(this).removeClass("is-3")})}),$(".carousel-main-tabs").flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!0}),$(".tabs-menu-carousel").on("click","li",function(){$(".tabs-menu-carousel li").removeClass("is-active"),$(this).addClass("is-active");var s=$(this).index();$(".carousel-main-tabs").flickity("select",s)}),$(".carousel-main").flickity({imagesLoaded:!0,percentPosition:!1,wrapAround:!0}),$(".columns-items .column").click(function(){$(this).hasClass("is-6")?($(this).removeClass("is-offset-6"),$(this).removeClass("is-6")):($(".columns-items .column").removeClass("is-offset-6"),$(".columns-items .column").removeClass("is-6"),$(this).addClass("is-6"),$(this).addClass("is-offset-6"))})});