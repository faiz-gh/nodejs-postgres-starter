build:
	@pnpm run build

run: build
	@pnpm run start

dev:
	@pnpm run dev

migration:
	@db-migrate create --config src/database/migrationConfig.json --migrations-dir src/database/migrations $(filter-out $@,$(MAKECMDGOALS))

migrate-up:
	@db-migrate up --config src/database/migrationConfig.json --migrations-dir src/database/migrations

migrate-down:
	@db-migrate down --config src/database/migrationConfig.json --migrations-dir src/database/migrations