var path = require('canonical-path');
var packagePath = __dirname;

var Package = require('dgeni').Package;

module.exports = new Package('myDoc', [
//    require('dgeni-packages/ngdoc'),
//    require('dgeni-packages/nunjucks'),
    require('dgeni-markdown')
])

.processor(require('./index-page'))

.config(function(log, readFilesProcessor, writeFilesProcessor) {

    // Set the log level to 'info', switch to 'debug' when troubleshooting
    log.level = 'info';

    // Specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = path.resolve(packagePath, '../..');

    // Specify the source files to extract
    readFilesProcessor.sourceFiles = [
        {
            include: 'src/**/*.js',
            exclude: 'src/assets/**/*',
            basePath: 'src'
        },
    ];

    // Use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = path.resolve(readFilesProcessor.basePath, 'docs');
    
})
