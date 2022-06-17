import { Injectable } from '@nestjs/common';
import { User } from './interface/auth.interface';
@Injectable()
export class AuthService {
  private readonly users: User[];

  async create(user: User) {
    console.log(typeof user);
    this.users.push(user);
  }

  search(user: User) {
    let result: User;
    this.users.forEach((value) => {
      if (user.email == value.email && user.password == value.password)
        result = value;
    });
    return result;
  }
}
