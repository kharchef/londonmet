'use strict';

module.exports = function( _ , passport, User){

    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/auth/google', this.getGoogleLogin);
            router.get('/auth/google/callback', this.googleLogin);
            

            router.post('/', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
        },

        indexPage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'londonmet chat | Login', messages: errors, hasErrors: errors.length > 0});
         },

         postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
         
         getSignUp: function(req, res){
            
            const errors = req.flash('error');
            return res.render('signup', {title: 'londonmet chat | SignUp', messages: errors, hasErrors: errors.length > 0});
        },
         

         postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

         getGoogleLogin: passport.authenticate('google',{
             scope:  ['https://www.googleapis.com/auth/plus.login',
             'https://www.googleapis.com/auth/plus.profile.emails.read']
         }),

         googleLogin: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
         }),


        
    }

}