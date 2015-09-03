/**
 * Created by Justin on 8/21/2015.
 */

var Asset = require('mongoose').model('Asset'),
    Property = require('mongoose').model('Property');

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
        Property.find()
            .exec(function(err, properties){
                if(err){
                    return data.status(400).send({
                        message: getErrorMessage(err)
                    });
                } else {
                    data.json(properties);
                }
            });

        io.to(socket.id).emit('connect', data);
    });
    socket.on('asset_addition', function(propertyId){
        io.emit('asset_addition', {
            propertyId: propertyId
        });
    });
};