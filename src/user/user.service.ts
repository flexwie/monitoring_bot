import { InjectRepository, Repository } from '@nestjs/azure-database';
import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.find(id, new User());
  }

  async getUserByChatId(id: number) {
    return this.userRepository.where('chat_id eq ?', id).findAll();
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
