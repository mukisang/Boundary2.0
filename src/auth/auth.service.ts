import { Injectable } from '@nestjs/common';
import { User } from './interface/auth.interface';
@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  create(user: User) {
    console.log(user);
    console.log(this.users);
    this.users.push(user);
  }

  search(email: string, password: string): User {
    let result: User;
    this.users.forEach((value) => {
      if (email == value.email && password == value.password) result = value;
    });
    return result;
  }
}
