exports.filtered = function(user) {
  var filteredLinks = {};

  if (!user) {
    filteredLinks['/login'] = { title: 'Login', icon: 'sign-in' };
    filteredLinks['/signup'] = { title: 'Create Account', icon: 'user' };
  } else {
    if (user.kind === 'user') {
      filteredLinks['/aggregator'] = { title: 'Aggregator', icon: 'archive' };
    }
    if (user.kind === 'service') {
      filteredLinks['/fineprints/new'] = { title: 'Create FinePrint', icon: 'file' };
    }
  }

  return filteredLinks;
};
