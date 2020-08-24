(function ($, Drupal) {
    /**
     * Sticky header
     */
    Drupal.behaviors.topSpacing = {
        attach: function(context, settings) {
			if $("body").hasClass('navbar-is-fixed-top') {
				marginTop = $('.navbar-fixed-top').outerHeight();
				$(this).css({
		            'margin-top': marginTop,
		        });
			}
        }
    };
})(jQuery, Drupal);