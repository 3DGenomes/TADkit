var path = require('canonical-path');
var packagePath = __dirname;

var Package = require('dgeni').Package;

module.exports = new Package('TADkitDocs', [
    require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
//    require('dgeni-markdown')
])

//.processor(require('./index-page'))

.config(function(templateFinder, templateEngine) {
  templateFinder.templateFolders
      .unshift(path.resolve(packagePath, 'dgeni'));
  templateFinder.templatePatterns = [
    '${ doc.template }',
    '${ doc.area }/${ doc.id }.${ doc.docType }.template.md',
    '${ doc.area }/${ doc.id }.template.md',
    '${ doc.area }/${ doc.docType }.template.md',
    '${ doc.id }.${ doc.docType }.template.md',
    '${ doc.id }.template.md',
    '${ doc.docType }.template.md'
  ];
})

.config(function(computeIdsProcessor, createDocMessage, getAliases) {
  computeIdsProcessor.idTemplates.push({
    docTypes: ['controller', 'provider', 'service', 'directive', 'input', 'object', 'function', 'filter', 'type' ],
    idTemplate: 'module:${module}.${docType}:${name}',
    getAliases: getAliases
  });

})

.config(function(computePathsProcessor, createDocMessage) {
  computePathsProcessor.pathTemplates = [];
  computePathsProcessor.pathTemplates.push({
    docTypes: ['controller', 'provider', 'service', 'directive', 'input', 'object', 'function', 'filter', 'type' ],
    pathTemplate: '${area}/${module}/${docType}/${name}',
    outputPathTemplate: '${module}/${docType}/${name}.md'
  });
  computePathsProcessor.pathTemplates.push({
    docTypes: ['module' ],
    pathTemplate: '${area}/${name}',
    outputPathTemplate: '${module}/index.md'
  });
  computePathsProcessor.pathTemplates.push({
    docTypes: ['componentGroup' ],
    pathTemplate: '${area}/${moduleName}/${groupType}',
    outputPathTemplate: '${moduleName}/${groupType}/index.md'
  });
})

.config(function(getLinkInfo) {
	getLinkInfo.relativeLinks = true;
})

.config(function(log, readFilesProcessor, writeFilesProcessor) {
    // Set the log level to 'info', switch to 'debug' when troubleshooting
    log.level = 'info';

    readFilesProcessor.basePath = path.resolve(packagePath, '../');

    readFilesProcessor.sourceFiles = [
        {
            include: 'src/**/*.js',
            exclude: 'src/assets/**/*',
            basePath: 'src'
        },
    ];

    writeFilesProcessor.outputFolder = 'docs/pages/tadkit';
    
});