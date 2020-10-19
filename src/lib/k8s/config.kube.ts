import * as k8s from "@kubernetes/client-node";
import { KubeConfig } from "@kubernetes/client-node";
import DO from "do-wrapper";
import { getK8sClusterConfig } from "../do";

/**
 * Load kubernetes configurations from digital ocean
 * @param clusterId
 * @param DO_TOKEN
 */
export const loadKubernetesConfigurationFromDO = async (
  clusterId: string,
  DO_TOKEN: string
): Promise<KubeConfig> => {
  const DigitalOcean = new DO(DO_TOKEN);

  const k8config = await getK8sClusterConfig(clusterId, DigitalOcean);
  const kc = new k8s.KubeConfig();
  kc.loadFromString(k8config);
  return kc;
};
