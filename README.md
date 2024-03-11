# Murojaah
Application for murojaah Al-Qur'an. Built static files hosted at https://rr-murojaah.vercel.app

## Getting Started

### Dependencies
- pnpm
- docker

### Install app dependencies
```bash
make dep
```

### Run on local
```bash
make run
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build static files for prodouction
```bash
make build
```

### Run static files with nginx and docker
```bash
make start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Stop nginx server
```bash
make stop
```

### Shortcut for build and start server
```bash
make prod
```
