import joi from "joi";

export const userSchema = joi.object({
  password: joi.string().min(6).required().messages({
    "string.min": "Lösenordet måste vara minst 6 tecken långt.",
    "any.required": "Lösenordet är obligatoriskt.",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Ogiltigt e-postformat.",
    "any.required": "E-post är obligatoriskt.",
  }),
});
// Validate user schema
export const orderItemSchema = joi.object({
  id: joi.number().integer().positive().required().messages({
    "number.base": "Id:t måste vara ett nummer",
    "any.required": "Id är obligatoriskt.",
  }),
  quantity: joi.number().integer().min(1).default(1).optional().messages({
    "number.base": "Quantity måste vara ett nummer",
    "number.min": "Antal måste vara minst 1.",
  }),
});
// Schema for validating order items
export const orderSchema = joi.object({
  totalOrder: joi.array().items(orderItemSchema).min(1).required().messages({
    "array.base": "Ordern måste vara en array.",
    "array.min": "Ordern får inte vara tom.",
    "any.required": "Order-array är obligatorisk.",
  }),
});
// Validate order schema
export const orderIdSchema = joi.object({
  orderNr: joi
    .string().guid({ version: ["uuidv4"] }).required().messages({
      "string.base": "Ordernummer måste vara en sträng.",
      "string.guid": "Ogiltigt format, förväntas ett giltigt UUID.",
      "any.required": "Ordernummer är obligatoriskt.",
    }),
});


// Valideringsschema för signup
export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

// Valideringsschema för signin (login)
export const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

// Middleware för att köra validering
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details.map((detail) => detail.message).join(", "),
      });
    }
    next();
  };
};