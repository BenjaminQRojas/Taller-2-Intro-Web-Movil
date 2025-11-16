import { Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly svc: PeopleService) {}

  @Post('sync')
  sync() {
    return this.svc.syncFromSwapi();
  }

  @Get()
  async list() {
    return this.svc.findAllLite();
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    const p = await this.svc.findOneLite(+id);
    return p;
  }
}
