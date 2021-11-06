# Vue CLI Plugin Svgicons

[![npm](https://img.shields.io/npm/v/vue-cli-plugin-svgicons.svg)
![npm](https://img.shields.io/npm/dm/vue-cli-plugin-svgicons.svg)](https://www.npmjs.com/package/vue-cli-plugin-svgicons)

Vue CLI plugin to handle loading SVG files in specific folder as components. This plugin can also create from all of them global components.

## Getting started

Install the plugin into your project:

```bash
vue add svgicons
```

## Usage

There are 2 different approaches how to use this plugin. For smaller project you can load all icons at once as global components, or for large project, using vue router and its "webpackChunkName", it is recommended to load icons according usage in components.

Both approach creates components for icons with optional properties:

| Property | Description                                         |
| -------- | --------------------------------------------------- |
| size     | Set different width and height of SVG then default. |
| stroke   | Set different stroke width then default.            |
| color    | Set different stroke color then default.            |

```xml
<icon-file-name :size=48 />
```

### A) Load icons all at once

You can install a Vue.js plugin to register global components from all svg files in defined path. Components name are defined as prefix plus file name, `"[prefix][file-name]"`.

Default prefix is `icon-`, but you can override it in plugin options, eg:

```js
import svgicons from "vue-cli-plugin-svgicons";

createApp(App).use(svgicons, { prefix: "ico-" }).mount("#app");
```

### B) Load icons one by one

Other method is to load icons as components only if needed. CLI plugin defined webpack alias `@svgicons` for a folder with all icons, eg:

```js
import IconCheck from "@svgicons/check";

export default {
  components: {
    IconCheck,
  },
};
```

## Webpack loader default options

| Name   | Type   | Default              | Description                                                                                        |
| ------ | ------ | -------------------- | -------------------------------------------------------------------------------------------------- |
| path   | string | './src/assets/icons' | Path to folder with all svg icons used by loader. For this path will be created alias `@svgicons`. |
| size   | number | 24                   | Default value for component property size.                                                         |
| stroke | number | 2                    | Default value for component property stroke.                                                       |
| color  | string | 'curentColor'        | Default value for component property color.                                                        |

Loader default options can be overridden in file `vue.config.js`, eg:

```js
module.exports = {
  pluginOptions: {
    svgicons: {
      stroke: 4,
    },
  },
};
```
