const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('InvalidSessionException', async (error, { response, session }) => {
    response.route('login')
    return
  })
})
