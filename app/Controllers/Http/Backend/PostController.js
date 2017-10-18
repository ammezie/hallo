'use strict'

const Post = use('App/Models/Post')
const Tag = use('App/Models/Tag')
const urlSlug = require('url-slug')

class PostController {
  /**
   * Show a list of all posts
   *
   * @param {view}
   */
  async index ({ request, view }) {
    // Get the current page from query string
    const page = Number(request.input('page', 1))

    const posts = await Post.query()
                            .orderBy('id', 'desc')
                            .paginate(page, 25)

    return view.render('backend.posts.index', { posts: posts.toJSON() })
  }

  /**
   * Render a form to be used for adding a new post
   *
   * @param {view}
   */
  async create ({ view }) {
    const tags = await Tag.all()

    return view.render('backend.posts.create', { tags: tags.toJSON() })
  }

  /**
   * Persist a new post to the database
   *
   * @param {*}
   */
  async store ({ request, auth, session, response }) {
    // TODO: validate form inputs

    const postData = {
      user_id: auth.user.id,
      title: request.input('title'),
      slug: urlSlug(request.input('title')),
      content: request.input('content'),
      meta_description: request.input('meta_description'),
      status: request.input('status')
    }

    const post = await Post.create(postData)

    // Attach tags to post
    const tags = request.input('tags').map((tag) => Number(tag))
    await post.tags().attach(tags)

    session.flash({ notification: 'Post added!' })

    return response.route('posts.index')
  }

  /**
   * Display a single post
   *
   * @param {*
   */
  async show ({ request, view }) {

    return view.render('frontend.posts.show')
  }

  /**
   * Render a form to update an existing post
   *
   * @param {*}
   */
  async edit ({ params, view }) {
    const post = await Post.find(params.id)
    const tags = await Tag.pair('id', 'name')
    const postTags = await post.tags().pair('id', 'name')

    return view.render('backend.posts.edit', { post: post.toJSON(), tags, postTags })
  }

  /**
   * Update post details
   *
   * @param {*}
   */
  async update ({ request, params, auth, session, response }) {
    const post = await Post.find(params.id)

    // TODO: validate form inputs

    post.title = request.input('title')
    post.slug = urlSlug(request.input('title'))
    post.content = request.input('content')
    post.meta_description = request.input('meta_description')
    post.status = request.input('status')

    await post.save()

    // Update post tags
    const tags = request.input('tags').map((tag) => Number(tag))

    await post.tags().detach()
    await post.tags().attach(tags)

    session.flash({ notification: 'Post updated!' })

    return response.route('posts.index')
  }
  /**
   * Delete a specified post
   *
   * @param {*}
   */
  async destroy ({ request, session, response }) {
    return response.redirect('back')
  }
}

module.exports = PostController
