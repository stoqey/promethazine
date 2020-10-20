import * as k8s from '@kubernetes/client-node';
import {KubeConfig} from '@kubernetes/client-node';

interface Args {
    namespace: string;
    name: string;
    replicas: number;
}

/**
 * Scale a deployment
 * @param kc
 * @param args
 */
export async function scaleDeployment(kc: KubeConfig, args: Args): Promise<boolean> {
    const {namespace, name, replicas} = args;

    try {
        const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

        // find the particular deployment
        const res = await k8sApi.readNamespacedDeployment(name, namespace);
        const deployment = res.body;

        // edit
        deployment.spec.replicas = replicas;

        // replace
        await k8sApi.replaceNamespacedDeployment(name, namespace, deployment);
        return true;
    } catch (error) {
        console.log('error scaleDeployment', error);
        return false;
    }
}
