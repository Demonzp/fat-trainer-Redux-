const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true,
        },

        exercises: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise',
                required: true,
            },
            measurment: {
                type: Number,
                required: true,
            },
            repeats: {
                type: Number,
                required: true,
            },
        }],
        
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

module.exports.Workout = mongoose.model('Workout', WorkoutSchema);