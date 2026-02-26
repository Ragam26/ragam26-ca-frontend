export default function handler(req, res) {
	const { token } = req.query

	// redirect user to homepage with token
	res.redirect(`/auth/callback?token=${token}`)
}
