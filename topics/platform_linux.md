---
layout: page
title: Linux support for Webrogue
---

Webrogue supports compiling WRAPPs to ELF files for Linux.
`webrogue-default-runtime` utility is also available for Linux.

All utilities needed to compile Linux-native executables are already included in `webrogue-aot-compiler`.
It means you need neither Linux nor Docker to compile for Linux.
Just run the following command:

```webrogue-aot-compiler linux <WRAPP_PATH> <OUT_PATH>```

Currently only x64 CPUs and glibc distros are supported.
More CPU and distro support will come in future versions.

# Implementation details
AOT artifacts for Linux are compiled with Clang-16 in Debian "bullseye" Docker image.

Since most Linux distros include Mesa's OpenGL ES drives, no graphics emulation layer is required.

WRAPP is bundled as separate file.
It can be fixed using AppImage, but it's support for Webrogue is currently not implemented.
