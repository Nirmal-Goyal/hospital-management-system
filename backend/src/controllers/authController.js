import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//REGISTER-USER
export const registerUser = async(req, res) => {
    try {
        const {name, email, password, role, specialization} = req.body;

        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            specialization
        })

        res.status(201).json({
            message: "User register successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



//LOGIN-USER
export const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            res.status(401).json({
                message: "invalid credentials"
            })
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.json({
            message: "login successfully",
            user,
            token
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}