import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, createReadStream, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const resumeSource = 'C:/Users/Administrator/Desktop/简历/刘国煜简历.pdf';
const resumePublicPath = '/assets/liu-guoyu-resume.pdf';

function resumeDownloadPlugin() {
  return {
    name: 'resume-download',
    configureServer(server) {
      server.middlewares.use(resumePublicPath, (_request, response) => {
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename="liu-guoyu-resume.pdf"');
        createReadStream(resumeSource).pipe(response);
      });
    },
    writeBundle() {
      const outputDir = resolve(process.cwd(), 'dist/assets');
      mkdirSync(outputDir, { recursive: true });
      copyFileSync(resumeSource, resolve(outputDir, 'liu-guoyu-resume.pdf'));
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), resumeDownloadPlugin()],
});
