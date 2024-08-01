import Joi from "joi";

// DEFINE THE VALIDATION SCHEME
export const signUp = Joi.object({
  name: Joi.string().min(3).max(30).required().message({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  lastname: Joi.string().min(3).max(30).required().message({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  phone: Joi.string()
    .min(12)
    .max(12)
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$"))
    .required()
    .message({
      "string.base": "Phone must be a string",
      "string.empty": "Phone is required",
      "string.min": "Phone must be at least 12 charaters long",
      "string.max": "Phone must be at least 12 charaters long",
      "string.pattern.base": "Phone must have the format of Dominican Republic",
      "any.required": "Phone is required",
    }),
  photo: Joi.string()
    .uri()
    .pattern(new RegExp(".(jpg|jpeg|png|gif)$"))
    .required()
    .messages({
      "string.base": "Photo URL must be a text string.",
      "string.empty": "Photo URL is required",
      "string.uri": "Photo must be a valid URL.",
      "string.pattern.base": "Photo URL must end in .jpg, .jpeg, .png, o .gif.",
      "any.required": "Photo URL is required",
    }),
  birthday: Joi.date().less("now").required().messages({
    "date.base": "Birthday date must be a valid date.",
    "date.less": "Birthday cannot be in the future.",
    "any.required": "Birthday is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  username: Joi.string().min(3).max(30).required().message({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

// DEFINE THE VALIDATION SCHEME
export const signIn = Joi.object({
  username: Joi.string().min(3).max(30).required().message({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"))
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});
