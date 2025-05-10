<!-- Webrogue logo -->
<div style="display: flex; flex-direction: row; align-items: center; justify-content: center; flex-wrap: wrap;">
    <image src="public/logo.png" width="100" height="100" alt=""/>
    <div style="width: 20px"></div>
    <h1 class="post-title">Webrogue</h1>
</div>
<div style="height: 40px"></div>

Webrogue is a way to port applications to different OSes with minimal effort.
Webrogue utilizes WebAssembly to allow using different programming languages instead of pinning to a specific one.
See [guides](guides/index) to learn how to setup and use Webrogue.

The key idea is compiling and packaging applications to OS-independent format called WRAPP (WebRogue APPlication).
<!-- .wrapp -->
Same WRAPP file can be compiled to multiple OS-native formats.
Read more about compiling WRAPPs to native formats [here](posts/aot).

Webrogue currently supports:
- [Windows](posts/platform_windows)
- [macOS](posts/platform_xcode)
- [Linux](posts/platform_linux)
- [Android](posts/platform_android)
- [iOS](posts/platform_xcode)
<!-- - [Web](topics/platform_web) -->

And of cause Webrogue is open source. 
Visit [Webrogue repo](https://github.com/webrogue-runtime/webrogue) on GitHub.

