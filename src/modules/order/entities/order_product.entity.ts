import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { nullable: false })
  quantity: number;

  @Column('int', { nullable: false })
  price: number;

  @Column({ name: 'order_id', nullable: false })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  public order: Order;
}
