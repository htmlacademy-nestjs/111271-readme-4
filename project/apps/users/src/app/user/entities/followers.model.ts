import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserModel } from './user.model';
import { ModelDefinition } from '@nestjs/mongoose/dist/interfaces/model-definition.interface';

@Schema({
  collection: 'followers',
})
export class FollowerModel {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
  follower!: UserModel;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
  following!: UserModel;
}

const FollowerSchema = SchemaFactory.createForClass(FollowerModel);

FollowerSchema.index({ follower: 1, following: 1 }, { unique: true });

export const FollowerDefinition: ModelDefinition = {
  name: FollowerModel.name,
  schema: FollowerSchema,
};
