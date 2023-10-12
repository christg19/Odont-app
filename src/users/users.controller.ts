import { Body, Controller, Get, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get('getUsers')
    getUsers(){
        return this.userService.findAllUsers()
    }

    @Post('createUser')
    createUser(@Body() newUser:CreateUserDto){
        return this.userService.createUser(newUser);
    }
}
