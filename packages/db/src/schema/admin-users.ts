import {
  getModelForClass,
  mongoose,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class AdminUsersClass extends TimeStamps {
  @prop({ required: true, unique: true })
  public clerkId!: string;
}

export const AdminUsers =
  (mongoose.models.AdminUsersClass as
    | ReturnModelType<typeof AdminUsersClass>
    | undefined) ?? getModelForClass(AdminUsersClass);
