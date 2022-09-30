(function($, Drupal) {
    /**
     * Sticky header
     */
    Drupal.behaviors.topSpacing = {
        attach: function(context, settings) {
            $(window, context).on("load resize", function() {
                if ($('body').hasClass('navbar-is-fixed-top')) {
                    var marginTop = $('.navbar-fixed-top').outerHeight();
                    $('body').css({
                        'margin-top': "calc(" + marginTop + "px + 0.5em)",
                    });
                }
                if ($('body').hasClass('toolbar-tray-open toolbar-horizontal')) {
                    $('body').css({
                        'padding-top': '79px',
                    });
                }
            });
        }
    };

    /**
     * Range slider
     */
    Drupal.behaviors.rangeSlider = {
        attach: function(context, settings) {
            const output12 = $('.output12');
            const output2 = $('.output2');
            const output3 = $('.output3');
            const output4 = $('.output4');
            const output42 = $('.output42');
            const output5 = $('.output5');
            const output6 = $('.output6');
            $("#range-slider").slider({
                range: "min",
                value: 200,
                min: 20,
                max: 400,
                step: 10,
                create: function(event, ui) {
                    const handle = $(".ui-slider-handle");
                    handle.wrapInner('<span class="handle-text"></span>');
                    window.handleText = $(".ui-slider-handle .handle-text");
                    window.handleText.text("$" + $(this).slider("value"));
                },
                slide: function(event, ui) {
                    window.handleText.text("$" + ui.value);
                    window.handleText.css({ 'left': (-handleText.outerWidth() * 0.5) + 5.5 });

                    var ce = ((ui.value - 10) / 0.1) * 0.9; // Clean energy you enable
                    var cep = ce * 0.8; // Carbon emissions you prevent
                    var etp = cep / 30; // Equivalent trees planted
                    var ms = ce * 0.01; // Monthly Savings
                    var nb = ui.value - ms; // New Electricity Bill
                    output12.text(ui.value); // Original Bill
                    output2.text((ui.value < 10) ? '0 kWh' : `${ce.toLocaleString('en')}`);
                    output3.text((ui.value < 10) ? '0 lbs' : `${Math.round(cep).toLocaleString('en')}`);
                    output4.text((ui.value < 10) ? '$0' : `$${ms.toFixed(0).toLocaleString('en')}`);
                    output42.text((ui.value < 10) ? '$0' : `$${ms.toFixed(0).toLocaleString('en')}`);
                    output5.text((ui.value < 10) ? '0' : `${Math.round(etp)}`);
                    output6.text((ui.value < 10) ? "$0" : `$${nb.toFixed(0)}`);
                }
            });
        }
    };

    /**
     * Promo block
     */
    Drupal.behaviors.promoBlock = {
        attach: function(context, settings) {
            $promoBlock = $('.affiliate-promo-block');
            $promoBtn = $('.promo-toggle', context);

            if (!($.cookie('showPromoBlock'))) { // Check to see if this cookie exists
                $.cookie('showPromoBlock', 'show', { path: '/' }); // Create a cookie to save the visible state of the promo block. 'path' makes it valid across entire site
                $promoBlock.addClass('open');
            }

            switch ($.cookie('showPromoBlock')) {
                case 'show':
                    $promoBlock.addClass('open');
                    $promoBtn.html('<i class="fas fa-times"></i>');
                    break;
                case 'hide':
                    $promoBlock.addClass('close');
                    $promoBtn.html('<i class="fad fa-star-exclamation"></i>');
                    break;
            }

            $promoBtn.click(function() {
                switch ($.cookie('showPromoBlock')) {
                    case 'show':
                        $promoBlock.removeClass('open').addClass('close');
                        $promoBtn.html('<i class="fad fa-star-exclamation"></i>');
                        $.cookie('showPromoBlock', 'hide', { path: '/' });
                        break;
                    case 'hide':
                        $promoBlock.removeClass('close').addClass('open');
                        $promoBtn.html('<i class="fas fa-times"></i>');
                        $.cookie('showPromoBlock', 'show', { path: '/' });
                        break;
                }
            });
        }
    };

    /**
     * Disable iFrame autofocus
     */
    Drupal.behaviors.disableAutoFocus = {
        attach: function(context, settings) {
            const iframe = $('.layout:not(.layout-builder__layout) .field--name-field-iframe-link iframe');

            // check if iframe exists
            if (iframe.length) {
                // continuously scroll to top
                const scrollInterval = setInterval(function() {
                    $('h1.page-title').focus();
                    // console.log(`Scrolled to top. scrollInterval: ${scrollInterval}`);
                }, 100);

                // check if iframe is loaded
                iframe.on('load', () => {
                    // disable autofocus
                    $(window).scrollTop(0);
                    iframe.contents().find('input[type="text"]').attr('autofocus', false);
                    // clear interval
                    clearInterval(scrollInterval);
                    // console.log(`Cleared scrollInterval: ${scrollInterval}`);
                });
            }
        }
    };

})(jQuery, Drupal);