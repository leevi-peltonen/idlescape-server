import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import 'dotenv/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
            session: false
        });
        
    }

    async validate(payload: any) {
        const user = await this.authService.validateUser(payload.username, null)
        if (!user) {
            return { message: 'Invalid credentials' }
        }
        return { userId: payload.sub, username: payload.username}
    }
}