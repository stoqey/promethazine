import { expect } from 'chai';
import 'mocha';
import { getKubernetesConfigUsingHTTP } from './do.config';
import {DO_TOKEN, CLUSTER_ID} from '../../config';

describe('Digital Ocean Configuration', () =>  {

    it('should return kubernetes cluster configuration when CLUSTER_ID and DO_TOKEN is present', async () => {
        const kubeconfig  = await getKubernetesConfigUsingHTTP(DO_TOKEN, CLUSTER_ID);
        console.log('kubernetes config', JSON.stringify(kubeconfig))
        expect(kubeconfig).to.be.exist;
    })

    it('should return not kubernetes cluster configuration when CLUSTER_ID and DO_TOKEN is empty', async () => {
        const kubeconfig  = await getKubernetesConfigUsingHTTP('', '');
        expect(kubeconfig).to.be.null;
    })
})
