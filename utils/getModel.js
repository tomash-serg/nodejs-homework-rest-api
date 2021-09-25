const models = (model, type = null) => {
  const statusNumber = type === 'post' ? 201 : 200
  return async(req, res, next) => {
    try {
      const data = await model(req)
      res.status(statusNumber).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = models
