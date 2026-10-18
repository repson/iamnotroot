import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import handbookLinks from './scripts/remark-handbook-links.mjs';
import mermaidFences from './scripts/remark-mermaid.mjs';

const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

// Production uses the custom domain at the root. Override both values to
// publish elsewhere, such as a project path on <owner>.github.io.
export default defineConfig({
  site: process.env.SITE_URL || 'https://iamnotroot.com',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  // The link and Mermaid plugins are remark plugins, so Markdown runs on the unified processor.
  markdown: { shikiConfig: { theme: 'github-dark' }, processor: unified({ remarkPlugins: [[handbookLinks, { base }], mermaidFences] }) },
  devToolbar: { enabled: false },
});
