import admin from "firebase-admin";
//import serviceAccount from "../../serviceAccountKey.json";

const getFirestoreBackendDbClient = async () => {
  if(admin.apps.length === 0){
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  return admin.firestore();
}

export default getFirestoreBackendDbClient;