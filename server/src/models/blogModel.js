import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please Enter Blog Title"],
        },
        description: {
            type: String,
            required: [true, "Please Enter Blog Description"],
        },
        image: {
            type: String,  
        },
        content: {
            type: String,
            required: [true, "Blog Should Have Some Content"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Blog", blogSchema);