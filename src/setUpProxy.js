import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/customer/menu',
    createProxyMiddleware({
      target: 'https://2bf9-2401-4900-1f26-284f-6561-600b-d0c0-9561.ngrok-free.app',
      changeOrigin: true,
    })
  );
};
