## Relevant Files

- `spotify-analytics-scraper.js` - The main script to perform the browser automation.
- `package.json` - To manage project dependencies.

### Notes

- This project uses `selenium-webdriver` for browser automation.
- Ensure you have a local installation of a Chromium-based browser.
- A pre-configured user data directory is required for the script to work.

## Tasks

- [ ] 1.0 Setup Project Dependencies
  - [x] 1.1 Create `package.json` with project metadata (name, version, description).
  - [x] 1.2 Add `selenium-webdriver` to the dependencies in `package.json`.
  - [x] 1.3 Create the main script file: `spotify-analytics-scraper.js`.
- [ ] 2.0 Implement Browser Automation Logic
  - [ ] 2.1 Import `Builder`, `By`, and `until` from `selenium-webdriver`.
  - [ ] 2.2 Configure Chrome options to use the persistent user data directory (`/tmp/spotify-session`).
  - [ ] 2.3 Initialize the Chrome browser with the specified options.
  - [ ] 2.4 Navigate to the Spotify for Creators analytics URL.
  - [ ] 2.5 Use a `try...finally` block to ensure `driver.quit()` is always called.
- [ ] 3.0 Implement Date Calculation and Selection
  - [ ] 3.1 Locate and click the date range dropdown menu.
  - [ ] 3.2 Calculate the first and last day of the previous month using the `Date` object.
  - [ ] 3.3 Construct the dynamic element IDs for the start and end dates.
  - [ ] 3.4 Click the calculated start and end dates in the calendar view.
  - [ ] 3.5 Locate and click the "Update" button to apply the new date range.
- [ ] 4.0 Implement Screenshot and File Saving
  - [ ] 4.1 Add a `driver.sleep()` or explicit wait for the chart data to reload.
  - [ ] 4.2 Generate the output filename using the format `wabliefteru-cijfers-{maand}-{jaar}.png`.
  - [ ] 4.3 Take a full-page screenshot and save it to the project root.
  - [ ] 4.4 Log a success message with the path to the saved screenshot.
- [ ] 5.0 Finalize and Test the Script
  - [ ] 5.1 Add comments to explain key parts of the script.
  - [ ] 5.2 Manually perform the pre-authentication steps as described in the PRD.
  - [ ] 5.3 Run the script (`node spotify-analytics-scraper.js`) to verify it works as expected. 