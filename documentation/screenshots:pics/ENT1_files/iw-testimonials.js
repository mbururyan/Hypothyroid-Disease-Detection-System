/* 
 * @package Inwave Event
 * @version 1.0.0
 * @created May 4, 2015
 * @author Inwavethemes
 * @email inwavethemes@gmail.com
 * @website http://inwavethemes.com
 * @support Ticket https://inwave.ticksy.com/
 * @copyright Copyright (c) 2015 Inwavethemes. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

/**
 * Description of iw-tabs
 *
 * @developer duongca
 */

(function ($) {
    "use strict";
    $.fn.iwCarousel = function () {
        $(this).each(function () {
            var iwCarouselObj = this,
                    $iwCarouselE = $(this),
                    clients = $iwCarouselE.find('.iw-testimonial-client-item');
            $iwCarouselE.find('.testi-owl-maincontent').owlCarousel({
                slideSpeed: 500,
                paginationSpeed: 400,
                singleItem: true,
				direction: $('body').hasClass('rtl') ? 'rtl' : 'ltr',
                navigation: true,
                pagination: false,
                navigationText: ["<i class=\"ion-chevron-left\"></i>", "<i class=\"ion-chevron-right\"></i>"],
                afterMove: function () {
                    var carContent = $iwCarouselE.find('.testi-owl-maincontent').data('owlCarousel');
                    iwCarouselObj.slideItem(carContent.currentItem);
                }
            });

            $iwCarouselE.find('.iw-testimonial-client-item').click(function () {
                var index = $(this).data('item-active'),
                        carContent = $iwCarouselE.find('.testi-owl-maincontent').data('owlCarousel');
                carContent.goTo(index);
                iwCarouselObj.slideItem(carContent.currentItem);

            });

            this.slideItem = function (index) {
                clients.each(function () {
                    if ($(this).data('item-active') == index) {
                        $(this).addClass('active');
                    } else {
                        $(this).removeClass('active');
                    }
                });
            };

        });

    };
})(jQuery);

