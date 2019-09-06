class HeatmapExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        console.log('HeatmapExtension loaded.');
        return true;
    }

    unload() {
        console.log('HeatmapExtension unloaded.');
        return true;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'HeatmapExtension', HeatmapExtension);
