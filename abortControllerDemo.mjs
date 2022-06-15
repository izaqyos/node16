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


console.log('Cancel promise using AbortController');
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
