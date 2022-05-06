import express from "express";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "df2b6ed83b99ef",
    pass: "537183e2b2f049",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: { type, comment, screenshot },
  });

  await transport.sendMail({
    from: "Feedget Team <hi@feedget.com>",
    to: "Vitor Escalfoni <vitor@vitor.com>",
    subject: "New Feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;"/>`,
      `<p>Feedback Type: ${type}</p>`,
      `<p>Comment: ${comment}</p>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});
