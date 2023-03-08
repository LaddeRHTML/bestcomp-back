import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from 'model/user/User';

import { AuthService } from 'service/AuthService';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService) {
        super({ usernameField: 'phone_number' });
    }

    async validate(phone_number: string, password: string): Promise<Partial<User>> {
        const user = await this.authservice.validateUser(phone_number, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
