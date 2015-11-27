/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User');

var CommentSchema = new schema ({
    commentText: {
        type: String,
        trim: true,
        required: 'Please enter a comment.'
    },
    created: {
        type: Date,
        default: Date.now
    },
    createdUser: {
        type: schema.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Date
    },
    deletedUser: {
        type: schema.ObjectId,
        ref: 'User'
    }
});

var ArtifactSchema = new schema ({
    artifactTypeCode: {
        type: String,
        trim: true,
        required: 'Artifact Type Required.',
        enum: ['asset','activities','workflows']
    },
    subArtifactTypeCode: {
        type: String,
        trim: true,
        required: 'Sub-Artifact Type Required.',
        enum: ['Property','Deal','Actuals','Budget','Forecast']
    },
    comments: [CommentSchema],
    created: {
        type: Date,
        default: Date.now
    },
    createdUser: {
        type: schema.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Date
    },
    deletedUser: {
        type: schema.ObjectId,
        ref: 'User'
    }
});

ArtifactSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Artifact', ArtifactSchema);