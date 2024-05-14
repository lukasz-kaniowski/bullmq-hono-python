import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {addJobs, allQueues} from "./jobs";
import {serveStatic} from "@hono/node-server/serve-static";
import {HonoAdapter} from "@bull-board/hono";
import {createBullBoard} from "@bull-board/api";
import {BullMQAdapter} from "@bull-board/api/bullMQAdapter";

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.get('/jobs', async (c) => {
    await addJobs()
    return c.text('Jobs added!')
})

const serverAdapter = new HonoAdapter(serveStatic);

createBullBoard({
    queues: allQueues.map(q => new BullMQAdapter(q)),
    serverAdapter,
});
serverAdapter.setBasePath('/admin');
// @ts-ignore
app.route('/admin', serverAdapter.registerPlugin());

const port = 3000
console.log(`Server is running on port ${port}`)


serve({
    fetch: app.fetch,
    port
})
