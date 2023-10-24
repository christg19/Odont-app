import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User){}

    async findAllUsers(page:number, limit:number): Promise<{ items: User[], total:number}>{
        const offset = (page-1)*limit;
         const user = await this.userModel.findAndCountAll({
            limit:limit,
            offset:offset
         });

         return {
            items:user.rows,
            total:user.count
         };
    }

    async createUser(dto:CreateUserDto){
        return this.userModel.create(dto);
    }

    async findUser(email:string){
        return this.userModel.findOne({
            where: {
                email:email
            }
        })
    }

    async getUserById(email:string): Promise<User>{

        const user = await this.userModel.findOne({
            where:{
                email:email
            }
        });

        return user;

    }

}
