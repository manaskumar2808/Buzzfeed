import mongoose from 'mongoose';

interface TaskAttr {
    title: string,
    description: string,
    imageUrl: string,
    userId: string,
    timing: string,
}

interface TaskModel extends mongoose.Model<TaskDoc> {
    build(attrs: TaskAttr): TaskDoc;
}

interface TaskDoc extends mongoose.Document {
    title: string,
    description: string,
    imageUrl: string,
    userId: string,
    timing: string,
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

taskSchema.statics.build = (attrs: TaskAttr) => {
    return new Task(attrs);
}

const Task = mongoose.model<TaskDoc, TaskModel>('Task', taskSchema);

export { Task };