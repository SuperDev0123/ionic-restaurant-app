const defaultConfigs = {
  firebase: {
    apiKey: "AIzaSyBP05LYQbLsDUdMH0gazmeTimh2FtPSOEE",
    authDomain: "showzone-cloud.firebaseapp.com",
    projectId: "showzone-cloud",
    storageBucket: "showzone-cloud.appspot.com",
    messagingSenderId: "222135332429",
    appId: "1:222135332429:web:b56d44caffbf0b1b8c7604",
  },
  Google: {
    measurementId: "G-6VH2WNE3YJ",
  },
  sendGrid: {
    senderAddress: "team@showzone.io",
    // senderAddress: "sendgrid@farid.work",
  },
  tickets: {
    sendToAddress: "logos@showzone.io",
    sendToAddressStadiums: "stadiums@showzone.io",
    sendToAddressCaps: "caps@showzone.io",
  },
  stripe: {
    publishableKey:
      "pk_live_51JAV6nJ9DqRcRXvvEuaSBVFEV3VpEZbh7qt5gultnwUEcIkxDIyNwUjaBoQz9QlRhl6yAbrs5dckbEo91iVq6mvj000Zy8fTBJ",
    // "pk_test_51JAV6nJ9DqRcRXvvWviQVE884q8UgGxBIfrVOq2adtp7OjhPxpjO6h5s8A8AkIfaGMvz1G4QgAw3Gh3GYVDBsPG200kpISMI7b",
    logoPrices: {
      1: 3500,
      2: 5000,
      3: 6500,
      4: 8000,
      5: 9500,
      "6+": 11000,
    },
    stadiumPrices: {
      Basic: 2500,
      Standard: 5000,
      Elite: 7500,
    },
    capPrices: {
      Legend: 3000,
      Custom: 4000,
    },
  },
  imageUpload: {
    uploadPermissionMinutes: 30,
    uploadDirectory: "logo-requests",
    viewPermissionMinutes: 3 * 24 * 60, // 3 days
  },
  airTable: {
    baseId: "appNUxeVVpMbe898k",
  },
  ads: {
    playwireWebsiteId: "73559",
    placeholderIds: [
      "5d127af3-ef06-4a75-8211-380d128fb3bd",
      "b3f96a5f-a6cc-4eac-9c22-36911b4c539f",
      "4a0f27f0-3c2c-481a-8162-029d689a4662",
      "292e3997-138d-4bdd-9020-4c248781cfa5",
      "5d127af3-ef06-4a75-8211-380d128fb3bd",
      "522fbc8c-06fd-4b95-a3cd-5cb8ee872f78",
      "1e95d265-7ddf-43a6-80e9-cdd941ed9094",
      "ebdfee80-8b94-4ba1-ae80-c56787b845d1",
      "643036b9-2567-4522-a686-b838a6032525"
    ],
  },
}

export default defaultConfigs
