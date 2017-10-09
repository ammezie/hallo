'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class UserController {

  /**
   * Show form to edit user profile
   *
   * @param {*} param0
   */
  async profile ({ view }) {
    return view.render('backend.profile')
  }

  /**
   * Update user profile
   *
   * @param {*} param0
   */
  async updateProfile ({ request, auth, session, response }) {
    // validate form input
    const validation = await validate(request.all(), {
        fname: 'required',
        lname: 'required',
        email: 'required|email|unique'
    })

    // show error messages upon validation fail
    if (validation.fails()) {
      session.withErrors(validation.messages())
              .flashAll()

      return response.redirect('back')
    }

    // const user = User.find(auth.user.id)
    // // const user = new User()

    // user.fname = request.input('fname')
    // user.lname = request.input('lname')
    // user.email = request.input('email')

    // await user.save()

    session.flash({ notification: 'Profile updated!' })

    return response.redirect('back')
  }
}

module.exports = UserController
