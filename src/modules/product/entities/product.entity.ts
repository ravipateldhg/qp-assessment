import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int', { nullable: false })
  price: number;

  @Column('int', { nullable: false })
  quantity: number;
}
