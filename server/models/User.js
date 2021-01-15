const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },

        password: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },

        verificationCode: {
            type: Number,
            required: true,
        },

        active: {
            type: Boolean,
            default: false,
            required: true,
        },

        exercises: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Exercise',
            required: true, 
        }],

        workouts: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Workout',
            required: true, 
        }],
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

module.exports.User = mongoose.model('User', UserSchema);