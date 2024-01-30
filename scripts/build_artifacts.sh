cd $(dirname $0)/..

set -ex

# sh -c """
# cd external/webrogue/ && 
# git submodule update --init external/libuv/ &&
# git submodule update --init external/xz/ &&
# git submodule update --init external/uvwasi/
# """

emcmake cmake -B build -S . -DCMAKE_BUILD_TYPE=Release
cmake --build build --target pack_artifacts -j

