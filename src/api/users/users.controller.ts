import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import User from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Post('/login')
  public login(@Body() user: UserDto) {
    return this.service.login(user);
  }

  @Post('/signup')
  public signUp(@Body() user: UserDto) {
    console.log("Body", user)
    return this.service.signUp(user);
  }
}
