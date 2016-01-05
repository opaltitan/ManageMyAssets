/**
 * Created by Justin on 12/28/2015.
 */
var app = require('../app.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact'),
    Asset = mongoose.model('Asset'),
    Activity = mongoose.model('Activity');

var user, artifact, asset, activity;

var statements, statementLineItems;

describe('Activity Model Unit Tests: ', function(){
    beforeEach(function(done){
        user = new User({
            firstName: 'Test_First',
            lastName: 'Test_Last',
            email: 'patte2jd@gmail.com',
            username: 'Test_test',
            password: 'test123'
        });
        user.save(function(){
            artifact = new Artifact({
                artifactTypeCode: 'asset',
                subArtifactTypeCode: 'Property',
                createdUser: user
            });
            artifact.save(function(){
                asset = new Asset({
                    assetTypeCode: 'Property',
                    artifact: artifact,
                    createdUser: user,
                    assetDetails: {
                        property: {
                            propertyTypeCode: 'Multifamily',
                            propertyName: '',
                            propertyAddressStreet: '',
                            propertyAddressCity: '',
                            propertyAddressState: 'DC',
                            propertyAddressZip: ''
                        }
                    }
                });
                asset.save(function(){
                    activity = new Activity({
                        activityTypeCode: 'Actuals',
                        activityDetails: {
                            financial: {
                                effectiveDate: '2015-09-30',
                                statements: [{
                                    statementTypeCode: 'Actuals',
                                    statementDateBegin: '2015-09-01',
                                    statementDateEnd: '2015-09-30',
                                    statementLineItems: [{
                                        lineItemCode: 'GPRT',
                                        lineItemAmount: 0
                                    },{
                                        lineItemCode: 'PPLE',
                                        lineItemAmount: 1
                                    },{
                                        lineItemCode: 'NOIT',
                                        lineItemAmount: 2
                                    }]
                                }]
                            }
                        }
                    });
                    statements = activity.activityDetails.financial.statements;
                    done();
                });
            });
        });
    });


    describe('Testing the activity save method', function(){
        it('Should be able to save without problems', function(){
            activity.save(function(err){
                should.not.exist(err);
            });
        });

        it('Should not be able to save an activity without an activityTypeCode', function(){
            activity.activityTypeCode = '';
            activity.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save an activity without an Effective Date', function(){
            activity.activityDetails.financial.effectiveDate = '';
            activity.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save an activity without statementTypeCode', function(){
            statements.forEach(function(itemStatement){
                itemStatement.statementTypeCode = '';
            });
            activity.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save an activity without statementDateBegin', function(){
            statements.forEach(function(itemStatement){
                itemStatement.statementDateBegin = '';
        });
            activity.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save an activity without statementDateEnd', function(){
            statements.forEach(function(itemStatement){
                itemStatement.statementDateEnd = '';
            });
            activity.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save an activity with lineItemCode blank.', function(){
            statements.forEach(function(itemStatement){
                itemStatement.statementLineItems.forEach(function(lineItem){
                    lineItem.lineItemCode = '';
                });
            });
            activity.save(function(err){
                should.exist(err);
            });
        });

        afterEach(function(done){
            Activity.remove(function(){
                Asset.remove(function(){
                    Artifact.remove(function(){
                        User.remove(function(){
                            done();
                        });
                    });
                });
            });
        });

    });
});