import k8s, { KubeConfig, V1Namespace } from '@kubernetes/client-node';

interface Args {
    namespace: string; name: string; replicas: number;
};

/**
 * Scale a deployment
 * @param kc 
 * @param args 
 */
export async function scaleDeployment(kc: KubeConfig, args: Args) {

    const { namespace, name, replicas} = args;
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

    // find the particular deployment
    const res = await k8sApi.readNamespacedDeployment(name, namespace);
    let deployment = res.body;
  
    // edit
    deployment.spec.replicas = replicas;
  
    // replace
    await k8sApi.replaceNamespacedDeployment(name, namespace, deployment);
  }