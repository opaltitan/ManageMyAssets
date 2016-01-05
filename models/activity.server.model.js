/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact'),
    Asset = mongoose.model('Asset'),
    //Statement = mongoose.model('Statement'),
    deepPopulate = require('mongoose-deep-populate')(mongoose);

// This is the data model for the activity approvals.
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

// Data model for activities
var ActivitySchema = new schema ({
    activityTypeCode: {
        type: String,
        trim: true,
        required: 'Activity Type is required.',
        enum: ['Actuals','Budget','Forecast']
    },
    activityDetails: {
        financial: {
            effectiveDate: {
                type: Date,
                required: 'Must enter Effective Date'
            },
            // 'Actuals' will have 1 statement record with statementDateBegin = Month Begin && statementDateEnd == Month End
            // 'Budget' will have 12 statement records with each statementDateBegin = Month Begin && statementDateEnd == Month End
            // 'Forecast' will have any number of statement records with the first statementDateBegin == "first day of Acquisition Month" && statementDateEnd == "last day of Acquisition Month". For every other statement: statementDateBegin == "first day of the quarter" && statementDateEnd == "last day of the quarter"
            statements: [{
                statementTypeCode: {
                    type: String,
                    trim: true,
                    enum: ['Acquisition Month', 'Actuals', 'Budget', 'Projected']
                },
                statementDateBegin: {
                    type: Date,
                    required: 'Must enter Statement Begin Date'
                },
                statementDateEnd: {
                    type: Date,
                    required: 'Must enter Statement End Date'
                },
                // Each statement will have 1 array of statementLineItems. No lineItemCode should ever repeat within a statement.
                statementLineItems: [{
                    lineItemCode: {
                        type: String,
                        trim: true,
                        required: 'Chart of Account code required.',
                        enum: ['GRPT', 'PPLE', 'INTE', 'NOIT', 'FCPCLDRET', 'VCNY']
                    },
                    lineItemAmount: {
                        type: Number,
                        required: 'Line Item Amount required.'
                    }
                }]
            }]
        }
    },
    // DbRef to 'artifact'.
    // Every activity needs to be tied to an artifact.
    artifact: {
        type: schema.ObjectId,
        ref: 'Artifact'
    },
    // DbRef to 'asset'.
    // Every activity needs to be tied to an asset.
    asset: {
        type: schema.ObjectId,
        ref: 'Asset'
    },
    // Array of approvals (see model schema at the top)
    approvals: [ApprovalSchema],
    // This is populated by default with the DateTime of the record create.
    created: {
        type: Date,
        default: Date.now
    },
    // DbRef to 'user'.
    // This should always be populated with the user who created the record.
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

// Allows use of the 'deepPopulate' plugin, which can query through ObjectIDs simply and easily.
ActivitySchema.plugin(deepPopulate, {});

mongoose.model('Activity', ActivitySchema);
