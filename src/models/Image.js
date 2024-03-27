const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ filename: { type: String }, originalname: { type: String } }],
    // originalFileName: { type: String, required: true },
  },
  { timestamps: true }
);
const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
