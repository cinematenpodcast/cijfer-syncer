const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver'); // This line ensures the correct driver is used
const fs = require('fs');
const path = require('path');

async function spotifyAnalyticsScraper() {
  // We will connect to a browser that is already running with a remote debugging port open.
  const options = new chrome.Options();
  options.debuggerAddress = '127.0.0.1:9222';

  // Connect to the existing browser session.
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // The browser should already be on the correct page, but we'll navigate just in case.
    await driver.get('https://creators.spotify.com/pod/show/7163qoNT9QZ88uAKmIFk6C/analytics');

    // Wait for the date range dropdown to become available and then click it.
    const dateRangeDropdown = await driver.wait(until.elementLocated(By.id('dropdown-toggle-spotify-stats-chart-date')), 15000);
    await dateRangeDropdown.click();

    // Calculate the first and last day of the previous month.
    const now = new Date();
    const firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Construct the element IDs for the calendar date elements.
    const firstDayString = `date-range-calendar-${firstDayPrevMonth.getFullYear()}-${String(firstDayPrevMonth.getMonth() + 1).padStart(2, '0')}-${String(firstDayPrevMonth.getDate()).padStart(2, '0')}`;
    const lastDayString = `date-range-calendar-${lastDayPrevMonth.getFullYear()}-${String(lastDayPrevMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayPrevMonth.getDate()).padStart(2, '0')}`;

    // Click the start and end dates in the calendar.
    const startDateElement = await driver.wait(until.elementLocated(By.id(firstDayString)), 10000);
    await startDateElement.click();

    const endDateElement = await driver.wait(until.elementLocated(By.id(lastDayString)), 10000);
    await endDateElement.click();

    // Click the "Update" button to apply the new date range.
    const updateButton = await driver.findElement(By.xpath("//button[contains(text(),'Update')]"));
    await updateButton.click();

    // Wait 5 seconds for the analytics chart to reload.
    await driver.sleep(5000);

    // Generate a filename based on the month and year.
    const monthYear = firstDayPrevMonth.toLocaleString('default', { month: 'long' }).toLowerCase() + '-' + firstDayPrevMonth.getFullYear();
    const screenshotPath = `wabliefteru-cijfers-${monthYear}.png`;

    // Take a screenshot and save it to a file.
    let image = await driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, image, 'base64');
    console.log(`Screenshot saved to ${screenshotPath}`);

  } catch (error) {
    console.error('An error occurred during automation. Saving a screenshot for debugging.');
    let errorImage = await driver.takeScreenshot();
    fs.writeFileSync('error_screenshot.png', errorImage, 'base64');
    console.error('Error screenshot saved to error_screenshot.png');
    throw error;
  } finally {
    // We are only attaching to the browser, so we should not call driver.quit().
    // Quitting would close the user's manual browser session.
  }
}

spotifyAnalyticsScraper(); 