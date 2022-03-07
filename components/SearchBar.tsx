import { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import UI from '../constants/UI';

const SearchBar = ({ handleSearch }) => {
	const [input, setInput] = useState<String>('');
	handleSearch(input);
	return (
		<Box>
			<TextField label="Search" placeholder={UI.SEARCH_PLACEHOLDER}
				onChange={(e) => { setInput(e.target.value) }} />
			<Button onClick={() => { handleSearch(input) }}>
				{UI.SEARCH}
			</Button>
		</Box>
	)
}

export default SearchBar;