// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID'      : '331701414245397', // your App ID
    'clientSecret'  : 'b35b76ffdf58dfe5cd53dd96efa0661c', // your App Secret
    'callbackURL'   : 'https://assignment3tharshana.herokuapp.com/auth/facebook/callback',
    'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },

  'googleAuth' : {
    'clientID'      : '372891224663-596er1ecclrbtkaou2jsagt6bo40iglp.apps.googleusercontent.com',
    'clientSecret'  : 'OlDZr1lXqrQ_nTStmT4EKPH7',
    'callbackURL'   : 'https://assignment3tharshana.herokuapp.com/auth/google/callback'
  }

};
