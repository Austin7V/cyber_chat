import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

type AuthenticatedUser = {
  id: string;
  username: string;
};

type RequestWithUser = Request & {
  user: AuthenticatedUser;
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() request: RequestWithUser) {
    return this.authService.login(request.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() request: RequestWithUser) {
    return request.user;
  }
}
