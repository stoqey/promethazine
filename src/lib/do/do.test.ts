import { expect } from 'chai';
import 'mocha';
import { getKubeConfigFromDOWithHTTP } from './do.config';
import {DO_TOKEN, CLUSTER_ID} from '../../config';

describe('Digital Ocean Configuration', () =>  {

    it('should return kubernetes cluster configuration when CLUSTER_ID and DO_TOKEN is present', async () => {
        const kubeconfig  = await getKubeConfigFromDOWithHTTP(DO_TOKEN, CLUSTER_ID);
        console.log('kubernetes config', JSON.stringify(kubeconfig))
        expect(kubeconfig).to.be.exist;
    })

    it('should return not kubernetes cluster configuration when CLUSTER_ID and DO_TOKEN is empty', async () => {
        const kubeconfig  = await getKubeConfigFromDOWithHTTP('', '');
        expect(kubeconfig).to.be.null;
    })
})
