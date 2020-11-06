import * as k8s from "@kubernetes/client-node";
import { KubeConfig, V1Job } from "@kubernetes/client-node";
import _get from "lodash/get";
import { log } from "../../logs";
import { isSuccessStatusCode, Objectify } from "../../util/textUtils";

interface ICreateJob {
  job: V1Job;
  kc: KubeConfig;
}

/**
 * Create a Job
 * @param job: V1Job;
 * @param args kc: KubeConfig
 */
export const createJob = async (args: ICreateJob): Promise<V1Job | null> => {
  const { job, kc } = args;

  const namespace = _get(job, "metadata.namespace", "default");

  const k8sApi = kc.makeApiClient(k8s.BatchV1Api);

  try {
    const createdJob = await k8sApi.createNamespacedJob(namespace, job);

    if (createdJob && createdJob.response.statusCode) {
      if (isSuccessStatusCode(createdJob.response.statusCode)) {
        // create deployment in firebase
        const jobInJson = Objectify(createdJob.body);
        return jobInJson;
      }
    }

    throw new Error("Error creating the deployment please check the options");
  } catch (error) {
    log("Error creating deployment", error);
    return null;
  }
};

interface IDeleteJob {
  jobName: string;
  namespace: string;
  kc: KubeConfig;
}

/**
 * Delete a job
 * @param jobName: string,
 * @param namespace: string
 * @param kc: KubeConfig
 */
export const deleteJob = async (args: IDeleteJob): Promise<boolean> => {
  const { jobName, namespace, kc } = args;
  try {
    const k8sApi = kc.makeApiClient(k8s.BatchV1Api);
    const deletedJob = await k8sApi.deleteNamespacedJob(jobName, namespace);
    if (deletedJob && deletedJob.body) {
      return true;
    }
    throw new Error("Failed to delete job, please try again");
  } catch (error) {
    log("erorr deleting job", error);
    return false;
  }
};

type IGetJobStatus = IDeleteJob;
/**
 * Get status of a Job
 * @param job: string,
 * @param namespace: string
 * @param kc: KubeConfig
 */
export const checkJobStatus = async (
  args: IGetJobStatus,
): Promise<V1Job | null> => {
  const { kc, jobName, namespace } = args;
  try {
    const k8sApi = kc.makeApiClient(k8s.BatchV1Api);
    const checkedJob = await k8sApi.readNamespacedJobStatus(jobName, namespace);
    if (checkedJob && checkedJob.body) {
      return checkedJob.body;
    }
    throw new Error("Failed to get Job status please try again");
  } catch (error) {
    log("error checking job", error);
    return null;
  }
};
