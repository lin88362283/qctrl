import type { NextPage } from 'next';
import { useState, useEffect, useCallback, useMemo } from 'react';
import styles from '../styles/CountryList.module.scss';
import { fetchCountries } from '../state/actions/country';
import { Box, List, Button, ListItem, CircularProgress } from '@mui/material';
import Link from 'next/link';
import ui from '../constants/ui';
import type { ICountry, ICountryState } from '../interfaces/country';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStore } from '../state/store';
import Constraint from '../constants/constraint';

/**
 * @description The index page renders countries page with a search bar and a country list
 */
const CountryList: NextPage = () => {
	const [displayedCountries, setDisplayedCountries] = useState<Array<ICountry>>([]);
	const [pageNumber, setPageNumber] = useState<number>(0);
	const countryState: ICountryState = useSelector((state: RootStore) => state.country);
	const dispatch = useDispatch();
	const startIndex = useMemo(()=>pageNumber * Constraint.PAGE_SIZE,[pageNumber]);
	const endIndex = useMemo(()=>(pageNumber + 1) * Constraint.PAGE_SIZE,[pageNumber]);

	useEffect(() => {
		dispatch(fetchCountries())
	}, [dispatch]);

	useEffect(() => {
		setDisplayedCountries(countryState.countries);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryState.isFetchCountriesLoading])

	const handleSearch = useCallback((keyword: string) => {
		const results = countryState.countries.reduce(
			(filteredCountries: Array<ICountry>, currentCountry: ICountry) => {
				currentCountry.name.toLowerCase().includes(keyword.toLowerCase()) &&
					filteredCountries.push({ name: currentCountry.name });
				return filteredCountries;
			}, [])
		setDisplayedCountries(results);
		setPageNumber(0);
	},[countryState.countries])

	const handlePaging = useCallback((isPrevious: boolean) => {
		isPrevious ? setPageNumber(pageNumber - 1) : setPageNumber(pageNumber + 1);
	},[pageNumber])

	const hidePrevious = useCallback(() => pageNumber === 0,[pageNumber]);

	const hideNext = useCallback(() => pageNumber === Math.ceil(displayedCountries?.length / Constraint.PAGE_SIZE) - 1,[pageNumber,displayedCountries]);

	return (
		<Box className={styles['container']}>
			{countryState.isFetchCountriesLoading && <CircularProgress />}
			{
				!countryState.isFetchCountriesLoading &&
				<>
					<SearchBar handleSearch={handleSearch} />
					<List className={styles['countryList__list']}>
						{displayedCountries?.slice(startIndex, endIndex).map((country) => {
							return (
								<Link href={`/countryDetail/${country.name}`} passHref key={country.name}>
									<ListItem>
										{country.name}
									</ListItem>
								</Link>
							)
						})}
					</List>
					<Box className={styles['countryList__pagination']}>
						<Button className={hidePrevious() ? styles['countryList__button--hidden'] : styles['countryList__button']}
							onClick={() => { handlePaging(true) }}>
							{ui.PREVIOUS}
						</Button>
						<Button className={hideNext() ? styles['countryList__button--hidden'] : styles['countryList__button']}
							onClick={() => { handlePaging(false) }}>
							{ui.NEXT}
						</Button>
					</Box>
				</>
			}
		</Box >
	)
}

export default CountryList
