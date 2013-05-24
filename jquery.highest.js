/* jQuery Highest (jquery.highest.js)
 * A jQuery 1.3+ plugin under GNU GENERAL PUBLIC LICENSE version 2 lisense.
 */

(function($) {

  $.fn.highest = function(options) {

    // Settings
    var settings = $.extend({
      window_min_width: null, // Window min width at which we will apply this plugin business.
      enable_on: 'all' // Possible value: 'all', 'start', 'window_resize'. By default the plugin business is processed on start and on window resize.
    }, options);

    // Store a reference the current selector match
    var $this = this;

    // Handler which apply find and apply the height
    var handler = function() {

      // Find if we must do the business
      var doit = true;
      if (parseInt(settings.window_min_width) && $(window).width() < settings.window_min_width) {
        doit = false;
      }

      if (doit) {
        // Find the highest
        var highest = 0;
        $this.css({minHeight: 'auto'});
        $this.each(function() {
          if ($(this).height() > highest) {
            highest = $(this).height();
          }
        });

        // Apply the highest to all
        if (highest) {
          $this.css({minHeight: highest});
        }
      }
      else {
        $this.css({minHeight: 'auto'});
      }
    };

    // Start business
    if (settings.enable_on === 'all' || settings.enable_on === 'start') {
      handler();
    }
    if (settings.enable_on === 'all' || settings.enable_on === 'window_resize') {
      $(window).resize(function() {
        handler();
      });
    }

    return this;
  };

})(jQuery);
