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

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('myToolbarGroup');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('myToolbarGroup');
            this.viewer.toolbar.addControl(this._group);
        }

        this._button = new Autodesk.Viewing.UI.Button('heatmapButton');
        this._button.onClick = (ev) => {
            alert('Hello World!');
        };
        this._button.setToolTip('Heatmap');
        this._button.addClass('heatmapButtonIcon');
        this._group.addControl(this._button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'HeatmapExtension', HeatmapExtension);
