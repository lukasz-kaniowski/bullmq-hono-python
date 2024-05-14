import asyncio
from bullmq import Worker, Job


async def process(job: Job, _):
    print(job.id, job.name, job.data)
    return


async def main():
    worker = Worker("py", process)
    try:
        await asyncio.sleep(1)
    finally:
        await worker.close()


if __name__ == "__main__":
    asyncio.run(main())
