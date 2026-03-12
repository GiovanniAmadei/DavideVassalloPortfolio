import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('file://' + path.resolve('/tmp/test_hdr/portfolio.html'));

  // Open portfolio header
  await page.evaluate(() => {
    document.querySelector('.site-header').classList.add('is-portfolio-open');
    document.querySelector('#submenu-portfolio').classList.add('open');
  });

  // Verify fotographia position
  await page.evaluate(() => {
    document.querySelector('#tertiary-fotografia').classList.add('open');
    document.querySelector('#tertiary-videomaking').classList.remove('open');
  });
  // Wait for transition
  await new Promise(r => setTimeout(r, 600));
  let boxF = await page.evaluate(() => {
    const el = document.querySelector('#tertiary-fotografia');
    return { top: el.getBoundingClientRect().top, height: el.getBoundingClientRect().height };
  });

  // Verify videomaking position
  await page.evaluate(() => {
    document.querySelector('#tertiary-fotografia').classList.remove('open');
    document.querySelector('#tertiary-videomaking').classList.add('open');
  });
  // Wait for transition
  await new Promise(r => setTimeout(r, 600));
  let boxV = await page.evaluate(() => {
    const el = document.querySelector('#tertiary-videomaking');
    return { top: el.getBoundingClientRect().top, height: el.getBoundingClientRect().height };
  });

  console.log('Fotografia Top:', boxF.top, 'Height:', boxF.height);
  console.log('Videomaking Top:', boxV.top, 'Height:', boxV.height);

  await browser.close();
})();
