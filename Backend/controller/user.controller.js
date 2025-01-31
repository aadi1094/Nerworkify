import User from "../model/user.schema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { uploadImageFromDataURI } from "../config/cloudinary.js"
import { createNotification } from "./notification.controller.js"

export const SignUp=async(req,res)=>{
    try {
        const {email,username,password}=req.body

        const hash=await bcrypt.hash(password,12)


        const user=await User.create({
            email,
            password:hash,
            username,
        })

        
        const token= await jwt.sign({
            email:email,
            id:user._id
        },process.env.SECRET_JWT)

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in SignUp"
        })
    }
}

export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user=await User.findOne({
            email,
        })

        if(!user){
            return res.status(404).json({
                    message:"User not Found"
            })
        }

        const isPasswordMatch= await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(403).json({
                message:"Incorrect password"
        })
        }
        
        const token= await jwt.sign({
            email:email,
            id:user._id
        },process.env.SECRET_JWT)

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in Login"
        })
    }
}

export const GetUser=async(req,res)=>{
    try {

        const id=req.user.id
        const user=await User.findById(id)

        if(!user){
            return res.status(404).json({
                    message:"User not Found"
            })
        }

        res.status(200).json({
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in GetUser"
        })
    }
}

export const profilePic=async(req,res)=>{
    try {
        const profile=req.file
        if(!profile){
            return res.status(401).send("File not received")
        }

        const userId=req.user.id
        const user=await User.findById(userId)

        
        if(!user){
            return res.status(404).json({
                    message:"User not Found"
            })
        }

        const profile_url=await uploadImageFromDataURI(profile)
        user.image = profile_url
        await user.save()

        res.status(201).json({
            message:"Image uploaded"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in ProfilePic"
        })
    }
}

export const UpdateInfo=async(req,res)=>{
    const userId = req.user.id; // Assuming `authenticateUser` sets req.user
  const { username, about, address } = req.body;

  try {
    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, about, address },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}

export const addEducation=async(req,res)=>{
    const userId = req.user.id; // Assuming `authenticateUser` sets req.user
  const { education } = req.body;

  try {
    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { education },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }

}


export const deleteEducation = async (req, res) => {
  const userId = req.user.id; 
  const { educationId } = req.body; 
  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { education: { _id: educationId } } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Education entry deleted successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error deleting education entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addExperience=async(req,res)=>{
  const userId = req.user.id; // Assuming `authenticateUser` sets req.user
const { experience } = req.body;

try {
  // Update user details
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { experience },
    { new: true, runValidators: true } // Return the updated document
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
} catch (error) {
  console.error("Error updating user:", error);
  res.status(500).json({ message: "Internal server error" });
}

}

export const deleteExperience = async (req, res) => {
  const userId = req.user.id; 
  const { experienceId } = req.body; 
  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { experience: { _id: experienceId } } }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Experience entry deleted successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error deleting education entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const addConnection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { connectionId } = req.body;

        if (!connectionId) {
            return res.status(400).json({
                message: "Connection ID is required"
            });
        }

        if (userId === connectionId) {
            return res.status(400).json({
                message: "Cannot connect with yourself"
            });
        }

        const [user, connectionUser] = await Promise.all([
            User.findById(userId),
            User.findById(connectionId)
        ]);

        if (!user || !connectionUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.connections.includes(connectionId)) {
            return res.status(400).json({
                message: "Connection already exists"
            });
        }

        user.connections.push(connectionId);
        connectionUser.connections.push(userId);

        await Promise.all([
            user.save(),
            connectionUser.save(),
            createNotification(connectionId, userId, 'CONNECTION')
        ]);

        res.status(200).json({
            message: "Connection added successfully",
            user
        });

    } catch (error) {
        console.error("Error in addConnection:", error);
        res.status(500).json({
            message: "Error adding connection"
        });
    }
}

export const removeConnection = async (req, res) => {
    try {
        const userId = req.user.id // ID of the user making the request
        const { connectionId } = req.body // ID of the connection to remove

        // Validate if connectionId is provided
        if (!connectionId) {
            return res.status(400).json({
                message: "Connection ID is required"
            })
        }

        // Find both users
        const [user, connectionUser] = await Promise.all([
            User.findById(userId),
            User.findById(connectionId)
        ])

        // Validate if both users exist
        if (!user || !connectionUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Check if connection exists
        if (!user.connections.includes(connectionId)) {
            return res.status(400).json({
                message: "Connection does not exist"
            })
        }

        // Remove connection from both users
        user.connections = user.connections.filter(id => id.toString() !== connectionId)
        connectionUser.connections = connectionUser.connections.filter(id => id.toString() !== userId)

        // Save both updates
        await Promise.all([
            user.save(),
            connectionUser.save()
        ])

        res.status(200).json({
            message: "Connection removed successfully",
            user
        })

    } catch (error) {
        console.error("Error in removeConnection:", error)
        res.status(500).json({
            message: "Error removing connection"
        })
    }
}

export const getUserByName = async (req, res) => {
    try {
        const name = req.query.name;

        // Use $regex for partial match (case-insensitive search)
        const user = await User.find({
            username: {
                $regex: name,
                $options: 'i', // 'i' makes it case-insensitive
            },
        });

        if (!user || user.length === 0) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error in getUserByName",
        });
    }
};

export const getUserById=async(req,res)=>{
    try {

        const id=req.params.id
        const user=await User.findById(id)

        if(!user){
            return res.status(404).json({
                    message:"User not Found"
            })
        }

        res.status(200).json({
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in getUserby id"
        })
    }
}

export const GetUsers=async(req,res)=>{
    try {
        const users=await User.find()

        res.status(200).json({
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Error in GetUsers"
        })
    }
}
