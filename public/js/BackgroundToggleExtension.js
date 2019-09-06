class BackgroundToggleExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        window.addEventListener('keypress', this.onKeyPress.bind(this));
        console.log('BackgroundToggleExtension loaded.');
        return true;
    }

    unload() {
        console.log('BackgroundToggleExtension unloaded.');
        return true;
    }

    onKeyPress(ev) {
        if (/^\d$/.test(ev.key)) {
            this.viewer.setLightPreset(parseInt(ev.key));
        }
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'BackgroundToggleExtension', BackgroundToggleExtension);
