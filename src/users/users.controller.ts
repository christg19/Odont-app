import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('user')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get('getUsers/:page/:limit')
    getUsers(@Param('page') page:number, @Param('limit') limit:number){
        return this.userService.findAllUsers(page, limit)
    }

    @Post('createUser')
    createUser(@Body() newUser:CreateUserDto){
        return this.userService.createUser(newUser);
    }
}
