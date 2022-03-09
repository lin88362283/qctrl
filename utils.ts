import axios from "axios";
import type { AxiosRequestConfig, AxiosPromise } from "axios";
import Constraint from "./constants/constraint";
const axiosInstance = axios.create();

/**
 * Requests an option, returning a promise.
 * @param  {AxiosRequestConfig} The options we want to pass to "fetch"
 * @return {AxiosPromise} An object containing either "data" or "err"
 */
export const request = (options: AxiosRequestConfig): AxiosPromise => {
	return axiosInstance(options)
		.then(response => response)
		.catch(error => error);
}

export const setItem = (key: string, value: any, ttl: number = Constraint.TTL) => {
	const now = new Date()
	const item = {
		value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

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
