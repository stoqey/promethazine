import k8s, { KubeConfig } from "@kubernetes/client-node";
import { DO_TOKEN, CLUSTER_ID } from "../../config";
import { log } from "../../logs";
import { getKubernetesConfigUsingHTTP } from "../do";

/**
 * Load kubernetes configurations from digital ocean
 */
export const loadKubernetesConfigurationFromDO = async (): Promise<
  KubeConfig
> => {
  try {
    const k8config = await getKubernetesConfigUsingHTTP(DO_TOKEN, CLUSTER_ID);
    const kc = new k8s.KubeConfig();
    kc.loadFromString(k8config);
    return kc;
  } catch (error) {
    log("error loadKubernetesConfigurationFromDO", error);
    return null;
  }
};
