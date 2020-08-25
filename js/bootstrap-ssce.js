(function ($, Drupal) {
    /**
     * Sticky header
     */
    Drupal.behaviors.topSpacing = {
        attach: function(context, settings) {
        	$(window).on("load resize", function() {
    			if ($('body').hasClass('navbar-is-fixed-top')) {
    				var marginTop = $('.navbar-fixed-top').outerHeight();
    				$(this).css({
    		            'margin-top': marginTop + "px",
    		        });
    			}
        	});
        }
    };
})(jQuery, Drupal);