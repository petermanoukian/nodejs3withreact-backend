import { User } from "@Model/Admin/User.model";
import { UserInterface } from "@RepositoryInterface/Admin/UserInterface";
import { UserQuery } from "@RepositoryQueries/Admin/UserQuery";
import { UserServiceInterface } from "@ServiceInterface/UserServiceInterface";

export class UserService implements UserServiceInterface {
  private userRepo: UserInterface;

  constructor() {
    this.userRepo = new UserQuery();
  }

  async login(identifier: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByIdentifier(identifier);
    if (!user) return null;

    const isValid = await this.verifyPassword(password, user.password);
    return isValid ? user : null;
  }

  async rememberUser(userId: number, token: string): Promise<void> {
    await this.userRepo.updateRememberToken(userId, token);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepo.findByUsername(username);
  }

   async findUserById(userId: number): Promise<User | null> {
    return this.userRepo.findUserById(userId);
  }

  private async verifyPassword(plain: string, hashed: string): Promise<boolean> {
    const bcrypt = await import("bcrypt");
    return bcrypt.compare(plain, hashed);
  }
}
