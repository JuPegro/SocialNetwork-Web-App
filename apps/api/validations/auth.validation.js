import Joi from "joi";

// DEFINE THE VALIDATION SCHEME FOR SIGN UP
export const validationSignUp = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 30 characters long",
    "any.required": "Name is required",
  }),
  lastname: Joi.string().min(3).max(30).required().messages({
    "string.base": "Lastname must be a string",
    "string.empty": "Lastname is required",
    "string.min": "Lastname must be at least 3 characters long",
    "string.max": "Lastname must be at most 30 characters long",
    "any.required": "Lastname is required",
  }),
  phone: Joi.string()
    .length(12)
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$"))
    .required()
    .messages({
      "string.base": "Phone must be a string",
      "string.empty": "Phone is required",
      "string.length": "Phone must be exactly 12 characters long",
      "string.pattern.base": "Phone must have the format XXX-XXX-XXXX",
      "any.required": "Phone is required",
    }),
  photo: Joi.string()
    .uri()
    .pattern(new RegExp("\\.(jpg|jpeg|png|gif)$"))
    .required()
    .messages({
      "string.base": "Photo URL must be a text string.",
      "string.empty": "Photo URL is required",
      "string.uri": "Photo must be a valid URL.",
      "string.pattern.base":
        "Photo URL must end in .jpg, .jpeg, .png, or .gif.",
      "any.required": "Photo URL is required",
    }),
  birthday: Joi.string()
    .pattern(new RegExp("^[0-9]{2}-[0-9]{2}-[0-9]{4}$"))
    .required()
    .messages({
      "string.base": "Birthday must be a string",
      "string.empty": "Birthday is required",
      "string.pattern.base": "Birthday must have the format 27-01-2002",
      "any.required": "Birthday is required",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be at most 30 characters long",
    "any.required": "Username is required",
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

// DEFINE THE VALIDATION SCHEME FOR SIGN IN
export const validationSignIn = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be at most 30 characters long",
    "any.required": "Username is required",
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
