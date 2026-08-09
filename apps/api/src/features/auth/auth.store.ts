import { Injectable } from '@nestjs/common';

export class AuthUser {
  id!: string;
  name!: string;
  email!: string;
  role!: string;
  password!: string;
}

@Injectable()
export class AuthStore {
  private users: AuthUser[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    this.users.push({
      id: 'user-admin-1',
      name: 'Admin Voxlore',
      email: 'admin@voxlore.id',
      role: 'SUPER_ADMIN',
      password: '$2b$10$tZHdpkEK85VUj1HZZAak6OeRRuWZw0dYlU7bWSRu2iG6oM0FisAyu',
    });
  }

  findByEmail(email: string): AuthUser | undefined {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  create(input: {
    name: string;
    email: string;
    password: string;
  }): AuthUser {
    const user: AuthUser = {
      id: `user-${this.users.length + 1}`,
      name: input.name,
      email: input.email,
      role: 'MEMBER',
      password: input.password,
    };
    this.users.push(user);
    return user;
  }
}