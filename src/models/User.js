import mongoose from "mongoose";
import validator from "validator";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength:3,
            maxlength: 64,
        },

        firstname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 64,
        },

        lastname: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 64,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email address",
            }
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            validate: {
                validator: function (value) {
                    return validator.isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 0,
                        minNumbers: 1,
                        minSymbols: 1,
                    });
                },
                message: "Password must be at least 8 characters long and contain: uppercase, lowercase, number, and symbol",
            }
        }    

    }, { timestamps: true }
);


//Hash password before saving
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await argon2.hash(this.password, {
            type: argon2.argon2id,
            memoryCost: 19456,  // 19 MiB
            timeCost: 2,
            parallelism: 1,
        });
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return argon2.verify(this.password, candidatePassword);
};


export default mongoose.model("User", userSchema); 