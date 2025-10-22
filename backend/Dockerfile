# Stage: base
FROM python:3.13-alpine AS base

ARG UID=1000
ARG GID=1000

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    POETRY_VERSION=2.1.0 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1


RUN addgroup -g ${GID} cqu && \
    adduser -D -u ${UID} -G cqu cqu

WORKDIR /opt/app

# Stage: poetry-base
FROM base AS poetry-base

COPY pyproject.toml poetry.lock ./

RUN pip install poetry==${POETRY_VERSION}

# Stage: dev
FROM poetry-base AS dev

RUN chown -R ${UID}:${GID} /opt/app

USER cqu

RUN poetry install --no-root

# Stage: export-deps
FROM poetry-base AS export-deps

RUN pip install poetry-plugin-export && \
    poetry export --without-hashes -f requirements.txt -o requirements.txt

# Stage: dependencies
FROM base AS dependencies

COPY --from=export-deps /opt/app/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Stage: runner
FROM base AS runner

COPY --from=dependencies /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=dependencies /usr/local/bin /usr/local/bin
COPY --chown=cqu:cqu . /opt/app/

USER cqu
