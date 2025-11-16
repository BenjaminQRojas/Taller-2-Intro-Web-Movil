import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly peopleRepo: Repository<Person>,
  ) {}

  async syncFromSwapi() {
  type SwapiPerson = {
    url: string;
    name: string;
    birth_year: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
  };

  let url = 'https://swapi.dev/api/people/';
  const allPeople: SwapiPerson[] = [];

  while (url) {
    const { data } = await axios.get(url);
    allPeople.push(...(data.results as SwapiPerson[]));
    url = data.next;
  }

  for (const p of allPeople) {
    const idMatch = p.url.match(/\/people\/(\d+)\//);
    const swapiId = idMatch ? Number(idMatch[1]) : undefined;

    await this.peopleRepo.upsert(
      {
        swapiId,
        name: p.name,
        birth_year: p.birth_year,
        height: p.height,
        mass: p.mass,
        hair_color: p.hair_color,
        skin_color: p.skin_color,
        eye_color: p.eye_color,
      },
      ['swapiId'],
    );
  }

  return { ok: true, imported: allPeople.length };
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
