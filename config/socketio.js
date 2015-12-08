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

        socket.on('properties_list', function(message){
            console.log('connected in properties_list');
            io.emit('properties_list', message);
        });

        socket.on('deals_list', function(message) {
            console.log('connected in deals_list');
            io.emit('deals_list', message);
        });

        socket.on('actuals_list', function(message) {
            console.log('connected in actuals_list');
            console.log(message.artifact_id);
            io.emit('actuals_list', message);
            io.emit('reporting_actuals', message);
        });

        socket.on('budget_list', function(message) {
            console.log('connected in budget_list');
            io.emit('budget_list', message);
        });

        socket.on('forecast_list', function(message) {
            console.log('connected in forecast_list');
            io.emit('forecast_list', message);
        });

        /*
        socket.on('reporting_actuals', function(message) {
            console.log('connected in reporting_actuals');
            io.emit('reporting_actuals', message);
        });
        */

        socket.on('disconnect', function(){
            console.log('disconnected');
        });

    });

};