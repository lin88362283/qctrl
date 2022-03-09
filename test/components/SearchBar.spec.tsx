import React from "react";
import SearchBar, { SearchBarProps } from "../../components/SearchBar";
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ui from '../../constants/ui';
describe("SearchBar", () => {
	let expectedProps: SearchBarProps;
	beforeEach(() => {
		expectedProps = {
			handleSearch: (keyword: string) => {
				return keyword
			}
		}
	})

	test('should have correct placeholder and text in button', () => {
		const { getByText, getByPlaceholderText } = render(<SearchBar {...expectedProps} />);
		const search = getByText(ui.SEARCH);
		const searchPlaceHolder = getByPlaceholderText(ui.SEARCH_PLACEHOLDER)
		expect(search).toBeVisible();
		expect(searchPlaceHolder).toBeVisible();
	})
})