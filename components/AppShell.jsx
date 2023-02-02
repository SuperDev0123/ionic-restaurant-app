import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonContent  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from 'page/index';
import ContactPage from 'page/contact';
import SignInForm from '@features/auth/components/SignInForm';
import { StatusBar, Style } from '@capacitor/status-bar';
// import ArchiveNewsGallery from '@features/news/components/ArchiveNewsGallery'
import NewsArchivePage from 'pages/news/page/[page]';
import { useEffect } from 'react';
import {StatusBarStyleDark, Plugins} from "@capacitor/core"
setupIonicReact({});

const AppShell = () => {
  const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark });
  };
  useEffect(() => {
    setStatusBarStyleDark();
  }, [])
  return (
    <Router>
      <Route exact path="/" render={() =><HomePage/>} />
      <Route exact path="/login" render={() =><SignInForm/>} />
      <Route exact path="/profile" render={() =><HomePage/>} />
      <Route exact path="/news" render={() =><NewsArchivePage/>} />
      <Route exact path="/contact" render={() => <ContactPage />} />
    </Router>
          
          
  );
};

export default AppShell;