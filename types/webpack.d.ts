declare function __webpack_init_sharing__(scope: string): Promise<void>;

declare const __webpack_share_scopes__: {
    default: any
};

declare type SharedWebpackContainer = {
    init(scope: unknown): void;
    get(module: string): () => any;
};
