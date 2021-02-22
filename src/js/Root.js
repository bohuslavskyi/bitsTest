import { hot } from 'react-hot-loader/root';
import React from 'react';

const Contacts = React.lazy(() => import('./Containers/Contacts/Contacts'));

const root = () => {
	return (
		<div>
			<div className="body">
				<Contacts />
			</div>
		</div>
	);
};

export default hot(root);
