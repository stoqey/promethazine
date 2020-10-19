import { expect } from 'chai';
import 'mocha';
import { createDigitalOceanClient, DigitalOceanClient } from './do.config';

const DO_KEY  = process.env.DO_KEY;

let digitalOceanClient: DigitalOceanClient = null;

describe('Digital Ocean', () =>  {

    it('should create DO client', async () => {
        digitalOceanClient  = createDigitalOceanClient(DO_KEY);
        console.log('DO client is', Object.keys(digitalOceanClient));
        expect(digitalOceanClient).to.be.exist;
    })
})


