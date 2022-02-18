import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const data = new this.UserModel(createUserDto);

    return await data.save();
  }
}
