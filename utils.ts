import axios from "axios";
import type { AxiosRequestConfig, AxiosPromise } from "axios";
import Constraint from "./constants/constraint";
const axiosInstance = axios.create();

/**
 * Requests an option, returning a promise.
 * @param  {AxiosRequestConfig} options we want to pass to "fetch"
 * @return {AxiosPromise} An object containing either response data or error message
 */
export const request = (options: AxiosRequestConfig): AxiosPromise => {
	return axiosInstance(options)
		.then(response => response)
		.catch(error => error);
}

/**
 * store a key value pair into localStorage with expiration time
 * @param  {string} key The key in key-value pair to store in the localStorage
 * @param  {string} value The value in key-value pair to store in the localStorage
 * @param  {number} ttl The time-to-live in ms
 */
export const setItem = (key: string, value: any, ttl: number = Constraint.TTL) => {
	const now = new Date()
	const item = {
		value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get value from localStorage according to key and expiration time
 * @param  key The key to query data item in localStorage
 * @return {null|object} return null if no data found or data has expired, otherwise return value in object.
 */
export const getItem = (key: string) => {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}
