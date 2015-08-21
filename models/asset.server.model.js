/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact');

var AssetSchema = new schema ({
    assetTypeCode: {
        type: String,
        trim: true,
        required: 'Asset Type is required.',
        enum: ['Property','Deal']
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
        type: Date
    },
    deletedUser: {
        type: schema.ObjectId,
        ref: 'User'
    }
});

AssetSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Asset', AssetSchema);
