function adaptFooterColors(bgColor) {
  $('.footer-links a').css('color', tinycolor(bgColor).darken(20).toString());
}
