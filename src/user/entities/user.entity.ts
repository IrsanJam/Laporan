import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable:true})
  username: string;

  @Exclude()
  @Column({nullable:true})
  password: string;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  about: string;

  @Column({
    default:
      'https://res.cloudinary.com/dtzs4c2uv/image/upload/v1666326774/noavatar_rxbrbk.png',
    nullable: true,
    })
  image: string;

  @Column("simple-array", { nullable: true })
  friends: string[];

  @Column("simple-array", { nullable: true })
  blocked: string[];

  @Column("simple-array", { nullable: true })
  requests: string[];

  @BeforeInsert()
  async hashPassword() {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  }
}
