# malibre-gl-area-switcher

![GitHub](https://img.shields.io/github/license/watergis/maplibre-gl-area-switcher)

This monorepo manages the source code and demo page for `@watergis/maplibre-gl-area-switcher`.

## Repositories

| repository | description | changelog |
|---|---|---|
|[@watergis/maplibre-gl-area-switcher](./packages/maplibre-gl-area-switcher/)|The main repository to manage plugin source code|[CHANGELOG](./packages/maplibre-gl-area-switcher/CHANGELOG.md)
|[maplibre-gl-area-switcher.water-gis.com](./sites/maplibre-gl-area-switcher.water-gis.com/)|The repository manages demo website|-|

## Usage of the plugin

See [README](./packages/maplibre-gl-area-switcher)

## How to release

It uses changeset to release. Please create release notes by the following command. Changeset will release package once the PR is merged into main branch.

```zsh
pnpm changeset
```

## Contribution

See [CONTRIBUTING](./.github/CONTRIBUTING.md)
