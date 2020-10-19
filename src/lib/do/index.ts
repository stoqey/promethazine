import DO from "do-wrapper";

/**
 * Get kubernetes configuration from Digital Ocean
 * @param clusterId 
 * @param DO_KEY 
 */
export const getK8sClusterConfig = async (clusterId: string, DO_KEY: string): Promise<string> => {
    const DigitalOcean = new DO(DO_KEY);
    try {
        // @ts-ignore
        const api = await DigitalOcean.kubernetesClusterGetConfig(clusterId);
        if (api.response && api.response.statusCode === 200) {
            return api.body;
        };

        throw new Error("Error getting cluster");
    }
    catch (error) {
        l.error(error);
        return null;
    }
}