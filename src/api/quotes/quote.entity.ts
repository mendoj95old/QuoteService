import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Quote {

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  quote: string;

  @Column()
  author: string;
}
