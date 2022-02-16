import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly email: string;
  readonly name: string;
  readonly password: string;
}