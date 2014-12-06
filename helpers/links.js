exports.filtered = function(user) {
  var filteredLinks = [];

  if (!user) {
    filteredLinks.push({ url: '/login', title: 'Login', icon: 'sign-in' });
    filteredLinks.push({ url: '/signup', title: 'Create Account', icon: 'user' });
  } else {
    if (user.kind === 'user') {
      filteredLinks.push({ url: '/aggregator', title: 'Aggregator', icon: 'archive' });
    }
    if (user.kind === 'service') {
      filteredLinks.push({ url: '/fineprints/new', title: 'Create FinePrint', icon: 'file' });
    }
    if (filteredLinks.length > 0) {
      filteredLinks.push('separator');
    }
    filteredLinks.push({ url: '/account', title: 'My Account', icon: 'user' });
    filteredLinks.push({ url: '/logout', title: 'Logout', icon: 'sign-out' });
  }

  return filteredLinks;
};
