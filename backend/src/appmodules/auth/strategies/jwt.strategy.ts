import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET', { infer: true }) ||
        'b35e3a01b72aa1162d012b0e0fd1206f434c4e400476257e202175bf6a3716108ec2fd0fb5c3fba385b45ab0a9e805608d465d6da002daf4b50c9187b03db840',
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, username: payload.username };
  }
}
