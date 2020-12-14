import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel, UserModelDocument } from '../models/User';
import bcrypt from 'bcryptjs';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (username, password, done): Promise<void> => {
    try {
      const user = await UserModel.findOne({email: username}).exec();

      if (!user || !user.confirmed) return done(null, false);

      const confirmPassword = await bcrypt.compare(password, user.toObject().password);

      if (!confirmPassword) return done(null, false);

      done(null, user.toObject());
    } catch (error) {
      console.log('LocalStrategy', error);
      done(error);
    }
  }
));

passport.use(new JwtStrategy({
  secretOrKey: process.env.SECRET_KEY || 'some secret key',
  jwtFromRequest: ExtractJwt.fromHeader('token')
}, async (token, done) => {
  try {
    const user = await UserModel.findById(token.data._id);
    if (!user) return done(null, false);
    done(null, user.toObject());
  } catch (error) {
    console.log('JwtStrategy', error);
    done(error);
  }
}));

passport.serializeUser((user: UserModelDocument, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id).exec();
    if (!user) return done(null, false);
    done(null, user.toObject());
  } catch (error) {
    console.log('deserializeUser', error);
  }
});

export { passport };