import { expect } from 'chai';
import 'mocha';
import { createDigitalOceanClient, DigitalOceanClient } from './do.config';

const DO_TOKEN  = process.env.DO_TOKEN;

let digitalOceanClient: DigitalOceanClient = null;

describe('Digital Ocean', () =>  {

    it('should create DO client', async () => {
        digitalOceanClient  = createDigitalOceanClient(DO_TOKEN);
        expect(digitalOceanClient).to.be.exist;
    })
})


