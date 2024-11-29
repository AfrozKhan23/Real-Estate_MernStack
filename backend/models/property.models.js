import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: Number,
    required: [true, "Number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  images: {
    type: [String],
    required: [true, "Images are required"],
  },

  videos: {
    type: String,
    required: [true, "Videos are required"],
  },
});

export default mongoose.model("property", propertySchema);
