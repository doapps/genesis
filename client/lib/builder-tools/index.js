import APIHandler from 'lib/api-handler';

const templatesFilename = 'templates.toml';

const BuilderMethods = {
  getTemplates( cb ) {
    const path = templatesFilename;

    APIHandler.fetchContent( path, cb );
  }
};

export default BuilderMethods;
