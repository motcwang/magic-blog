export default {
  logLevel: 'info',

  httpServer: {
    port: process.env.MAGICIAN_SERVICE_PORT || '3838'
  }
};
