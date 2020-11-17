import * as k8s from "@kubernetes/client-node";
import { KubeConfig } from "@kubernetes/client-node";
import { log } from "../../logs";

interface Args {
  kc: KubeConfig;
  namespace: string;
  fieldSelector: string;
}

/**
 * Clean pods
 * @param kc
 * @param args
 */
export const cleanPods = async (args: Args): Promise<boolean> => {
  const { kc, namespace, fieldSelector } = args;

  try {
    const exec = kc.makeApiClient(k8s.CoreV1Api);
    await exec.deleteCollectionNamespacedPod(
      namespace,
      undefined,
      undefined,
      undefined,
      fieldSelector,
    );
    return true;
  } catch (error) {
    log("Error executing", error);
    return false;
  }
};
