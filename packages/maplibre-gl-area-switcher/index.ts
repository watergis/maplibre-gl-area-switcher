import { Map, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import MaplibreAreaSwitcherControl from './src/lib/index';
import './src/scss/maplibre-gl-area-switcher.scss';

const map = new Map({
	container: 'map',
	style: 'https://narwassco.github.io/mapbox-stylefiles/unvt/style.json',
	center: [35.87063, -1.08551],
	zoom: 12,
	hash: true
});
map.addControl(new NavigationControl(), 'top-right');
map.addControl(
	new MaplibreAreaSwitcherControl(
		[
			{ title: 'Narok', latlng: [35.87063, -1.08551], zoom: 14 },
			{ title: "Ololulung'a", latlng: [35.65072, -1.0085], zoom: 13 },
			{ title: 'Kilgoris', latlng: [34.87533, -1.00278], zoom: 14 },
			{ title: 'Suswa', latlng: [36.33078, -1.05307], zoom: 13 }
		],
		5
	),
	'top-right'
);

map.addControl(
	new MaplibreAreaSwitcherControl(
		[
			{ title: 'Narok', latlng: [35.87063, -1.08551], zoom: 14 },
			{ title: "Ololulung'a", latlng: [35.65072, -1.0085], zoom: 13 },
			{ title: 'Kilgoris', latlng: [34.87533, -1.00278], zoom: 14 },
			{ title: 'Suswa', latlng: [36.33078, -1.05307], zoom: 13 }
		],
		3
	),
	'top-right'
);
