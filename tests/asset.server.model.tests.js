/**
 * Created by Justin on 12/28/2015.
 */

var app = require('../app.js'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Artifact = mongoose.model('Artifact'),
    Asset = mongoose.model('Asset');

var user, artifact, asset;

describe('Asset Model Unit Tests: ', function(){
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

    describe('Testing the save method', function(){
        it('Should be able to save without problems', function(){
            asset.save(function(err){
                should.not.exist(err);
            });
        });

        it('Should not be able to save an asset without an assetTypeCode', function(){
            asset.assetTypeCode = '';
            asset.save(function(err){
                should.exist(err);
            });
        });

        it('Should be able to save after inputting the Property information', function(){
            asset.assetDetails.property.propertyTypeCode = 'Multifamily';
            asset.assetDetails.property.propertyName = 'TEST_MF_1';
            asset.assetDetails.property.propertyAddressStreet = '123 Test Street';
            asset.assetDetails.property.propertyAddressCity = 'Test City';
            asset.assetDetails.property.propertyAddressState = 'DC';
            asset.assetDetails.property.propertyZip = '22222';
            asset.save(function(err){
                should.not.exist(err);
            });
        });

        it('Should not be able to save after inputting a non-allowable propertyTypeCode', function(){
            asset.assetDetails.property.propertyTypeCode = 'Multifamily_WRONG';
            asset.assetDetails.property.propertyName = 'TEST_MF_1';
            asset.assetDetails.property.propertyAddressStreet = '123 Test Street';
            asset.assetDetails.property.propertyAddressCity = 'Test City';
            asset.assetDetails.property.propertyAddressState = 'DC';
            asset.assetDetails.property.propertyZip = '22222';
            asset.save(function(err){
                should.exist(err);
            });
        });

        it('Should not be able to save after inputting a non-allowable propertyAddressState', function(){
            asset.assetDetails.property.propertyTypeCode = 'Multifamily';
            asset.assetDetails.property.propertyName = 'TEST_MF_1';
            asset.assetDetails.property.propertyAddressStreet = '123 Test Street';
            asset.assetDetails.property.propertyAddressCity = 'Test City';
            asset.assetDetails.property.propertyAddressState = 'DC_WRONG';
            asset.assetDetails.property.propertyZip = '22222';
            asset.save(function(err){
                should.exist(err);
            });
        });

        it('Should be able to save after changing the assetTypeCode to Deal', function(){
            asset.assetTypeCode = 'Deal';
            asset.assetDetails.property = {};
            asset.assetDetails.deal = {
                dealTypeCode: 'Multifamily',
                dealName: 'Test_Deal'
            };

            asset.save(function(err){
                should.not.exist(err);
            });
        });

        it('Should not be able to save after changing the dealTypeCode to a non-allowable dealTypeCode', function(){
            asset.assetTypeCode = 'Deal';
            asset.assetDetails.property = {};
            asset.assetDetails.deal = {
                dealTypeCode: 'Multifamily_WRONG',
                dealName: 'Test_Deal'
            };

            asset.save(function(err){
                should.exist(err);
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
});