import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/CountryList.module.scss';
import { fetchCountries } from '../state/actions/country';
import { Box, List, Button, ListItem, CircularProgress, ButtonGroup } from '@mui/material';
import Link from 'next/link';
import ui from '../constants/ui';
import type { ICountry, ICountryState } from '../interfaces/country';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStore } from '../state/store';
import Constraint from '../constants/constraint';

const CountryList: NextPage = () => {
  const [displayedCountries, setDisplayedCountries] = useState<Array<ICountry>>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const countryState: ICountryState = useSelector((state: RootStore) => state.country);
  const dispatch = useDispatch();
  const startIndex = pageNumber * Constraint.PAGE_SIZE;
  const endIndex = (pageNumber + 1) * Constraint.PAGE_SIZE;

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch]);

  useEffect(() => {
    setDisplayedCountries(countryState.countries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryState.isFetchCountriesLoading])

  const handleSearch = (keyword: string) => {
    const results = countryState.countries.reduce(
      (filteredCountries: Array<ICountry>, currentCountry: ICountry) => {
        currentCountry.name.toLowerCase().includes(keyword.toLowerCase()) &&
          filteredCountries.push({ name: currentCountry.name });
        return filteredCountries;
      }, [])
    setDisplayedCountries(results);
    setPageNumber(0);
  }

  const handlePaging = (isPrevious: boolean) => {
    isPrevious ? setPageNumber(pageNumber - 1) : setPageNumber(pageNumber + 1);
  }

  const hidePrevious = () => pageNumber === 0;

  const hideNext = () => pageNumber === Math.ceil(displayedCountries?.length / Constraint.PAGE_SIZE) - 1;

  return (
    <>
      {countryState.isFetchCountriesLoading && <CircularProgress />}
      {
        !countryState.isFetchCountriesLoading &&
        <Box className={styles['container']}>
          <SearchBar handleSearch={handleSearch} />
          <List className={styles['countryList__list']}>
            {displayedCountries?.slice(startIndex, endIndex).map((country) => {
              return (
                <Link href={country.name} passHref key={country.name}>
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
        </Box >
      }
    </>
  )
}

export default CountryList
