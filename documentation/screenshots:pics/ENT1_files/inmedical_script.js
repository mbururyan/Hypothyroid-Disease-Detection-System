/* 
 * @package Inwave Event
 * @version 1.0.0
 * @created Jun 3, 2015
 * @author Inwavethemes
 * @email inwavethemes@gmail.com
 * @website http://inwavethemes.com
 * @support Ticket https://inwave.ticksy.com/
 * @copyright Copyright (c) 2015 Inwavethemes. All rights reserved.
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 *
 */

/**
 * Description of iwevent-script
 *
 * @developer duongca
 */
(function ($) {
    "use strict";

    function infunding() {
        /** Blog slider **/
        $(document).ready(function () {
//            var $container = $('.campaing-listing.infunding_style1');
//            $container.masonry({
//                isFitWidth: true,
//                itemSelector: '.post_item'
//            }).masonry('layout');
            $('.infunding-listing-page .order-dir').click(function () {
                var order_dir = $(this).find('i');
                if (order_dir.hasClass('fa-sort-amount-desc')) {
                    order_dir.removeClass('fa-sort-amount-desc').addClass('fa-sort-amount-asc');
                    $(this).find('input').val('asc');
                } else {
                    order_dir.removeClass('fa-sort-amount-asc').addClass('fa-sort-amount-desc');
                    $(this).find('input').val('desc');
                }
                document.filterForm.submit();
            });

            $('.filter-form select, .filter-form input[name="keyword"]').change(function () {
                document.filterForm.submit();
            });

            //Donate button click
            $('.working-schedule .info-right .button-action span').click(function () {
                if ($(this).hasClass('disable')) {
                    return;
                } else {
                        var id = $(this).data('id');
                        Custombox.open({
                            target: '#' + id,
                            effect: 'fadein',
                            overlayOpacity: 0.8,
                            width: 800
                        });
                }
            });

            //Clse custombox
            $('.event-book-ticket .block-title .close-button').click(function () {
                Custombox.close();
            });

            $('input[name="anonymous"]').change(function () {
                if ($(this).prop('checked')) {
                    $('.inf-checkoutform .personal-info').slideUp(300, function () {
                        $('.inf-checkoutform .personal-info input').attr('disabled', 'disabled');
                    });
                } else {
                    $('.inf-checkoutform .personal-info').slideDown();
                    $('.inf-checkoutform .personal-info input').removeAttr('disabled');
                }
            }).trigger('change');

        });
    }
    function height_listing_slider() {
        $(window).on("load resize", function () {
            var h_campaigns_slider = $('.iw-campaign-listing-slider').outerHeight();
            $('.iw-campaign-image').css({"height": h_campaigns_slider});
        });
    }
    function height_img_slider() {
        $(window).on("load resize", function () {
            var h_campaigns_slider = $('.iw-campaign-listing-slider').outerHeight();
            $('.infunding_slider-v3 .iw-campaign-image').css({"height": h_campaigns_slider - 70});
        });
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
    }

    function datetimepicker_init() {
        if ($.datetimepicker) {
            $('.datetimepicker-input').each(function () {
                var input = $(this);
                var extconfig = {};
//            if (input.hasClass('start')) {
//                extconfig = {
//                    onShow: function (ct) {
//                        console.log(input.parents('.datetimepicker-group').find('input.datetimepicker-input.end').val());
//                        this.setOptions({
//                            maxDate: input.parents('.datetimepicker-group').find('input.datetimepicker-input.end').val() ? input.parents('.datetimepicker-group').find('input.datetimepicker-input.end').val() : false
//                        });
//                    }
//                };
//            }
//            if (input.hasClass('end')) {
//                extconfig = {
//                    onShow: function (ct) {
//                        this.setOptions({
//                            minDate: input.parents('.datetimepicker-group').find('input.datetimepicker-input.start').val() ? input.parents('.datetimepicker-group').find('input.datetimepicker-input.start').val() : false
//                        });
//                    }
//                };
//            }
                var config = $.extend({}, extconfig, input.data("configs"));
                input.datetimepicker(config);
            });
        }
    }

    function hientv() {

        /* Tabs */$("#iw-department-tab").each(function () {
            var iwTabObj = this, $iwTab = $(this);
            iwTabObj.content_list = $iwTab.find('.iw-tab-content .iw-tab-item-content');
            iwTabObj.list = $iwTab.find('.iw-tab-items .iw-tab-item');
            $('.iw-tab-items .iw-tab-item', $iwTab).click(function () {
                if ($(this).hasClass('active')) {
                    return;
                }
                $(this).addClass('active');
                var itemclick = this;
                iwTabObj.list.each(function () {
                    if (iwTabObj.list.index(this) !== iwTabObj.list.index(itemclick) && $(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                });
                iwTabObj.loadTabContent();
            });
            this.loadTabContent = function () {
                var item_active = $iwTab.find('.iw-tab-item.active');
                iwTabObj.content_list.addClass('iw-hidden').removeClass('active');
                $(iwTabObj.content_list.get(iwTabObj.list.index(item_active))).removeClass('iw-hidden').addClass('active');
            };

        });

        /* Accordion */
        $(".iw-medical-accordions").each(function () {
            var iwTabObj = this, $iwTab = $(this);
            this.accordion_list = $iwTab.find('.iw-accordion-item');
            $('.iw-accordion-header', this).click(function () {
                var itemClick = $(this);
                var item_target = itemClick.parent();
                if (itemClick.hasClass('active')) {
                    itemClick.removeClass('active');
                    item_target.find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                    item_target.find('.iw-accordion-header-icon .expand').hide();
                    item_target.find('.iw-accordion-header-icon .no-expand').show();
                    return;
                }
                itemClick.addClass('active');
                item_target.find('.iw-accordion-content').slideDown({easing: 'easeOutQuad'});
                item_target.find('.iw-accordion-header-icon .expand').show();
                item_target.find('.iw-accordion-header-icon .no-expand').hide();
                iwTabObj.accordion_list.each(function () {
                    if (iwTabObj.accordion_list.index(this) !== iwTabObj.accordion_list.index(item_target) && $(this).find('.iw-accordion-header').hasClass('active')) {
                        $(this).find('.iw-accordion-header').removeClass('active');
                        $(this).find('.iw-accordion-content').slideUp({easing: 'easeOutQuad'});
                        $(this).find('.iw-accordion-header-icon .expand').hide();
                        $(this).find('.iw-accordion-header-icon .no-expand').show();
                    }
                });
            });

            $('.iw-accordion-header', this).hover(function () {
                var item = $(this), item_target = item.parent();
                if (item.hasClass('active')) {
                    return;
                }
                item_target.find('.iw-accordion-header-icon .expand').show();
                item_target.find('.iw-accordion-header-icon .no-expand').hide();
            }, function () {
                var item = $(this), item_target = item.parent();
                if (item.hasClass('active')) {
                    return;
                }
                item_target.find('.iw-accordion-header-icon .expand').hide();
                item_target.find('.iw-accordion-header-icon .no-expand').show();
            });

        });

        /* Schedule Table */

        var h_li = $('.iw-schedule-table .cd-schedule .timeline li').outerHeight();
        var w_ul = (100 / $('.iw-schedule-table .cd-schedule .events .events-group').length) + '%';
        $('.iw-schedule-table .cd-schedule .events .events-group > ul').css('height', h_li * 15);
        $('.iw-schedule-table .cd-schedule .events .events-group').css('width', w_ul);

        /* Select 2 */
        if ($('select.medical-select2').length) {
            $('select.medical-select2').select2();
        }

        jQuery('.iw-datetimepicker').datetimepicker({
            timepicker:false,
            format:'d.m.Y'
        });

    }
    
    function resize_booked_table() {
        if($('.imd-appoinment-calendar').length){
            $('.imd-appoinment-calendar').each(
                function () {
                    var self = $(this);
                    var td = self.find('tbody td');
                    var height = td.width();
                    td.height(height);
                    td.find('.date').css('line-height', height+'px');
                }
            )
        }
    }

    /*** RUN ALL FUNCTION */
    $(document).ready(function () {
        // run function here:
        infunding();
        height_listing_slider();
        height_img_slider();
        carousel_init();
        datetimepicker_init();
        hientv();
        
        $('.appoinment-form .field-input .input-date').each(function () {
            var input = $(this), options = input.data('date-options');
            options.onClose = onCloseDatePicker;
            input.datetimepicker(options);
        });

        function onCloseDatePicker(ct, input) {
            input.parent().find('input[type="hidden"]').val((ct.getTime() / 1000) - (ct.getTimezoneOffset()*60));
        }

        /** CONTACT FORM **/
        $('.sidebar-form-question form').submit(function (e) {
            $.ajax({
                type: "POST",
                url: inMedicalCfg.ajaxUrl,
                data: $(this).serialize(),
                dataType: "json",
                beforeSend: function (xhr) {
                    $('.sidebar-form-question .ajax-overlay').show();
                },
                success: function (result) {
                    if (result.success) {
                        $('.sidebar-form-question form').get(0).reset();
                    } else {
                        $('.sidebar-form-question .form-message').addClass('error');
                    }
                    $('.sidebar-form-question .ajax-overlay').hide();
                    $('.sidebar-form-question .form-message').html(result.message);
                }
            });
            e.preventDefault();
        });

        //tooltip
        if($('.has-tooltip').length){
            /*$('.has-appointment').hover(
                function () {
                    $(this).find('.has-tooltip').tooltip('show');
                },
                function () {
                    $(this).find('.has-tooltip').tooltip('hide');
                }
            );*/

            $('.has-tooltip').tooltip({
                //'trigger' : 'manual'
            });
        }

        resize_booked_table();

        //appoinments
        $('.imd-appoinment-calendar').on('click', '.date.has-appointment', function () {
            var self = $(this);
            self.closest('tbody').find('td.active').removeClass('active');

            var date = self.data('date');
            var parent = self.closest('tr');
            if($('.appointment-block-entry').length && $('.appointment-block-entry').data('for-date') == date){
                $('.appointment-block-entry').slideUp().remove();
            }else{
                $('.appointment-block-entry').remove();
                var opts = {
                    lines: 11 // The number of lines to draw
                    , length: 10 // The length of each line
                    , width: 4 // The line thickness
                    , radius: 22 // The radius of the inner circle
                    , scale: 1 // Scales overall size of the spinner
                    , corners: 0.3 // Corner roundness (0..f1)
                    , color: '#fff' // #rgb or #rrggbb or array of colors
                    , opacity: 0.6 // Opacity of the lines
                    , rotate: 23 // The rotation offset
                    , direction: 1 // 1: clockwise, -1: counterclockwise
                    , speed: 1 // Rounds per second
                    , trail: 47 // Afterglow percentage
                    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                    , zIndex: 2e9 // The z-index (defaults to 2000000000)
                    , className: 'spinner' // The CSS class to assign to the spinner
                    , top: '48%' // Top position relative to parent
                    , left: '49%' // Left position relative to parent
                    , shadow: false // Whether to render a shadow
                    , hwaccel: true // Whether to use hardware acceleration
                    , position: 'absolute' // Element positioning
                };

                var spinner = new Spinner(opts).spin();
                var html = '<tr class="appointment-block-entry" data-for-date="'+date+'" style="height: '+parent.height()+'px"><td colspan="7"></td></tr>';
                parent.after(html);
                $('.appointment-block-entry td').append(spinner.el);

                $.ajax({
                    type: "POST",
                    url: inMedicalCfg.ajaxUrl,
                    data: {action : 'imd_get_appointments', ajax_nonce: inMedicalCfg.security, date : date},
                    dataType: "json",
                    beforeSend: function (xhr) {
                    },
                    success: function (result) {
                        if (result.success == true) {
                            self.closest('td').addClass('active');
                            var newHTML  = $('<div style="position : absolute; left : -9999px;">' + result.html + '</div>').appendTo('body');
                            var theHeight = newHTML.height();
                            $('.appointment-block-entry td').animate({ height : theHeight }, 500, function () {
                                var child = newHTML.children();
                                child.hide();
                                $('.appointment-block-entry td').html(child).css({'height' : 'auto'});
                                child.fadeIn('slow');
                                newHTML.remove();
                            });
                        }
                    }
                });
            }
        });

        $(document).on('click', '.book-appointment', function () {
            var self = $(this);
            var opts = {
                lines: 11 // The number of lines to draw
                , length: 10 // The length of each line
                , width: 4 // The line thickness
                , radius: 22 // The radius of the inner circle
                , scale: 1 // Scales overall size of the spinner
                , corners: 0.3 // Corner roundness (0..f1)
                , color: '#fff' // #rgb or #rrggbb or array of colors
                , opacity: 0.6 // Opacity of the lines
                , rotate: 23 // The rotation offset
                , direction: 1 // 1: clockwise, -1: counterclockwise
                , speed: 1 // Rounds per second
                , trail: 47 // Afterglow percentage
                , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                , zIndex: 2e9 // The z-index (defaults to 2000000000)
                , className: 'spinner' // The CSS class to assign to the spinner
                , top: '48%' // Top position relative to parent
                , left: '49%' // Left position relative to parent
                , shadow: false // Whether to render a shadow
                , hwaccel: true // Whether to use hardware acceleration
                , position: 'absolute' // Element positioning
            };
            var spinner = new Spinner(opts).spin();
            $('.book-appointment-form').html(spinner.el);

            var target = '#'+self.closest('.imd-appoinment-form-parent').find('.book-appointment-form').attr('id');
            Custombox.open({
                target: target,
                //cache: true,
                effect: 'fadein',
                overlayOpacity: 0.4,
                width: 800
            });

            $.ajax({
                type: "POST",
                url: inMedicalCfg.ajaxUrl,
                data: {action : 'imd_get_appointment_form', ajax_nonce: inMedicalCfg.security, date : self.data('date'), appointment_id : self.data('id')},
                dataType: "json",
                beforeSend: function (xhr) {
                },
                success: function (result) {
                    //$('.appointment-block-entry td').html('');

                    if (result.success == true) {
                        var newHTML  = $('<div style="position : absolute; left : -9999px;">' + result.html + '</div>').appendTo('body');
                        var theHeight = newHTML.height();
                        var new_margin = ($(window).height() - theHeight)/2;

                        $('.custombox-modal-wrapper .book-appointment-form').html('');
                        $('.custombox-modal-container').css({'margin-top': new_margin});
                        var child = newHTML.children();
                        child.hide();
                        $('.custombox-modal-wrapper .book-appointment-form').html(child);
                        child.slideDown('slow');
                        newHTML.remove();
                    }
                }
            });
        });

        $(document).on('click', '.appointment-form-close', function () {
            Custombox.close();
        });

        if($(".book-appointment-form").length) {
            $(".book-appointment-form").validate({
                errorClass: "invalid",
                invalidHandler: function (event, validator) {
                    // 'this' refers to the form
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        $(validator.currentForm).find('.respon-msg').html('<span class="error">Please fill out all required fields.</span>').fadeIn();
                    } else {
                        $("div.error").hide();
                    }
                },
                highlight: function (element, errorClass, validClass) {
                    $(element).parent('div').addClass(errorClass).removeClass(validClass);
                },
                unhighlight: function (element, errorClass, validClass) {
                    $(element).parent('div').removeClass(errorClass).addClass(validClass);
                },
                errorPlacement: function (error, element) {
                    return false;
                },
                submitHandler: function (form) {

                    var data = $(form).serializeArray();
                    data.push({'name': 'action', 'value': 'imd_request_appointment'});
                    data.push({'name': 'ajax_nonce', 'value': inMedicalCfg.security});
                    var button = $(form).find('.request-appointment');
                    var original_text = button.text();
                    $.ajax({
                        type: "POST",
                        url: inMedicalCfg.ajaxUrl,
                        data: data,
                        dataType: "json",
                        beforeSend: function (xhr) {
                            //callback beforesend
                            if (typeof imd_request_appointment_beforesend === 'function') {
                                imd_request_appointment_beforesend($(form));
                            } else {
                                button.addClass('processing');
                                button.text(button.data('process-text')).prop('disabled', true);
                            }
                        },
                        success: function (result) {
                            button.text(original_text).prop('disabled', false);
                            if (result.success == true) {
                                if (typeof imd_request_appointment_success === 'function') {
                                    imd_request_appointment_success($(form), result);
                                }
                                else {
                                    var newHTML = $('<div style="position : absolute; left : -9999px;">' + result.html + '</div>').appendTo('body');
                                    var theHeight = newHTML.height();
                                    var new_margin = ($(window).height() - theHeight) / 2;
                                    console.log(new_margin);
                                    console.log(theHeight);
                                    $('.custombox-modal-container').animate({'margin-top' : new_margin}, 500);

                                    $('.custombox-modal-wrapper .book-appointment-form').animate({
                                        height: theHeight,
                                    }, 500, function () {
                                        $('.custombox-modal-wrapper .book-appointment-form').html('').css({'height' : 'auto'});
                                        var child = newHTML.children();
                                        $('.custombox-modal-wrapper .book-appointment-form').html(child);
                                        newHTML.remove();
                                    });
                                }
                            }
                            else {
                                if (typeof imd_request_appointment_fail === 'function') {
                                    imd_request_appointment_fail($(form), result);
                                }
                            }
                        }
                    });
                },
            });
        }

        $('.booked-calendar-next-month').click(function () {
            var self = $(this);
            var parent = self.closest('.imd-appoinment-calendar');
            var current_date = parent.data('current-date');
            var data = {
                action : 'imd_booked_next_month',
                ajax_nonce: inMedicalCfg.security,
                current_date : current_date
            };
            var original_button = self.html();
            if(current_date){
                $.ajax({
                    type: "POST",
                    url: inMedicalCfg.ajaxUrl,
                    data: data,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        var opts = {
                            lines: 7 // The number of lines to draw
                            , length: 2 // The length of each line
                            , width: 3 // The line thickness
                            , radius: 4 // The radius of the inner circle
                            , scale: 1 // Scales overall size of the spinner
                            , corners: 1 // Corner roundness (0..1)
                            , color: '#fff' // #rgb or #rrggbb or array of colors
                            , opacity: 0.25 // Opacity of the lines
                            , rotate: 0 // The rotation offset
                            , direction: 1 // 1: clockwise, -1: counterclockwise
                            , speed: 1 // Rounds per second
                            , trail: 60 // Afterglow percentage
                            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                            , zIndex: 2e9 // The z-index (defaults to 2000000000)
                            , className: 'spinner' // The CSS class to assign to the spinner
                            , top: '50%' // Top position relative to parent
                            , left: '50%' // Left position relative to parent
                            , shadow: false // Whether to render a shadow
                            , hwaccel: false // Whether to use hardware acceleration
                            , position: 'absolute' // Element positioning
                        };

                        var spinner = new Spinner(opts).spin();
                        self.html(spinner.el);
                    },
                    success: function (result) {
                        if (result.success == true) {
                            parent.find('.table-title').html(result.date_title);
                            parent.data('current-date', result.current_date);
                            parent.find('.booked-calendar-prev-month').removeClass('hide');
                            parent.find('table tbody').html(result.html);
                            $('.has-tooltip').tooltip();
                            resize_booked_table();
                           // var newHTML  = $('<div style="position : absolute; left : -9999px;">' + result.html + '</div>').appendTo('body');
                            //var theHeight = newHTML.height();
                            //parent.animate({ height : theHeight }, 500, function () {
                                //notice the `style` attribute of the new HTML is being reset so it's not displayed off-screen anymore
                               // $(this).html(newHTML.attr('style', ''));
                            //});
                        }
                        self.html(original_button);
                    }
                });
            }
        });

        $('.booked-calendar-prev-month').click(function () {
            var self = $(this);
            if(self.hasClass('disable')){
                return false;
            }
            var parent = self.closest('.imd-appoinment-calendar');
            var current_date = parent.data('current-date');
            var original_date = parent.data('original-date');
            var data = {
                action : 'imd_booked_prev_month',
                ajax_nonce: inMedicalCfg.security,
                current_date : current_date,
                original_date : original_date,
            };

            var original_button = self.html();

            if(current_date && original_date){
                $.ajax({
                    type: "POST",
                    url: inMedicalCfg.ajaxUrl,
                    data: data,
                    dataType: "json",
                    beforeSend: function (xhr) {
                        var opts = {
                            lines: 7 // The number of lines to draw
                            , length: 2 // The length of each line
                            , width: 3 // The line thickness
                            , radius: 4 // The radius of the inner circle
                            , scale: 1 // Scales overall size of the spinner
                            , corners: 1 // Corner roundness (0..1)
                            , color: '#fff' // #rgb or #rrggbb or array of colors
                            , opacity: 0.25 // Opacity of the lines
                            , rotate: 0 // The rotation offset
                            , direction: 1 // 1: clockwise, -1: counterclockwise
                            , speed: 1 // Rounds per second
                            , trail: 60 // Afterglow percentage
                            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                            , zIndex: 2e9 // The z-index (defaults to 2000000000)
                            , className: 'spinner' // The CSS class to assign to the spinner
                            , top: '50%' // Top position relative to parent
                            , left: '50%' // Left position relative to parent
                            , shadow: false // Whether to render a shadow
                            , hwaccel: false // Whether to use hardware acceleration
                            , position: 'absolute' // Element positioning
                        };

                        var spinner = new Spinner(opts).spin();
                        self.html(spinner.el);
                    },
                    success: function (result) {
                        if (result.success == true) {
                            parent.find('.table-title').html(result.date_title);
                            parent.data('current-date', result.current_date);
                            if(result.prev_disable == true){
                                parent.find('.booked-calendar-prev-month').addClass('hide');
                            }
                            parent.find('table tbody').html(result.html);
                            $('.has-tooltip').tooltip();
                            resize_booked_table();
                           // var newHTML  = $('<div style="position : absolute; left : -9999px;">' + result.html + '</div>').appendTo('body');
                            //var theHeight = newHTML.height();
                            //parent.animate({ height : theHeight }, 500, function () {
                                //notice the `style` attribute of the new HTML is being reset so it's not displayed off-screen anymore
                               // $(this).html(newHTML.attr('style', ''));
                            //});
                        }

                        self.html(original_button);
                    }
                });
            }
        });

        if($('.imd-appointment-scroll-vertical').length){
            $('.imd-appointment-scroll-vertical').each(function () {
                var el = $(this).find('.appointment-available-list');
                var self = $(this);
                var items = self.data('items-show') ? self.data('items-show') : 3;
                el.jCarouselLite({
                    btnNext: "#"+self.find('.appointment-list-next').attr('id'),
                    btnPrev: "#"+self.find('.appointment-list-prev').attr('id'),
                    vertical: true,
                    visible: items,
                });
            })

        }
    });

    $(window).resize(function () {
        resize_booked_table();
    });

    $(window).load(function () {
        /* Filter Doctor */
        var $container = $('.iw-isotope-main').isotope({
            itemSelector: '.element-item'
            //	layoutMode:'masonry',
            //	resizesContainer: true,
            //	resizable: true,
        });

        $('.filter').click(function () {
            var selector = $(this).attr('data-filter');
            $('.doctors-filter-department button').removeClass('is-checked');
            $(this).addClass('is-checked');
            $container.isotope({filter: selector});
            return false;
        });
    });
})(jQuery);
