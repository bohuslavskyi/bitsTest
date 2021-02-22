import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
import '@babel/polyfill';

import Root from './js/Root';

import './css/styles.scss';
import 'antd/dist/antd.css';

const preload = (
	<div className="preload">
		<div className="spin">
			<Spin size="large" />
		</div>
		<div className="contactsPreload">
			<header>
				<div className="contactHeaderPreload">
					<span className="imgWrapPreload" />
					<span className="namePreload" />
				</div>
			</header>
			<div className="search" />
			<Spin size="large" />
		</div>
		<span className="chatPreload" />
	</div>
);

const App = () => (
	<Suspense fallback={preload}>
		<Root />
	</Suspense>
);

ReactDOM.render(<App />, document.getElementById('root'));
