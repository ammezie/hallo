'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

// Auth
Route.get('login', 'Auth/AuthController.showLoginForm').middleware(['authenticated'])
Route.post('login', 'Auth/AuthController.login').as('login')
Route.get('logout', 'Auth/AuthController.logout').as('logout')

// Admin-ish
Route
  .group(() => {
    // Dashboard
    Route.get('/', 'DashboardController.index').as('admin')
  })
  .prefix('admin')
  .middleware(['auth'])

Route.on('/').render('backend.auth.register')
