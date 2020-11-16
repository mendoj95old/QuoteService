import { Entity, ObjectIdColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { UserRO } from './userRO';
import { Provider } from 'src/libs/auth/auth.service';

@Entity()
export class User {

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  google: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, firstName, lastName, email } = this;
    return {
      id,
      firstName,
      lastName,
      email,
    };

  }

}
