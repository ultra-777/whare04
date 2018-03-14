import React from "react";
import Css from 'react-css-modules';
import styles from './style.styl';

import { Button } from '@domclick/domclick-style-react';

const App = () => {
	return (
		<div styleName="app-component">
			<p>React here!</p>
			<Button
				id="RateCheck_Submit"
				size="large"
				theme="primary"
				suffixIcon="NavigateNext">
				Check it up
			</Button>
			<Button
			id="RateCheck_Submit"
			size="large"
			theme="primary"
			suffixIcon="NavigateNext">
			Check it up
		</Button>
			Cheers 4
		</div>
	);
};

export default Css(App, styles, {allowMultiple: true});