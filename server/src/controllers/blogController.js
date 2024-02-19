import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Blog from "../models/blogModel.js";
import fs from "fs";
import ApiFeatures from "../utils/apiFeatures.js";

export const createBlog = catchAsyncErrors( async (req, res, next) => {
    const blog = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        image: "",
        content: req.body.content,
        user: req.user.id,
    });

    if (!blog) {
        return next(new ErrorHandler("Blog Creation Failed", 500));
    }

    if (req.body.image) {
        const img = req.body.image
        const data = img.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, 'base64');
        fs.writeFileSync(`./public/images/${blog._id}.jpg`, buf);
        blog.image = `http://localhost:7000/images/${blog._id}.jpg`;
        await blog.save();
    }

    res.status(200).json({
        success: true,
        message: "Blog Created"
    });
});

export const updateBlog = catchAsyncErrors( async (req, res, next) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    if ((req.user.role === "creator") && (blog.user != req.user.id)) {
        return next(new ErrorHandler("Permission Denied", 404));
    }

    if (req.body.image) {
        if (blog.image.length > 0) {
            fs.unlinkSync(`./public/images/${blog._id}.jpg`);
        }
        const img = req.body.image
        const data = img.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(data, 'base64');
        fs.writeFileSync(`./public/images/${blog._id}.jpg`, buf);
        blog.image = `http://localhost:7000/images/${blog._id}.jpg`;
        await blog.save();
    }

    await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,  
        message: "Blog Updated"
    });
});

export const deleteBlog = catchAsyncErrors( async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    if ((req.user.role === "creator") && (blog.user != req.user.id)) {
        return next(new ErrorHandler("Permission Denied", 404));
    }

    if (blog.image.length > 0) {
        fs.unlinkSync(`./public/images/${blog._id}.jpg`);
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,  
        message: "Blog Deleted"
    });
});

export const getAllBlogs = catchAsyncErrors( async (req, res, next) => {

    const resultPerPage = 8;
    const blogCount = await Blog.countDocuments();

    const apiFeatures = new ApiFeatures(Blog.find().populate("user", "name email").sort({ $natural: -1 }), req.query).pagination(resultPerPage);

    const blogs = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: blogCount,
        blogs
    });
});

export const getSingleBlog = catchAsyncErrors( async (req, res, next) => {
    const blog = await Blog.findById(req.params.id).populate("user", "name email");

    if (!blog) {
        return next(new ErrorHandler("Blog Not Found", 404));
    }

    res.status(200).json({
        success: true,
        blog
    });
});

export const getUserBlog = catchAsyncErrors( async (req, res, next) => {

    const resultPerPage = 8;
    const blogCount = await Blog.countDocuments({ user: req.params.id });

    const apiFeatures = new ApiFeatures(Blog.find({ user: req.params.id }).sort({ $natural: -1 }), req.query).pagination(resultPerPage);

    const blogs = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: blogCount,
        blogs
    });
});

export const getMyBlog = catchAsyncErrors( async (req, res, next) => {

    const resultPerPage = 8;
    const blogCount = await Blog.countDocuments({ user: req.user.id });

    const apiFeatures = new ApiFeatures(Blog.find({ user: req.user.id }).sort({ $natural: -1 }), req.query).pagination(resultPerPage);

    const blogs = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: blogCount,
        blogs
    });
});


