---
layout: page
title: Download
---

<div id="detectedOsMark"></div>

<div id="osMark1"></div>

# Android
Webrogue for Android is currently distributed as an APK file hosted 
[here](http://webrogue-runtime.github.io/webrogue/webrogue.apk)

<div id="osMark2"></div>

# Linux
Webrogue offers:
- AppImage hosted [here](https://webrogue-runtime.github.io/webrogue/Webrogue-x86_64.AppImage).
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

# MacOS
Webrogue for macOS is distributed as DMG file hosted [here](https://webrogue-runtime.github.io/webrogue/Webrogue.dmg)

<div id="osMark4"></div>

# Other platforms
Webrogue can be built for many platforms manually, or some prebuilt binaries can be found as GitHub Actions Artifacts

<div id="osMark5"></div>

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
        
        let unknownOsMark = 4;
        checkOS('', unknownOsMark)

        checkOS('Linux', 2)
        checkOS('Ubuntu', 2)

        checkOS('Android', 1)

        checkOS('Mac OS X', 3)

        checkOS('Windows', unknownOsMark)
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
