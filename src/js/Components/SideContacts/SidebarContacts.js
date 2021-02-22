import React, { memo, useEffect, useState } from 'react';
import cn from 'classnames';
import axios from 'axios';

import Search from './Search/Search';
import ContactsList from './ContactsList/ContactsList';

import c from './SidebarContacts.scss';

const sidebarContacts = () => {
	const [contactsList, setContactsList] = useState([]);
	const [filteredContactsList, setFilteredContactsList] = useState(null);
	const [chosenContact, setChosenContact] = useState(null);
	const [searchValue, setSearchValue] = useState('');

	const getContactList = () => {
		axios
			.get('data.json')
			.then(res => {
				setContactsList(res.data);
			})
			.catch(err => console.log(err));
	};

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
				return c.offline;
			}
		}
	};

	const setContactAvatar = contact => {
		const { id, avatar = '', firstName, lastName, userColor } = contact;
		const arrRandmAvatars = [
			'https://emilcarlsson.se/assets/louislitt.png',
			'https://emilcarlsson.se/assets/harveyspecter.png',
			'https://emilcarlsson.se/assets/rachelzane.png',
			'https://emilcarlsson.se/assets/donnapaulsen.png',
			'https://emilcarlsson.se/assets/jessicapearson.png',
			'https://emilcarlsson.se/assets/haroldgunderson.png',
			'https://emilcarlsson.se/assets/danielhardman.png',
			'https://emilcarlsson.se/assets/katrinabennett.png',
			'https://emilcarlsson.se/assets/charlesforstman.png',
			'https://emilcarlsson.se/assets/jonathansidwell.png',
		];

		if (avatar) {
			const copyId = `${id}`;
			return (
				<img src={arrRandmAvatars[`${copyId[copyId.length - 1]}`]} alt={`${firstName} ${lastName} avatar`} />
			);
		}

		return (
			<div className={c.avatarInitials} style={{ background: userColor }}>
				<p>{`${firstName[0].toUpperCase()} ${lastName[0].toUpperCase()}`}</p>
			</div>
		);
	};

	const searchInContacts = () => {
		if (contactsList.length) {
			const newContactsList = contactsList.filter(
				el =>
					el.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
					el.lastName.toLowerCase().includes(searchValue.toLowerCase()),
			);

			setChosenContact(null);
			setFilteredContactsList(newContactsList);
		}
	};

	useEffect(() => searchInContacts(), [searchValue]);

	useEffect(() => getContactList(), []);
	
	return (
		<section className={c.sidebar}>
			<header>
				{chosenContact && (
					<>
						<div className={cn(c.imgWrap, chosenContact.avatar && setStatus(chosenContact.status))}>
							{setContactAvatar(chosenContact)}
						</div>
						<p className={c.name}>{`${chosenContact.firstName || ''} ${chosenContact.lastName || ''}`}</p>
					</>
				)}
			</header>
			<Search searchValue={searchValue} setSearchValue={setSearchValue} />
			<ContactsList
				contactsList={filteredContactsList || contactsList}
				setChosenContact={setChosenContact}
				setContactAvatar={setContactAvatar}
				focusedItemId={chosenContact ? chosenContact.id : null}
			/>
			<footer>
				<button type="button" id="addcontact">
					<i className="fa fa-user-plus fa-fw" aria-hidden="true" />
					<span>Add contact</span>
				</button>

				<button type="button" id="settings">
					<i className="fa fa-cog fa-fw" aria-hidden="true" />
					<span>Settings</span>
				</button>
			</footer>
		</section>
	);
};

export default memo(sidebarContacts);
