import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter a valid email address"],
        unique: [true, "Entered email already exists !"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    image: {
        type: String,
    }
});

// This route will call on every signle request, so it will create a new connection every time. The models.user will check if user model is already created or exist, then it will not create a new one instead it will use existing one.
const User = models.User || model("User", userSchema);

export default User;