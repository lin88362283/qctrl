import Country from '../../constants/actionTypes/country';
import type { ICountryState, ICountryAction } from '../../interfaces/country';

const initialState: ICountryState = {
	countries: [],
	isFetchCountriesLoading: true
}

const countryReducer = (state: ICountryState, { type, payload }: ICountryAction): ICountryState => {
	const fetchCountries = {
		...state,
		isFetchCountriesLoading: false,
		countries: payload
	}
	const actionMap = {
		[Country.FETCH_COUNTRIES]: fetchCountries
	}
	return actionMap[type] || initialState;
}

export default countryReducer;