import { Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly svc: PeopleService) {}

  // 1. SYNC (funciona perfecto)
  @Post('sync')
  sync() {
    return this.svc.syncFromSwapi();
  }

  // 2. LISTA (funciona)
  @Get()
  async list() {
    return this.svc.findAllLite();
  }

  @Get('one')
  async one() {
    return this.svc.getRandomPerson();
  }

  @Get(':id')
  async oneById(@Param('id') id: string) {
    return this.svc.findOneLite(+id);
  }
}