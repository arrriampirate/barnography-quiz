import App from './App.svelte';

import './css/global.css';
import './css/likely.css';

const config = window.__APP__;

config.data = config.data.map((el, i) => {
	el.id = i;
	return el;
});

const app = new App({
	target: document.getElementById('root'),
	props: {
		config,
	}
});

export default app;