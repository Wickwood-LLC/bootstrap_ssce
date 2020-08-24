(function ($, Drupal) {
    /**
     * Sticky header
     */
    Drupal.behaviors.topSpacing = {
        attach: function(context, settings) {
        	$( window ).resize(function() {
    			if $('body').hasClass('navbar-is-fixed-top') {
    				var marginTop = $('.navbar-fixed-top').outerHeight();
    				$(this).css({
    		            'margin-top': marginTop,
    		        });
    			}
        	});
        }
    };
})(jQuery, Drupal);