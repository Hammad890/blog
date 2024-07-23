import { Schema,model } from "mongoose";

const userSchema= new Schema({
    username: {type : String, require: true, min : 4,unique: true},
    password: {type: String,require: true},
})

const User= model('users',userSchema)
export default User