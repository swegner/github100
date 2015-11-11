// About jQuery: http://learn.jquery.com/about-jquery/

(function($) {

    // Ready event
    $(document).ready(function() {
      console.log('ready!');

      $('a').click(function(event) {
        console.log(event);
        $(event.target).toggleClass('test');

        event.preventDefault();
      });
    });
})($);
