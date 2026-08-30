/*  ---------------------------------------------------
  Template Name: Gym (adapted for ORK Fitness)
  Description: Gym Fitness HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        if ($('.gallery').length) {
            $('.gallery').masonry({
                itemSelector: '.gs-item',
                columnWidth: '.grid-sizer',
                gutter: 10
            });
        }
    });

    /*------------------
        Background Set (prefer WebP when available)
    --------------------*/
    var supportsWebp = false;
    try {
        supportsWebp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch (e) {
        supportsWebp = false;
    }

    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        if (supportsWebp && typeof bg === 'string' && /\.jpe?g$/i.test(bg)) {
            var webp = bg.replace(/\.jpe?g$/i, '.webp');
            // Use WebP when a sibling .webp asset exists (hero/gallery images)
            if (/ork-fitness/i.test(bg)) {
                bg = webp;
            }
        }
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Canvas Menu
    $(".canvas-open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".canvas-close, .offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Close mobile menu when navigating to in-page sections
    $(document).on('click', '.offcanvas-menu-wrapper a[href^="#"], .slicknav_nav a[href^="#"]', function () {
        $(".offcanvas-menu-wrapper").removeClass("show-offcanvas-menu-wrapper");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    // Active nav highlight on scroll
    var sectionIds = ['#home', '#about', '#why-us', '#gallery', '#reviews', '#enquire', '#contact'];
    $(window).on('scroll', function () {
        var scrollPos = $(document).scrollTop() + 120;
        sectionIds.forEach(function (id) {
            var $sec = $(id);
            if (!$sec.length) {
                return;
            }
            var top = $sec.offset().top;
            var bottom = top + $sec.outerHeight();
            if (scrollPos >= top && scrollPos < bottom) {
                $('.nav-menu ul li').removeClass('active');
                $('.nav-menu ul li a[href="' + id + '"]').parent().addClass('active');
            }
        });
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

})(jQuery);
