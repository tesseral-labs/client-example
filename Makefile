MODULES_DIR := ./node_modules

.PHONY: dev
dev: pre-install
	npm run dev

.PHONY: pre-install
pre-install:
	@if [ ! -d "$(MODULES_DIR)" ]; then \
		npm install; \
	fi
	