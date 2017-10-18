'use strict'

const Model = use('Model')

class Post extends Model {
  /**
   * This post belongs to a user.
   */
  user () {
    return this.belongsTo('App/Models/User')
  }

  /**
   * A post can belong to many tags
   */
  tags () {
    return this.belongsToMany('App/Models/Tag')
              .withTimestamps()
  }
}

module.exports = Post
