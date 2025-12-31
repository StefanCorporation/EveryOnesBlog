import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        default: '', 
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',           // ← links to User model
        required: true
    },
    // Optional: post image
    image: {
        type: String,  // path like /uploads/posts/image.jpg
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true  // adds createdAt and updatedAt automatically
});

// Index for faster queries
postSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model('Post', postSchema);