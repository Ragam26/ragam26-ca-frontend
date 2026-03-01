import axios from 'axios'

export const fetchCaProfile = async (jwt) => {
	//! BYPASSING BACKEND - Returning fake profile data
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				name: 'John Doe',
				phone: '9876543210',
				college: 'NIT Calicut',
				district: 'Kozhikode',
				year: 'Year 3',
				gPayNumber: '9876543210',
			})
		}, 300)
	})
	/*
	const { data } = await axios.get('/api/user/profile', {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})

	return {
		name: data.name || '',
		phone: data.phoneNo || '',
		college: data.collegeName || '',
		district: data.district || '',
		year: data.yearOfStudy ? `Year ${data.yearOfStudy}` : '',
		gPayNumber: data.gPayNumber || '',
	}
	*/
}

export const register = async (jwt, form) => {
	//! BYPASSING BACKEND - Simulating registration
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({ success: true, message: 'Profile updated successfully' })
		}, 800)
	})
	/*
	const payload = {
		name: form.name,
		phoneNo: form.phone,
		collegeName: form.college,
		district: form.district,
		yearOfStudy: Number(form.year.replace('Year', '')),
		gPayNumber: form.gPayNumber,
	}

	const { data } = await axios.post('/api/user/profile', payload, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	})

	return data
	*/
}
