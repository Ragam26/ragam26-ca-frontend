// NOTE - the fields in the spreadsheet should be the same and in order as in the HTML form
// REFER THIS ARTICLE
// https://dev.to/omerlahav/submit-a-form-to-a-google-spreadsheet-1bia

// ----------------- To be added in html page -----------------

// const scriptURL = 'https://script.google.com/macros/s/AKfycbxzLIYuUHKS1punDXn/exec'
// const form = document.forms['submit-to-google-sheet']

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message))
// })

// Steps to follow
// Run initialSetup() and give authorization
// Setup trigger
// Trigger setup ------
// function to run - doPost()
// deployment - Head
// Event source - spreadsheet
// Event type - form submit
// Deploy as web app

// Replace with mail id to which you need the response to be sent
var emailAddress = 'admin@ragam.co.in'

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup() {
	var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
	scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost(e) {
	var lock = LockService.getScriptLock()
	lock.tryLock(10000)

	try {
		// Details from form
		var Name = e.parameter['name']
		var Email = e.parameter['email']
		var Message = e.parameter['message']

		// Creating timestamp
		var currDate = new Date()
		var timestamp = `Date: ${currDate.toLocaleDateString()}   Time: ${currDate.toLocaleTimeString()}`

		// Sending email
		var subject = `${Name || 'Somebody'} Contacting via CA Website`
		var message = `Timestamp: ${timestamp}\nName: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
		MailApp.sendEmail(emailAddress, subject, message)

		//---- Updating spreadsheet ----

		var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
		var sheet = doc.getSheetByName(sheetName)

		var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
		var nextRow = sheet.getLastRow() + 1

		var newRow = headers.map(function (header) {
			return header === 'Timestamp' ? timestamp : e.parameter[header.toLowerCase()]
		})

		sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])
		return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(
			ContentService.MimeType.JSON
		)
	} catch (e) {
		console.log(e)
		return ContentService.createTextOutput(
			JSON.stringify({ result: 'error', error: e })
		).setMimeType(ContentService.MimeType.JSON)
	} finally {
		lock.releaseLock()
	}
}
