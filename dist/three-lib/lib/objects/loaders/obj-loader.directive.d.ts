import { AbstractModelLoader } from './abstract-model-loader';
/**
 * Directive for employing THREE.OBJLoader to load [Wavefront *.obj files][1].
 *
 * [1]: https://en.wikipedia.org/wiki/Wavefront_.obj_file
 */
export declare class ObjLoaderDirective extends AbstractModelLoader {
    private loader;
    private mtlLoader;
    material: string;
    texturePath: string;
    protected loadModelObject(): Promise<any>;
}
