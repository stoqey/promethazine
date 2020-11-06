import * as k8s from "@kubernetes/client-node";
import { KubeConfig } from "@kubernetes/client-node";
import { CLUSTER_ID, DO_TOKEN } from "../config";
import { getKubeConfigFromDOWithHTTP } from "../do";
import { verbose } from "../logs";

/**
 * Load kubernetes configurations from digital ocean
 */
export const loadKubernetesConfigurationFromDO = async (): Promise<KubeConfig | null> => {
  try {
    const k8config = await getKubeConfigFromDOWithHTTP(DO_TOKEN, CLUSTER_ID);

    if (!k8config) {
      throw new Error("Error getting k8config");
    }

    const kc = new k8s.KubeConfig();
    kc.loadFromString(k8config);
    verbose("success -> loadKubernetesConfigurationFromDO");
    return kc;
  } catch (error) {
    console.log("error loadKubernetesConfigurationFromDO", error);
    return null;
  }
};
