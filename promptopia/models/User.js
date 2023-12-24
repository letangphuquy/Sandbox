import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email must not be empty']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[\p{L}\p{Mn}\p{Pd}a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    // added support for unicode name: https://www.regular-expressions.info/unicode.html 
    image: {
        type: String
    }
})
// IT SEEMS LIKE IT ALWAYS TAKE THE models.User according to what I created, so, yeah just the old regex
// [a-zA-Z0-9] but it works well :)
const User = models.User || model("User", UserSchema);
export default User;