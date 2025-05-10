cd "$(dirname $0)"
set -ex

sh build.sh
cd out
python3 -m http.server
