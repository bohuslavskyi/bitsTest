import React, { memo, useRef } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import ContactItem from '../ContactItem/ContactItem';

import c from './ContactsList.scss';

const contactsList = props => {
	const { contactsList, setChosenContact, setContactAvatar, focusedItemId } = props;

	const cache = useRef(
		new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100,
		}),
	);
	
	return (
		<ul className={c.contactsList} style={{ width: '100%', height: '100%' }}>
			<AutoSizer>
				{({ width, height }) => (
					<List
						width={width}
						height={height}
						rowHeight={cache.current.rowHeight}
						deferredMeasurementCache={cache.current}
						rowCount={contactsList.length}
						rowRenderer={({ key, index, style, parent }) => {
							const contact = contactsList[index];

							return (
								<CellMeasurer
									key={key}
									cache={cache.current}
									parent={parent}
									columnIndex={0}
									rowIndex={index}
								>
									<ContactItem
										contact={contact}
										style={style}
										setChosenContact={setChosenContact}
										setContactAvatar={setContactAvatar}
										focusedItemId={focusedItemId}
									/>
								</CellMeasurer>
							);
						}}
					/>
				)}
			</AutoSizer>
		</ul>
	);
};

export default memo(contactsList);
