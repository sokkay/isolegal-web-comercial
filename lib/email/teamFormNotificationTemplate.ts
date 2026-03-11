import { readFileSync } from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";

type TeamNotificationField = {
  label: string;
  value: string;
};

type TeamFormNotificationTemplateParams = {
  formLabel: string;
  source: string;
  submittedAtDisplay: string;
  fields: TeamNotificationField[];
};

const templateSource = readFileSync(
  path.join(
    process.cwd(),
    "lib",
    "email",
    "templates",
    "team-form-notification.html",
  ),
  "utf-8",
);

const template = Handlebars.compile(templateSource);

export function buildTeamFormNotificationTemplate(
  params: TeamFormNotificationTemplateParams,
) {
  return template(params);
}
