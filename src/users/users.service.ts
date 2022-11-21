import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()

export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto) {
    const exists = await this.findOne(dto.username);
    if (exists) {
      throw new BadRequestException('username is already registered');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
    return this.userModel.create({
      username: dto.username,
      hash: hashedPassword,
      phoneNumber: dto.phoneNumber,
      name: dto.name,
    });
  }
  async createAdminUser(dto: CreateUserDto) {
    const exists = await this.findOne(dto.username);
    if (exists) {
      throw new BadRequestException('username is already registered');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
    return this.userModel.create({
      username: dto.username,
      hash: hashedPassword,
      phoneNumber: dto.phoneNumber,
      name: dto.name,
      isAdmin: true,
    });
  }

  async findOne(username: string) {
    return await this.userModel.findOne({ username });
  }
  async getProfile(username: string) {
    return await this.findOne(username);
  }
  async getAllUsers() {
    const users = await this.userModel.find({ isAdmin: false }).exec();
    return users;
  }
}
