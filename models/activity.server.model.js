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
/*
var LineItemSchema = new schema({
    lineItemCode: {
        type: String,
        trim: true,
        required: 'Chart of Account code required.',
        enum: ['GRPT','PPLE','INTE','NOIT','FCPCLDRET','VCNY']
    },
    lineItemAmount: {
        type: Number,
        required: 'Line Item Amount required.'
    }
});
*/
/*
var StatementSchema = new schema({
    statementTypeCode: {
        type: String,
        trim: true,
        enum: ['Acquisition Month','Actuals','Budget','Projected']
    },
    statementDateBegin: {
        type: Date,
        required: 'Must enter Statement Begin Date'
    },
    statementDateEnd: {
        type: Date,
        required: 'Must enter Statement End Date'
    },
    statementLineItems: [LineItemSchema]
});
*/

/*var FinancialSchema = new schema ({
    statements: [Statement]
});*/

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

ActivitySchema.plugin(deepPopulate, {});

mongoose.model('Activity', ActivitySchema);
