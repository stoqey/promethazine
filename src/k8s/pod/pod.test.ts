import { expect } from "chai";
import "mocha";
import { loadKubernetesConfigurationFromDO } from "../k8s.config";
import { KubeConfig } from "@kubernetes/client-node";
import { cleanPods } from "./clean.pods";

let kubeconfig: KubeConfig = null as any;

const labelSelector = "app=terminator";
const fieldSelector = "";
const namespace = "default";

before((done) => {
  loadKubernetesConfigurationFromDO().then((k8sconfig) => {
    // @ts-ignore
    kubeconfig = k8sconfig;
    done();
  });
});

describe("Pods", () => {
  it("should delete a pods that have failed by fieldSelector and namespace", async () => {
    const deletedPods = await cleanPods({
      kc: kubeconfig,
      fieldSelector,
      labelSelector,
      namespace,
    });

    expect(deletedPods).to.be.true;
  });
});
