import DigitalOcean from "do-wrapper";
import isEmpty from 'lodash/isEmpty';
import DO from "do-wrapper";
import { log } from "../../../logs";

/**
 * Digital Ocean client
 */
export interface DigitalOceanClient {
    [x: string]: any;
    kubernetesClusterGetConfig: (clusterId: string) => Promise<any>
}

/**
 * Create the digital ocean client
 * @param DO_TOKEN 
 */
export const createDigitalOceanClient = (DO_TOKEN: string): DigitalOceanClient => {
    try{
        if(isEmpty(DO_TOKEN)){
            throw new Error('Digital ocean cannot be empty, please see https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/')
        }
        const doClient: DigitalOceanClient = new DO(DO_TOKEN) as unknown as DigitalOceanClient;
        return doClient;
    }
    catch(error){
        log('error', error.message);
        return null;
    }
    
}

/**
 * Get kubernetes configuration from Digital Ocean
 * @param clusterId 
 * @param DO_TOKEN 
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