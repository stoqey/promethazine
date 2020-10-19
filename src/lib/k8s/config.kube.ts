import * as k8s from '@kubernetes/client-node';

/**
 * Load kubernetes configurations from env cluster ID
 */
export const loadKubernetesConfiguration = async (): Promise<KubeConfig> => {
    const k8config = await getK8sClusterConfig(clusterId);
    const kc = new k8s.KubeConfig();
    kc.loadFromString(k8config);
    return kc;
}

