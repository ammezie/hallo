'use strict'

class DashboardController {

  /**
   * Show admin dashboard
   */
  async index ({ view }) {
    return view.render('backend.dashboard')
  }
}

module.exports = DashboardController
