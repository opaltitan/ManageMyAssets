/**
 * Created by Justin on 8/21/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    User = mongoose.model('User'),
    Activity = mongoose.model('Activity'),
    Statement = mongoose.model('Statement'),
    Asset = mongoose.model('Asset'),
    deepPopulate = require('mongoose-deep-populate')(mongoose);

var FinancialSchema = new schema ({
    activity: {
        type: schema.ObjectId,
        ref: 'Activity'
    },
    statements: [Statement],
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

FinancialSchema.plugin(deepPopulate, {
/*    whitelist: [
        'activity',
        'activity.asset'
    ]*/
});

mongoose.model('Financial', FinancialSchema);