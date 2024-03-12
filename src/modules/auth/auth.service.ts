import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getToken(email: string): Promise<string> {
    const user: UserDto = await this.userService.findOne(email);

    return this.jwtService.signAsync({
      ...user,
    });
  }
}
