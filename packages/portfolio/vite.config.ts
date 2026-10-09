import { defineConfig } from 'vite';
import type { Connect } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages redirects directory URLs. Mirror that behavior in dev/preview.
const learnDirectory: Connect.NextHandleFunction = (req, res, next) => {
  const url = new URL(req.url || '/', 'http://localhost');
  if (url.pathname === '/learn') {
    res.writeHead(308, { Location: `/learn/${url.search}` });
    res.end();
  } else next();
};

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '',
  plugins: [react(), tailwindcss(), viteTsconfigPaths(), { name: 'learn-directory', configureServer: server => { server.middlewares.use(learnDirectory); }, configurePreviewServer: server => { server.middlewares.use(learnDirectory); } }],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  build: {
    manifest: true,
    rollupOptions: { input: { portfolio: 'index.html', learn: 'learn/index.html' } },
  },
  assetsInclude: ['**/*.svg'],
});
