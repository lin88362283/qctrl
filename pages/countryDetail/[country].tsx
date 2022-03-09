import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../../styles/CountryList.module.scss';
import { fetchCountries } from '../../state/actions/country';
import { useRouter } from 'next/router';
import { Box, List, Button, ListItem, CircularProgress } from '@mui/material';
import Image from 'material-ui-image';
import ui from '../../constants/ui';
import type { ICountry, ICountryState } from '../../interfaces/country';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStore } from '../../state/store';
import content from '../../constants/components/countryDetail';

const CountryDetail: NextPage = () => {
	const [displayedCountry, setDisplayedCountry] = useState<ICountry>({ name: '' });
	const countryState: ICountryState = useSelector((state: RootStore) => state.country);
	const dispatch = useDispatch();
	const router = useRouter();
	const queryName = router.query.country;

	useEffect(() => {
		dispatch(fetchCountries())
	}, [dispatch]);

	useEffect(() => {
		const detail = countryState.countries.find(country => country.name === queryName);
		detail && setDisplayedCountry(detail);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryName])
	
	return (
		<Box className={styles['container']}>
			{countryState.isFetchCountriesLoading && <CircularProgress />}
			{!countryState.isFetchCountriesLoading &&
				<>
					<Button onClick={() => { router.push('/') }}>
						{ui.BACK}
					</Button>
					{displayedCountry.name && (<>
						<Image src={displayedCountry.flag || ''} alt='flag' width='100px' height='50px' />
						<span className={styles['countryDetail__name']}>
							{displayedCountry.name}
						</span>
						<List className={styles['countryDetail__list']}>
							<ListItem>
								<span>{content.POPULATION}</span>
								<span>{displayedCountry.population}</span>
							</ListItem>
							<ListItem>
								<span>{content.DEMONYM}</span>
								<span>{displayedCountry.demonym}</span>
							</ListItem>
						</List>
					</>)}
				</>
			}
		</Box>
	)
}

export default CountryDetail;