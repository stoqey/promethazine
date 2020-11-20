import * as k8s from "@kubernetes/client-node";
import { KubeConfig, V1DaemonSet, V1Job } from "@kubernetes/client-node";
import _get from "lodash/get";
import { log } from "../../logs";
import { isSuccessStatusCode, Objectify } from "../../util/textUtils";

interface IDaemonset {
  daemonset: V1DaemonSet;
  kc: KubeConfig;
}

/**
 * Create a Daemonset
 * @param daemonset: V1DaemonSet;
 * @param args kc: KubeConfig
 */
export const createDaemonset = async (
  args: IDaemonset,
): Promise<V1Job | null> => {
  const { daemonset, kc } = args;

  const namespace = _get(daemonset, "metadata.namespace", "default");

  const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

  try {
    const createdJob = await k8sApi.createNamespacedDaemonSet(
      namespace,
      daemonset,
    );

    if (createdJob && createdJob.response.statusCode) {
      if (isSuccessStatusCode(createdJob.response.statusCode)) {
        const jobInJson = Objectify(createdJob.body);
        return jobInJson;
      }
    }

    throw new Error("Error creating the daemonset please check the options");
  } catch (error) {
    log("Error creating deployment", error);
    return null;
  }
};

interface IDaemonset {
  name: string;
  namespace: string;
  kc: KubeConfig;
}

/**
 * Delete a Daemonset
 * @param name: string,
 * @param namespace: string
 * @param kc: KubeConfig
 */
export const deleteDaemonset = async (args: IDaemonset): Promise<boolean> => {
  const { name, namespace, kc } = args;
  try {
    const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
    const deletedDaemonset = await k8sApi.deleteCollectionNamespacedDaemonSet(
      name,
      namespace,
    );
    if (deletedDaemonset && deletedDaemonset.body) {
      return true;
    }
    throw new Error("Failed to delete daemonset, please try again");
  } catch (error) {
    log("erorr deleting job", error);
    return false;
  }
};
