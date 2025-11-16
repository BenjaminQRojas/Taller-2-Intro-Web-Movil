import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../people/entities/person.entity';
import axios from 'axios';

@Injectable()
export class PeopleService {
  constructor(@InjectRepository(Person) private peopleRepo: Repository<Person>) {}

  private async pagedGet(path: string) {
    let url = `https://swapi.dev/api/${path}`;
    const all: any[] = [];
    while (url) {
      const { data } = await axios.get(url);
      all.push(...data.results);
      url = data.next;
    }
    return all;
  }

  async syncFromSwapi() {
    const people = await this.pagedGet('people/');
    for (const p of people) {
      const swapiId = Number(p.url.match(/\/people\/(\d+)\//)?.[1]);
      const entity = this.peopleRepo.create({
        swapiId,
        name: p.name,
        birth_year: p.birth_year,
        height: p.height,
        mass: p.mass,
        hair_color: p.hair_color,
        skin_color: p.skin_color,
        eye_color: p.eye_color,
      });
      await this.peopleRepo.upsert(entity, ['swapiId']);
    }
    return { ok: true, imported: people.length };
  }

  findAllLite() {
    return this.peopleRepo.find({
      select: {
        name: true,
        birth_year: true,
        height: true,
        mass: true,
        hair_color: true,
        skin_color: true,
        eye_color: true,
      },
      order: { name: 'ASC' },
    });
  }

  findOneLite(id: number) {
    return this.peopleRepo.findOne({
      where: { id },
      select: {
        name: true,
        birth_year: true,
        height: true,
        mass: true,
        hair_color: true,
        skin_color: true,
        eye_color: true,
      },
    });
  }
}
