/**
 * Created by Justin on 8/22/2015.
 */

exports.render = function(req, res) {
    res.render('index', {
        title: 'AMS',
        user: JSON.stringify(req.user)
    });
};