cd "$(dirname $0)"
set -ex

WEBROGUE_DOC_IS_EXPORT=true npx next build
rm out/**/*.txt out/*.txt
