import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDb connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
