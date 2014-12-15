# less-plugin-property-order [![NPM version][npm-image]][npm-url]


[npm-image]: https://img.shields.io/npm/v/less-plugin-property-order.svg?style=flat
[npm-url]: https://npmjs.org/package/less-plugin-property-order


Check the order of the properties

## lessc usage

```
npm install -g less-plugin-property-order
```

and then on the command line,

```
lessc file.less --property-order
```

## Programmatic usage

```
var propertyOrderPlugin = require('less-plugin-property-order');
less.render(lessString, { plugins: [propertyOrderPlugin] })
  .then(
```
