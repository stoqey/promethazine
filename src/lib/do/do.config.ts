import request from "request";
import util from "util";
import isEmpty from "lodash/isEmpty";
import { log, verbose } from "../../logs";

export const getKubeConfigFromDOWithHTTP = async (
  token: string,
  clusterId: string
): Promise<string> => {
  try {
    // Check params
    if (isEmpty(token)) {
      throw new Error("error digital ocean token cannot be empty");
    }
    if (isEmpty(clusterId)) {
      throw new Error("error digital ocean clusterId cannot be empty");
    }

    // Create request
    const api = util.promisify(request.get);
    const options: any = {
      url: `https://api.digitalocean.com/v2/kubernetes/clusters/${clusterId}/kubeconfig`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Run request
    const response = await api(options);
    if (response && response.statusCode === 200) {
      verbose("successfully get kubeconfig");
      return response.body;
    }
    throw new Error("error getting cluster kubeconfig from digital ocean");
  } catch (error) {
    log("error getKubernetesConfigUsingHTTP", error);
    return null;
  }
};
