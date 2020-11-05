import startsWith from 'lodash/startsWith';

/**
 * Converts circular object to normal json object
 * remove kube attributes
 * @param object 
 */
export const Objectify = (object: any): Object => {
    try {
        const stringObject = JSON.stringify(object);
        // TODO: Remove kube attributes
        return JSON.parse(stringObject);
    }
    catch(er){
        console.log('Error creating object')
        return null;
    }
}

export const isSuccessStatusCode = (code: number): Boolean => {
    return startsWith(`${code}`, '20');
}