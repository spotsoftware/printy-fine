var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    kind: String,

    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    tokens: Array,

    profile: {
        name: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        },
        picture: {
            type: String,
            default: ''
        }
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    services: Array
});

/**
 * Password hashing Mongoose middleware.
 */

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validationg user's password.
 */

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

/**
 * Helper method for getting user's gravatar.
 */

userSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }

    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
    }

    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

/**
* Helper method for getting user's gravatar.
*/

userSchema.methods.gravatar = function (size) {
  if (!size) {
    size = 200;
  }

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

/**
* Helper method for getting user's fineprints' tags.
*/

var _tags = [
  {
    code: 'no-privacy',
    title: 'There is no Privacy',
    icon: 'http://loremicon.com/i/flat/64/security',
    description: 'With the subscription of this service, you agree to NO MORE Privacy.'

  },
  {
    code: 'time',
    title: 'Your time is our',
    icon: 'http://loremicon.com/i/flat/64/clock',
    description: 'Time is an overvalued concept. Starting from now you agree to give us your time. Our day will be 25h.'
  },
  {
    code: 'photo-property',
    title: 'All images is property of the service',
    icon: 'http://loremicon.com/i/flat/64/image ',
    description: 'All images uploaded to this service, will become property of the service itself. You will not have no property.'
  },
  {
    code: 'automatic-updates',
    title: 'There is no Privacy',
    icon: 'http://loremicon.com/i/flat/64/download ',
    description: 'We will update service without any comunication. We can left features as we need.'
  },
  {
    code: 'sold-souls',
    title: 'Your soul is property of this service',
    icon: 'http://loremicon.com/i/flat/64/money',
    description: 'You will sold us your soul, completely without any choice of compensation.'
  },
  {
    code: 'credit-card',
    title: 'We can use your credit card as we need',
    icon: 'http://loremicon.com/i/flat/64/creditcard',
    description: 'You must share with us your credit card pin code, we will use it many times.'
  },
  {
    code: 'home-key',
    title: 'We have a copy of your home\'s keys',
    icon: 'http://loremicon.com/i/flat/64/key',
    description: 'You must make a copy of your home\'s keys. We will evaulate it as our accomodation.'
  }
];

userSchema.methods.getAllUserTags = function () {

  // MOCKING DATA

  for(var i = 0; i < this.services.length; i++) {
    for(var j = 0; j < this.services[i].finePrints.length; j++) {
      if(i === 0) {
        this.services[i].finePrints[j].finePrintTags.push(_tags[0]);
        this.services[i].finePrints[j].finePrintTags.push(_tags[3]);
        this.services[i].finePrints[j].finePrintTags.push(_tags[4]);
        this.services[i].finePrints[j].finePrintTags.push(_tags[6]);
      } else if(i === 1) {
        this.services[i].finePrints[j].finePrintTags.push(_tags[1]);
        this.services[i].finePrints[j].finePrintTags.push(_tags[2]);
      } else {
        this.services[i].finePrints[j].finePrintTags.push(_tags[3]);
        this.services[i].finePrints[j].finePrintTags.push(_tags[5]);
      }
    }
  }

  // NORMAL FLOW

  var tags = new Array();
  var foundTag = null;

  for(var i = 0; i < this.services.length; i++) {
    for(var j = 0; j < this.services[i].finePrints.length; j++) {
      for(var k = 0; k < this.services[i].finePrints[j].finePrintTags.length; k++) {
        foundTag = this.services[i].finePrints[j].finePrintTags[k];
        if(tags.indexOf(foundTag) === -1) {
          tags.push(foundTag);
        }
      }
    }
  }

  return tags;
};

userSchema.methods.getFinePrintsWithTag = function (tagCode) {
  var fineprints = new Array();

  for(var i = 0; i < this.services.length; i++) {
    for(var j = 0; j < this.services[i].finePrints.length; j++) {
      for(var k = 0; k < this.services[i].finePrints[j].finePrintTags.length; k++) {
        if(this.services[i].finePrints[j].finePrintTags[k].code === tagCode) {
          // omg, forgive me but I have to mock
          this.services[i].finePrints[j].serviceId = this.services[i]._id;
          this.services[i].finePrints[j].serviceName = this.services[i].name;
          fineprints.push(this.services[i].finePrints[j]);
          break;
        }
      }
    }
  }

  return fineprints;
}

module.exports = mongoose.model('User', userSchema);
