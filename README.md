# Sample usage of bullmq with nodejs and bullmq

## Usage

Start redis server

```bash
docker compose up -d
```

Start nodejs server

```bash 
pnpm install
pnpm dev
```

Visit bullmq dashboard
```bash
open http://localhost:3000/admin
```

Add some jobs to the queue

```bash
curl http://localhost:3000/jobs
```

Consume jobs via python

```bash
pip install bullmq

python worker.py
```
