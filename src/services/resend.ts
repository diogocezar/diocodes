import { EMAIL } from "@/contants/email";
import { logger } from "@/lib/logger";
import { Person } from "@prisma/client";
import React from "react";
import { Resend } from "resend";

import EmailAvaliation from "#/emails/emails/email-avaliation";
import EmailAvaliationCreated from "#/emails/emails/email-avaliation-created";
import EmailPaymentSucceeded from "#/emails/emails/email-payment-succeeded";
import EmailReminder from "#/emails/emails/email-reminder";
import { getErrorMessage, transformMeta } from "@/lib/utils";

export type TypeCreateContact = {
  person: Person[];
  audienceId: string;
};

export type TypeSendEmail = {
  from?: string;
  to: any[];
  subject: string;
  reactTemplate: React.ReactElement;
};

const resend = new Resend(process.env.API_RESEND);

export const createContact = async ({
  person,
  audienceId,
}: TypeCreateContact) => {
  for (const item of person) {
    const result = await resend.contacts.create({
      email: item.email,
      firstName: item.name,
      unsubscribed: false,
      audienceId: audienceId,
    });
    logger.info(
      `[CREATE_CONTACT] result for ${item.email} =>`,
      transformMeta(result),
    );
  }
};

export const sendEmail = async ({
  from,
  to,
  subject,
  reactTemplate,
}: TypeSendEmail) => {
  try {
    const config = {
      from: from || EMAIL.FROM,
      to,
      subject,
      react: reactTemplate,
    };
    logger.info(
      `[SEND_EMAIL] => email was successfully sent`,
      transformMeta({ to, subject, from: config.from }),
    );
    await resend.emails.send(config);
  } catch (error) {
    logger.error("[SEND_EMAIL]", getErrorMessage(error));
  }
};

export const sendInviteEmail = async (mentoring: any) => {
  const { startTime, attendee, id } = mentoring;
  const link = `${EMAIL.LINK}/${id}`;
  const { name, email } = attendee;
  const configSendEmail: TypeSendEmail = {
    to: [email, EMAIL.COPY_EMAIL],
    subject: EMAIL.SUBJECT_INVITE,
    reactTemplate: EmailAvaliation({
      attendee: name,
      startTime,
      link,
    }),
  };
  sendEmail(configSendEmail);
};

export const sendAvaliationNotificationEmail = async (avaliation: any) => {
  const { mentoring, rating, avaliationTags, comment } = avaliation;
  const configSendEmail: TypeSendEmail = {
    from: EMAIL.FROM,
    to: [EMAIL.COPY_EMAIL],
    subject: EMAIL.SUBJECT_AVALIATION_SENT,
    reactTemplate: EmailAvaliationCreated({
      attendee: mentoring.attendee.name,
      startTime: mentoring.startTime,
      rating,
      tags: avaliationTags.map((tag: any) => tag.name),
      comment,
    }),
  };
  sendEmail(configSendEmail);
};

export const sendPaymentSucceededEmail = async (payload: {
  name: string;
  email: string;
  phone: string;
  amount: number;
}) => {
  const { name, email, phone, amount } = payload;
  const configSendEmail: TypeSendEmail = {
    from: EMAIL.FROM,
    to: [email, EMAIL.COPY_EMAIL],
    subject: EMAIL.SUBJECT_PAYMENT_SUCCEEDED,
    reactTemplate: EmailPaymentSucceeded({
      name,
      email,
      phone,
      amount,
    }),
  };
  sendEmail(configSendEmail);
};

export const sendReminderEmail = async (
  mentoring: any,
  meetingLink: string,
) => {
  const { startTime, attendee } = mentoring;
  const { name, email } = attendee;
  const configSendEmail: TypeSendEmail = {
    from: EMAIL.FROM,
    to: [email, EMAIL.COPY_EMAIL],
    subject: EMAIL.SUBJECT_REMINDER,
    reactTemplate: EmailReminder({
      attendee: name,
      startTime,
      link: meetingLink,
    }),
  };
  sendEmail(configSendEmail);
};
