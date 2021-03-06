'use strict'

class AuthController {

  /**
   * Show login form
   *
   * @param {View} view
   */
  showLoginForm ({ view }) {
    return view.render('backend.auth.login')
  }

  /**
   * Handle user login
   *
   * @param {} param0
   */
  async login ({ request, auth, session, response}) {
    const { email, password, remember } = request.all()

    try {
      await auth.remember(!! remember).attempt(email, password)
    } catch (error) {
      session.flash({ error: 'Invalid email/password' })

      return response.redirect('back')
    }

    return response.route('admin')
  }

  /**
   * Log user out
   *
   * @param {*} param0
   */
  async logout ({ auth, response }) {
    await auth.logout()

    return response.route('login')
  }
}

module.exports = AuthController
