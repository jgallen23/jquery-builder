#jQuery Builder

jQuery Builder lets you easily build a version a custom version of jQuery without downloading the source, grabbing the submodules, installing grunt and building yourself.

##Install

```
npm install jquery-builder
```

##Usage

```
jQuery Builder 0.2.0
Usage: node ./bin/builder.js

Options:
  -e, --exclude   Modules to exclude [module,module]  [string]
  -m, --minify    Minify output                       [boolean]
  -l, --ls        List available modules              [boolean]
  -v, --version   Version of jQuery                   [string]  [default: "1.9.1"]
  -s, --versions  List available versions
```

##Example

```
jquery-builder --exclude ajax,css -m > jquery.min.js
```

##Available Modules

- ajax
- deprecated
- css
- dimensions
- effects
- offset
