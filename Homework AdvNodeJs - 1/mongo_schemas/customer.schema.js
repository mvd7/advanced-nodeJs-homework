import mongoose from "mongoose";

const { Schema } = mongoose;

const costumerSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    country: String,
    city: String,
    zip: Number,
  },
});

export default costumerSchema;
