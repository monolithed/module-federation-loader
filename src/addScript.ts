type Result = {
    script: HTMLScriptElement;
};

const defaultAttributes = {
    async: true
};

const addScript = (props: Partial<HTMLScriptElement>): Promise<Result> => {
    return new Promise((resolve, reject): void => {
        const script: HTMLScriptElement = document.createElement('script');

        Object.assign(script, defaultAttributes, props);

        script.addEventListener('load', () => resolve({script}));
        script.addEventListener('error', reject);

        document.head.append(script);
    });
};

export {addScript};
