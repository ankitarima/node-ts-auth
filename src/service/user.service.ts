import asyncHandler from "../middleware/async.middleware";
import UserModel from "../model/user.model";


export const createUser = async(data: any)=>{
    return UserModel.create(data);
}