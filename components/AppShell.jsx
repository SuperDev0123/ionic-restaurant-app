import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonContent  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from 'page/index';
import ContactPage from 'page/contact';
import LoginPage from 'page/login';
import MobileAppPage from 'page/app';
import AdvertisingPage from 'page/advertising';
import FlippingPage from 'page/flipping';
import PlayersPage from 'page/players';
import PlayersComparePage from 'page/players/compare';

setupIonicReact({});

const AppShell = () => {
  return (
    <Router>
      <Route exact path="/" render={() =><HomePage/>} />
      <Route exact path="/login" render={() =><LoginPage/>} />
      <Route exact path="/profile" render={() =><HomePage/>} />
      {/* <Route exact path="/news" render={() =><ArchiveNewsGallery/>} /> */}
      <Route exact path="/contact" render={() => <ContactPage />} />
      <Route exact path="/app" render={() => <MobileAppPage />} />
      <Route exact path="/advertising" render={() => <AdvertisingPage />} />

      <Route exact path="/players" render={() => <PlayersPage />} />
      <Route exact path="/players/compare" render={() => <PlayersComparePage />} />
      <Route exact path="/flipping" render={() => <FlippingPage />} />
    </Router>
          
          
  );
};

export default AppShell;