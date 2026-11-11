import {
  bucket,
  defineRailway,
  fn,
  github,
  image,
  preserve,
  project,
  redis,
  service,
  volume,
} from "railway/iac";

export default defineRailway(() => {
  const Redis = redis("Redis", { region: "us-west2" });
  Redis.deploy = {
    startCommand:
      '/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"',
  };
  Redis.networking = {
    privateNetworkEndpoint: "redis",
    tcpProxies: { "6379": {} },
  };
  const redisVolume = volume("redis-volume", {
    alerts: { usage: { "100": {}, "80": {}, "95": {} } },
    allowOnlineResize: true,
    region: "us-west2",
    sizeMB: 5000,
  });
  const pocketbaseVolume = volume("pocketbase-volume", {
    alerts: { usage: { "100": {}, "80": {}, "95": {} } },
    allowOnlineResize: true,
    region: "us-west2",
    sizeMB: 5000,
  });
  const stockedFlask = bucket("Blog Media", { region: "sjc" });
  const BlogMediaBackup = fn("Blog Media Backup", {
    codeFile: "functions/blog-media-backup.mjs",
    source: image("ghcr.io/railwayapp/function-bun:1.4.4"),
    build: { buildEnvironment: "V3", builder: "RAILPACK" },
    replicas: { "us-west2": 1 },
    deploy: { cronSchedule: "0 7 * * *", restartPolicyType: "NEVER" },
    networking: { privateNetworkEndpoint: "blog-media-backup" },
    env: {
      BACKUP_ACCESS_KEY_ID: preserve(),
      BACKUP_BUCKET: preserve(),
      BACKUP_ENDPOINT: preserve(),
      BACKUP_REGION: preserve(),
      BACKUP_SECRET_ACCESS_KEY: preserve(),
      SOURCE_ACCESS_KEY_ID: preserve(),
      SOURCE_BUCKET: preserve(),
      SOURCE_ENDPOINT: preserve(),
      SOURCE_REGION: preserve(),
      SOURCE_SECRET_ACCESS_KEY: preserve(),
    },
  });
  const isolegalWebComercial = service("isolegal-web-comercial", {
    source: github("sokkay/isolegal-web-comercial", {
      branch: "main",
      checkSuites: false,
    }),
    build: { buildEnvironment: "V3", builder: "RAILPACK" },
    replicas: { "us-west2": 1 },
    deploy: {
      limitOverride: { containers: { cpu: 2, memoryBytes: 2000000000 } },
      sleepApplication: true,
    },
    domains: ["isolegal.cl", "www.isolegal.cl"],
    env: {
      AWS_ACCESS_KEY_ID: preserve(),
      AWS_DEFAULT_REGION: preserve(),
      AWS_ENDPOINT_URL: preserve(),
      AWS_S3_BUCKET_NAME: preserve(),
      AWS_SECRET_ACCESS_KEY: preserve(),
      DEFAULT_SLOT_MINUTES: preserve(),
      GOOGLE_IMPERSONATED_USER_EMAIL: preserve(),
      GOOGLE_SERVICE_ACCOUNT_EMAIL: preserve(),
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: preserve(),
      HUBSPOT_ACCESS_TOKEN: preserve(),
      NEXT_PUBLIC_POCKET_BASE_URL: preserve(),
      NEXT_PUBLIC_POSTHOG_HOST: preserve(),
      NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN: preserve(),
      NEXT_PUBLIC_VALIDATE_BUSINESS_EMAILS: preserve(),
      POCKET_BASE_ADMIN_EMAIL: preserve(),
      POCKET_BASE_ADMIN_PASSWORD: preserve(),
      POCKET_BASE_URL: preserve(),
      REDIS_URL: preserve(),
      RISK_CALCULATOR_BOOKING_TOKEN_TTL_DAYS: preserve(),
      RISK_CALCULATOR_DISPATCH_TOKEN: preserve(),
      RISK_CALCULATOR_FOLLOWUP_HOUR: preserve(),
      RISK_CALCULATOR_FOLLOWUP_MINUTE: preserve(),
      RISK_CALCULATOR_FOLLOWUP_TIMEZONE: preserve(),
      TEAM_FORM_NOTIFICATION_EMAILS: preserve(),
      VALIDATE_BUSINESS_EMAILS: preserve(),
      ZEPTOMAIL_FROM_EMAIL: preserve(),
      ZEPTOMAIL_TOKEN: preserve(),
      ZEPTOMAIL_URL: preserve(),
    },
  });
  const RiskCalculatorCron = fn("Risk Calculator Cron", {
    codeFile: "functions/risk-calculator-cron.mjs",
    source: image("ghcr.io/railwayapp/function-bun:1.4.4"),
    build: { builder: "RAILPACK" },
    replicas: { "us-west2": 1 },
    deploy: { cronSchedule: "0 13 * * *", restartPolicyType: "NEVER" },
    networking: { privateNetworkEndpoint: "function-bun" },
    env: {
      RISK_CALCULATOR_DISPATCH_TOKEN: preserve(),
      RISK_DISPATCH_URL: preserve(),
      APP_URL: "https://www.isolegal.cl",
      NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN:
        isolegalWebComercial.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
      NEXT_PUBLIC_POSTHOG_HOST:
        isolegalWebComercial.env.NEXT_PUBLIC_POSTHOG_HOST,
      POCKET_BASE_URL: isolegalWebComercial.env.POCKET_BASE_URL,
      POCKET_BASE_ADMIN_EMAIL: isolegalWebComercial.env.POCKET_BASE_ADMIN_EMAIL,
      POCKET_BASE_ADMIN_PASSWORD:
        isolegalWebComercial.env.POCKET_BASE_ADMIN_PASSWORD,
      ZEPTOMAIL_URL: isolegalWebComercial.env.ZEPTOMAIL_URL,
      ZEPTOMAIL_TOKEN: isolegalWebComercial.env.ZEPTOMAIL_TOKEN,
      ZEPTOMAIL_FROM_EMAIL: isolegalWebComercial.env.ZEPTOMAIL_FROM_EMAIL,
      TEAM_FORM_NOTIFICATION_EMAILS:
        isolegalWebComercial.env.TEAM_FORM_NOTIFICATION_EMAILS,
      RISK_CALCULATOR_BOOKING_TOKEN_TTL_DAYS:
        isolegalWebComercial.env.RISK_CALCULATOR_BOOKING_TOKEN_TTL_DAYS,
    },
  });
  const pocketbase = service("pocketbase", {
    source: github("FarazPatankar/pocketbase", {
      branch: "main",
      commitSha: "fcdcf62b3854c44ca5500968d4d4471a9ecb7ebc",
      upstreamUrl: "https://github.com/FarazPatankar/pocketbase",
    }),
    build: { builder: "RAILPACK" },
    replicas: { "us-west2": 1 },
    domains: ["hermes-web.isolegal.cl"],
    volumeMounts: { "/pb/pb_data": pocketbaseVolume },
    env: { PORT: preserve() },
  });
  const isolegalWebAdmin = service("isolegal-web-admin", {
    source: github("sokkay/isolegal-web-admin", {
      branch: "main",
      checkSuites: false,
    }),
    build: { builder: "RAILPACK" },
    replicas: { "us-west2": 1 },
    deploy: {
      limitOverride: { containers: { cpu: 2, memoryBytes: 4000000000 } },
      sleepApplication: true,
    },
    domains: ["zeus-web.isolegal.cl"],
    env: {
      AWS_ACCESS_KEY_ID: preserve(),
      AWS_DEFAULT_REGION: preserve(),
      AWS_ENDPOINT_URL: preserve(),
      AWS_S3_BUCKET_NAME: preserve(),
      AWS_SECRET_ACCESS_KEY: preserve(),
      NEXT_PUBLIC_POCKETBASE_URL: preserve(),
      PUBLIC_WEB_URL: preserve(),
    },
  });

  return project("isolegal-web", {
    resources: [
      BlogMediaBackup,
      isolegalWebComercial,
      RiskCalculatorCron,
      pocketbase,
      Redis,
      isolegalWebAdmin,
      redisVolume,
      pocketbaseVolume,
      stockedFlask,
    ],
  });
});
