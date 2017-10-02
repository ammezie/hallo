'use strict'

const { Command } = require('@adonisjs/ace')
const User = use('App/Models/User')

class Register extends Command {
  static get signature () {
    return 'register'
  }

  static get description () {
    return 'Create admin user account'
  }

  async handle (args, options) {
    const email = await this.ask('Enter email address')
    const password = await this.secure('Enter password')
    const firstName = await this.ask('Enter first name')
    const lastName = await this.ask('Enter last name')

    // creatr user
    const user = new User()
    user.email = email
    user.password = password
    user.fname = firstName
    user.lname = lastName

    try {
      await user.save()

      this.success('Admin user account created!')
    } catch (error) {
      this.error('Something went wrong and admin user account could not be created.')
    }
  }
}

module.exports = Register
