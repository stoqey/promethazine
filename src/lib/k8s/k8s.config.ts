import * as k8s from "@kubernetes/client-node";
import { KubeConfig } from "@kubernetes/client-node";
import { DO_TOKEN, CLUSTER_ID } from "../../config";
import { log } from "../../logs";
import { getKubeConfigFromDOWithHTTP } from "../do";

/**
 * Load kubernetes configurations from digital ocean
 */
export const loadKubernetesConfigurationFromDO = async (): Promise<
  KubeConfig
> => {
  try {
    const k8config = await getKubeConfigFromDOWithHTTP(DO_TOKEN, CLUSTER_ID);
    const kc = new k8s.KubeConfig();
    kc.loadFromString(k8config);
    return kc;
  } catch (error) {
    console.log("error loadKubernetesConfigurationFromDO", error);
    return null;
  }
};