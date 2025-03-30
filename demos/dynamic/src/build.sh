cd $(dirname $0)
set -ex

emcmake cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build/ --target webrogue -j
cp build/webrogue_web/webrogue.wasm build/webrogue_web/webrogue.js ../
cp ../../../external/webrogue/web/root/coi-serviceworker.js ../
