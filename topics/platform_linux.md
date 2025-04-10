---
layout: page
title: Linux support for Webrogue
---

Webrogue supports compiling WRAPPs to ELF files for Linux.
Everything needed to compile Linux-native executables is already included in `webrogue` utility.
It means you need neither Linux nor Docker to compile for Linux.
Just run the following command:

```webrogue compile linux <WRAPP_PATH> <OUT_PATH>```

`webrogue run` command is also available for Linux.

Currently only x64 CPUs and glibc distros are supported.
More CPU and distro support will come in future versions.

# Implementation details
AOT artifacts for Linux are compiled with Clang-19 in Debian "bookworm" Docker image.

Since most Linux distros include Mesa's OpenGL ES drives, no graphics emulation layer is required.

SWRAPP is bundled by appending it's content to resulting binary (à la AppImage).
