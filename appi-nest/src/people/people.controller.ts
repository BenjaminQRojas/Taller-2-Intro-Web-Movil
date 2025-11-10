import { Controller, Get, Param, Post } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ApiTags } from '@nestjs/swagger';

function mapEs(p: any) {
  return {
    nombre: p.name,
    'ano de nacimiento': p.birth_year,
    Altura: p.height,
    Masa: p.mass,
    'Color de pelo': p.hair_color,
    'Color de piel': p.skin_color,
    'Color de ojos': p.eye_color,
  };
}

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly svc: PeopleService) {}

  @Post('sync')
  sync() { return this.svc.syncFromSwapi(); }

  @Get()
  async list() {
    const rows = await this.svc.findAllLite();
    return rows.map(mapEs);
  }

  @Get(':id')
  async one(@Param('id') id: string) {
    const p = await this.svc.findOneLite(+id);
    return p ? mapEs(p) : null;
  }
}