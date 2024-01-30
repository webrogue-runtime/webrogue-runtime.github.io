cd $(dirname $0)/..

set -ex

# sh -c """
# cd external/webrogue/ && 
# git submodule update --init external/libuv/ &&
# git submodule update --init external/xz/ &&
# git submodule update --init external/uvwasi/
# """

emcmake cmake -B game/src/build -S game/src -DCMAKE_BUILD_TYPE=Release
cmake --build game/src/build/ --target pack_artifacts -j

emcmake cmake -B backed_game/src/build -S backed_game/src -DCMAKE_BUILD_TYPE=Release
cmake --build backed_game/src/build --target pack_artifacts -j

