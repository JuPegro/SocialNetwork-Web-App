import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";
import { validationSignUp, validationSignIn } from "../validations/auth.validation.js";
import { SALT_ROUNDS, SECRET_TOKEN, RESEND_API_KEY, RESEND_FROM_EMAIL } from "../config.js";

// USE PRISMA CLI
const prisma = new PrismaClient();

// USE RESEND
const resend = new Resend(RESEND_API_KEY);

// MIDDLEWARE LOGIN SOCIAL NETWORK
export const signIn = async (req, res, next) => {
  try {
    const { error, value } = validationSignIn.validate(req.body);

    // IF BAD REQUEST IN FORM
    if (error) return res.status(400).json({ error: error.details[0].message });

    // FIND USER IN DATABASE
    const user = await prisma.user.findUnique({
      where: { username: value.username },
    });

    // IF USER NOT FOUND
    if (!user) return res.status(404).json({ message: "User not found" });

    // IF USER NOT ACTIVE
    if (user.status === "INACTIVE")
      return res.status(400).json({ message: "User is not activated" });

    // MATCH HASPASSWORD DATABASE WITH PASSWOR IN BODY
    const macthPassword = await bcrypt.compare(value.password, user.password);

    // IF NOT MATCH
    if (!macthPassword)
      return res.status(400).json({ message: "Invalid password" });

    // CREATE JSONWEBTOKEN
    const token = jwt.sign({ id: user.id }, SECRET_TOKEN, {
      expiresIn: "1d",
    });

    // SET TOKEN IN COOKIE
    res.cookie("x_access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, // ONE DAY
    });

    return res.status(200).json({ message: "Successfully accesss", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// MIDDLEWARE FOR REGISTER NEW USER
export const signUp = async (req, res, next) => {
  try {
    const { error, value } = validationSignUp.validate(req.body);

    // IF BAD REQUEST IN FORM
    if (error) return res.status(400).json({ error: error.details[0].message });

    /* IT IS IN CHARGE OF LOOKING FOR THE UNIQUE FIELDS OF THE USER TABLE 
    RETURN A RECORD IF IT FINDS A USER WITH THAT USER OR EMAIL IN THE DATABASE*/
    const checkDuplicates = await prisma.user.findFirst({
      where: {
        OR: [{ email: value.email }, { username: value.username }],
      },
    });

    // IF FIELDS ALREADY USE
    if (checkDuplicates) {
      // BY USERNAME
      if (checkDuplicates.username === value.username)
        return res.status(400).json({ message: "Username already in use" });
      // BY EMAIL
      if (checkDuplicates.email === value.email)
        return res.status(400).json({ message: "Email already in use" });
    }

    // ENCRYPTE THE PASSWORD BEFORE CREATE
    const hashPassword = await bcrypt.hash(value.password, SALT_ROUNDS);

    // CREATE USER IN DATABASE
    const user = await prisma.user.create({
      data: {
        name: value.name,
        lastname: value.lastname,
        phone: value.phone,
        photo: value.photo,
        birthday: value.birthday,
        email: value.email,
        username: value.username,
        password: hashPassword,
      },
    });

    // OMIT PASSWORD
    const { password: _, ...publicUser } = user;

    // SEND EMAIL WITH RESEND
    const { data, errors } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [user.email],
      subject: "Welcome to SocialNetwork",
      html: `<strong>Thanks for register${user.name} ${user.lastname}</strong>`,
    });

    // IF FAIL SEND EMAIL
    if (errors) {
      return res.status(400).json({ errors });
    }

    return res
      .status(201)
      .json({ message: "Successfully created user", user: publicUser, data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const forgetUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// MIDDLEWARE FOR ACTIVATED USER
export const activationUser = async (req, res, next) => {
  try {
    // GET ID IN REQUEST PARAMS
    const { id } = req.params;

    // IF NOT PROVIDED ID
    if (!id) return res.status(400).json({ message: "Id not provided" });

    // FIND USER WITH THIS ID
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    // IF USER NOT FOUND
    if (!user) return res.status(404).json({ message: "User not found" });

    // IF ALREADY ACTIVE
    if (user.status === "ACTIVE")
      return res.status(400).json({ message: "User is already activated" });

    await prisma.user.update({
      where: { id: id },
      data: {
        status: "ACTIVE",
      },
    });

    return res.status(200).json({ message: "User has just been activated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
