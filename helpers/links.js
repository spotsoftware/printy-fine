// { Requires

var _ = require('lodash');

// }


/**
 * @return {Array} The links based on the current state
 *
 * @nosideeffects
 *
 * Available groups: page, session, profile
 */
var filtered = function(user) {
  var filteredLinks = [];

  if (!user) {
    filteredLinks.push({
      url: '/login',
      title: 'Login',
      icon: 'sign-in',
      group: 'session' });
    filteredLinks.push({
      url: '/signup',
      title: 'Create Account',
      icon: 'user',
      group: 'session'
    });
  } else {
    if (user.kind === 'user') {
      filteredLinks.push({
        url: '/aggregator',
        title: 'Aggregator',
        icon: 'archive',
        group: 'page'
      });
    }
    if (user.kind === 'service') {
      filteredLinks.push({
        url: '/fineprints/new',
        title: 'Create FinePrint',
        icon: 'file',
        group: 'page'
      });
    }
    if (filteredLinks.length > 0) {
      filteredLinks.push('separator');
    }
    filteredLinks.push({
      url: '/account',
      title: 'My Account',
      icon: 'user',
      group: 'profile'
    });
    filteredLinks.push({
      url: '/logout',
      title: 'Logout',
      icon: 'sign-out',
      group: 'session'
    });
  }

  return filteredLinks;
};

var selectGroup = function(filteredLinks, expectedGroup) {
  return _.select(filteredLinks, function(filteredLink) {
    return _.has(filteredLink, 'group') && filteredLink.group == expectedGroup;
  });
};

var selectGroups = function(filteredLinks, expectedGroups) {
  return _.flatten(_.map(expectedGroups, function(expectedGroup) {
    return selectGroup(filteredLinks, expectedGroup);
  }), true);
};


exports.selectGroups = selectGroups;
exports.selectGroup = selectGroup;
exports.filtered = filtered;
