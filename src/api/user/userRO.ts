import { ObjectId } from 'mongodb';

export class UserRO {
  id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
}
