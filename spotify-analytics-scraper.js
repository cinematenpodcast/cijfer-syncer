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

    // Wait for the date range dropdown to be clickable
    const dateRangeDropdown = await driver.wait(until.elementLocated(By.id('dropdown-toggle-spotify-stats-chart-date')), 10000);
    await dateRangeDropdown.click();

    // Calculate the first and last day of the previous month
    const now = new Date();
    const firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const firstDayString = `date-range-calendar-${firstDayPrevMonth.getFullYear()}-${String(firstDayPrevMonth.getMonth() + 1).padStart(2, '0')}-${String(firstDayPrevMonth.getDate()).padStart(2, '0')}`;
    const lastDayString = `date-range-calendar-${lastDayPrevMonth.getFullYear()}-${String(lastDayPrevMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayPrevMonth.getDate()).padStart(2, '0')}`;

    // Click the start and end dates
    const startDateElement = await driver.wait(until.elementLocated(By.id(firstDayString)), 10000);
    await startDateElement.click();
    
    const endDateElement = await driver.wait(until.elementLocated(By.id(lastDayString)), 10000);
    await endDateElement.click();

    // Click the "Update" button
    const updateButton = await driver.findElement(By.xpath("//button[contains(text(),'Update')]"));
    await updateButton.click();

  } finally {
    await driver.quit();
  }
}

spotifyAnalyticsScraper(); 