import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { User } from '../../user/entities/user.entity';
import { OrderProduct } from './order_product.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ nullable: false })
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  public products: OrderProduct[];
}
