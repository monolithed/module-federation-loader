type Options = {
    bundle: string;
    module: string;
};

const DEFAULT_SCOPE = 'default';

const remoteLoader = ({bundle, module}: Options) => {
    return async (): Promise<any> => {
        try {
            await __webpack_init_sharing__(DEFAULT_SCOPE);

            const container: SharedWebpackContainer = (<any>window)[bundle];

            await container.init(__webpack_share_scopes__[DEFAULT_SCOPE]);

            const factory = await container.get(module);

            return factory();
        } catch (error) {
            console.error('Module Federation', bundle, '\n', error);

            throw new Error(error);
        }
    };
};

export {remoteLoader};
export type {Options};
