import DO from "do-wrapper";

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