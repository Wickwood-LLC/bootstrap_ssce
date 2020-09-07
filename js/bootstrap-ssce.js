(function($, Drupal) {
  /**
   * Sticky header
   */
  Drupal.behaviors.topSpacing = {
    attach: function(context, settings) {
      $(window).on("load resize", function() {
        if ($('body').hasClass('navbar-is-fixed-top')) {
          var marginTop = $('.navbar-fixed-top').outerHeight();
          $('body').css({
            'margin-top': "calc(" + marginTop + "px + 0.5em)",
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
          var ms = ui.value * 0.1; // Monthly Savings
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
})(jQuery, Drupal);
