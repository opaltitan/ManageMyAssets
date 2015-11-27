/**
 * Created by Justin on 9/19/2015.
 */
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    LineItem = mongoose.model('LineItem');

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
    statementLineItems: [LineItem]
});

StatementSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('Statement', StatementSchema);