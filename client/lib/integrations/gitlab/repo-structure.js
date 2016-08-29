const generic_readme = {
  filename: 'README.md',
  raw: ( repoTitle, additionalReadmeText = '' ) => `# ${ repoTitle }

${ additionalReadmeText }

## Licence
DoApps`
};

export const template_repo_common = {
  repoName: '',
  branches: [ 'master', 'development', 'release', 'hotfix' ],
  additionalReadmeText: ( username, repoName ) => `## ${ repoName }`,
  files: [
    generic_readme
  ]
};

export const template_repo_api_docs = {
  repoName: '',
  branches: [ 'master' ],
  additionalReadmeText: ( username, repoName ) => `## ${ repoName }
[https://${ username }.gitlab.io/${ repoName }](https://${ username }.gitlab.io/${ repoName })`,
  files: [
    generic_readme,
    {
      filename: '.gitlab-ci.yml',
      raw: () => `pages:
  stage: deploy
  script:
  - mkdir .public
  - cp -r * .public
  - mv .public public
  artifacts:
    paths:
    - public
  only:
  - master`
    },
    {
      filename: 'index.html',
      raw: projectName => `<!DOCTYPE html>
<html>
  <head>
    <title>API Docs - ${ projectName }</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='./swagger.yml'></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
</html>`
    },
    {
      filename: 'swagger.yml',
      raw: projectName => `swagger: "2.0"
info:
  version: "0.0.1"
  title: "${ projectName } API Docs"
  description: "API Specification"
host: "api.com"
basePath: "/api"
schemes:
  - "http"
consumes:
  - "application/json"
produces:
  - "application/json"
paths:
  /pets:
    get:
      description: "Returns all pets from the system that the user has access to"
      produces:
        - "application/json"
      responses:
        "200":
          description: "A list of pets."
          schema:
            type: "array"
            items:
              $ref: "#/definitions/Pet"
definitions:
  Pet:
    type: "object"
    required:
      - "id"
      - "name"
    properties:
      id:
        type: "integer"
        format: "int64"
      name:
        type: "string"
      tag:
        type: "string"`
    },
  ]
};
