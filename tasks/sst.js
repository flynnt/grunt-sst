/*
 * grunt-sst
 * https://github.com/tflynn/grunt-sst
 *
 * Copyright (c) 2015 Ted Flynn
 * Licensed under the MIT license.
 */

'use strict';

var swig = require('swig');
var path = require('path');

var SwigTemplate = function(grunt, task) {
    this.grunt = grunt;
    this.files = task.files;
    this.options = task.options();

    if (this.options.swigDefaults) {
        swig.setDefaults(this.options.swigDefaults);
    }

    this.renderTemplates();
};

var proto = SwigTemplate.prototype;

proto.renderTemplates = function() {
    var grunt = this.grunt;
    var files = this.files;
    var options = this.options;

    files.forEach(function(file, index) {
        var cwd = file.orig.cwd || '';
        var src = file.src[0];
        var dirname = path.dirname(src);
        var basename = path.basename(src, '.swig');
        var outFile = basename + '.html';

        grunt.log.write('Processing: "%s"' + '\n', src);

        grunt.file.write(file.dest, swig.renderFile(src, {}));

    });

    return this;
};

module.exports = function(grunt) {
    grunt.registerMultiTask('sst', 'Compiles Swig templates with Grunt.', function() {
        new SwigTemplate(grunt, this);
  });
};