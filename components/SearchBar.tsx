import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import ui from '../constants/ui';
import styles from '../styles/SearchBar.module.scss';

export interface SearchBarProps {
	handleSearch: (keyword: string) => void;
}

/**
 * @description render search bar component
 * @param {(keyword: string)=> void} handleSearch function to handle the search result typed in text field
 */
const SearchBar: React.FC<SearchBarProps> = React.memo(({ handleSearch }) => {
	const [input, setInput] = useState<string>('');

	return (
		<Box className={styles['container']}>
			<TextField className={styles['searchBar__input']} placeholder={ui.SEARCH_PLACEHOLDER}
				onChange={(e) => { setInput(e.target.value) }} />
			<Button className={styles['searchBar__button']} onClick={() => { handleSearch(input) }}>
				{ui.SEARCH}
			</Button>
		</Box>
	)
})

SearchBar.displayName = 'SearchBar';

export default SearchBar;