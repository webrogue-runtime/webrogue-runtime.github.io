---
layout: page
title: Compiling WRAPPs to native formats
---

To distribute your Webrogue application at stores and allow end users to install it with ease, WRAPP should be compiled to OS-native format.
It is done using `webrogue compile` command.

# Windows

No third-party tools are required to compile WRAPP to Windows-native executable.
Just run following command on your Windows, macOS or Linux machine:

```webrogue compile windows msvc <WRAPP_PATH> <OUT_PATH>```

Read more about Windows support [here](platform_windows.html).

# Linux

Same as in case of Windows, WRAPP can be compiled to Linux-native executable by running single command on your Windows, macOS or Linux machine:

```webrogue compile linux <WRAPP_PATH> <OUT_PATH>```

Read more about Linux support [here](platform_linux.html).

# Android

To compile WRAPP to Android application, you need Android SDK 35 or later and NDK 27.2.12479018 or later.
Path to Android SDK should be specified using `--sdk` option or `ANDROID_HOME` environment variable.

`webrogue compile android gradle <WRAPP_PATH> <BUILD_DIR> --sdk <PATH>`

Read more about Android support [here](platform_android.html).

# macOS and iOS

macOS and Xcode 16 or later is required to compile WRAPP to macOS and iOS apps. Xcode is available only for macOS, so macOS machine (or CI/CD runner), is required for this.

Compilation is done using following commands:

```webrogue compile xcode <WRAPP_PATH> <BUILD_DIR> macos```

and

```webrogue compile xcode <WRAPP_PATH> <BUILD_DIR> ios```

Read more about macOS and iOS support [here](platform_xcode.html).

# Implementation details

Webrogue Ahead-of-time compiles WebAssembly using Wasmtime and Cranelift.
This approach combines fastest code loading, near-native execution speed and relatively low resulting binary size.
Webrogue generates object file in platform-native format, which is later linked with prebuilt Webrogue libraries as well as system libraries using [LLD](https://lld.llvm.org/) shipped with `webrogue` utility (or using Xcode's one), and all these things are done by just running one command.
Webrogue also automatically generates such resources as application name, ID, version, icons and splash screens form WRAPP config.
