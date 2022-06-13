import { setTimeout, setInterval, setImmediate} from 'timers/promises';

const someLongRunningTask = async (delay, msg, options) => {
   const signal = {...options};
    console.log('got signal', signal);
    if (signal.aborted === true) {
        throw new Error('someLongRunningTask cancelled');
    }
   const res = await setTimeout(delay, msg);
   console.log(`waited ${delay}, ${msg}`);
};

const timeout = new Promise( (res, rej) => {
    setTimeout( () => reject(new Error('timeout expired')), 6000);
});

console.log('Use Promise.race to trigger timeout if some task takes too long, Run twice. second time TO will expire');
await Promise.race([
    someLongRunningTask(5000, 'long running task finished'),
    timeout
]);
//await Promise.race([
//    someLongRunningTask(11000, 'long running task finished'),
//    timeout
//]);

console.log('Better way to cancel is using AbortController. Its better since Promise.race will run all promises to the end and if someLongRunningTask ends before TO the TO would reject');
const cancelTO = new AbortController();
const cancelTask = new AbortController();

async function timeout1() {
    try {
        await setTimeout(1000, undefined, {signal: cancelTO.signal});
        console.log('aborting task');
        cancelTask.abort();
        
    } catch (e) {
        /* handle error */
    }
}

async function task() {
    try {
        await someLongRunningTask(5000,  'long running task finished', {signal: cancelTask.signal});
    }
    finally {
        cancelTO.abort();
    }
    }

await Promise.race([timeout1(), task()]);
