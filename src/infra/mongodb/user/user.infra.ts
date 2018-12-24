import * as mongoose from 'mongoose';
import { injectable } from 'inversify';
export interface IUser extends mongoose.Document {
    firstName: string;
    lastName: number;
    userId: number;
    email: string;
    age: number;
}

export const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true, min: 0 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: 'email_already_used', unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 0 }
});

@injectable()
export class UserInfra {
    public User = mongoose.model('User', UserSchema);

    public async findUserById(userId: number): Promise<any> {
        return await this.User.findOne({ userId });
    }
    public async findAllUsers(): Promise<any> {
        return await this.User.find();
    }
    public async deleteUserById(userId: number): Promise<any> {
        return await this.User.findOneAndDelete({ userId });
    }
    public async createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        age: number;
    }): Promise<any> {
        let maxUserDocument = await this.User.findOne().sort('-userId');
        let maxUser = maxUserDocument.toObject();
        return await this.User.create({ userId: maxUser ? maxUser.userId + 1 : 1, ...userToCreate });
    }

    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<any> {
        return await this.User.findOneAndUpdate({ userId }, dataToUpdate);
    }

    public async findUserByEmail(email: string): Promise<any> {
        return await this.User.findOne({ email });
    }
}
