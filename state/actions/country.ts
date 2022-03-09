import { Dispatch } from "redux";
import { getCountries } from '../../services/country';
import CountryStorage from '../../constants/storages/country';
import CountryAction from '../../constants/actionTypes/country';
import { getItem, setItem } from '../../utils';
import { ICountry } from "../../interfaces/country";

/**
 * @description action to fetch and store all countries if there is no valid cache in local storage
 */
export const fetchCountries = () => async (dispatch: Dispatch) => {
	const countryCache: Array<ICountry> = getItem(CountryStorage.COUNTRIES);
	const requestCountries = async () => {
		const res = await getCountries();
		const data = res.status === 200 ? res.data : [];
		const formData = data.map((country: any) => {
			return {
				name: country.name.common,
				population: country.population,
				demonym: country.demonyms?.eng.m,
				flag: country.flags[0]
			}
		}).sort((a: ICountry, b: ICountry) => a.name > b.name ? 1 : -1);
		setItem(CountryStorage.COUNTRIES, formData)
		dispatch({
			type: CountryAction.FETCH_COUNTRIES,
			payload: formData
		})
	}
	countryCache ?
		dispatch({
			type: CountryAction.FETCH_COUNTRIES,
			payload: countryCache
		}) : await requestCountries();
};