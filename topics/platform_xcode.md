---
layout: page
title: macOS and iOS support for Webrogue
---


Webrogue supports compiling WRAPPs to App Store-ready macOS and iOS applications.

`webrogue-default-runtime` utility is available for macOS, but not for iOS.

Xcode 16 or later is required to compile WRAPPs to macOS and iOS apps. 
Xcode is available only for macOS, so macOS machine (or CI/CD runner), is required for this.

Compilation is done using following commands:

```webrogue-aot-compiler xcode <WRAPP_PATH> <BUILD_DIR> macos```

and

```webrogue-aot-compiler xcode <WRAPP_PATH> <BUILD_DIR> ios```

Both x64 (Intel) and AArch64 (iPhone and M-series) are supported.
Simulators are also supported.

# Implementation details

Webrogue generates Xcode 16 project for, which is used to build both macOS and iOS.
If you want to make Xcode project without building apps:

```webrogue-aot-compiler xcode <WRAPP_PATH> <BUILD_DIR> project``` 

Resulting project is placed at `<BUILD_DIR>/webrogue.xcodeproj` and can be opened in Xcode.

OpenGL ES emulation is provided by [ANGLE](https://chromium.googlesource.com/angle/angle).

WRAPP is bundled as macOS/iOS resource file.
