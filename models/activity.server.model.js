/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact'),
    Asset = mongoose.model('Asset');

var ApprovalSchema = new schema ({
    approvalTypeCode: {
        type: String,
        trim: true,
        required: 'Approval Type is required.',
        enum: ['Approved','Rejected']
    },
    artifact: {
        type: schema.ObjectId,
        ref: 'Artifact'
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
        type: Date,
        default: Date.now
    },
    deletedUser: {
        type: schema.ObjectId,
        ref: 'User'
    }
});

var ActivitySchema = new schema ({
    activityTypeCode: {
        type: String,
        trim: true,
        required: 'Activity Type is required.',
        enum: ['Actuals','Budget','Forecast']
    },
    artifact: {
        type: schema.ObjectId,
        ref: 'Artifact'
    },
    asset: {
        type: schema.ObjectId,
        ref: 'Asset'
    },
    approvals: [ApprovalSchema],
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

ActivitySchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Activity', ActivitySchema);
