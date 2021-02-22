import React  from 'react';

import c from './Chat.scss';


const chat = () => {
	return (
		<section className={c.messageContent}>
			<header></header>
			<span />
			<footer>
				<div className={c.inputWrap}>
					<input type="text" placeholder="Write your message..." />
					<i className="fa fa-paperclip attachment" />
				</div>
				<button type="button">
					<i className="far fa-paper-plane" />
				</button>
			</footer>
		</section>
	);
};

export default chat;
