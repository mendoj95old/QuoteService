import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('user')
export class UserController {

  @Get()
  find() {
    return {
      firstName: 'Justin',
      lastName: 'Mendoza',
    };
  }

  @Get()
  findAll(@Req() request: Request) {
    // tslint:disable-next-line:no-console
    console.log(request);
    return null;
  }
}
