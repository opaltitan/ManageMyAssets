/**
 * Created by Justin on 8/21/2015.
 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Asset = mongoose.model('Asset');

var PropertySchema = new schema ({
    propertyTypeCode: {
        type: String,
        trim: true,
        required: 'Property Type is required.',
        enum: ['Multifamily','Manufactured Housing','Development Multifamily','Commercial']
    },
    asset: {
        type: schema.ObjectId,
        ref: 'Asset'
    },
    propertyName: {
        type: String,
        trim: true,
        required: 'Property Name is required.'
    },
    propertyAddressStreet: {
        type: String,
        trim: true,
        required: 'Property Address is required.'
    },
    propertyAddressCity: {
        type: String,
        trim: true,
        required: 'Property City is required.'
    },
    propertyAddressState: {
        type: String,
        trim: true,
        required: 'Property State is required.',
        enum: ['VA','DC','MD']
    },
    propertyAddressZip: {
        type: String,
        trim: true,
        required: 'Property Zip Code is required.'
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

PropertySchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Property', PropertySchema);
