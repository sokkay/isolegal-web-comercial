import { readFileSync } from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";

type MeetingConfirmationTemplateParams = {
  toName: string;
  formattedStart: string;
  formattedEnd: string;
  meetLink?: string;
  eventLink?: string;
};

const templateSource = readFileSync(
  path.join(
    process.cwd(),
    "lib",
    "email",
    "templates",
    "meeting-confirmation.html",
  ),
  "utf-8",
);

const template = Handlebars.compile(templateSource);

export function buildMeetingConfirmationTemplate(
  params: MeetingConfirmationTemplateParams,
) {
  return template(params);
}
