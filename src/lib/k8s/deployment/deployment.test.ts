import { expect } from 'chai';
import 'mocha';
import { scaleDeployment } from './scale.deployment'
import { loadKubernetesConfigurationFromDO } from '../k8s.config';

let kubeconfig = null;

before((done) => {
    loadKubernetesConfigurationFromDO().then(k8sconfig => {
        kubeconfig = k8sconfig;
        done()
    })
})
describe('Deployment', () =>  {
    it('should scale a sample deployment', async () => {
        const scaleDeploy = await scaleDeployment(kubeconfig, {
            replicas: 1,
            name: 'ibkr',
            namespace: 'default'
        });

        console.log('scaled deployment', scaleDeploy)

        expect(scaleDeploy).to.be.true;
    })
})
