.PHONY: build deploy

all: build

build:
	npx lerna run build

deploy_func1:
	gcloud functions deploy lerna_func1 \
		--entry-point=func1entry \
		--runtime=nodejs12 \
		--memory=1G \
		--region=asia-northeast1 \
		--trigger-http \
		--allow-unauthenticated

deploy_func2:
	gcloud functions deploy lerna_func2 \
		--entry-point=func2entry \
		--runtime=nodejs12 \
		--memory=1G \
		--region=asia-northeast1 \
		--trigger-http \
		--allow-unauthenticated
