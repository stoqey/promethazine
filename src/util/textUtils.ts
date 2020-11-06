import startsWith from "lodash/startsWith";
import { log } from "../logs";

/**
 * Converts circular object to normal json object
 * remove kube attributes
 * @param object
 */
export const Objectify = (object: any): object => {
  try {
    const stringObject = JSON.stringify(object);
    // TODO: Remove kube attributes
    return JSON.parse(stringObject);
  } catch (er) {
    log("Error creating object", er);
    return {};
  }
};

export const isSuccessStatusCode = (code: number): boolean => {
  return startsWith(`${code}`, "20");
};
