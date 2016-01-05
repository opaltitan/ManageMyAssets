/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact'),
    deepPopulate = require('mongoose-deep-populate')(mongoose);


// Property schema (not used)
var PropertySchema = new schema ({
    propertyTypeCode: {
        type: String,
        trim: true,
        required: 'Property Type is required.',
        enum: ['Multifamily','Manufactured Housing','Development Multifamily','Commercial']
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
    }
});

// Deal schema (not used)
var DealSchema = new schema ({
    dealTypeCode: {
        type: String,
        trim: true,
        required: 'Deal Type is required.',
        enum: ['Multifamily','Manufactured Housing','Development','Commercial','Mixed-Use']
    },
    dealName: {
        type: String,
        trim: true,
        required: 'Deal Name is required.'
    },
    properties: [{
        asset: {
            type: schema.ObjectId,
            ref: 'Asset'
        }
    }]
});

// Data model for assets
var AssetSchema = new schema ({
    assetTypeCode: {
        type: String,
        trim: true,
        required: 'Asset Type is required.',
        enum: ['Property','Deal']
    },
    // DbRef to 'artifact'.
    // Every activity needs to be tied to an artifact.
    artifact: {
        type: schema.ObjectId,
        ref: 'Artifact'
    },
    assetDetails: {
        // Property-level fields.
        property: {
            propertyTypeCode: {
                type: String,
                trim: true,
                //required: 'Property Type is required.',
                enum: ['Multifamily','Manufactured Housing','Development Multifamily','Commercial']
            },
            propertyName: {
                type: String,
                //required: 'Property Name is required.',
                trim: true
            },
            propertyAddressStreet: {
                type: String,
                //required: 'Property Address is required.',
                trim: true
            },
            propertyAddressCity: {
                type: String,
                //required: 'Property City is required.',
                trim: true
            },
            propertyAddressState: {
                type: String,
                trim: true,
                //required: 'Property State is required.',
                enum: ['VA','DC','MD']
            },
            propertyAddressZip: {
                type: String,
                //required: 'Property Zip Code is required.',
                trim: true
            }
        },
        // Deal-level fields
        deal: {
            dealTypeCode: {
                type: String,
                trim: true,
                //required: 'Deal Type is required.',
                enum: ['Multifamily','Manufactured Housing','Development','Commercial','Mixed-Use']
            },
            dealName: {
                type: String,
                //required: 'Deal Name is required.',
                trim: true
            },
            // Deals can have multiple properties tied to them
            properties: [{
                asset: {
                    type: schema.ObjectId,
                    ref: 'Asset'
                }
            }]
        }
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

// Allows use of the 'deepPopulate' plugin, which can query through ObjectIDs simply and easily.
AssetSchema.plugin(deepPopulate, {});

mongoose.model('Asset', AssetSchema);
