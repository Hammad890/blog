import { Schema,model } from "mongoose";

const postSchema= new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author :{type: Schema.Types.ObjectId, ref: 'users'}
},{
    timestamps: true,
  });
const Post = model('posts',postSchema)
export default Post