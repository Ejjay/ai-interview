import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Initialize with proper error checking for environment variables
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Missing Firebase admin credentials");
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  const db = getFirestore();
  // Enable ignoreUndefinedProperties
  db.settings({ ignoreUndefinedProperties: true });

  return {
    auth: getAuth(),
    db,
  };
}

export const { auth, db } = initFirebaseAdmin();