import React, { memo } from 'react';
import debounce from 'lodash.debounce';

import c from './Search.scss';

const search = props => {
	const { setSearchValue } = props;

	const debouncedSave = debounce(nextValue => setSearchValue(nextValue), 500);

	const handleChange = event => {
		const { value: nextValue } = event.target;
		if (nextValue.length >= 3 || !nextValue.length) {
			debouncedSave(nextValue);
		}
	};

	return (
		<div className={c.search}>
			<i className="fas fa-search" />
			<input onChange={handleChange} type="text" placeholder="Search" />
		</div>
	);
};

export default memo(search);
