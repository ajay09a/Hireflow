import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const getMyProfileService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};