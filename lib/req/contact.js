export function submitContact(formData) {
	return new Promise(async (resolve, reject) => {
		try {
			const scriptURL =
				'https://script.google.com/macros/s/AKfycbypJtp1ebnYEN9RJm8pFrjxsHL-cOheCH8lMaKfswqiZOHWLNdRbh8AXQDOJZkMqtM7/exec'
			await fetch(scriptURL, { method: 'POST', body: formData })
			resolve()
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to submit message'))
		}
	})
}
