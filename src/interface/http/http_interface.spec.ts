import * as chai from 'chai';
import 'mocha';
import chaiHttp = require('chai-http');
import { init, serverInstance, httpInterfaceModule, start } from './index';
import { Container } from 'inversify';
import { appModuleMock } from './../../app/app.mock';

chai.use(chaiHttp);
const loaderContainer = new Container();
loaderContainer.load(appModuleMock);
loaderContainer.load(httpInterfaceModule);
init(loaderContainer);

describe('Hello API Request', () => {
    it('should start the server', () => {
        let listeningServer = start();
        chai.expect(listeningServer).to.exist;
        listeningServer.close();
    });
    it('receive data on GET /users', () => {
        return chai
            .request(serverInstance)
            .get('/users')
            .then(res => {
                chai.expect(res.body.status).to.equal(200);
                chai.expect(res.body.data.length).to.equal(2);
            });
    });
    it('receive data on GET /users/:userId', () => {
        return chai
            .request(serverInstance)
            .get('/users/1')
            .then(res => {
                chai.expect(res.body.status).to.equal(200);
                chai.expect(res.body.data.userId).to.equal(1);
            });
    });
    it('update data on PUT /users/:userI', () => {
        return chai
            .request(serverInstance)
            .put('/users/1')
            .send({ email: 'test@test.com' })
            .then(res => {
                chai.expect(res.body.status).to.equal(200);
                chai.expect(res.body.data.userId).to.equal(1);
            });
    });
    it('create data on POST /users', () => {
        return chai
            .request(serverInstance)
            .post('/users')
            .send({ email: 'test@test.com', firstName: 'john', lastName: 'doe', age: 31 })
            .then(res => {
                chai.expect(res.body.status).to.equal(201);
                chai.expect(res.body.data.userId).to.equal(1);
            });
    });
    it('delete data on DELETE /users/:userId', () => {
        return chai
            .request(serverInstance)
            .del('/users/1')
            .then(res => {
                chai.expect(res.body.status).to.equal(200);
            });
    });

    it('should send joi errors properly on DELETE /users/:userId', () => {
        return chai
            .request(serverInstance)
            .del('/users/aze')
            .then(res => {
                chai.expect(res.body.status).to.equal(400);
            });
    });

    it('should send joi errors properly on GET /users/:userId', () => {
        return chai
            .request(serverInstance)
            .get('/users/aze')
            .then(res => {
                chai.expect(res.body.status).to.equal(400);
            });
    });

    it('should send joi errors properly on DELETE /users/:userId', () => {
        return chai
            .request(serverInstance)
            .put('/users/aze')
            .send({})
            .then(res => {
                chai.expect(res.body.status).to.equal(400);
            });
    });

    it('should send joi errors properly on POST /users', () => {
        return chai
            .request(serverInstance)
            .post('/users')
            .send({})
            .then(res => {
                chai.expect(res.body.status).to.equal(400);
            });
    });
});
