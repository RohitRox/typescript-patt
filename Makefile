MAKE_ARGS:=

ifeq ($(CODEBUILD_RESOLVED_SOURCE_VERSION),)
	MAKE_ARGS=--profile $(AWS_PROFILE) --region $(AWS_REGION)
endif

include ../.service-config

ACCOUNT_ID:=$(shell aws sts get-caller-identity $(MAKE_ARGS) --output text --query 'Account')
IMAGE_NAME:=$(SUB_SYSTEM)-$(SERVICE_NAME)
ECR_ADDR:=$(ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(IMAGE_NAME)

CONFIG_VERSION:=0.1.0

build:
	docker build \
		--target release \
		--build-arg CONFIG_VERSION=$(CONFIG_VERSION) \
		--build-arg JFROG_AUTH_TOKEN=$(JFROG_AUTH_TOKEN) \
		--build-arg APP_PORT=$(APP_PORT) -t $(SERVICE_NAME) .

run-latest:
	docker run -it -p $(APP_PORT):$(APP_PORT) \
		-v ~/.aws/config:/root/.aws/config \
		-v ~/.aws/credentials:/root/.aws/credentials \
		-e SERVICE_VERSION=$(SERVICE_VERSION) \
		-e CNM_CONFIG_ENDPOINT=host.docker.internal:3000 \
		-e SUB_SYSTEM=$(SUB_SYSTEM) \
		-e AWS_PROFILE=$(AWS_PROFILE) \
		-e AWS_REGION=$(AWS_REGION) \
		-e SERVICE_NAME=$(SERVICE_NAME) $(SERVICE_NAME):latest

run:
	docker build \
		--build-arg CONFIG_VERSION=$(CONFIG_VERSION) \
		--build-arg APP_PORT=$(APP_PORT) \
		--build-arg JFROG_AUTH_TOKEN=$(JFROG_AUTH_TOKEN) \
		-t $(SERVICE_NAME):local -f ./Dockerfile.local .

	docker run -it -p $(APP_PORT):$(APP_PORT) \
		-v ~/.aws/config:/root/.aws/config \
		-v ~/.aws/credentials:/root/.aws/credentials \
		-v $(shell pwd):/usr/src/app \
		-v /usr/src/app/node_modules \
		-e AWS_PROFILE=$(AWS_PROFILE) \
		-e AWS_REGION=$(AWS_REGION) \
		-e CNM_CONFIG_ENDPOINT=host.docker.internal:3000 \
		-e SUB_SYSTEM=$(SUB_SYSTEM) \
		-e SERVICE_NAME=$(SERVICE_NAME) $(SERVICE_NAME):local

test:
	docker build \
		--target ci \
		--build-arg CONFIG_VERSION=$(CONFIG_VERSION) \
		--build-arg JFROG_AUTH_TOKEN=$(JFROG_AUTH_TOKEN) \
		--build-arg APP_PORT=$(APP_PORT) -t $(SERVICE_NAME):test .
	docker-compose run app yarn test

run-local-with-cnm:
	curl -v --fail -X PUT http://localhost:3000/config/load/$(SUB_SYSTEM)/$(SERVICE_NAME)/$(CONFIG_VERSION) \
		--data-binary @env/config.template.json -o env/config.json && yarn start:dev

run-local:
	cp env/config.local.json env/config.json && yarn start:dev

ecr:
	aws ecr create-repository --repository-name $(IMAGE_NAME) $(MAKE_ARGS)
ecr-delete:
	aws ecr delete-repository --repository-name $(IMAGE_NAME) $(MAKE_ARGS)
ecr-push:
	$(eval ECR_QUERY_CODE="$(shell aws ecr describe-images --repository-name=$(IMAGE_NAME) --image-ids=imageTag=$(SERVICE_VERSION) > /dev/null 2>&1; echo $$?)")
	@if [[ "$(ECR_QUERY_CODE)" != "255" && "$(force)" != "true" ]]; then \
		echo "Service image with tag $(SERVICE_VERSION) already exists. User force=true to override this tag."; exit 1;\
	fi
	make -s build
	eval `aws ecr get-login --no-include-email $(MAKE_ARGS)`
	docker tag $(SERVICE_NAME):latest $(ECR_ADDR):$(SERVICE_VERSION)
	docker push $(ECR_ADDR):$(SERVICE_VERSION)
version:
	echo $(SERVICE_VERSION)

.PHONY: run build test
