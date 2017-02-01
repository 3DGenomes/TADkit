module.exports = function indexPageProcessor() {
    return {
        $runAfter: ['adding-extra-docs'],
        $runBefore: ['extra-docs-added'],
        $process: process
    };

    function process(docs) {

        // Document what this does? pushes to the docs obj the props
        docs.push({
            docType: 'indexPage',
            template: 'indexPage.template.html',
            outputPath: 'index.html',
            path: 'index.html',
            id: 'index'
        });

    }
};