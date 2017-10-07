'use strict'

const Model = use('Model')

class Tag extends Model {
  /**
   * A tag can belong to many posts
   */
  posts () {
    return this.belongsToMany('App/Models/Post')
  }
}

module.exports = Tag
