import Country from "../constants/actionTypes/country";
export interface ICountry {
	name: string,
	population?: number,
	demonym?: string,
	flag?: string
}

export interface ICountryState {
	countries: Array<ICountry>,
	isFetchCountriesLoading: boolean
}

export interface ICountryAction {
	type: Country,
	payload: Array<ICountry> | []
}