import userModel from "../models/userModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import 'dotenv/config'

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "User Already Exist" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid Email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter Strong Password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const userLogin = async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    // console.log(user);

    try {
        if (!user) {
            return res.json({ success: false, message: "User Not Exist" })
        }
        // console.log(password);
        // console.log(user.password);


        const isMatch = await bcrypt.compare(password, user.password)
        // console.log(isMatch);

        if (!isMatch) {
            return res.json({ success: false, message: "Password not matched" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" })
    }
}

export { userRegister, userLogin }