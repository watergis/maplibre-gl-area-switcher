import { ControlPosition, IControl, Map as MaplibreMap } from 'maplibre-gl';

/**
 * Adds area switcher.
 * @param {Object} options
 * @param {Array} [options.area] - Array of area objects:
 * @param {String} options.area.label - Area label to display on switcher
 * @param {String} options.area.latlng - Latitude and Longitude to display
 * @param {String} options.area.zoom - Zoom level to display
 * @param {number} [options.limit_no_areas] - If number of areas is more than this figures, the control will become select box. Default value is 5.
 * @param {Function} [options.onChange] - Triggered on area change. Accepts `area` object
 */

export type MaplibreAreaDefinition = {
	title: string;
	latlng: number[];
	zoom: number;
};

export default class MaplibreAreaSwitcherControl implements IControl {
	private static readonly DEFAULT_AREA = 'Narok';
	private static readonly DEFAULT_AREAS = [
		{ title: 'Narok', latlng: [35.86974, -1.08707], zoom: 13 },
		{ title: 'Nairobi', latlng: [36.8034, -1.2809], zoom: 11 },
		{ title: 'Mombasa', latlng: [39.65449, -4.05099], zoom: 12 }
	];
	private static readonly DEFAULT_NO_AREAS = 5;

	private controlContainer: HTMLElement;
	private map?: MaplibreMap;
	private mapAreaContainer: HTMLElement;
	private areaButton: HTMLButtonElement;
	private areas: MaplibreAreaDefinition[];
	private select: HTMLSelectElement;
	private limit_no_areas: number;

	constructor(areas?: MaplibreAreaDefinition[], limit_no_areas?: number) {
		this.areas = areas || MaplibreAreaSwitcherControl.DEFAULT_AREAS;
		this.limit_no_areas = limit_no_areas || MaplibreAreaSwitcherControl.DEFAULT_NO_AREAS;
		this.onDocumentClick = this.onDocumentClick.bind(this);
	}

	public getDefaultPosition(): ControlPosition {
		const defaultPosition = 'top-right';
		return defaultPosition;
	}

	public onAdd(map: MaplibreMap): HTMLElement {
		this.map = map;
		this.controlContainer = document.createElement('div');
		this.controlContainer.classList.add('maplibregl-ctrl');
		this.controlContainer.classList.add('maplibregl-ctrl-group');
		if (this.areas.length <= this.limit_no_areas) {
			this.mapAreaContainer = document.createElement('div');
			this.areaButton = document.createElement('button');
			this.mapAreaContainer.classList.add('maplibregl-area-list');
			for (const area of this.areas) {
				const styleElement = document.createElement('button');
				styleElement.innerText = area.title;
				styleElement.classList.add(area.title.replace(/[^a-z0-9-]/gi, '_'));
				styleElement.value = JSON.stringify({
					center: area.latlng,
					zoom: area.zoom
				});
				styleElement.addEventListener('click', (event) => {
					const srcElement = event.srcElement as HTMLButtonElement;
					this.map?.jumpTo(JSON.parse(srcElement.value));
					// this.map.setStyle(JSON.parse(srcElement.dataset.uri));
					this.mapAreaContainer.style.display = 'none';
					this.areaButton.style.display = 'block';
					const elms = this.mapAreaContainer.getElementsByClassName('active');
					while (elms[0]) {
						elms[0].classList.remove('active');
					}
					srcElement.classList.add('active');
				});
				if (area.title === MaplibreAreaSwitcherControl.DEFAULT_AREA) {
					styleElement.classList.add('active');
				}
				this.mapAreaContainer.appendChild(styleElement);
			}
			this.areaButton.classList.add('maplibregl-ctrl-icon');
			this.areaButton.classList.add('maplibregl-area-switcher');
			this.areaButton.addEventListener('click', () => {
				this.areaButton.style.display = 'none';
				this.mapAreaContainer.style.display = 'block';
			});
			document.addEventListener('click', this.onDocumentClick);
			this.controlContainer.appendChild(this.areaButton);
			this.controlContainer.appendChild(this.mapAreaContainer);
		} else {
			this.controlContainer.classList.add('maplibregl-ctrl-area-switch');
			const selectElement = document.createElement('select');
			this.select = selectElement;
			this.select.setAttribute('type', 'select');
			this.select.addEventListener('change', function (event) {
				if (!event.target) {
					return;
				}
				map.flyTo(JSON.parse(event.target[this.selectedIndex].value));
			});
			this.controlContainer.appendChild(this.select);
			this.areas.forEach(function (area) {
				const node = document.createElement('option');
				node.setAttribute('type', 'option');
				node.text = area.title;
				node.value = JSON.stringify({
					center: area.latlng,
					zoom: area.zoom
				});
				selectElement.appendChild(node);
			});
		}
		return this.controlContainer;
	}

	public onRemove(): void {
		if (
			!this.controlContainer ||
			!this.controlContainer.parentNode ||
			!this.map ||
			!this.areaButton
		) {
			return;
		}
		this.areaButton.removeEventListener('click', this.onDocumentClick);
		this.controlContainer.parentNode.removeChild(this.controlContainer);
		document.removeEventListener('click', this.onDocumentClick);
		this.map = undefined;
	}

	private onDocumentClick(event: MouseEvent): void {
		if (
			this.controlContainer &&
			!this.controlContainer.contains(event.target as Element) &&
			this.mapAreaContainer &&
			this.areaButton
		) {
			this.mapAreaContainer.style.display = 'none';
			this.areaButton.style.display = 'block';
		}
	}
}
