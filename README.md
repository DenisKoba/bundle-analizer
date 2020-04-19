# Bundle size analyzing Tool
This service analyzes the size difference between the latest bundle and the previous one. The service runs as a sub-task of the lint pipeline.: 

#### Getting started :rocket:

- Copy sizegenerator.js into the project where you want to track bundle size;
- Check the name of the folder you want analyze (./dist or ./lib), pass correct name of your project in sizegenerator.js:


```javascript
fetch('https://st-bundle-size.herokuapp.com/build/analyze', {
    method: 'post',
    body: JSON.stringify({ nextSize, repo: 'REPO NAME' }),
    headers: { 'Content-Type': 'application/json' },
})

```

- add bundle-analyzer script into package.json file:

```json
"scripts": {
   "build-analyze": "node ./build-analyzer/buildAnalyzer.js"
}
```

- extend gitlab-ci.yml

```yaml
unit-tests:
  stage: unit-tests
  needs:
    - build
  variables:
    GIT_STRATEGY: none
  only:
    refs:
      - merge_requests
  except:
    variables:
      - $DISABLE_UNIT_TESTS
      - $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME == 'master'
      - $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME == 'stage'
  script:
    - docker run --rm $GCR_PATH/$CI_PROJECT_NAME:$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME-$CI_COMMIT_SHA yarn run lint
    - docker run --rm $GCR_PATH/$CI_PROJECT_NAME:$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME-$CI_COMMIT_SHA yarn run test:unit
  allow_failure: false

unit-tests:build-analyzer:
  extends: unit-tests
  stage: unit-tests
  script:
    - docker run --rm $GCR_PATH/$CI_PROJECT_NAME:$CI_MERGE_REQUEST_SOURCE_BRANCH_NAME-$CI_COMMIT_SHA yarn run build-analyze
  allow_failure: true

```
