import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    console.log('Starting up...');

    try {
        await mongoose.connect('mongodb+srv://manas28:subham2808@cluster0.fnmec.mongodb.net/buzzmedia', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to mongodb');
    } catch(err) {
        console.log(err);
    }

    app.listen(2000, () => {
        console.log('Listening on port:2000');
    });
}

start();