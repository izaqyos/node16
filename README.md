# node16
demos and code snippets re. node 16 features

# Main node 16 features

## Platform support (apples M1)
Apples M1 chips (arm based) support
Updated the minimum supported Xcode version to 11 and the GCC version for Linux and AIX platforms to 8.3.


## V8 Ver 9

### RegExp match indices
``` bash
[i500695@WYLQRXL9LQ:2022-04-26 15:58:55:~/git/portal-cf-transport-service:]2162$ node -v
v17.9.0
[i500695@WYLQRXL9LQ:2022-04-26 15:58:58:~/git/portal-cf-transport-service:]2163$ node
Welcome to Node.js v17.9.0.
Type ".help" for more information.
> const re=/(a+)(b*)/d
undefined
> const m = re.exec('aaab');
undefined
> m.indices[0]
[ 0, 4 ]
> m.indices[1]
[ 0, 3 ]
> m.indices[2]
[ 3, 4 ]
```

### Faster Super
Faster super property access
Accessing super properties (for example, super.x) has been optimized by using V8’s inline cache system and optimized code generation in TurboFan. With these changes, super property access is now closer to being on par with regular property access, as can be seen from the graphs below.

### WebAssembly
Faster JS-to-Wasm calls
V8 uses different representations for the parameters of WebAssembly and JavaScript functions. 
When JavaScript calls an exported WebAssembly function, the call goes through a so-called JS-to-Wasm wrapper,
responsible for adapting parameters from JavaScript land to WebAssembly land as well as adapting results in the opposite direction.
This comes with a performance cost, so calls from JavaScript to WebAssembly were not as fast as calls from JavaScript to JavaScript
To minimize this overhead the JS-to-Wasm wrapper can now be inlined at the call site, simplifying the code and removing this extra stack frame



### Promise based timers
### AbortController/Signal
### WebCrypto
### End of security support Node 14. 30.4.2023


