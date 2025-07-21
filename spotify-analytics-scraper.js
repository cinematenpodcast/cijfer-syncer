const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function spotifyAnalyticsScraper() {
  // Path to your user data directory
  const userDataDir = '/tmp/spotify-session';

  const options = new chrome.Options();
  options.addArguments(`user-data-dir=${userDataDir}`);

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the analytics page
    await driver.get('https://creators.spotify.com/pod/show/7163qoNT9QZ88uAKmIFk6C/analytics');
  } finally {
    await driver.quit();
  }
}

spotifyAnalyticsScraper(); 