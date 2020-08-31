import path from 'path';

export default {
  logLevel: 'info',

  httpServer: {
    prefix: '/api',
    port: process.env.MAGICIAN_SERVICE_PORT || '3838',
    staticPath: path.resolve(__dirname, '../public')
  },

  wsServer: {
    path: '/signaling'
  }
};
