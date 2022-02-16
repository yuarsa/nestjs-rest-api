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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(_id: string): Promise<User> {
    const data = await this.UserModel.findById(_id).exec();

    return data;
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.UserModel.findByIdAndUpdate(_id, updateUserDto, {
      new: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
