import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserController {
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: UserDto })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
