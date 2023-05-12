import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

interface UserToSave {
  username: string;
  password: string;
  role: Role;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string) {
    const foundUser = await this.userRepository.findOne({
      where: { username: username },
    });

    return foundUser;
  }

  async save(userToSave: UserToSave) {
    const userEntityInstance = this.userRepository.create(userToSave);

    const savedUser = await this.userRepository.save(userEntityInstance);

    return savedUser.userId;
  }
}
