import Handlebars from "handlebars";
import { readFileSync } from "node:fs";
import path from "node:path";

type TechnicalSupportCopyTemplateParams = {
  toName: string;
  trackingId: string;
  supportTypeLabel: string;
  submittedAtDisplay: string;
  company: string;
  phone: string;
  email: string;
  problem: string;
};

const templateSource = readFileSync(
  path.join(
    process.cwd(),
    "lib",
    "email",
    "templates",
    "technical-support-copy.html"
  ),
  "utf-8"
);

const template = Handlebars.compile(templateSource);

export function buildTechnicalSupportCopyTemplate(
  params: TechnicalSupportCopyTemplateParams
) {
  return template(params);
}
