type Options = {
    scope: string;
    module: string;
};

const componentLoader = ({scope, module}: Options) => {
    return async (): Promise<any> => {
        try {
            await __webpack_init_sharing__('default');

            const container: SharedWebpackContainer = (<any>window)[scope];

            await container.init(__webpack_share_scopes__.default);

            const factory = await container.get(module);

            return factory();
        }
        catch (error) {
            console.error('LazyService::componentLoader', 'failed', module, '\n', error);

            throw new Error(error);
        }
    };
};

export {componentLoader};
export type {Options};
