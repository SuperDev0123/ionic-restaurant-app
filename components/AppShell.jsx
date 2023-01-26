import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonContent  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from 'page/index';
import ContactPage from 'page/contact';
import SignInForm from '@features/auth/components/SignInForm';

setupIonicReact({});

const AppShell = () => {
  return (
    <Router>
      <Route exact path="/" render={() =><HomePage/>} />
      <Route exact path="/login" render={() =><SignInForm/>} />
      <Route exact path="/profile" render={() =><HomePage/>} />
      <Route exact path="/contact" render={() => <ContactPage />} />
    </Router>
          
          
  );
};

export default AppShell;