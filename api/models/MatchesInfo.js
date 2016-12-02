/**
 * MatchesInfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  tableName: 'MatchesInfo',
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: true,

  attributes: {
    id: {
      type: 'ObjectId',
      primaryKey: true,
    },
    site: {
      type: 'String',
      required: true,
    },
    info: {
      type: 'Object',
      required: true,
    },
    createdAt: {
      type: 'Date',
      required: true
    },
    updatedAt: {
      type: 'Date',
      required: true
    },
  },
  
};
