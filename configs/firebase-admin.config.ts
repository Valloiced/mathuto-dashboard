// Import the functions you need from the SDKs you need
import admin, { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';

import serviceAccount from '@/serviceAccount.json';

const firebaseAdminConfig = {
    credential: cert(serviceAccount as ServiceAccount)
};

// Initialize Firebase
export function firebaseAdminApp() {
    if (getApps().length <= 0) {
        return initializeApp(firebaseAdminConfig);
    } else {
        return getApps()[0];
    }
}

firebaseAdminApp();

export default admin;