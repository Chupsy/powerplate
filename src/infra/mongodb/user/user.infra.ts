import * as mongoose from 'mongoose';
import { injectable } from 'inversify';

export const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true, min: 0 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    email: { type: String, required: 'email_already_used', unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 0 }
});

export interface IUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    password: string;
    passwordSalt: string;
}

@injectable()
export class UserInfra {
    private User: mongoose.Model<mongoose.Document, {}>;

    public init(db: any) {
        this.User = db.model('User', UserSchema);
    }

    public async findUserById(userId: number): Promise<IUser> {
        return this.convertDocumentToIUser(await this.User.findOne({ userId }));
    }

    public async findAllUsers(): Promise<IUser[]> {
        let users = await this.User.find();
        return users.map(user => this.convertDocumentToIUser(user));
    }

    public async deleteUserById(userId: number): Promise<void> {
        await this.User.findOneAndDelete({ userId });
    }

    public async createUser(userToCreate: {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        passwordSalt: string;
        age: number;
    }): Promise<IUser> {
        let maxUserDocument = await this.User.findOne().sort('-userId');
        let maxUser = maxUserDocument.toObject();
        return this.convertDocumentToIUser(
            await this.User.create({ userId: maxUser ? maxUser.userId + 1 : 1, ...userToCreate })
        );
    }

    public async updateUser(
        userId: number,
        dataToUpdate: { email?: string; firstName?: string; lastName?: string; age?: number }
    ): Promise<IUser> {
        await this.User.findOneAndUpdate({ userId }, dataToUpdate);
        return this.convertDocumentToIUser(await this.User.findOne({ userId }));
    }

    public async findUserByEmail(email: string): Promise<IUser> {
        return this.convertDocumentToIUser(await this.User.findOne({ email }));
    }

    private convertDocumentToIUser(user: mongoose.Document): IUser {
        if (!user) {
            return null;
        }
        let convertedUser = user.toObject();
        return {
            userId: convertedUser.userId,
            email: convertedUser.email,
            firstName: convertedUser.firstName,
            lastName: convertedUser.lastName,
            age: convertedUser.age,
            password: convertedUser.password,
            passwordSalt: convertedUser.passwordSalt
        };
    }
}
