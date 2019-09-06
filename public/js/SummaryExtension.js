class SummaryExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
    }

    load() {
        this._panel = new SummaryPanel(this.viewer.container, 'summaryPanel', 'Summary Panel');
        this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,
            this.onSelectionChanged.bind(this));
        console.log('SummaryExtension loaded.');
        return true;
    }

    unload() {
        console.log('SummaryExtension unloaded.');
        return true;
    }

    onToolbarCreated() {
        this._group = this.viewer.toolbar.getControl('myToolbarGroup');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('myToolbarGroup');
            this.viewer.toolbar.addControl(this._group);
        }

        this._button = new Autodesk.Viewing.UI.Button('summaryButton');
        this._button.onClick = async (ev) => {
            this._panel.setVisible(!this._panel.isVisible());
        };
        this._button.setToolTip('Summary');
        this._button.addClass('summaryButtonIcon');
        this._group.addControl(this._button);
    }

    onSelectionChanged() {
        const selectedIds = this.viewer.getSelection();
        if (selectedIds.length > 0) {
            const filterProps = ['Area', 'Volume'];
            this.viewer.model.getBulkProperties(selectedIds, filterProps, (items) => {
                let totalArea = 0.0, totalVolume = 0.0;
                for (const item of items) {
                    const areaProp = item.properties.find(prop => prop.displayName === 'Area');
                    if (areaProp) {
                        totalArea += parseFloat(areaProp.displayValue);
                    }
                    const volumeProp = item.properties.find(prop => prop.displayName === 'Volume');
                    if (volumeProp) {
                        totalVolume += parseFloat(volumeProp.displayValue);
                    }
                }
                this._panel.removeAllProperties();
                this._panel.addProperty('Total Area', totalArea.toFixed(2), 'Measurements');
                this._panel.addProperty('Total Volume', totalVolume.toFixed(2), 'Measurements');
            });
        } else {
            this._panel.removeAllProperties();
            this._panel.addProperty('Total Area', '0.00', 'Measurements');
            this._panel.addProperty('Total Volume', '0.00', 'Measurements');
        }
    }
}

class SummaryPanel extends Autodesk.Viewing.UI.PropertyPanel {
    constructor(container, id, title, options) {
        super(container, id, title, options);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'SummaryExtension', SummaryExtension);
