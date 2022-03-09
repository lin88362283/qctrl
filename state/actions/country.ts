import { Dispatch } from "redux";
import { getCountries } from '../../services/country';
import CountryStorage from '../../constants/storages/country';
import CountryAction from '../../constants/actionTypes/country';
import { getItem, setItem } from '../../utils';
import { ICountry } from "../../interfaces/country";

export const fetchCountries = async (dispatch: Dispatch) => {
	const countryCache: Array<ICountry> = getItem(CountryStorage.COUNTRIES);
	const requestCountries = async () => {
		const res = await getCountries();
		const data = res.status === 200 ? { res } : [];
		setItem(CountryStorage.COUNTRIES, data)
		dispatch({
			type: CountryAction.FETCH_COUNTRIES,
			payload: data
		})
	}
	countryCache ?
		dispatch({
			type: CountryAction.FETCH_COUNTRIES,
			payload: countryCache
		}) : await requestCountries();
};