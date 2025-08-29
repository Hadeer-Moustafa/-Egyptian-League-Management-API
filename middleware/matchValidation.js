const { body, validationResult } = require('express-validator');

const matchesValidationSchema = [body('homeTeam').isString().optional().notEmpty(),
body('awayTeam').isString().optional().notEmpty(),body("date").isString().optional().toDate(),body("score").isString().optional().notEmpty()];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message:"Please check your data, there are some errors"});
  }
  next();
};

module.exports = { matchesValidationSchema, validate };