import DigitalOcean from "do-wrapper";
import isEmpty from 'lodash/isEmpty';
import {log, verbose} from '../../logs';

/**
 * Create the digital ocean client
 * @param DO_TOKEN 
 */
export const createDigitalOceanClient = (DO_TOKEN: string): DigitalOcean => {
    try{
        if(isEmpty(DO_TOKEN)){
            throw new Error('Digital ocean cannot be empty, please see https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/')
        }
        const doClient: DigitalOcean = new DigitalOcean(DO_TOKEN);
        verbose('success getting do client');
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
export const getK8sClusterConfig = async (clusterId: string, DigitalOceanClient: DigitalOcean): Promise<string> => {
    try {
        const api = await DigitalOceanClient.kubernetes.getKubeconfig(clusterId);
        if (api.response && api.response.statusCode === 200) {
            return api.body;
        };

        throw new Error("Error getting cluster");
    }
    catch (error) {
        return null;
    }
}