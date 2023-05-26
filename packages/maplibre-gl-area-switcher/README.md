# maplibre-gl-area-switcher

![GitHub](https://img.shields.io/github/license/watergis/maplibre-gl-area-switcher)

This module adds area switcher control which is able to change locations of area to maplibre-gl

## Installation

```
pnpm i -D @watergis/maplibre-gl-area-switcher
```

Furthermore, you may download specific version's scripts and css locally from [release](https://github.com/watergis/maplibre-gl-export/releases) page.

## Usage

```ts
import MaplibreAreaSwitcherControl from "@watergis/maplibre-gl-area-switcher";
import { Map as MaplibreMap } from "maplibre-gl";

import "@watergis/maplibre-gl-area-switcher/dist/maplibre-gl-area-switcher.css";

const map = new MaplibreMap();
map.addControl(new MaplibreAreaSwitcherControl([
        {title: 'Narok',latlng: [35.87063, -1.08551],zoom: 14,}, 
        {title: "Ololulung'a",latlng: [35.65072, -1.0085],zoom: 13}, 
        {title: "Kilgoris",latlng: [34.87533, -1.00278],zoom: 14}, 
        {title: "Suswa",latlng: [36.33078, -1.05307],zoom: 13}
]), 'top-right');
```

Specify your areas which you want to change the location quickly by the control.

If number of areas is more than 5, the control will become select box in order to avoid the control become too long. The default limit number of areas can be changed in the second parameter. You may change as below.

```ts
map.addControl(new MaplibreAreaSwitcherControl([
        {title: 'Narok',latlng: [35.87063, -1.08551],zoom: 14,}, 
        {title: "Ololulung'a",latlng: [35.65072, -1.0085],zoom: 13}, 
        {title: "Kilgoris",latlng: [34.87533, -1.00278],zoom: 14}, 
        {title: "Suswa",latlng: [36.33078, -1.05307],zoom: 13}
], 3), 'top-right');
```

## Use CDN

```html
<link href='https://www.unpkg.com/@watergis/maplibre-gl-area-switcher@latest/dist/maplibre-gl-area-switcher.css' rel='stylesheet' />
<script src='https://unpkg.com/maplibre-gl@1.15.2/dist/maplibre-gl.js'></script>
<script src="https://www.unpkg.com/@watergis/maplibre-gl-area-switcher@latest/dist/maplibre-gl-area-switcher.umd.js"></script>
<script>
map.addControl(new MaplibreAreaSwitcherControl([
        {title: 'Narok',latlng: [35.87063, -1.08551],zoom: 14,}, 
        {title: "Ololulung'a",latlng: [35.65072, -1.0085],zoom: 13}, 
        {title: "Kilgoris",latlng: [34.87533, -1.00278],zoom: 14}, 
        {title: "Suswa",latlng: [36.33078, -1.05307],zoom: 13}
]), 'top-right');
</script>
```

## Development

```
pnpm lint
pnpm format
pnpm dev
```

open [http://localhost:5173](http://localhost:5173).

If there are any changes on source code, it will be reflected automatically.

## Build package

```
pnpm build
```

The modules will be generated under `dist` folder.
