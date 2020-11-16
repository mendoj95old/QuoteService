import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create.user.dto';
import { Provider } from 'src/libs/auth/auth.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOneOrFail({ email: userEmail });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  async findOneByThirdPartyId(thirdPartyId: string, provider: Provider) {
    return await this.userRepository.findOneOrFail({ [provider]: thirdPartyId });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, newValue: CreateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      console.log(`user doesn\'t exist`);
    }
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);

  }
}
