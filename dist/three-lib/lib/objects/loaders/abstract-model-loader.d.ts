import { OnDestroy } from '@angular/core';
import { AbstractObject3D } from '../abstract-object-3d';
import { WebGLRendererComponent } from '../../renderer/webgl-renderer.component';
import * as THREE from 'three-full';
/**
 * Helper parent class for model loader directives.
 *
 * @see ObjectLoaderDirective
 * @see ObjLoaderDirective
 * @see ColladaLoaderDirective
 */
export declare abstract class AbstractModelLoader extends AbstractObject3D<THREE.Object3D> implements OnDestroy {
    private _model;
    private _renderer;
    /**
     * Flag to signal whether the parent class instance AbstractObject3D called the
     * overwritten method {@link ModelLoaderDirective#afterInit} yet.
     *
     * Unless that method was called, no methods and properties of {@link AbstractObject3D}
     * may be safely accessed, especially {@link AbstractObject3D#addChild} and
     * {@link AbstractObject3D.renderer}.
     */
    private parentInitialized;
    protected currentLoadedModelObject: THREE.Object3D | undefined;
    /**
     * Load the model object.
     *
     * Some loaders (e.g. ColladaLoader) also provide other model information
     * upon loading besides the "raw" model object/scene. In these cases
     * implementing child classes are indeed supposed to return the "raw" model
     * object.
     * The data source (usually a URI, although child classes are free to implement
     * other means as well) from which the model shall be loaded can be obtained by
     * {@link ModelLoaderDirective.model}.
     */
    protected abstract loadModelObject(): Promise<THREE.Object3D>;
    /**
     * The model data source (usually a URI).
     * Settings this property only hides the previous model upon successful
     * loading of the new one. This especially means that if the new data source
     * is invalid, the old model will *not* be removed from the scene.
     */
    /**
    * The current model data source (usually a URI).
    */
    model: string;
    renderer: WebGLRendererComponent;
    protected afterInit(): void;
    ngOnDestroy(): void;
    protected rerender(): void;
    protected newObject3DInstance(): THREE.Object3D;
}
