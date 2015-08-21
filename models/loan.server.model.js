/**
 * Created by Justin on 8/21/2015.
 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Asset = mongoose.model('Asset');

var LoanSchema = new schema ({
    loanTypeCode: {
        type: String,
        trim: true,
        required: 'Property Type is required.',
        enum: ['Standard Amortizing','Construction Loan','Mezzanine']
    },
    asset: {
        type: schema.ObjectId,
        ref: 'Asset'
    },
    loanNumber: {
        type: String,
        trim: true,
        required: 'Loan Number is required.'
    },
    loanClosingDate: {
        type: Date,
        required: 'Loan Closing Date is required.'
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

LoanSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Loan', LoanSchema);
