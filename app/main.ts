import { makeServer } from './makeServer';

const port = Number(process.env.APP_PORT) || 9999;

(async () => {
  const app = await makeServer();

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on 0.0.0.0:${port}`);
  });

  const close = () => {
    server.close(() => {
      // Other things to cleanup
      console.log('Http server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down now.');
    close();
  });

  process.on('SIGTERM', () => {
    console.log('All requests finished. Shutting down now.');
    close();
  });
})();
