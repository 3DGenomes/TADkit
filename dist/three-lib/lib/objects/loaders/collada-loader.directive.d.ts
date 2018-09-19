import { AbstractModelLoader } from './abstract-model-loader';
export declare class ColladaLoaderDirective extends AbstractModelLoader {
    private loader;
    protected loadModelObject(): Promise<any>;
}
