# @monolithed/module-federation-loader

[![Build Status](https://travis-ci.org/monolithed/module-federation-loader.png)](https://travis-ci.org/monolithed/module-federation-loader)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

A Webpack module for dynamically loading remote components

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/module-federation-loader --save
```

**Yarn**:

```
yarn add @monolithed/module-federation-loader
```

## Basic usage

```typescript
import React, {
    FunctionComponent,
    Suspense,
    lazy,
    useState,
    useEffect
} from 'react';

import ky from 'ky';
import {addScript, remoteLoader} from '@monolithed/module-federation-loader';

type Props = {
    bundle: string;
    module: string;
};

type BundleResponse = {
    src: string;
};

const fetchBundle = (name: string): Promise<BundleResponse> => {
    const request = ky.get('/bundle', {
        searchParams: {name}
    });

    return request.json<BundleResponse>();
};

const useBundle = (name: string) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [bundle, setBundle] = useState<HTMLScriptElement>();

    useEffect(() => {
        let abortController = new AbortController();

        (async (): Promise<void> => {
            let src = await fetchBundle(name);

            const {script} = await addScript({src});

            setBundle(script);
            setLoading(false);
        })();

        return () => {
            abortController.abort();
            bundle?.remove();
        };
    }, [name]);

    return {loading};
};

const LazyService: FunctionComponent<Props> = ({children, bundle, module}): JSX.Element => {
    const {loading} = useBundle(bundle);
    const remoteModule = remoteLoader({bundle, module});
    const RemoteComponent = lazy(remoteModule);

    return (
        <Suspense fallback="loading...">
            <RemoteComponent>{...children.props}</Component>
        </Suspense>
    );
};
```

## Options

* **bundle** (required)
* **module** (required)

## Publishing

```
npm publish --access public --verbose
```

## License

MIT

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.
