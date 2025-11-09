const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "careerguidanceplatform-cc422",
  private_key_id: "794b6255fb672ceb50e97455c0ea9209108c43ac",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuc6q8MCGS4kjy\nHjHbSRDvK4cCY8RT6E4q1ESXcVZLx5pkZRCuXxw9TuJsfRPuEMCWXJ4N4cv1tl4X\ntTHSLkq4qf1qSBPylUkkU+nH1jw8hHTDKU1BFYWpkZd5aPA/MXZxw1//8Jech/FR\nZm7T+3pWVdWY7NbWf6C2BLCJWcYtCNRBvpdVsWf7pko45rDEaTuV0UfXkyV5/zKz\n1mAsCJciKxraq+0QIzu0fc1PWdL4o29LA5TBeGLyRO1qizYmh9yo1TRtO87oY4+z\nmISKa0IXcfzfuIpjs1Ueblpb1yunHmaLwNkKhidVDNVpNwkLOVKJ+CDdu94VZJvY\nA2ctSGjdAgMBAAECggEATqSGC2AHQpgQGlXSU/CUWb1dl44yK0FGO7iFU2Acbv0E\ndM26v2DQ8jJlkFKycVfL+fy2o7tuns4fjMB6PS3xMV4wh4EGvQzfdCj/8r55WS69\nFF3CHdz97HtdtbXA2DwMESzqUg67yizedLugqp9rfxAiwlXCY+AVKvjiPIjj9diO\nThajMiaNcaZgNrIQVs79wFCaGPucwyI8rQ8cJ6iyYg5jK0DuC3Dtcy3z1P9oLXj0\ni8CLd5+HejBh8jHHPUQKGTZgRjiw9y81t23Cly1HCZA9X4+UOODqmznD66iHW6CP\nAGdF3OogTOWiGTG5zMM3B2ooINMUE0aomBe8EPWWYQKBgQDebPRWuhmBYOAwd1Fe\nLqi5okb/f6LSy57cE2G8F4NvtzNdFJPbnKuJgHwpBTzVGcQgPiO2HloS1/EvlbjK\ntyslPIM2LnY7EMxXqZwcVOiIpVm4aYqE/5+d4fnBTuU5mc0Me3RdXcFz/L5K/ytj\nx2cfwjcpXzzcorEngv7r6SMy0wKBgQDIyOS4u6xsUl7MEs6W7WDx1yISvsK6z6ik\nIg1GF6q1OTBmanyAiJ6B/Wv82vb1lEYX5luLPkz5KQY0n8J2rFXtuYn9uFnuGSqN\nLRnrhz2O5J5F2YrO5rOJy6ImEglHw+iERXt/UASRmCsyLfsfEugj2oeBEbRov+Zw\nzr29HU/HjwKBgGRy9iHYp74bHwQkTpXnIoG7PK8UWFc0aAjho+jLAavJI6Qsr92l\nMn7FjM0FtYRTv5QEHCKaMHmEFkM0LaE2+YA2hNdKQlDIdFA+o+bTnbRgYFV9LHaF\n7vLhY+aeF71crRKvCk1EEyKriNDbzh+gpPzdvAWuIhFOVA0RBslJn4DLAoGAf0+6\nj1QYoVqdV0K5kcOUi+QAa+hfKvrPELuytPX+vQg1I0t0BEAcWYop9duVaeQJic/7\nzc/EGNylXarLMFpX5fOWhrVk+G8mpvupCsnnA3r8zIeC12w6/S2MdB1Nmx6iiXRR\nOUmwi+zzvs6fA3YGke1XrERgo2bCpFbCwm4ajwsCgYEA2qjCoUoL6uxiaIv4hg64\naKSYK9Wtv1l+ll/4Fi0OpVzzU1ir1H3WsKnkeoTXF0kNbynHWNEVtS7cDt/1Ju+2\nrCA7aENuYFXYoo6nMz3vEYlOC3RbG06VpWbshLNISrbmSWfvw8WFbjx08ObmRrFB\nl5W5NOQAUrZEelliinSRTT0=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@careerguidanceplatform-cc422.iam.gserviceaccount.com",
  client_id: "113787269648673485735",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40careerguidanceplatform-cc422.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "careerguidanceplatform-cc422.appspot.com"
});

const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { admin, db, auth, bucket };