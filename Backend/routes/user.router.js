import { Router } from "express";
import { 
    addConnection, 
    addEducation, 
    addExperience, 
    deleteEducation, 
    deleteExperience, 
    GetUser, 
    getUserById, 
    getUserByName, 
    Login, 
    profilePic, 
    removeConnection, 
    SignUp, 
    UpdateInfo 
} from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";

const userRouter = Router()

// Auth routes
userRouter.post("/signup", SignUp)
userRouter.post("/login", Login)

// User profile routes
userRouter.get("/getuser", authenticate, GetUser)
userRouter.put("/updateprofile", authenticate, upload.single('profile'), profilePic)
userRouter.put("/updateinfo", authenticate, UpdateInfo)

// Education routes
userRouter.put("/addeducation", authenticate, addEducation)
userRouter.put("/deleteeducation", authenticate, deleteEducation)

// Experience routes
userRouter.put("/addexperience", authenticate, addExperience)
userRouter.put("/deleteexperience", authenticate, deleteExperience)

// Connection routes - Updated to match frontend paths
userRouter.post('/add-connection', authenticate, addConnection)  // Changed from connections/add
userRouter.post('/remove-connection', authenticate, removeConnection)  // Changed from connections/remove

// Search and get user routes
userRouter.get('/search', authenticate, getUserByName);
userRouter.get('/:id', authenticate, getUserById);

export default userRouter;