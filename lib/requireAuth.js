export function requireAuth({ isLoggedIn, signIn, redirectTo, router }) {
	if (isLoggedIn) {
		router.push(redirectTo)
		return
	}

	sessionStorage.setItem('redirectAfterLogin', redirectTo)

	signIn()
}
