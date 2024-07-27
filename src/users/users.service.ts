import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    // create user
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, role } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({
            email, password: hashedPassword, role
        });
        return this.usersRepository.save(user)
    }

    // find user by email
    async findOneByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email }  })
    }

    // update users details
    async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const { password, profile } = updateUserDto;
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        await this.usersRepository.update(id, { ...(password && { password: hashedPassword }), ...(profile && { profile }) });
      }
      
    // remove user
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
      }
}
