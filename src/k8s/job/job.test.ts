import { expect } from "chai";
import "mocha";
import { loadKubernetesConfigurationFromDO } from "../k8s.config";
import { KubeConfig } from "@kubernetes/client-node";

let kubeconfig: KubeConfig = null as any;

before((done) => {
  loadKubernetesConfigurationFromDO().then((k8sconfig) => {
    // @ts-ignore
    kubeconfig = k8sconfig;
    done();
  });
});
describe("Job", () => {});
