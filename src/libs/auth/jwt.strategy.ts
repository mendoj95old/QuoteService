import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRECT_JWT,
    });
  }

  async validate(payload, done) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      // const validClaims = await this.authService.verifyTokenClaims(payload);
      // if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);
      done(null, payload);
    } catch (error) {
      throw new UnauthorizedException('authorized', error.message);
    }
  }
}
