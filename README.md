# grunt-sst

grunt-sst is yet another Grunt-based mechanism for compiling [Swig](http://paularmstrong.github.io/swig/) templates into static HTML.  The plugin takes a files array and an options object.  It recursively scans through your files and uses Swig to render templates with all the features that Swig itself provides.  Data can be passed to templates both by means of a global `locals` object that is part of Swig's default options.  While properties set in `locals` are global to every template, they can be overridden at the template level.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sst --save
```

This command will download the plugin package along with its dependencies, as well as add it as a dependency to your project's `package.json` file.

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sst');
```

## The "sst" task

### Overview
In your project's Gruntfile, add a section named `sst` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sst: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options
The only specific configuration options the plugin may take are represented as an optional object representing Swig defaults.  You can merge custom Swig options with the Swig defaults by setting a `swigDefaults` property on the main options.  This approach is illustrated in the Custom Options section below.  The Swig defaults are documented on [the repository page for Swig itself](http://paularmstrong.github.io/swig/docs/api/#SwigOpts).  

The most notable of the Swig defaults that may be set when using this plugin is the `locals` object, which allows you to pass global data to all templates.

### Usage Examples

#### Default Options
In this example, the plugin uses Grunt's native file expansion to recursively search for `.swig` files in a specific current working directory.  Those files are then rendered with Swig into a specified destination and with a specified file extension of `.html`.

```js
grunt.initConfig({
  sst: {
    options: {},
    files: {[
        expand: true,
        cwd: 'foo',
        dest: 'your/compiled/assets',
        src: [
            '**/*.swig'
        ],
        ext: '.html'
    ]},
  },
});
```

#### Custom Options
In this example, two custom options are passed in that are meant to override Swig defaults: autoescape is set to true and a path to an object containing data meant to be passed to all templates globally.

```js
grunt.initConfig({
  sst: {
    options: {
        swigDefaults: {
            autoescape: true,
            locals: { foo: 'bar' }
        }
    },
    files: {[
        expand: true,
        cwd: 'foo',
        dest: 'your/compiled/assets',
        src: [
            '**/*.swig'
        ],
        ext: '.html'
    ]},
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 8/8/15: Second Development Release: 0.2.0
* 5/06/15: Initial Release: 0.1.0
