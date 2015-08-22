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

    var assetNamespace = io.of('/asset');
    assetNamespace.on('connection', function(socket){
        require('../socketio/asset.server.socketio.js')(assetNamespace, socket);
    });
    var activityNamespace = io.of('/activity');
    activityNamespace.on('connection', function(socket) {
        require('../controllers/activity.server.controller')(activityNamespace, socket);
    });
    var reportingNamespace = io.of('/reporting');
    reportingNamespace.on('connection', function(socket) {
        require('../controllers/reporting.server.controller')(reportingNamespace, socket);
    });

    //io.on('connection', function(socket){
    //    require('../controllers/chat.server.controller')(io, socket);
    //});
};