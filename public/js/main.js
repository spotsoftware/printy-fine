$(document).ready(function() {

    // how to manage custom css?
    if($('#fullpage').length > 0) {
      $('#fullpage').fullpage({
        css3: true,
        navigation: true,
        navigationPosition: 'right',
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ff993b']
      });
    }

});
