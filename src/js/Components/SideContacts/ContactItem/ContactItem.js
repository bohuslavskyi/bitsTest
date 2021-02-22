import React, { memo } from 'react';
import cn from 'classnames';

import c from './ContactItem.scss';

const contactItem = props => {
	const { style, contact, setChosenContact, setContactAvatar, focusedItemId } = props;
	const { id, firstName, lastName, status, lastMessage } = contact;
	
	const setStatus = status => {
		switch (status) {
			case 1: {
				return c.online;
			}
			case 2: {
				return c.away;
			}
			case 3: {
				return c.busy;
			}
			default: {
				return '';
			}
		}
	};

	return (
		<li className={cn(c.contact, focusedItemId === id && c.active)} style={style}>
			<button type="button" className={c.wrap} onClick={() => setChosenContact(contact)}>
				<div className={c.imgWrap}>
					{setContactAvatar(contact)}
					<span className={cn(c.contactStatus, setStatus(status))} />
				</div>
				<div className={c.meta}>
					<p className={c.name}>{`${firstName} ${lastName}`}</p>
					<div className={c.preview}>
						{contact.status === 3 && <span className={c.you}>{`You: `}</span>}
						<span>{lastMessage}</span>
					</div>
				</div>
			</button>
		</li>
	);
};

export default memo(contactItem);
