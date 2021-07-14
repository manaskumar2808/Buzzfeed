import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserAttr {
    userName: string,
    email: string,
    name: string,
    contact: string,
    imageUrl: string,
    password: string,
    isAdmin: boolean,
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    userName: string,
    email: string,
    name: string,
    contact: string,
    imageUrl: string,
    password: string,
    isAdmin: boolean,
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const password = this.get('password');
        const hash = await bcrypt.hash(password, 12);
        this.set('password', hash);
    }
    done();
});  

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };