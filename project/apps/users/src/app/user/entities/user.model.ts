import { Document } from 'mongoose';
import { UserEntityInterface } from '@project/shared/users';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelDefinition } from '@nestjs/mongoose/dist/interfaces/model-definition.interface';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements UserEntityInterface {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  firstname!: string;

  @Prop({ required: true })
  lastname!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop()
  avatarPath?: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

export const UserDefinition: ModelDefinition = {
  name: UserModel.name,
  schema: UserSchema,
};
