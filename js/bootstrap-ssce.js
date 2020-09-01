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
      var handle = $("#custom-handle");
      $("#range-slider").slider({
        value: 200,
        max: 400,
        step: 10,
        create: function() {
          handle.text($(this).slider("value"));
        },
        slide: function(event, ui) {
          handle.text("$" + ui.value);
        }
      });

      function updateSlider(passObj) {
        var obj = $(passObj);
        var value = obj.val();
        var min = obj.attr("min");
        var max = obj.attr("max");
        var range = Math.round(max - min);
        var percentage = Math.round((value - min) * 100 / range);
        var nextObj = obj.next();
        nextObj.find("span.bar-btn").css("left", percentage + "%");
        nextObj.find("span.bar > span").css("width", percentage + "%");
        nextObj.find("span.bar-btn > span").text(skala.value);
      };
      const skala = document.querySelector('#skala');
      const output1 = document.querySelector('#output1');
      const output12 = document.querySelector('#output12');
      const output2 = document.querySelector('#output2');
      const output3 = document.querySelector('#output3');
      const output4 = document.querySelector('#output4');
      const output42 = document.querySelector('#output42');
      const output5 = document.querySelector('#output5');
      const output6 = document.querySelector('#output6');
      const update = function() {
        const spending = skala.value;
        let ce = ((spending - 10) / 0.1) * 0.9;
        //   if (skala.value<10){
        //     ce=0;}
        // } else {
        //   ce = ((};
        const cep = ce * 0.8;
        const etp = cep / 30;
        const ms = ce * 0.01;
        const nb = spending - ms;
        output1.textContent = spending;
        output12.textContent = spending;
        output2.textContent = (spending < 10) ? '0 kWh' : `${ce.toLocaleString('en')} kWh`;
        output3.textContent = (spending < 10) ? '0 lbs' : `${Math.round(cep).toLocaleString('en')} lbs`;
        output4.textContent = (spending < 10) ? '$0' : `$ ${ms.toFixed(0).toLocaleString('en')}`;
        output42.textContent = (spending < 10) ? '$0' : `$ ${ms.toFixed(0).toLocaleString('en')}`;
        output5.textContent = (spending < 10) ? '0' : `${Math.round(etp)}`;
        output6.textContent = (spending < 10) ? "$0" : `$${nb.toFixed(0)}`;
      }
      update();
      skala.addEventListener("input", update);
    }
  };
})(jQuery, Drupal);
