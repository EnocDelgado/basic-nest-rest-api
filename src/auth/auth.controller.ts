import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './decorator/gte-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RawHeader } from './decorator/raw-headers.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create( @Body() createAuthDto: CreateUserDto ) {
    return this.authService.register( createAuthDto );
  }

  @Post('login')
  login( @Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @Get('check-status')
  checkStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkStatus( user );
  }

  @Get('users')
  @UseGuards( AuthGuard() )
  findUser(
    // @Req() reuqest: Express.Request
    @GetUser() user: User,
    @RawHeader() rawHeaders: string[]
  ) {
    return {
      ok: true,
      user,
      rawHeaders
    }
  }

}
