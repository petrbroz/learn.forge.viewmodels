class SummaryExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        console.log('SummaryExtension loaded.');
        return true;
    }

    unload() {
        console.log('SummaryExtension unloaded.');
        return true;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'SummaryExtension', SummaryExtension);
