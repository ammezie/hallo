'use strict'

require('./bootstrap')
require('coreui.io/Static_Starter_GULP/js/app')

const simplemde = new SimpleMDE({
  element: document.querySelector('#content'),
  autosave: {
    enabled: true,
    uniqueId: 'PostContent'
  }
})
