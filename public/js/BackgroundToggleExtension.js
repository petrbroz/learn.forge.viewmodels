class BackgroundToggleExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        console.log('BackgroundToggleExtension loaded.');
        return true;
    }

    unload() {
        console.log('BackgroundToggleExtension unloaded.');
        return true;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'BackgroundToggleExtension', BackgroundToggleExtension);
