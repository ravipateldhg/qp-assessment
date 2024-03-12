import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { name: 'email', length: 255, nullable: false })
  email: string;

  @Column('varchar', { name: 'first_name', length: 255, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 255, nullable: false })
  lastName: string;

  @Column('varchar', { name: 'role', nullable: false })
  role: 'admin' | 'user';

  @OneToMany(() => Order, (order) => order.user)
  public orders: Order[];
}
