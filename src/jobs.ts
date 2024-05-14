import {Queue, Worker} from 'bullmq';

const commonJobConfig = {
    defaultJobOptions: {
        attempts: 5,
        backoff: {
            type: 'exponential',
            delay: 1000
        }
    },
    connection: {
        host: 'localhost',
        port: 6379
    }
};

const jsQueue = new Queue('js', commonJobConfig);
const pythonQueue = new Queue('py', commonJobConfig);


const worker = new Worker(jsQueue.name, async job => {
    if (job.name === 'myJobNameThatShouldFail') {
        throw new Error('failed job - bang!');
    }
    console.log(job.data);
}, {
    connection: {
        host: 'localhost',
        port: 6379
    },

});

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});


export async function addJobs() {
    await jsQueue.add('myJobName', {foo: 'bar'});
    await jsQueue.add('myJobNameThatShouldFail', {qux: 'baz'});
    await pythonQueue.add('jobName', {qux: 'baz'});
}


export const allQueues = [
    jsQueue, pythonQueue
]
