import { request } from "../utils";

export async function getCountries() {
	return request({ url: 'https://restcountries.com/v3/all' })
}