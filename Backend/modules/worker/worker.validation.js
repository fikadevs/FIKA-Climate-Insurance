const Joi = require("joi");

// Create Worker Validation
const createWorkerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),

  weeklyIncome: Joi.number().min(0).required(),

  zone: Joi.string().valid("A", "B", "C").required(),
});

// Update Worker Validation (optional fields)
const updateWorkerSchema = Joi.object({
  name: Joi.string().min(3).max(50),

  phone: Joi.string().pattern(/^[0-9]{10}$/),

  weeklyIncome: Joi.number().min(0),

  zone: Joi.string().valid("A", "B", "C"),
});

// Validate function (middleware style)
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

module.exports = {
  createWorkerSchema,
  updateWorkerSchema,
  validate,
};