'use strict'

const Tag = use('App/Models/Tag')
const urlSlug = require('url-slug')

class TagController {
  /**
   * Show a list of all tags
   *
   * @param {view}
   */
  async index ({ view }) {
    const tags = await Tag.all()

    return view.render('backend.tags.index', { tags: tags.toJSON() })
  }

  /**
   * Render a form to be used for adding a new tag
   *
   * @param {view}
   */
  async create ({ view }) {
    return view.render('backend.tags.create')
  }

  /**
   * Persist a new tag to the database
   *
   * @param {*}
   */
  async store ({ request, auth, session, response }) {
    // TODO: validate form input

    const tag = new Tag()

    tag.name = request.input('name')
    tag.slug = urlSlug(request.input('name'))
    tag.description = request.input('description')

    await tag.save()

    session.flash({ notification: 'Tag added!' })

    return response.route('tags.index')
  }

  /**
   * Display a single tag
   *
   * @param {*
   */
  async show ({ request, view }) {

    return view.render('frontend.tags.show')
  }

  /**
   * Render a form to update an existing tag
   *
   * @param {*}
   */
  async edit ({ params, view }) {
    return view.render('backend.tags.edit')
  }

  /**
   * Update tag details
   *
   * @param {*}
   */
  async update ({ request, auth, session, response }) {
    return response.redirect('tags.index')
  }
  /**
   * Delete a specified tag
   *
   * @param {*}
   */
  async destroy ({ request, session, response }) {
    return response.redirect('back')
  }
}

module.exports = TagController
