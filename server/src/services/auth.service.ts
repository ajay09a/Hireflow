import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const hashPassword = async(password:string): Promise<string> =>{
    const saltRound = 12;

    const hashedPassword = await bcrypt.hash(password, saltRound);

    return hashedPassword;
}

const comparePassword = async(
    password: string,
    hashedPassword: string,
): Promise<boolean> =>{
    return bcrypt.compare(password, hashedPassword);
}

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export const registerService = async (data: RegisterInput) => {
    const existingUser = await User.findOne({email:data.email});

    if(existingUser){
        throw new AppError("Email is already registered", 409);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await User.create({
        ...data,
        password: hashedPassword,
        role: "candidate",
    })

    return user;
}

export {hashPassword, comparePassword};