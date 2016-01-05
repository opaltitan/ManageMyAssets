/**
 * Created by Justin on 12/31/2015.
 */

var app = require('../app.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.Model('User'),
    Artifact = mongoose.model('Artifact'),
    Asset = mongoose.model('Asset');

var user, artifact, asset;

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
                done();
            });
        });
    });

    describe('Testing the GET methods', function(){
        it('Should be able to get the list of properties', function(done){
            request(app).get('/api/assets/properties')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res){
                    res.body.should.be.an.Array.and.have.lengthOf(1);
                    res.body[0].should.have.property('assetTypeCode', asset.assetTypeCode);
                    done();
                })
        });

        it('Should be able to get the specific property ', function(done){
            request(app).get('/api/assets/property/' + asset.artifact._id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err,res){
                    res.body.should.be.an.Object.and.have.property('assetTypeCode', asset.assetTypeCode);
                    done();
                });
        });
    });

    afterEach(function(done){
        Asset.remove(function(){
            Artifact.remove(function(){
                User.remove(function(){
                    done();
                });
            });
        });
    });
});