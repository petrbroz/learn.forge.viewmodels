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

        this._enabled = false;
        this._button = new Autodesk.Viewing.UI.Button('heatmapButton');
        this._button.onClick = async (ev) => {
            this._enabled = !this._enabled;
            if (this._enabled) {
                const ids = await this.getLeafNodes();
                this.colorNodes(ids);
            } else {
                this.viewer.clearThemingColors();
            }
        };
        this._button.setToolTip('Heatmap');
        this._button.addClass('heatmapButtonIcon');
        this._group.addControl(this._button);
    }

    getLeafNodes() {
        return new Promise((resolve, reject) => {
            this.viewer.getObjectTree((tree) => {
                let dbids = [];
                tree.enumNodeChildren(tree.getRootId(), (dbid) => {
                    if (tree.getChildCount(dbid) === 0) {
                        dbids.push(dbid);
                    }
                }, true);
                resolve(dbids);
            });
        });
    }

    colorNodes(ids) {
        const filterProps = ['Area'];
        const MaxArea = 100.0;
        this.viewer.model.getBulkProperties(ids, filterProps, (items) => {
            for (const item of items) {
                const areaProp = item.properties[0];
                const normalizedArea = Math.min(1.0, parseFloat(areaProp.displayValue) / MaxArea);
                const color = new THREE.Color();
                color.setHSL(normalizedArea * 0.33, 1.0, 0.5);
                this.viewer.setThemingColor(item.dbId, new THREE.Vector4(color.r, color.g, color.b, 0.5));
            }
        });
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
    'HeatmapExtension', HeatmapExtension);
