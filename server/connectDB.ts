import mongoose from "mongoose";


export const connectDB = () => {
    mongoose
        .connect(`${config.mongo.url}`)
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log(err));
};
