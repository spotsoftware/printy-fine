/**
* GET /signin
* Get Signin View For Fake Service
*/

exports.getSignin = function (req, res) {

  res.render('fakeService/signin', {
    title: 'My service - Sign in'
  });
};