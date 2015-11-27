/**
 * Created by Justin on 9/19/2015.
 */

var mongoose = require('mongoose'),
    schema = mongoose.Schema;

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

LineItemSchema.set('toJson', {getters: true, virtuals: true });

mongoose.model('LineItem', LineItemSchema);