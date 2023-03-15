import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import Helpers from '../helpers';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService, private helpers: Helpers) {}

  @InjectRepository(User)
  private readonly usersRepository: Repository<User>;

  public async createUser(dto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.save(dto);
    return user;
  }

  public async getAllUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  public async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  public async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  public async signUp(userDto: UserDto) {
    const candidate = await this.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const minSalt = 10;
    const maxSalt = 20;

    const hashPassword = await bcrypt.hash(
      userDto.password,
      this.helpers.randomInteger(minSalt, maxSalt),
    );
    const user = await this.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: UserDto) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.first_name,
      surname: user.second_name,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
