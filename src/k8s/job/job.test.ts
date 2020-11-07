import { expect } from "chai";
import "mocha";
import { loadKubernetesConfigurationFromDO } from "../k8s.config";
import { KubeConfig, V1Job } from "@kubernetes/client-node";
import { createJob, deleteJob } from "./create.job";

let kubeconfig: KubeConfig = null as any;

const jobName = "busybox";
const jobNamespace = "testx";

before((done) => {
  loadKubernetesConfigurationFromDO().then((k8sconfig) => {
    // @ts-ignore
    kubeconfig = k8sconfig;
    done();
  });
});

describe("Job", () => {
  it("can create a job", async () => {
    const job: V1Job = {
      apiVersion: "batch/v1",
      kind: "Job",
      metadata: {
        labels: {
          app: jobName,
        },
        name: jobName,
        namespace: jobNamespace,
      },
      spec: {
        template: {
          metadata: {
            labels: {
              app: jobName,
            },
          },
          spec: {
            containers: [
              {
                name: jobName,
                image: jobName,
                args: ["sleep", "3600"],
              },
            ],
            restartPolicy: "Never",
          },
        },
      },
    };

    const createdJob = await createJob({
      kc: kubeconfig,
      job,
    });

    expect(createdJob).not.to.be.null;
  });

  it("should delete a job by name and namespace", async () => {
    const deletedJob = await deleteJob({
      kc: kubeconfig,
      jobName,
      namespace: jobNamespace,
    });

    expect(deletedJob).to.be.true;
  });
});
