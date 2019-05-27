const User = require('../models/User')

module.exports = {
    create: (params) => User.create(params),
    addVictory: (params) => User.updateOne({username: params.username}, { $inc: {victories: 1} }),
    listHighScores: () => User.find().sort({ victories: 'desc' }).limit(20).select('username victories')

}
