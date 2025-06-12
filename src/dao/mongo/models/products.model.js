import { Schema, model, Types } from "mongoose";

const collection = "products";
const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        category: { type: String, default: "laptops", enum: ["tablets", "Smartphones", "laptops", "Smartwatches", "Headphones", "speakers", "Desktops", "Streaming devices", "keyboards", "accesories", "Virtual reality", "fitness", "gaming", "Televisions", "Soundbars"], index:true },
        image: { type: String, default: "https://cdn.pixabay.com/photo/2016/09/11/02/45/pc-1660564_1280.jpg"},
        price: { type: Number, default: 10 },
        stock: { type: Number, default: 10 },
        onsale: { type: Boolean, default: false },
        owner_id: { type: Types.ObjectId, ref: "users", index: true },
    },
    { timestamps: true}
);

schema.pre(/^find/, function () {
    this.populate("owner_id", "email avatar");
});

const Product = model(collection, schema);
export default Product;