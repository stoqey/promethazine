import DigitalOcean from "do-wrapper";
import DO from "do-wrapper";

/**
 * Digital Ocean client
 */
export interface DigitalOceanClient {
    [x: string]: any;
    kubernetesClusterGetConfig: (clusterId: string) => Promise<any>
}

/**
 * Create the digital ocean client
 * @param DO_KEY 
 */
export const createDigitalOceanClient = (DO_KEY: string): DigitalOceanClient => {
    const DigitalOcean: DigitalOceanClient = new DO(DO_KEY) as unknown as DigitalOceanClient;
    return DigitalOcean;
}

/**
 * Get kubernetes configuration from Digital Ocean
 * @param clusterId 
 * @param DO_KEY 
 */
export const getK8sClusterConfig = async (clusterId: string, DigitalOceanClient: any): Promise<string> => {
    try {
        // @ts-ignore
        const api = await DigitalOceanClient.kubernetesClusterGetConfig(clusterId);
        if (api.response && api.response.statusCode === 200) {
            return api.body;
        };

        throw new Error("Error getting cluster");
    }
    catch (error) {
        return null;
    }
}