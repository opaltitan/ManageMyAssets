/**
 * Created by Justin on 8/20/2015.
 */
/**
 * Created by Justin on 7/24/2015.
 */

var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

module.exports = function(server, io, mongoStore){
    io.use(function(socket, next){
        cookieParser(config.sessionSecret)(socket.request, {}, function(err){
            var sessionId = socket.request.signedCookies['connect.sid'];

            mongoStore.get(sessionId, function(err, session){
                socket.request.session = session;

                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket.request, {}, function() {
                        if(socket.request.user){
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

    io.sockets.on('connection', function(socket){
        console.log('connected');
        //socket.emit('properties_list', {type:'refresh'});
        socket.on('properties_list', function(message){
            console.log('connected in properties_list');
            //message.type = 'refresh';
            //socket.join('properties_list');
            io.emit('properties_list', message);
            //socket.emit('properties_list', message);
        });

        socket.on('deals_list', function(message) {
            console.log('connected in deals_list');
            //message.type = 'refresh';
            console.log('message.asset_id:' + message.asset_id);
            io.emit('deals_list', message);
            message = "";
        });

        socket.on('disconnect', function(){
            console.log('disconnected');
        });
        //require('../socketio/property.server.socketio')(io, socket);
        //require('../socketio/deal.server.socketio')(io, socket);
    });

    //var propertyNamespace = io.of('/property');
    //propertyNamespace.on('connection', function(socket){
        //console.log('User: ' + socket.request.user);
    //    require('../socketio/property.server.socketio.js')(propertyNamespace, socket);
    //});

    //var dealNamespace = io.of('/deal');
    //dealNamespace.on('connection', function(socket){
    //    require('../socketio/deal.server.socketio.js')(dealNamespace, socket);
    //});



    /*var activityNamespace = io.of('/activity');
    activityNamespace.on('connection', function(socket) {
        require('../controllers/activity.server.controller')(activityNamespace, socket);
    });
    var reportingNamespace = io.of('/reporting');
    reportingNamespace.on('connection', function(socket) {
        require('../controllers/reporting.server.controller')(reportingNamespace, socket);
    });*/

    //io.on('connection', function(socket){
    //    require('../controllers/chat.server.controller')(io, socket);
    //});
};