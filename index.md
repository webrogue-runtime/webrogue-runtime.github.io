---
layout: page
---

<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; flex-wrap: wrap;">
    <image src="icons/logo.png" width="100" height="100" alt=""/>
    <div style="width: 20px"></div>
    <h1 class="post-title">Webrogue</h1>
</div>
<div style="height: 40px"></div>

Webrogue is a way to port applications to different OSes with minimal effort.
Instead of pinning to one specific programming language, Webrogue utilizes WebAssembly to allow using different programming languages.
See [guides](topics/guides.html).

The key idea is compiling and packaging applications to OS-independent format called WRAPP (WebRogue APPlication).
Same WRAPP file can be compiled to multiple OS-native formats.
Read more about compiling WRAPPs to native formats [here](topics/aot.html).

Webrogue currently supports:
- [Windows](topics/platform_windows.html)
- [macOS](topics/platform_xcode.html)
- [Linux](topics/platform_linux.html)
- [Android](topics/platform_android.html)
- [iOS](topics/platform_xcode.html)
<!-- - [Web](topics/platform_web.html) -->

And of cause Webrogue is open source. 
Visit [Webrogue repo](https://github.com/webrogue-runtime/webrogue) on GitHub.
