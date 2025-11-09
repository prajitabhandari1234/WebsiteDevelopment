.DEFAULT_GOAL := help

# ====================================================================================
# HELP
# ====================================================================================
.PHONY: help
help: ## Show this help message.
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ====================================================================================
# DOCKER
# ====================================================================================
.PHONY: up
up: ## Start the docker containers.
	docker compose -f docker-compose.yml up

.PHONY: down
dowm: ## Stop the docker containers.
	docker compose -f docker-compose.yml down --rmi all

.PHONY: build
build: ## Build the docker containers.
	UID=$(id -u) GID=$(id -g) docker compose -f docker-compose.yml build api --no-cache

# ====================================================================================
# DATABASE
# ====================================================================================
.PHONY: migrate
migrate: ## Run database migrations.
	docker compose -f docker-compose.yml exec api poetry run alembic upgrade head

.PHONY: seed
seed: ## Seed the database with initial data.
	docker compose -f docker-compose.yml exec api poetry run python cli.py
