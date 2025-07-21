# Product Requirements Document: Spotify Analytics Sync (Local Chromium)

## 1. Introduction/Overview

This document describes the requirements for a locally executed script that automates capturing monthly analytics from Spotify for Creators. The script will use Selenium to control a local Chromium browser and leverage a pre-authenticated session to avoid programmatic logins. The captured screenshot is intended to be used in a wider N8N workflow for data extraction and storage, but this PRD focuses solely on the screenshot capture script.

## 2. Goals

-   **Local Browser Automation:** Reliably automate a local Chromium browser to perform a series of steps on the Spotify for Creators website.
-   **Session Persistence:** Utilize a persistent browser session (via a user data directory) to completely bypass the need for login steps within the script.
-   **Screenshot Capture:** Capture a full-page, high-quality screenshot of the analytics dashboard for a specific date range.
-   **Robustness:** The script should be reliable and provide clear feedback on its progress and any errors.

## 3. Pre-requisites (Manual Setup)

Before running the script, the user must perform a one-time setup:
1.  **Start a special instance of Chrome.** Open your terminal and run the appropriate command for your operating system. This will launch Chrome with a remote debugging port open, which is what allows our script to connect to it.

    **On macOS:**
    `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir="$(pwd)/chrome-profile"`

    **On Linux:**
    `google-chrome --remote-debugging-port=9222 --user-data-dir="$(pwd)/chrome-profile"`

2.  **Log in to Spotify.** In the Chrome window that just opened, navigate to `https://creators.spotify.com/` and log in.
3.  **Leave the browser running.** Unlike before, you should now leave this Chrome window open. The script will connect to this existing session.
4.  **Run the script.** In a *new* terminal window, run the script (`node spotify-analytics-scraper.js`). It will automate the browser you left open.

## 4. Functional Requirements

1.  **Script Initialization:**
    -   The script must be configured to use `Selenium` to connect to a running `Chromium` browser on `127.0.0.1:9222`.
2.  **Browser Automation (`spotify-analytics-scraper.js`):**
    -   The script must attach to the existing browser session.
    -   It must navigate directly to the analytics URL: `https://creators.spotify.com/pod/show/7163qoNT9QZ88uAKmIFk6C/analytics`.
    -   It must click the date range dropdown menu (ID: `dropdown-toggle-spotify-stats-chart-date`).
    -   It must calculate the first and last day of the previous month.
    -   It must programmatically click the corresponding start and end dates in the calendar view.
    -   It must click the "Update" button to apply the new date range.
    -   It must wait for the chart/data to reload.
3.  **Screenshot Generation:**
    -   The script must take a full-page screenshot of the dashboard.
    -   The screenshot must be saved locally with the filename format: `wabliefteru-cijfers-{maand}-{jaar}.jpg`.
    -   The script should output the path to the saved screenshot upon successful completion.

## 5. Non-Goals (Out of Scope)

-   Programmatic login/logout functionality.
-   Handling of 2-Factor Authentication.
-   The N8N workflow integration (this script is a standalone component).
-   Data extraction from the resulting image (this is handled by a separate process).
-   Management or creation of the user data directory. The script assumes it exists and is valid.

## 6. Technical Considerations

-   **Host Environment:** macOS / Linux.
-   **Core Library:** `selenium-webdriver`.
-   **Browser:** A local installation of a Chromium-based browser (e.g., Google Chrome, Chromium).
-   **Dependencies:** The script will require Node.js and the `selenium-webdriver` package.

## 7. Success Metrics

-   The script is considered successful if, when run, it correctly navigates the site without logging in, sets the date to the previous month, and saves a correct, full-page screenshot to the specified file path. 