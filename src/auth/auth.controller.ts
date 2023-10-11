import { Get, Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from "./dto";
import { AuthGuard } from "./auth.guard";
import { User } from "src/users/user.entity";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        const user: User = request.user;
        return user;
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
