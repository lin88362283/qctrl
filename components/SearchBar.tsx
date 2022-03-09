import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import ui from '../constants/ui';

interface SearchBarProps {
	handleSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(({ handleSearch }) => {
	const [input, setInput] = useState<string>('');
	return (
		<Box>
			<TextField label="Search" placeholder={ui.SEARCH_PLACEHOLDER}
				onChange={(e) => { setInput(e.target.value) }} />
			<Button onClick={() => { handleSearch(input) }}>
				{ui.SEARCH}
			</Button>
		</Box>
	)
})

SearchBar.displayName = 'SearchBar';

export default SearchBar;