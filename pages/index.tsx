import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { fetchCountries } from '../state/actions/country';
import { Box, List, Button } from '@mui/material';
import Link from 'next/link';
import ui from '../constants/ui';
import type { ICountry } from '../interfaces/country';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';

const CountryList: NextPage = () => {
  const [displayedCountries, setDisplayedCountries] = useState<Array<ICountry>>([]);
  const []
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries())
  }, []);
  const state = useSelector((state) => state)
  const handleSearch = (result) => {

  }
  useEffect(, [])
  return (
    <Box>
      <SearchBar handleSearch={handleSearch}/>
      <List>
        { displayedCountries.map(()=>{
          return(
            < onClick={}>
            </>
          )
        }) }
      </List>
      <Button>
        {ui.PREVIOUS}
      </Button>
      <Button>
        {ui.NEXT}
      </Button>
    </Box >
  )
}

export default CountryList
