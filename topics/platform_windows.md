---
layout: page
title: Windows support for Webrogue
---

Webrogue supports compiling WRAPPs to Windows-native executable format (.exe files).
`webrogue-default-runtime` utility is also available for Windows.

To be honest, I have no Windows machine, so Windows support may be out of date. 
You help is welcome!

All utilities needed to compile Windows-native executables are already included in `webrogue-aot-compiler`.
It means you don't even need Windows to compile for Windows.
Simply run following command:

```webrogue-aot-compiler windows mingw <WRAPP_PATH> <OUT_PATH>```

Only x64 CPUs are currently supported.

# Implementation details
AOT artifacts for Windows are compiled with MinGW.

OpenGL ES emulation is provided by [ANGLE](https://chromium.googlesource.com/angle/angle).
