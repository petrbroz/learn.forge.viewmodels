class MyAwesomeExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.toolbarGroup = null;
    }

    load() {
        // Extension initialization code here...
        return true;
    }

    unload() {
        // Extension deinitialization code here...
        if (this.viewer.toolbar) {
            this.viewer.toolbar.removeControl(this.toolbarGroup);
        }
        return true;
    }

    onToolbarCreated() {
        this.toolbarGroup = this.viewer.toolbar.getControl('MyAwesomeExtensionToolbar');
        if (!this.toolbarGroup) {
            this.toolbarGroup = new Autodesk.Viewing.UI.ControlGroup('MyAwesomeExtensionToolbar');
            this.viewer.toolbar.addControl(this.toolbarGroup);
        }

        const button = new Autodesk.Viewing.UI.Button('MyAwesomeExtensionButton');
        button.onClick = (ev) => { alert('Hello World!'); };
        button.setToolTip('My Awesome Extension');
        this.toolbarGroup.addControl(button);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);
