/**
 * @author u/IAmMoonie <https://www.reddit.com/user/IAmMoonie/>
 * @file https://www.reddit.com/r/GoogleAppsScript/comments/10et6wd/script_to_find_urlid_of_form
 * @desc Retreives the URL and FormID for a Google Form attached to a Google Sheet.
 * @license MIT
 * @version 1.0
 */

/* A constant variable that is storing the spreadsheet ID. */
const SHEET_ID = "your spreadsheet ID goes here";

/* A constant variable that is storing the name of the sheet that is connected to the form.
 * The default is: Form responses 1*/
const RESPONSE_SHEET_NAME = "your response sheet name goes here";

/**
 * Gets the form URL from the sheet that is connected to the form, then it gets the form ID from the
 * form URL
 * @throws {Error} Throws an error with a message if the sheet is not connected to a form, or the form URL or ID is invalid.
 * @example
 * const formInfo = getFormInfo();
 * console.log(formInfo.formURL, formInfo.formID);
 */
function getFormInfo() {
  /* Opening the spreadsheet that is connected to the form. */
  const ss = SpreadsheetApp.openById(SHEET_ID);
  /* Getting the sheet that is connected to the form. */
  const sheetForFormResponse = ss.getSheetByName(RESPONSE_SHEET_NAME);
  /* Getting the form URL from the sheet that is connected to the form. */
  const formURL = sheetForFormResponse.getFormUrl();
  /* Checking if the form URL is null. If it is null, it will throw an error. */
  if (formURL === null) {
    throw new Error(
      `Sheet ${sheetForFormResponse.getName()} is not connected to a form`
    );
  }
  /* Getting the form ID from the form URL. */
  const formID = formURL.match(/[-\w]{25,}/)[0];
  /* Checking if the form ID or the form URL is null. If it is null, it will throw an error. */
  if (formID === null || formURL === null) {
    throw new Error("Invalid form URL or ID");
  }
  /* Logging the form URL and the form ID to the Stackdriver Logging. */
  console.info(`Form URL: ${formURL} █ Form ID: ${formID}`);
}
