import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto';
import * as bcryptjs from 'bcrypt'
import { LoginDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService){}

    async register({password, email, name}: RegisterDto){
        const user = await this.usersService.findUser(email)

        if(user){
            throw new BadRequestException('Email existente');
        }

        await this.usersService.createUser({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
            roles: [Role.Admin]
        });

        return 'Usuario creado correctamente'
    }

    async login({email, password}:LoginDto){
        const user = await this.usersService.findUser(email);
        if(!user){
            throw new NotFoundException('Usuario no encontrado');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('Contraseña incorrecta');
        }

        const payload = {id: user.id, email: user.email, roles: user.roles};
        const token = await this.jwtService.signAsync(payload);

        return {
            token:token,
            email: user.email,
        };
    }



}
