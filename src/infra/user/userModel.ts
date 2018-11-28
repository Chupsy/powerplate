import * as mongoose from "mongoose";

export interface IUserInfra extends mongoose.Document {
    name: string;
    age: number;
}

export const UserSchema = new mongoose.Schema({
    age: { type: Number, required: true },
    name: { type: String, required: true }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
