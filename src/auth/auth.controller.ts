import { Get, Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from "./dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req) {
        return req.user;
    }


    @Post('register')
    register(@Body() user: RegisterDto) {
        return this.authService.register(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() user: LoginDto) {
        return this.authService.login(user)
    }


}
