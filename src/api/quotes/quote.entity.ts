import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Quote {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  quote: string;

  @Column()
  author: string;
}
