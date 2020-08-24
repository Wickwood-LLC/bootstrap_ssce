(function ($, Drupal) {
    /**
     * Sticky header
     */
    Drupal.behaviors.topSpacing = {
        attach: function(context, settings) {
			if $('body').hasClass('navbar-is-fixed-top') {
				var marginTop = $('.navbar-fixed-top').outerHeight();
				$('body').css({
		            'margin-top': marginTop,
		        });
			}
        }
    };
})(jQuery, Drupal);