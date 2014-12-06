'use strict';


function initHome() {
  var $fullpage = $('#fullpage');

  if($fullpage.length > 0) {

    var sectionsColor = ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ff993b'];

    adaptFooterColors(sectionsColor[0]);

    $fullpage.fullpage({
      css3: true,
      navigation: true,
      navigationPosition: 'right',
      sectionsColor: sectionsColor,
      onLeave: function(index, nextIndex, direction) {
        adaptFooterColors(sectionsColor[nextIndex - 1]);
      }
    });
  }
}
