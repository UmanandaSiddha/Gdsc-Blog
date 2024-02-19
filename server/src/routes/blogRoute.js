import express from "express";
import { 
    createBlog, deleteBlog, getAllBlogs, getMyBlog, getSingleBlog, getUserBlog, updateBlog
} from "../controllers/blogController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, authorizeRoles("creator", "admin"), createBlog);
router.route("/all").get(getAllBlogs);
router.route("/view/:id").get(getSingleBlog);
router.route("/my").get(isAuthenticatedUser, authorizeRoles("creator", "admin"), getMyBlog);
router.route("/admin/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getUserBlog);
router.route("/edit/:id")
    .put(isAuthenticatedUser, authorizeRoles("creator", "admin"), updateBlog)
    .delete(isAuthenticatedUser, authorizeRoles("creator", "admin"), deleteBlog);

export default router;