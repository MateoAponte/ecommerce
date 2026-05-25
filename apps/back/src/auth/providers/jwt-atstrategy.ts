/**
 * Pattern: Strategy
 * Benefit: Implements a Passport strategy for access-token validation.
 * Separates the authentication algorithm from controllers and allows
 * plugging different strategies (access vs refresh) with minimal change.
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { AesProvider } from './aes-provider';
import { TokenUserDto } from '../dtos';
import { AES_KEY, AT_SECRET } from '../constants';

@Injectable()
export class JwtAtStrategy extends PassportStrategy(Strategy, 'token') {
  constructor(
    /**
     * Inject AES Provider
     */
    readonly aesProvider: AesProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: aesProvider.decrypt(AT_SECRET, AES_KEY),
    });
  }

  validate(payload: User): TokenUserDto {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
