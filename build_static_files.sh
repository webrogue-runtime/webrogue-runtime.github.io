cd $(dirname $0)

set -ex

sh demos/dynamic/src/build.sh
cp external/webrogue/web/logo.png icons/logo.png


