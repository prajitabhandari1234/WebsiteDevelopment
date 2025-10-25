<h1>CQ Innocation Club - Backend</h1>

## Prerequisites
- [Python](https://www.python.org/downloads/)
- [Poetry](https://python-poetry.org/docs/#installation)
- [Postgres](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/)

## Setup

```sh
$ git clone git@github.com:prajitabhandari1234/WebsiteDevelopment.git <application_name>
$ cd <application_name>/backend
```

Make a copy of `.env.example` as `.env` and update your application details. If you are using Docker, use the default database credentials

```sh
$ cp .env.example .env
```

### Manual Setup
Please refer to the [Docker setup](#using-docker) if you want to skip the manual setup

```sh
$ poetry install --no-root
$ source .venv/bin/activate
```


Run migrations and seed the database
```sh
$ poetry run alembic upgrade head
$ poetry run python cli.py
```

Start the application
```sh
$ poetry run fastapi dev src/main.py
```

Navigate to http://localhost:8000/health to verify installation

## Using Docker
Use [docker-compose](https://docs.docker.com/compose/) to spin up docker-containers. 

```sh
$ make build
$ make up
```

To run migrations and seeds use a new terminal window and run the following
```
$ make migrate
$ make seed
```

### Docker on Windows
```sh
$ docker compose build --no-cache
$ docker compose up
$ docker compose stop
```

To run migrations and seeds use a new terminal window and run the following
```sh
$ docker compose exec api poetry run alembic upgrade head
$ docker compose exec api poetry run python cli.py
```

### API docs at http://localhost:8000/docs
