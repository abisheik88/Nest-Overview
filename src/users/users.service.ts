import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  private readonly newUsers = [
    {
      name: 'john',
      email: 'john@who.com',
      age: 25,
    },
    {
      name: 'alice',
      email: 'alice@who.com',
      age: 26,
    },
    {
      name: 'michael',
      email: 'michael@who.com',
      age: 29,
    },
  ];

  fetchUsers() {
    return this.newUsers;
  }

  //create a new user
  createUser(user: CreateUserDto) {
    this.newUsers.push(user);
    return;
  }
}
