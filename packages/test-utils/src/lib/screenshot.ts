/* eslint-env node */
// eslint-disable-next-line no-restricted-imports
import { join } from 'path';
import { AddressInfo } from 'net';
import http from 'http';
import connect from 'connect';

import { outputFileSync } from 'fs-extra';
import finalhandler from 'finalhandler';
import puppeteer from 'puppeteer';
import { percySnapshot } from '@percy/puppeteer';
import 'dotenv/config';

import { debug } from './debug';

const createServer = async (html: string) => {
  const app = connect();
  app.use((request: any, response: any, next: any) =>
    request.url === '/' ? response.end(html) : next()
  );
  app.use(finalhandler);
  const server = http.createServer(app);
  await new Promise((resolve, reject) => {
    const startServer = () => {
      server.once('error', (e: any) => {
        if (e.code === 'EADDRINUSE') server.close(startServer);
      });
      server.listen(0, resolve);
      server.on('error', reject);
    };
    startServer();
  });
  return server;
};

const generateImage = async (url: string, fileName: string, options: any) => {
  // Options see:
  // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
  const browser = await puppeteer.launch({
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    devtools: options.debug,
    dumpio: options.debug,
    args: [
      '--no-sandbox',
      '--disable-lcd-text',
      '--disable-setuid-sandbox',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-infobars',
      '--disable-web-security',
      '--no-default-browser-check',
      '--use-mock-keychain',
      '--no-first-run',
      '--disable-default-apps',
      '--disable-popup-blocking',
      '--disable-translate',
      '--disable-extensions',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--allow-file-access-from-files',
    ],
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.evaluateHandle('document.fonts.ready');

  if (process.env.PERCY_TOKEN) {
    await percySnapshot(page, fileName, options);
  } else {
    const image = await page.screenshot(options);
    outputFileSync(join(process.cwd(), `__screenshots__/${fileName}.png`), image);
  }

  browser.close();
};

const SCREENSHOTS: any = {};
const getImageFileName = () => {
  const state = expect.getState();
  const testName = state.currentTestName;
  if (SCREENSHOTS[testName]) {
    SCREENSHOTS[testName]++;
  } else {
    SCREENSHOTS[testName] = 0;
  }
  const index = SCREENSHOTS[testName];
  return `${state.currentTestName}${index > 0 ? index : ''}`;
};

const screenshot = async (options = { debug: false }) => {
  if (!process.env.ENABLE_SCREENSHOTS) return Promise.resolve();

  if (options.debug) debug(document);

  const fileName = getImageFileName();
  const html = document.documentElement.outerHTML;

  const server = await createServer(html);
  const { port } = server.address() as AddressInfo;
  const url = `http://localhost:${port}`;

  await generateImage(url, fileName, options);
  await new Promise((resolve) => server.close(resolve));
};

export { screenshot };
