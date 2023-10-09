import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    async createUser(dto:CreateUserDto){
        return this.userModel.create(dto)
    }

    async findUser(email:string){
        return this.userModel.findOne({
            where: {
                email:email
            }
        })
    }

}
