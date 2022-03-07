import type { NextPage } from 'next'
import styles from '../styles/Home.module.css';
import getCountries from '../services/country';

const CountryList: NextPage = () => {
  
  return (

  )
}

export async function getStaticProps() {
  const countriesData = getCountries()
  return {
    props: {
      countriesData
    }
  }
}

export default CountryList
