import * as process from 'process';

export function isExport(): boolean {
    return process.env.WEBROGUE_DOC_IS_EXPORT === "true"
}