import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as brcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string | null): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ username })
        if(password) {
            if (user && await brcrypt.compare(password, user.password)) {
                const { ...result } = user;
                return result;
            }
            return null;
        } else {
            if (user) {
                const { ...result } = user;
                return result;
            }
            return null;
        }

    }

    async login(credentials: {username: string, userId: number}): Promise<{ access_token: string }> {
        const payload = { username: credentials.username, sub: credentials.userId };

        const user = await this.userRepository.findOneBy({ username: credentials.username })
        // if(user.lastOnline === null) {
        //     return { access_token: this.jwtService.sign(payload), offline_time: '' }
        // }
        // const timeOfflineInMilliseconds = new Date().getTime() - user.lastOnline.getTime()
        // const hours = Math.floor(timeOfflineInMilliseconds / 1000 / 3600);
        // const minutes = Math.floor((timeOfflineInMilliseconds / 1000 % 3600) / 60);
        // const seconds = Math.floor(timeOfflineInMilliseconds / 1000 % 60);

        await this.userRepository.save(user)
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(credentials: AuthDto): Promise<User> {
        const hashedPassword = await brcrypt.hash(credentials.password, 10);
        const user = this.userRepository.create({ username: credentials.username, password: hashedPassword });
        return this.userRepository.save(user);
    }

    /**
     * Gets the user data
     * @param username name of the user
     * @param token JWT token
     * @returns 
     */
    async getMe(username: string, token: string): Promise<User | null> {
        const isTokenValid = this.jwtService.verify(token)
        if (isTokenValid) {
            //return this.userRepository.findOne({ where: { username }, relations: ['players'] })
            return this.userRepository.createQueryBuilder('user')
                    .leftJoinAndSelect('user.players', 'player')
                    .leftJoinAndSelect('player.inventory', 'inventory')
                    .leftJoinAndSelect('inventory.items', 'items')
                    .leftJoinAndSelect('items.item', 'item')
                    .leftJoinAndSelect('player.stats', 'stats')
                    .leftJoinAndSelect('player.equippedItems', 'equippedItems')
                    .leftJoinAndSelect('player.skills', 'skills')
                    .where('user.username = :username', { username })
                    .getOne()
        }
        return null;
    }

    async logout(username: string) {
        const user = await this.userRepository.findOneBy({ username })
        if (user) {
            //user.lastOnline = new Date();
            //await this.userRepository.save(user)
            return { message: 'User logged out' }
        }
        return { message: 'Could not update database on your logout.' }

    }
}
