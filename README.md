# @monolithed/remote-component-loader

[![Build Status](https://travis-ci.org/monolithed/remote-component-loader.png)](https://travis-ci.org/monolithed/remote-component-loader)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.txt)

A Webpack module for dynamically loading remote components

## Installation

Install with npm or Yarn:

**npm**:

```
npm install @monolithed/remote-component-loader --save
```

**Yarn**:

```
yarn add @monolithed/remote-component-loader
```

## Basic usage

```typescript
import React, {
    FunctionComponent,
    Suspense,
    lazy
} from 'react';

import {useScript} from '@monolithed/use-script-hook';
import {componentLoader} from '@monolithed/remote-component-loader';

type Props = {
    src: string;
    scope: string;
    module: string;
};

const LazyService: FunctionComponent<Props> = ({children, src, scope, module}): JSX.Element => {
    const {loaded, failed} = useScript({src});
    const remoteModule = componentLoader({scope, module});
   
    const RemoteComponent = lazy(remoteModule);

    return (
        <Suspense fallback="loading...">
            <RemoteComponent>{...children.props}</Component>
        </Suspense>
    );
};
```

## Options

**scope** (required)
**module** (required)

## Publishing

```
npm publish --access public --verbose
```

## License

MIT

## Contributing
   
Feel free to submit a pull request if you find any bugs. 
Please make sure all commits are properly documented.
