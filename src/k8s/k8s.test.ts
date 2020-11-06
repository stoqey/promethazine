import { expect } from "chai";
import "mocha";
import { loadKubernetesConfigurationFromDO } from "./k8s.config";

describe("Kubernetes Client", () => {
  it("should return kubernetes client using kubeconfig", async () => {
    const kubeconfig = await loadKubernetesConfigurationFromDO();
    console.log("kubernetes client", kubeconfig);
    expect(kubeconfig).to.be.exist;
  });
});
