/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Activity = mongoose.model('Activity'),
    Asset = mongoose.model('Asset');

var LineItemSchema = new schema({
    lineItemCode: {
        type: String,
        trim: true,
        required: 'Chart of Account code required.',
        enum: ['PPLE','INTE','NOIT','FCPCNSLDTRET']
    },
    lineItemAmount: {
        type: number,
        required: 'Line Item Amount required.'
    }
});

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

var FinancialSchema = new schema ({
    activity: {
        type: schema.ObjectId,
        ref: 'Activity'
    },
    statements: [StatementSchema],
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

FinancialSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Financial', FinancialSchema);