import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { SourceType } from './quote.enum';

@Entity()
export class Quote {

  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  quote: string;

  @Column()
  author: string;

  @Column()
  source: string;

  @Column()
  sourceType: SourceType;

  @Column()
  content: string;
}
