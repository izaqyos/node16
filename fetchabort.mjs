import fetch from 'node-fetch';

async function demo_fetch_abort(abortDelay) {
    const controller = new AbortController();
    setTimeout( () => controller.abort(), abortDelay);
    try {
        let resp = await fetch('https://javascript.info/fetch-abort', {signal: controller.signal});
        console.log(resp);

    } catch (e) {
        if (e.name === 'AbortError') {
            console.log('fetch was aborted');
        }
        else {
            console.log(`got error ${e}`);
        }
        /* handle error */
    }
}

console.log('Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)');
demo_fetch_abort(1000);
console.log('Demo aborting fetch using node 16 AbortController. Second run abort fetch if longer than 10ms (expect abort), will print before first :) ');
demo_fetch_abort(10);
