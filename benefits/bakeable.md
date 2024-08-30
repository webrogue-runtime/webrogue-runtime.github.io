---
layout: page
title: webrogue's bakeability
---


> [!WARNING]  
> This page is outdated. New version of webrogue temporary does not supports Wasm2c method and will not support Native method. 

As mentioned in explanation of webrogue's [portability](./portable), apps and modifications are distributed as __webrogue mods__, which contains WebAssembly code.
But in fact it is not always so.

App as well as modifications can be "baked" into webrogue. 
Baking is originally used during debug process, but distribution of baked apps is an option.
Webrogue offers two baking methods:

## Native method
The idea of native baking method is to compile code of mods to native code instead of WebAssembly code. It lets you to use your favorite IDE and debug utilities.
Note that if your app works natively baked it does not means that it will work when WebAssembly is used.
It is usually because natively baked code bypasses WASI.

## Wasm2c method
[Wasm2c](https://github.com/WebAssembly/wabt/blob/main/wasm2c/README.md) is an utility that, as its name says, translates WebAssembly code to C code, that is later compiled to native code. 

## Pros
- Baked apps have lower startup time.
- Baked apps are slightly more performant than ones that uses JIT or ATO compilation.
- Baked apps generally take less disk space.

## Cons
- Usage of modifications is limited. 
Modifications that are baked in can still be used, but adding new one will require you to rebuild your app.
- You need to bake your app for each platform.
- If you are using native baking method, you may need do setup toolchains for each platform and for each compilable language used in mods.
- You generally need a source code of all mods to use native baking method.
