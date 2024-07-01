import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Skill } from 'src/skill/entities/skill.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(username: string): Promise<User> {
        return this.userRepository.findOneBy({ username });
    }

    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.save({ id, ...updateUserDto });
    }

    removeUser(id: number): Promise<{ affected?: number }> {
        return this.userRepository.delete(id);
    }

}
