/**
 * Created by Justin on 8/21/2015.
 */
module.exports = function(io, socket) {
    //io.emit('connect', {});

    //socket.on('connect', function(data){
    //    //data.username = socket.request.user.username;
    //    //response.assets = Asset.find();
    //    Property.find()
    //        .exec(function(err, properties){
    //            if(err){
    //                return data.status(400).send({
    //                    message: getErrorMessage(err)
    //                });
    //            } else {
    //                //io.emit('connect', data.json(properties));
    //                data.json(properties);
    //            }
    //        });

    //    io.to(socket.id).emit('connect', data);
    //    //io.emit('connect', data);
    //});
//)
    socket.on('properties_list', function(message){
        message.type = 'refresh';
        io.broadcast.emit('properties_list', message);
    });
};