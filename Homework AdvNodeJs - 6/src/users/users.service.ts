import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user',
      password: 'password',
    },
    {
      userId: 2,
      username: 'admin',
      password: 'admin',
    },
  ];

  constructor() {}

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
