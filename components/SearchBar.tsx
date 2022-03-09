import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import ui from '../constants/ui';
import styles from '../styles/SearchBar.module.scss';

interface SearchBarProps {
	handleSearch: (keyword: string) => void;
}

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