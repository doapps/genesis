const project__readme_md = projectName => `
# ${ projectName }
New project content

## Licence
DoApps
`;

const api_docs__gitlabCI_yml = () => `
pages:
  stage: deploy
  script:
  - mkdir .public
  - cp -r * .public
  - mv .public public
  artifacts:
    paths:
    - public
  only:
  - master
`;

const api_docs__index_html = projectName => `
<!DOCTYPE html>
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
</html>
`;

const api_docs__swagger_yml = projectName => `
swagger: "2.0"
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
        type: "string"

`;
