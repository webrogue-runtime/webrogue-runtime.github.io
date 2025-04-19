---
layout: page
title: C++/CMake/VSCode guide
---

This guide will show how to build a simple WRAPP using C++, CMake, and Visual Studio Code.

## Installing CMake

CMake also requires a generator program, usually Ninja.

If you are using Windows, you can download CMake and Ninja using winget:
```
winget install Kitware.CMake
winget install Ninja-build.Ninja
```

On Linux, MacOS and other operation system installation process may differ, but you usually just need to use a package manager like Brew or Apt-Get.


## Installing Visual Studio Code and Extensions

Now let's install VSCode.
You can find instructions and download links on [official website](https://code.visualstudio.com/Download).

Then you will need the following VSCode extensions:
- Webrogue
- [CMake Tools](vscode:extension/ms-vscode.cmake-tools)
- [clangd](vscode:extension/llvm-vs-code-extensions.vscode-clangd). Also press "Download" when "The 'clangd' language server was not" message will appear.
- [CodeLLDB](vscode:extension/vadimcn.vscode-lldb)

## Installing Webrogue SDK

While Webrogue SDK can be installed manually, in this guide we will use Webrogue extension for VSCode to install it.

First of all, open command selection menu in VSCode.
It can be done by pressing Ctrl+Shift+P or navigating to Help -> Show All Commands.

Then search for "Install/Update Webrogue SDK" command in this menu.
Start typing to filter commands.
Run this command and wait while Webrogue SDK installs.

On Windows, install Microsoft Visual C++ Redistributable if not already installed.
Download links can be found [there](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist#latest-microsoft-visual-c-redistributable-version).

## Creating and configuring "Hello World" C++ CMake project

Lets create file named `main.cpp` with this simple code:
```
#include <iostream>

int main() {
    std::cout << "Hello World\n";
}
```

`CMakeLists.txt` file with this code:
```
project(cppexample)

add_executable(main main.cpp)
```

and `webrogue.json` file:
```
{
    "name": "simple",
    "id": "io.github.webrogue_runtime.examples.simple",
    "version": "0.1.0",
    "main": "build/main"
}
```

Now we need to configure CMake project.
CMake logo (triangle and wrench) should already appear on the left bar.
Ensure that "Webrogue WASIp1-threads" kit is selected under "configure" section, then press "configure" icon (file and arrow right) or run "CMake: configure" command.

To make build process easier, we will create two VSCode task to automatically build CMake project.
Add these two records to `.vscode/tasks.json` (create this file if it not already exists):
```
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "cmake",
            "label": "CMake: build",
            "command": "build",
            "targets": [
                "all"
            ],
            "group": "build",
            "problemMatcher": [],
            "detail": "CMake template build task"
        }
    ]
}
```
And finally `.vscode/launch.json` file:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Launch",
            "program": "<replace me>",
            "args": [
                "run",
                "--config",
                "${workspaceFolder}/webrogue.json"
            ],
            "cwd": "${workspaceFolder}",
            "preLaunchTask": "CMake: build"
        }
    ]
}
```
A tricky part there is that we need to replace `<replace me>` string with path to Webrogue binary.
Run `Copy path to Webrogue binary` command and paste copied path instead of placeholder.
On Windows backslash `\` delimiters must be replaced with double backslashes `\\`.

At this point we are ready to run our applications.
Just press F5 or use any other means to start launch task.
Our program should print `Hello World` string to terminal.
Breakpoints should also work.

## Packaging WRAPP file and building native apps

Simplest way to package WRAPP file is to use `Pack Webrogue configuration into WRAPP` command.
A task with same name also exists.

When WRAPP is build, just open it in VSCode.
GUI with a few buttons should appear, allowing you to build native apps.
While Webrogue CLI utility supports 5 operation systems, this GUI currently supports only 2 of them: Windows and Linux.

Note: while building Windows app, libGLESv2.dll and libEGL.dll files will appear.
They must be bundled with with resulting out.exe file, otherwise it will crash.
