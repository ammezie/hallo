'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('author_id').unique()
      table.string('title')
      table.string('slug').unique()
      table.text('content')
      table.boolean('status').defaultTo(0)
      table.text('meta_description').nullable()
      table.timestamps()
      table.timestamp('published_at').nullable().index()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
