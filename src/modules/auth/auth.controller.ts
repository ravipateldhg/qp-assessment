import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('get-token')
  @ApiOperation({ summary: 'Get user token' })
  @ApiOkResponse({ type: String })
  @ApiQuery({ name: 'email', type: String, required: false })
  async token(@Query('email') email: string): Promise<string> {
    return this.authService.getToken(email);
  }
}
