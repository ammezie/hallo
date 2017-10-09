'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('title').notNullable()
      table.string('slug').unique()
      table.text('content').notNullable()
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
