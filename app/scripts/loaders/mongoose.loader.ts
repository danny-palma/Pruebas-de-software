import mongoose, { Schema } from "mongoose";
import { BookDocument } from "../../types/Bookinterface";

export async function init() {
  try {
    // Start mongoDB connection
    const mongoUrl = `mongodb+srv://${process.env.MongoDB_User}:${process.env.MongoDB_Password}@cluster0.hfpgxap.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error('Error while conecting to database mongo DB: \n\n' + error);
    process.exit(1);
  }
}

const BookSchema = new Schema<BookDocument>({
  title: { type: String, required: true },
  sinopsis: { type: String, required: true },
  imgurl: { type: String, required: true },
});

export const BookModel = mongoose.model<BookDocument>("book", BookSchema);
