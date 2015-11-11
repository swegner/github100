// About jQuery: http://learn.jquery.com/about-jquery/

(function($) {

    // Ready event
    $(document).ready(function() {
      console.log('ready!');

      $('a').click(function(event) {
        alert('Clicked!');
      });
    });
})($);
