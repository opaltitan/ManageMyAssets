/**
 * Created by Justin on 9/5/2015.
 */

var Asset = require('mongoose').model('Asset'),
    Deal = require('mongoose').model('Deal');

var getErrorMessage = function(err){
    var message = '';
    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Error occurred.';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for(var errName in err.errors){
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

module.exports = function(io, socket) {
    socket.on('connect', function(data){
        //data.username = socket.request.user.username;
        //response.assets = Asset.find();
        Deal.find()
            .exec(function(err, deals){
                if(err){
                    return data.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    data.json(deals);
                }
            });

        io.to(socket.id).emit('connect', data);
    });
    socket.on('asset_addition', function(dealId){
        io.emit('asset_addition', {
            dealId: dealId
        });
    });
};