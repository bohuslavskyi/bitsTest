import React  from 'react';

import SidebarContacts from '../../Components/SideContacts/SidebarContacts';
import Chat from '../../Components/Chat/Chat';

import c from './Contacts.scss';

const contacts = () => {
	return (
		<main className={c.contactsPage}>
			<SidebarContacts  />
			<Chat />
		</main>
	);
};

export default contacts;
