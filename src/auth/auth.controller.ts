import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: AuthDto) {
        const user: User = await this.authService.validateUser(loginUserDto.username, loginUserDto.password)
        if (!user) {
            return { message: 'Invalid credentials' }
        }
        return this.authService.login({ username: user.username, userId: user.id })
    }

    
    @Post('register')
    async register(@Body() createUserDto: AuthDto) {
        const user = await this.authService.validateUser(createUserDto.username, createUserDto.password)
        if (user) {
            return { message: 'User already exists' }
        }
        const newUser = await this.authService.register(createUserDto)
        return this.authService.login({ username: newUser.username, userId: newUser.id })
    }

    @Post('logout')
    async logout(@Body() body) {
        return this.authService.logout(body.username)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Request() req): Promise<User> {
        const token = req.headers.authorization.split(' ')[1]
        return this.authService.getMe(req.user.username, token)
    }
}
