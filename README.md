lerna + GCP Functions deployment example
========================================

This project demonstrates a usage of [lerna][] for [Cloud Functions][] development.

### Key points

- Deploy the entire mono-repo package to Cloud Functions environment instead of minimum dependency of a subjected package.
- Promote an `index.js` of the root package which exports entries of Cloud Functions packages.
- Specify one of the entry functions specifically on deployment so that the Cloud Function environment can invoke its target package.

### Project structure

    - root/
      - lerna.json
      - index.js
      - package.json
      - Makefile
      - packages/
        - func1/    represents a Cloud Function
        - func2/    represents a Cloud Function
        - shared/   a shared library used by both func1 and func2

### package.json

```json
{
  "name": "@asdf/lerna_test",
  "private": true,
  "main": "index.js",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "boot": "lerna bootstrap",
    "build": "lerna run build"
  },
  "devDependencies": {
    "lerna": "^3.22.1",
    "typescript": "^3.9.6"
  }
}
```


### index.js

```js
module.exports = {
  func1entry: (req, res) => require('@asdf/func1').entry(req, res),
  func2entry: (req, res) => require('@asdf/func2').entry(req, res),
};
```


### Makefile

```
.PHONY: build deploy

all: build

build:
	npx lerna run compile

deploy_func1:
	gcloud functions deploy lerna_func1 \
		--entry-point=func1entry \
		--runtime=nodejs12 \
		--memory=1G \
		--region=asia-northeast1 \
		--trigger-http \
		--allow-unauthenticated

deploy_func2:
  # Just the function name and entry-point are different.
	gcloud functions deploy lerna_func2 \
		--entry-point=func2entry \
		--runtime=nodejs12 \
		--memory=1G \
		--region=asia-northeast1 \
		--trigger-http \
		--allow-unauthenticated
```


[lerna]: https://github.com/lerna/lerna
[Cloud Functions]: https://cloud.google.com/functions
