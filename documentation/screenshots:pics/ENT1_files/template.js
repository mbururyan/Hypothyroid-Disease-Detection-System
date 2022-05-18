(function ($) {
    "use strict";

    window.iwOpenWindow = function (url) {
        window.open(url, 'sharer', 'toolbar=0,status=0,left=' + ((screen.width / 2) - 300) + ',top=' + ((screen.height / 2) - 200) + ',width=650,height=380');
        return false;
    };

    /** theme prepare data */

    function theme_init() {
        /*
         ** Click icon search in header
         */
        $('.iw-search-cart .search-form').on('click', function(e){
            $('.header').toggleClass('active-search-form');
            $(this).closest('.search-box-header').find('.top-search').focus();
            return false;
        });

        /**
         *  Effect revolution slider when hover icon in slider-1
         */

        $('.shape-icon-1, .link-icon-1-hover, .shape-attribute-title-1').on('hover', function(){
            $('.link-icon-1').toggleClass('icon-1-hover');
            $('.link-icon-1-hover').toggleClass('icon-1-hover-display');
            $('.shape-icon-1').toggleClass('active');
            $('.shape-attribute-title-1').toggleClass('attr-title')
        });

        $('.shape-icon-2, .link-icon-2-hover, .shape-attribute-title-2').on('hover', function(){
            $('.link-icon-2').toggleClass('icon-2-hover');
            $('.link-icon-2-hover').toggleClass('icon-2-hover-display');
            $('.shape-icon-2').toggleClass('active');
            $('.shape-attribute-title-2').toggleClass('attr-title')
        });
        $('.shape-icon-3, .link-icon-3-hover, .shape-attribute-title-3').on('hover', function(){
            $('.link-icon-3').toggleClass('icon-3-hover');
            $('.link-icon-3-hover').toggleClass('icon-3-hover-display');
            $('.shape-icon-3').toggleClass('active');
            $('.shape-attribute-title-3').toggleClass('attr-title')
        });
        $('.shape-icon-4, .link-icon-4-hover, .shape-attribute-title-4').on('hover', function(){
            $('.link-icon-4').toggleClass('icon-4-hover');
            $('.link-icon-4-hover').toggleClass('icon-4-hover-display');
            $('.shape-icon-4').toggleClass('active');
            $('.shape-attribute-title-4').toggleClass('attr-title')
        });

        $('.shape-icon-5, .link-icon-5-hover, .shape-attribute-title-5').on('hover', function(){
            $('.link-icon-5').toggleClass('icon-5-hover');
            $('.link-icon-5-hover').toggleClass('icon-5-hover-display');
            $('.shape-icon-5').toggleClass('active');
            $('.shape-attribute-title-5').toggleClass('attr-title')
        })

    }
	
	function woocommerce_init() {
		window.increaseQty = function (el, count) {
            var $el = $(el).parent().find('.qty');
            $el.val(parseInt($el.val()) + count);
        };
        window.decreaseQty = function (el, count) {
            var $el = $(el).parent().find('.qty');
            var qtya = parseInt($el.val()) - count;
            if (qtya < 1) {
                qtya = 1;
            }
            $el.val(qtya);
        };
		
		/** Quick view product */
        var buttonHtml = '';
        $('.quickview').on('click', function (e) {
            var el = this;
            buttonHtml = $(el).html();
            $(el).html('<i class="quickviewloading fa fa-cog fa-spin"></i>');
            var effect = $(el).find('input').val();
            Custombox.open({
                target: woocommerce_params.ajax_url + '?action=load_product_quick_view&product_id=' + el.href.split('#')[1],
                effect: effect ? effect : 'fadein',
                complete: function () {
                    $(el).html(buttonHtml);
                    var owl = $(".quickview-body .owl-carousel");
                    owl.owlCarousel({
                        direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                        items: 5,
                        pagination: false
                    });
                    $(".quickview-body .next").click(function () {
                        owl.trigger('owl.next');
                    });
                    $(".quickview-body .prev").click(function () {
                        owl.trigger('owl.prev');
                    });
                    $(".quickview-body .woocommerce-main-image").click(function (e) {
                        e.preventDefault();
                    });
                    $(".quickview-body .owl-carousel .owl-item a").click(function (e) {
                        e.preventDefault();
                        if ($(".quickview-body .woocommerce-main-image img").length == 2) {
                            $(".quickview-body .woocommerce-main-image img:first").remove();
                        }
                        $(".quickview-body .woocommerce-main-image img").fadeOut(function () {
                            $(".quickview-body .woocommerce-main-image img").stop().hide();
                            $(".quickview-body .woocommerce-main-image img:last").fadeIn();
                        });
                        $(".quickview-body .woocommerce-main-image").append('<img class="attachment-shop_single wp-post-image" style="display:none;" src="' + this.href + '" alt="">');

                    })
                },
                close: function () {
                    $(el).html(buttonHtml);
                }
            });
            e.preventDefault();

        });
		
		$('.add_to_cart_button').on('click', function (e) {
            if ($(this).find('.fa-check').length) {
                e.preventDefault();
                return;
            }
            $(this).addClass('cart-adding');
            $(this).html(' <i class="fa fa-cog fa-spin"></i> ');

        });
		
		$('body').on('added_to_cart', function (e, f) {
            $('.added_to_cart.wc-forward').remove();
            // $('.cart-adding i').remove();
            //$('.cart-adding').removeClass('cart-adding');
            $('.cart-adding').html('<i class="fa fa-check"></i>');
            $('.cart-adding').removeClass('cart-adding');
        });
		
		window.submitProductsLayout = function (layout) {
            $('.product-category-layout').val(layout);
            $('.woocommerce-ordering').submit();
        };

        if($("#woo-tab-contents").length){
            $("#woo-tab-contents .box-collateral").hide(); // Initially hide all content
            $("#woo-tab-buttons li:first").attr("class","current"); // Activate first tab
            $("#woo-tab-contents .box-collateral:first").show(); // Show first tab content
        }

        $('#woo-tab-buttons li a').click(function(e) {
            e.preventDefault();
            $("#woo-tab-contents .box-collateral").hide(); //Hide all content
            $("#woo-tab-buttons li").attr("class",""); //Reset id's
            $(this).parent().attr("class","current"); // Activate this
            $($(this).attr('href')).fadeIn(); // Show content for current tab
        });
	}

    /**
     * Sticky Menu
     */

    function sticky_menu(){
        var $header = $(".header-sticky"),
            $clone = $header.before($header.clone().addClass("clone"));
        $(window).on("scroll", function() {
            var fromTop = $(document).scrollTop();
            $('body').toggleClass("down", (fromTop > 250));
        });

    }

    /*
    ** Add Class to sub-menu
     */

    function add_class_sub_menu(){
        $( ".bg-menu-item" ).each(function() {
            if ($('.bg-menu-item').length > 0) {
                var bg = $(this).attr('data-image');
                $(this).closest('li').find('.sub-menu').first().css('background-image', 'url(' + bg + ')').addClass('sub-menu-bg');
            }
        });
        $('.number-1-column').closest('li').addClass('wrap-1-column');
        $('.number-2-column').closest('li').addClass('wrap-2-column');
        $('.number-3-column').closest('li').addClass('wrap-3-column');
        $('.number-4-column').closest('li').addClass('wrap-4-column');

        $( '.header .navbar-nav > li, .header.clone .navbar-nav > li' ).hover(
            function(){
                var self = $(this);
                $('.header-version-2, .header-version-3').find('.wrapper-color').addClass('static-menu-4-column');
                $('.header-default.clone').find('.iw-nav-menu').addClass('static-menu-4-column');
                $(this).find('.sub-menu:first').stop( true, true ).slideDown(300, function(){
                    if(self.hasClass('wrap-2-column') || self.hasClass('wrap-3-column') || self.hasClass('wrap-4-column') ){
                        $(this).css('display', 'flex');
                    }
                });
            },
            function(){
                $('.header-version-2, .header-version-3').find('.wrapper-color').removeClass('static-menu-4-column');
                $('.header-default.clone').find('.iw-nav-menu').removeClass('static-menu-4-column');
                $(this).find('.sub-menu:first').stop( true, true ).hide();
            }
        );
    }

    /**
     * Carousel social footer
     */
    function carousel_init() {
        $(".owl-carousel").each(function () {
            var slider = $(this);
            var defaults = {
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr'
            };
            var config = $.extend({}, defaults, slider.data("plugin-options"));
            // Initialize Slider
            slider.owlCarousel(config).addClass("owl-carousel-init");
        });

        $('.post-gallery .gallery,.post-text .gallery').each(function () {
            var galleryOwl = $(this);
            var classNames = this.className.toString().split(' ');
            var column = 1;
            $.each(classNames, function (i, className) {
                if (className.indexOf('gallery-columns-') != -1) {
                    column = parseInt(className.replace(/gallery-columns-/, ''));
                }
            });
            galleryOwl.owlCarousel({
                direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                items: column,
                singleItem: true,
                navigation: true,
                pagination: false,
                navigationText: ["<i class=\"fa fa-arrow-left\"></i>", "<i class=\"fa fa-arrow-right\"></i>"],
                autoHeight: true
            });
        });
    }

    /**
     parallax effect */
    function parallax_init() {
        $('.iw-parallax').each(function () {
            $(this).css({
                'background-repeat': 'no-repeat',
                'background-attachment': 'fixed',
                'background-size': '100% auto',
                'overflow': 'hidden'
            }).parallax("50%", $(this).attr('data-iw-paraspeed'));
        });
        $('.iw-parallax-video').each(function () {
            $(this).parent().css({"height": $(this).attr('data-iw-paraheight'), 'overflow': 'hidden'});
            $(this).parallaxVideo("50%", $(this).attr('data-iw-paraspeed'));
        });
    };

    /**
     Hientv */
    function menu_Scroll() {
        if( $('.off-canvas-menu-scroll').length){
            $('.off-canvas-menu-scroll').enscroll({
                showOnHover: true,
                verticalTrackClass: 'track3',
                verticalHandleClass: 'handle3',
                addPaddingToPane: false
            });
        }

    }

    // funcions
    var is_show_footer = false;
    function show_footer(mobile) {
        var easingType = "easeInOutCubic";

        $('.iw-overlay-scroll').css({
            "display": "block",
            transform: "translate3d(0, -" + ($('.iw-footer-scroll .iw-footer-scroll-content').outerHeight() + mobile) + "px, 0)",
        });

        $('.iw-content-home-scroll').animate({
            top: "-" + ($('.iw-footer-scroll .iw-footer-scroll-content').outerHeight()) + "px"
        }, {
            duration: 300,
            easing: easingType
        });

        $('.iw-overlay-scroll').animate({
            opacity: "0.75",
        }, {
            duration: 300,
            easing: easingType
        });

        is_show_footer = true;
    }

    function hide_footer() {
        //console.log("hide footer");
        var easingType = "easeInOutCubic";


        $('.iw-content-home-scroll').animate({
            top: "0px"
        }, {
            duration: 300,
            easing: easingType
        });

        $('.iw-overlay-scroll').animate({
            opacity: "0",
            transform: "translate3d(0, 0, 0)"
        }, {
            duration: 300,
            easing: easingType,
            complete: $('.iw-overlay-scroll').css({
                "display": "none"
            })
        });

        is_show_footer = false;
    }

    /*** RUN ALL FUNCTION */
    /*doc ready*/
    $(document).ready(function () {

        sticky_menu();
        add_class_sub_menu();

        parallax_init();
        theme_init();
		woocommerce_init();
        carousel_init();
        $(".fit-video").fitVids();

        //cntact form 7
        if($('body').hasClass('page-template-home-page-pet') || $('body').hasClass('page-template-home-page-kid') || $('body').hasClass('page-template-home-page-scroll')){
            $('body').bind('mousewheel DOMMouseScroll', function(e){
                e.delta = null;
                if (e.originalEvent) {
                    if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
                    if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
                    if (e.originalEvent.detail) e.delta = e.originalEvent.detail;
                }

                //1 down, 0 up
                if(e.delta){
                    var direction = e.delta > 0 ? 1 : 0;
                    var scroll_height = $(window).scrollTop() + $(window).height();
                    if(direction && !is_show_footer && scroll_height >= ($(document).height())) {
                        show_footer(0)
                    }
                    else if(!direction && is_show_footer){
                        hide_footer();
                    }
                }
            });

            $('.iw-overlay-scroll').click(function (e) {
                hide_footer();
            });
        }
    });

    /*window loaded */
    $(window).on('load resize',function(){
        // Page Preloader
        $('#preview-area').fadeOut('slow', function () {
            $(this).remove();
        });
        parallax_init();
        menu_Scroll();

    });

    /*window loaded */
    $(window).on('load', function () {

        /** comparision slider*/
        if (typeof ($.fn.twentytwenty) == 'function') {
            $(".comparision-slider").twentytwenty({default_offset_pct: 0.5});
        }
    });
})(jQuery);

