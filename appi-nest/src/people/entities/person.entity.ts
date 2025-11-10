import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  swapiId?: number;

  @Column() name: string;
  @Column({ nullable: true }) birth_year?: string;
  @Column({ nullable: true }) height?: string;
  @Column({ nullable: true }) mass?: string;
  @Column({ nullable: true }) hair_color?: string;
  @Column({ nullable: true }) skin_color?: string;
  @Column({ nullable: true }) eye_color?: string;
}