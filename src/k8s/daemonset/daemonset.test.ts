import { expect } from "chai";
import "mocha";
import { loadKubernetesConfigurationFromDO } from "../k8s.config";
import { KubeConfig, V1Job } from "@kubernetes/client-node";

let kubeconfig: KubeConfig = null as any;
