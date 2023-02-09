import { IonApp, IonLabel, IonRouterOutlet, setupIonicReact, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonContent  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from 'page/index';
import ContactPage from 'page/contact';
import { StatusBar, Style } from '@capacitor/status-bar';
import NewsArchivePage from 'page/news/page/[page]';
import NewsArchiveCategoryPage from 'page/news/category/[category]/page/[page]';
import SingleNewsPage from 'page/news/[slug]';
import { useEffect } from 'react';
import {Capacitor} from "@capacitor/core"
import LoginPage from 'page/login';
import MobileAppPage from 'page/app';
import AdvertisingPage from 'page/advertising';
import FlippingPage from 'page/flipping';
import ExchangesPlayersPage from 'page/exchanges';
import PlayersPage from 'page/players';
import PlayerProfilePage from 'page/players/[cardId]';
import PlayersComparePage from 'page/players/compare';
import QuirksPage from 'page/players/quirks';
import ConquestMapsPage from 'page/conquest-maps';
import CardBuilderPage from 'page/card-builder';
import TrueOverallCalculator from 'page/calculators/true-overall';
// import PackSimulatorStandard from 'page/pack-simulator/standard';
// import CollectionLiveSeriesPage from 'page/collections/live-series'
// import Inventory from 'page/collections/tracker';

setupIonicReact({});
const AppShell = () => {
  const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark });
  };
  useEffect(() => {  
    try {
      if (Capacitor.getPlatform() === 'ios') {
        setStatusBarStyleDark();
}     
    } catch (err) {
      console.log(err);
    }
    
  }, [])
  return (
    <Router>
      <Route exact path="/" render={() =><HomePage/>} />
      <Route exact path="/login" render={() =><LoginPage/>} />
      <Route exact path="/profile" render={() =><HomePage/>} />
      <Route exact path="/contact" render={() => <ContactPage />} />
      <Route exact path="/app" render={() => <MobileAppPage />} />
      <Route exact path="/advertising" render={() => <AdvertisingPage />} />

      <Route exact path="/news/page/:page" render={() =><NewsArchivePage/>} />
      <Route exact path="/news/category/:category/page/:page" render={() =><NewsArchiveCategoryPage/>} />
      <Route exact path="/news/:slug" render={() =><SingleNewsPage />} />

      <Route exact path="/players" render={() => <PlayersPage />} />
      <Route exact path="/players/:cardId" render={() => <PlayerProfilePage />} />
      <Route exact path="/players/compare" render={() => <PlayersComparePage />} />
      <Route exact path="/players/quirks" render={() => <QuirksPage />} />
      
      <Route exact path="/flipping" render={() => <FlippingPage />} />
      <Route exact path="/exchanges" render={() => <ExchangesPlayersPage />} />

      <Route exact path="/conquest-maps" render={() => <ConquestMapsPage />} />
      <Route exact path="/card-builder" render={() => <CardBuilderPage />} />
      <Route exact path="/calculators/true-overall" render={() => <TrueOverallCalculator />} />
      {/* <Route exact path="/pack-simulator/standard" render={() => <PackSimulatorStandard />} /> */}

      {/* <Route exact path="/collections/tracker" render={() => <Inventory />} />
      <Route exact path="/collections/live-series" render={() => <CollectionLiveSeriesPage />} /> */}
    </Router>
          
          
  );
};

export default AppShell;