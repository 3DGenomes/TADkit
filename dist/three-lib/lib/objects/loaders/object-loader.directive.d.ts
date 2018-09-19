import { AbstractModelLoader } from './abstract-model-loader';
export declare class ObjectLoaderDirective extends AbstractModelLoader {
    private loader;
    protected loadModelObject(): Promise<any>;
}
