---
layout: page
title: Download
---

<div id="detectedOsMark"></div>

<div id="osMark1"></div>

# Android
Webrogue for Android is currently distributed as an APK file hosted 
[here](http://webrogue-runtime.github.io/webrogue/webrogue.apk).

<div id="osMark2"></div>

# Linux
Webrogue offers:
- AppImage hosted [here](https://webrogue-runtime.github.io/webrogue/webrogue-x86_64.AppImage).
- Debian package hosted [here](https://webrogue-runtime.github.io/webrogue/webrogue.deb). You can use a GUI installer or the following commands
```
wget https://webrogue-runtime.github.io/webrogue/webrogue.deb
sudo dpkg -i webrogue.deb
rm webrogue.deb
```
- RPM package hosted [here](https://webrogue-runtime.github.io/webrogue/webrogue.rpm). You can install it using following commands
```
wget https://webrogue-runtime.github.io/webrogue/webrogue.rpm
sudo rpm -i webrogue.rpm
rm webrogue.rpm
```

<div id="osMark3"></div>

# Windows
Installer can be downloaded from [here](https://webrogue-runtime.github.io/webrogue/webrogue_installer.exe).

Also there is an unsigned MSIX installer [here](https://webrogue-runtime.github.io/webrogue/webrogue.msix).
To install it, open PowerShell, navigate to directory you downloaded your installer into and use the following command
```
Start-Process -Verb RunAs powershell.exe -Args "-executionpolicy bypass -command Set-Location \`"$PWD\`"; Add-AppPackage -Path webrogue.msix -AllowUnsigned"
```

<div id="osMark4"></div>

# MacOS
Webrogue for macOS is distributed as DMG file hosted [here](https://webrogue-runtime.github.io/webrogue/webrogue.dmg).

<div id="osMark5"></div>

# Other platforms
Webrogue can be built for many platforms manually, or some prebuilt binaries can be found as GitHub Actions Artifacts.

<div id="osMark6"></div>

# Examples
While webrogue comes with preinstalled log2048 mod, you will likely want to find more mods.
[Here](../examples/) are some.

<script type='text/javascript'>
    let detectedOsMark = document.getElementById('detectedOsMark');

    var beginMark;
    var endMark;
    {
        function checkOS(osName, osMark) {
            console.log(navigator.appVersion)
            if (navigator.appVersion.indexOf(osName)!=-1) {
                beginMark = "osMark" + osMark;
                endMark = "osMark" + (osMark+1);
            }
        }
        
        let unknownOsMark = 5;
        checkOS('', unknownOsMark)

        checkOS('Linux', 2)
        checkOS('Ubuntu', 2)

        checkOS('Android', 1)

        checkOS('Windows', 3)
        checkOS('Mac OS X', 4)

        checkOS('iPhone', unknownOsMark)
    }

    let matchingElements = [];
    let parent = detectedOsMark.parentElement;
    let allElements = parent.children;
    var matches = false;
    for (var i = 0; i < allElements.length; i++) {
        let element = allElements[i];
        var elementId = element.getAttribute("id");
        if(elementId === endMark) matches = false;
        if(matches) matchingElements.push(element);
        if(elementId === beginMark) matches = true;
    }
    for (var i = 0; i < matchingElements.length; i++) {
        let element = matchingElements[i];
        detectedOsMark.appendChild(element);
    }
    // detectedOsMark.parent
</script>
