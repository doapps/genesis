import configFile from '../../project-config.json';

const debug = require( 'debug' )( 'app:config' );

const getConf = category => conf => configFile[ category ][ conf ];

export default getConf;
