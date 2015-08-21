/**
 * Created by Justin on 8/21/2015.
 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Asset = mongoose.model('Asset'),
    Property = mongoose.model('Property');

var DealSchema = new schema ({
    dealTypeCode: {
        type: String,
        trim: true,
        required: 'Deal Type is required.',
        enum: ['Multifamily','Manufactured Housing','Development','Commercial','Mixed-Use']
    },
    asset: {
        type: schema.ObjectId,
        ref: 'Asset'
    },
    dealName: {
        type: String,
        trim: true,
        required: 'Deal Name is required.'
    },
    properties: [{
        property: {
            type: schema.ObjectId,
            ref: 'Property'
        },
        created: {
            type: Date,
            default: Date.now
        },
        createdUser: {
            type: schema.ObjectId,
            ref: 'User'
        }
    }],
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

DealSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Deal', DealSchema);
