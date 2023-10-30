
import mongoose, { models } from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists!']
    },
    password: {
        type: String,
        required: true
    },
    stripe_customer_id:{
        type: String
    }
})

const User = models.User || mongoose.model("User", userSchema)
export default User