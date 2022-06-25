import User from "../model/user.model";


export const createUser = async(data: any)=>{
    return User.create(data);
}

export const getUserByEmailWithPassword =async (email:any) => {
    return User.findOne({email}).select('+password');
}

export const getUserById =async (id:any) => {
    return User.findById(id);
}