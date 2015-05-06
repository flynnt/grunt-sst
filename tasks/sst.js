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
        this.mergeDefaults();
    }

    this.renderTemplates();
};

var proto = SwigTemplate.prototype;

proto.mergeDefaults = function() {
    var grunt = this.grunt;
    var options = this.options;
    var swigOpts = this.options.swigDefaults;

    if (swigOpts.locals && typeof swigOpts.locals === 'string') {
        var localsObject = grunt.file.readJSON(swigOpts.locals);
    } else {
        grunt.fail.warn('The locals property must be a file path string to an actual JSON file.');
    }

    swigOpts.locals = localsObject;

    swig.setDefaults(swigOpts);

    return this;
}

proto.renderTemplates = function() {
    var grunt = this.grunt;
    var files = this.files;

    files.forEach(function(file, index) {
        var cwd = file.orig.cwd || '';
        var src = file.src[0];
        var dirname = path.dirname(src);
        var basename = path.basename(src, '.swig');
        var outFile = basename + '.html';
        var tplContextFile = path.join(dirname, basename) + '.json';
        var tplVars = null;

        if (grunt.file.exists(tplContextFile)) {
            tplVars = grunt.file.readJSON(tplContextFile);
            grunt.log.write('Template-specific data found; merging "%s" with "%s".' + '\n', tplContextFile, src);
        }

        grunt.log.write('Processing: "%s"' + '\n', src);

        grunt.file.write(file.dest, swig.renderFile(src, tplVars));

    });

    return this;
};

module.exports = function(grunt) {
    grunt.registerMultiTask('swig', 'Compiles Swig templates with Grunt.', function() {
        new SwigTemplate(grunt, this);
  });
};