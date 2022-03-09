import Country from '../../constants/actionTypes/country';
import type { ICountryState, ICountryAction } from '../../interfaces/country';

const initialState = {
	countries: [],
	isFetchCountriesLoading: true
}
// COUNTER REDUCER
const countryReducer = (state: ICountryState = initialState, { type, payload }: ICountryAction): ICountryState => {
	const fetchCountries = {
		...state,
		isFetchCountriesLoading: false,
		countries: payload
	}
	const actionMap = {
		[Country.FETCH_COUNTRIES]: fetchCountries
	}
	return actionMap[type]
}

export default countryReducer;