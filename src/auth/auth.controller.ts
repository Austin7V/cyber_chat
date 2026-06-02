import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

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
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User was created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed.',
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login with username and password' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Returns a JWT access token.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid username or password.',
  })
  login(@Req() request: RequestWithUser) {
    return this.authService.login(request.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get the currently authenticated user' })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid JWT token.',
  })
  me(@Req() request: RequestWithUser) {
    return request.user;
  }
}
