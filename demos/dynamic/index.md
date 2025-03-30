---
layout: page
title: Dynamic demo
---

<div style="display: none;"> <!-- invisible container fore reusable elements -->
    <table>
        <tr id="installedAppsItemTemplate">
            <td>
                <label id="modItemLabel">Example mod item</label>
            </td>
            <td>
                <button type="button" id="runButton"><label>Run</label></button>
                <button type="button" id="deleteButton"><label>Delete</label></button>
            </td>
        </tr>
    </table>
</div>

<div id="noJavaScript">
    Warning! You browser does not supports JavaScript or it is turned off. This demo will not work.
    <br/><br/>
</div>
<script type='text/javascript'>
    document.getElementById('noJavaScript').style.display = "none";
</script>

<div style="display:none" id="noWebAssembly">
    Warning! You browser does not supports WebAssembly or it is turned off. This demo will not work.
    <br/><br/>
</div>


<div style="display:none" id="noSharedArrayBuffer">
    Warning! You browser has no SharedArrayBuffer support or it is turned off. This demo will not work.
    <br/><br/>
</div>



This page allows you to upload and run WRAPPs in your browser

Choose a WRAPP to upload: <input type="file" multiple accept=".wrapp" id="fileSelector"/>

Saved WRAPPs:
<table id="installedApps"></table>

<canvas id="canvas" oncontextmenu="event.preventDefault()"  ></canvas>

<script type='text/javascript'>
    if(typeof WebAssembly === 'undefined')
        document.getElementById("noWebAssembly").style.display = null
    if(typeof SharedArrayBuffer === 'undefined')
        document.getElementById("noSharedArrayBuffer").style.display = null
    var predefinedMods = [
        // { modName: "log2048", url: "../../webrogue/mods/log2048.wrmod" },
        // { modName: "brogue", url: "../../webrogue/mods/brogue.wrmod" },
        // { modName: "coremark", url: "../../webrogue/mods/coremark.wrmod" },
    ];
    predefinedMods = [];
    var storedMods = [];
    var installedAppsElement = document.getElementById("installedApps");

    var homepageIndexedDB = undefined;
        
    function splitModToChunks(bytes) {
        return new Blob([bytes.buffer]);
    }

    function reloadModList() {
        var transaction = homepageIndexedDB.transaction("apps", 'readonly');
        var allRecords = transaction.objectStore("apps").getAll();
        allRecords.onsuccess = function () {
            setStoredMods(allRecords.result);
        };
    }

    const fileSelector = document.getElementById('fileSelector');
    fileSelector.value = null;
    fileSelector.addEventListener('change', (fileSelectorEvent) => {
        var remainFiles = fileSelectorEvent.target.files.length;
        Array.from(fileSelectorEvent.target.files).forEach((file) => {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function (event) {
                remainFiles--;
                if (remainFiles == 0) {
                    fileSelector.value = null;
                }
                var transaction = homepageIndexedDB.transaction("apps", 'readwrite');
                transaction.oncomplete = function (event) {
                    reloadModList();
                };
                var bytes = new Uint8Array(event.target.result);

                var jsonEndPos = bytes.slice(6).findIndex((byte) => byte == 0) + 6;
                var jsonBytes = bytes.slice(6, jsonEndPos);
                var configStr = (new TextDecoder()).decode(jsonBytes);
                var config = JSON.parse(configStr);
                transaction.objectStore("apps").put({ 
                    id: config.id,
                    configStr: configStr,
                    blob: splitModToChunks(bytes)
                });
            }
            reader.onerror = function (event) {
                remainFiles--;
                console.error("error while uploading file")
            }
        });
    });


    function setStoredMods(newStoredMods) {
        storedMods = newStoredMods;
        // predefinedMods.filter((predefinedMod) => {
        //     var result = true;
        //     storedMods.forEach(storedMod => {
        //         if (storedMod.modName == predefinedMod.modName)
        //             result = false;
        //     });
        //     return result;
        // }).forEach((predefinedMod) => {
        //     storedMods.unshift(predefinedMod)
        // })
        while (installedAppsElement.firstChild) {
            installedAppsElement.removeChild(installedAppsElement.lastChild);
        }
        storedMods.forEach((mod) => {
            var newNode = document.getElementById("installedAppsItemTemplate").cloneNode(true);
            let config = JSON.parse(mod.configStr);
            newNode.querySelector("#modItemLabel").textContent = mod.blob ? config.name : (config.name + ", not installed");
            var runButton = newNode.querySelector("#runButton");
            runButton.onclick = async function () {
                if (PThread.runningWorkers.length != 0) {
                    console.log("Terminating all threads.");
                    PThread.terminateAllThreads();
                    // It takes time, and starting new WRAPP before all threads are terminated may cause odd bugs with 
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
                let data = new Uint8Array(await mod.blob.arrayBuffer());
                let ptr = Module._wr_allocApp(data.byteLength);
                HEAPU8.set(data, Number(ptr))
                Module.callMain();
            }
            
            //     downloadButton.onclick = function () {
            //         fetch(mod.url).then(function (response) {
            //             if (!response.ok) {
            //                 return false;
            //             }
            //             return response.blob();
            //         }).then(function (myBlob) {
            //             myBlob.arrayBuffer().then((content) => {
            //                 var transaction = homepageIndexedDB.transaction("apps", 'readwrite');
            //                 transaction.oncomplete = function (event) {
            //                     reloadModList();
            //                 };
            //                 transaction.objectStore("apps").add({ config: mod.config, blob: splitModToChunks(new Uint8Array(content)) });
            //             });
            //         });
            //     }
            var deleteButton = newNode.querySelector("#deleteButton");
            if (!mod.blob)
                deleteButton.style.display = "none";
            else
                deleteButton.onclick = function () {
                    var transaction = homepageIndexedDB.transaction("apps", 'readwrite');
                    transaction.oncomplete = function (event) {
                        reloadModList();
                    };
                    transaction.objectStore("apps").delete(mod.id);
                }
            installedAppsElement.appendChild(newNode);
        })
    }


    var request = window.indexedDB.open("webrogueHomepage", 1);
    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
        alert(`Database error: ${event.target.errorCode}`);
    };
    request.onupgradeneeded = (event) => {
        var db = event.target.result;
        var objectStore = db.createObjectStore("apps", { keyPath: "id" });

        objectStore.createIndex("id", "id", { unique: true });
    }
    request.onsuccess = (event) => {
        homepageIndexedDB = event.target.result;
        reloadModList();
    };
</script>

<script type='text/javascript'>
window.coi = {
    doReload: () => window.location.reload(),
}
</script>

<script src="coi-serviceworker.js"></script>

<script type='text/javascript'>
    var canvas = document.getElementById('canvas')
    // canvas.style.display = "none";
    // document.body.appendChild(canvas)
    // if (!crossOriginIsolated)
    //     window.location.reload();

    var Module = {
        preRun: [],
        postRun: [],
        print: (function () {
            return function (text) {
                if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
                console.log(text);
            };
        })(),
        canvas: (function () {
            var canvas = document.getElementById('canvas');

        // As a default initial behavior, pop up an alert when webgl context is lost. To make your
        // application robust, you may want to override this behavior before shipping!
        // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
            canvas.addEventListener("webglcontextlost", function (e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

            return canvas;
        })(),
        setStatus: function (text) {},
        totalDependencies: 0,
    };
</script>
<script async type="text/javascript" src="./webrogue.js"></script>
