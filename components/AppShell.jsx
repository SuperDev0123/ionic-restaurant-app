import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from 'page/index';
import ContactPage from 'page/contact';

setupIonicReact({});

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main" style={{height: "100%"}}>
          <Route path="/" render={() => <HomePage />} />
          <Route path="/contact" render={() => <ContactPage />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;