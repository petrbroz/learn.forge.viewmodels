class CustomTexturingExtension extends Autodesk.Viewing.Extension {
    load() {
        this._createShaderMaterial().then(material => {
            //this.viewer.impl.matman().addMaterial('my-custom-material', material, true);
            this.material = material;
        });
        if (this.viewer.toolbar) {
            this._createUI();
        } else {
            const onToolbarCreated = () => {
                this._createUI();
                this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, onToolbarCreated);
            };
            this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, onToolbarCreated);
        }
        return true;
    }

    unload() {
        this.viewer.toolbar.removeControl(this.toolbar);
    }

    _createUI() {
        const viewer = this.viewer;
        this.button = new Autodesk.Viewing.UI.Button('CustomTexturingButton');
        this.button.onClick = () => {
            const dbids = viewer.getSelection();
            const tree = viewer.model.getData().instanceTree;
            const frags = viewer.model.getFragmentList();
            for (const dbid of dbids) {
                tree.enumNodeFragments(dbid, frag => {
                    frags.setMaterial(frag, this.material);
                }, true);
            }
            viewer.model.unconsolidate();
            viewer.impl.invalidate(true, true, true);
        };
        const icon = this.button.container.children[0];
        icon.classList.add('fas', 'fa-fire');
        this.button.setToolTip('Custom Texturing');
        this.toolbar = viewer.toolbar.getControl('CustomToolbar') || new Autodesk.Viewing.UI.ControlGroup('CustomToolbar');
        this.toolbar.addControl(this.button);
        viewer.toolbar.addControl(this.toolbar);
    }

    _createShaderMaterial() {
        const vs = `
            varying vec2 vUv;
            void main() {
                vUv = fract(modelMatrix * vec4(position, 1.0)).xy;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const fs = `
            varying vec2 vUv;
            uniform sampler2D texture;
            void main() {
                gl_FragColor = texture2D(texture, vUv);
            }
        `;
        return new Promise(function(resolve, reject) {
            new THREE.TextureLoader().load('/doge.jpg', function(texture) {
                const material = new THREE.ShaderMaterial({
                    vertexShader: vs,
                    fragmentShader: fs,
                    uniforms: {
                        texture: { type: 't', value: texture }
                    }
                });
                resolve(material);
            });
        });
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('CustomTexturingExtension', CustomTexturingExtension);
