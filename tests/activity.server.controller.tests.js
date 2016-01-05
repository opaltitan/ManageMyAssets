/**
 * Created by Justin on 12/31/2015.
 */

var app = require('../app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.Model('User'),
    Artifact = mongoose.model('Artifact'),
    Activity = mongoose.model('Activity'),
    Asset = mongoose.model('Asset');

var user, artifact, asset, activity, statements;

describe('Asset Controller Unit Tests: ', function(){
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
                subArtifactTypeCode: 'Deal',
                createdUser: user
            });
            artifact.save(function(){
                asset = new Asset({
                    assetTypeCode: 'Deal',
                    artifact: artifact,
                    createdUser: user,
                    assetDetails: {
                        deal: {
                            dealTypeCode: 'Multifamily',
                            dealName: 'Test_Deal'
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

    describe('Testing the GET methods', function(){
        it('Should be able to get the list of properties', function(done){
            request(app).get('/api/activities/actuals')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res){
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('activityTypeCode', activity.activityTypeCode);
                    done();
                })
        });

        it('Should be able to get the specific property ', function(done){
            request(app).get('/api/activities/financials/' + activity.artifact._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res){
                    res.body.should.be.an.Object.and.have.property('activityTypeCode', activity.activityTypeCode);
                    done();
                });
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