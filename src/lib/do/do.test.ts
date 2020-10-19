import DigitalOcean from  'do-wrapper';
import { expect } from 'chai';
import 'mocha';
import { createDigitalOceanClient, DigitalOceanClient } from './do.config';
require('dotenv').config();


const DO_TOKEN  = process.env.DO_TOKEN;

let digitalOceanClient: DigitalOcean = null;

describe('Digital Ocean Configuration', () =>  {

    it('should not create DO client when is empty', async () => {
        digitalOceanClient  = createDigitalOceanClient('');
        expect(digitalOceanClient).to.be.null;
    })

    it('should create DO client when token exists', async () => {
        digitalOceanClient  = createDigitalOceanClient(DO_TOKEN);
        expect(digitalOceanClient).to.be.exist;
    })
})


