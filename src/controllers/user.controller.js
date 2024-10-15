import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import {User} from '../models/user.models.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

// import {ApiResponse} from '../utils/ApiResponse.js'
// get user details from front-end
// validation - not empty
// check if user already exist userName aur Email
// check for images, check for avatar
// Upload them to cloudinary
// create user object = create entry in db
// remove password and refresh token field from response
// check for user creation
// return response
const registerUser = asyncHandler(async (req, res) => {
  const {username,fullName,email,password} = req.body

  if(
    [fullName,email,username,password].some((field)=> field?.trim() === '' )
  ) { 
      throw new ApiError(400,'All fields are required');
  }
  const existingUser = User.findOne({
    $or:[{username},{email}],
  })
  if(existingUser) {
    throw new ApiError(400,'User Already Exists')
  }
  const avatarLocalPath =  req?.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath) {
      throw new ApiError(400,'Avatar file is required');
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if(!avatar){
    throw new ApiError(400,'Avtar file is requied');
  }
  const user = User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
  const createdUser  = await User.findById(user._id).select("-password -refreshToken");
  if(createdUser){
    throw new ApiError(500,'Something went wron while registering the user');
  }
  return res.status(201,json(
    new ApiResponse(200,createdUser,'User Registered Successfully')
  ))
});

export {registerUser};