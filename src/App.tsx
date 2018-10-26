import * as React from 'react';
import { requestProvider } from 'webln/lib/client';
import { WebLNProvider } from 'webln/lib/provider';
import Ad from './Ad';
import './App.css';

interface IState {
  hasAds: boolean;
  webln: WebLNProvider | null;
}

class App extends React.Component<{}, IState> {
  public state: IState = {
    hasAds: true,
    webln: null,
  };

  public componentDidMount() {
    setTimeout(() => {
      requestProvider().then(webln => {
        this.setState({ webln });
      });
    }, 2000);
  }

  public render() {
    const { hasAds, webln } = this.state;

    return (
      <div className={`App container ${hasAds ? '' : 'no-ads'}`}>
        <div className="columns">
          <Ad className="App-header column col-12" hasAds={hasAds}>
            <span>How new ICO, 9999% returns guaranteed!</span>
          </Ad>
        </div>
        <div className="App-content columns">
          <div className="App-content-main column col-9">
            <h1 className="App-content-main-title">
              This is a cool article
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse feugiat purus vel lorem placerat, vitae
              condimentum velit posuere. Donec id tristique urna.
              Praesent ut ipsum posuere eros tincidunt dignissim.
              Proin non ultricies leo. Proin porta ex elementum ultricies
              molestie. Aenean quis sem eget ex mollis viverra. 
            </p>
            <p>
              Praesent at arcu vel lectus pellentesque dignissim. Fusce
              tempus urna tellus, vitae dapibus ipsum bibendum eget. Proin
              interdum, neque et vestibulum pharetra.
            </p>
            <Ad className="App-content-main-ad" hasAds={hasAds}>
              <span>Hot singles in your area</span>
            </Ad>
            <p>
            Augue elit sollicitudin risus, vel ultricies dui velit facilisis
            purus. Suspendisse potenti. Donec aliquet dignissim leo sit amet
            condimentum. Vestibulum sit amet mi facilisis, tristique risus eu,
            tincidunt dui.
            </p>
            <p>
              Nunc vitae sollicitudin risus, vitae finibus enim. Etiam
              condimentum sapien nec ipsum tincidunt ultricies. Nam faucibus,
              purus vel ultricies feugiat, orci augue condimentum risus, nec
              molestie orci libero ut nunc.
            </p>
          </div>

          <div className="App-content-sidebar column col-3">
            <div className="App-content-sidebar-block" />
            <Ad className="App-content-sidebar-block" hasAds={hasAds}>
              <span>One weird trick, developers hate him</span>
            </Ad>
            <div className="App-content-sidebar-block is-long" />
          </div>
        </div>

        {webln &&
          <div className="App-removeads">
            <div className="App-removeads-text">
              Pay 1 satoshi to remove ads
            </div>
            <button className="App-removeads-btn btn" onClick={this.handlePayToRemove}>
              Pay now
            </button>
          </div>
        }
      </div>
    );
  }

  private handlePayToRemove = () => {
    const { webln } = this.state;
    if (webln) {
      webln.sendPayment('lnsb10n1pda9j9mpp5natxzcnzrn0w5hggx6s6a79y8qmcvxr6xuyuh3fndzqppww6nqdqdqqcqzysxqyz5vq0tkk3qnje58nqfv7azlq6vgfl3len3mttyfr25884v48fu463298v83jyyg8vkx7jw0xp0h8qxq7ekjn7ujdljuqxnxrspjncghwumcqntucew').then(() => {
        this.setState({ hasAds: false });
      }).catch(err => {
        // tslint:disable no-console
        console.error('Payment failed', err);
      });
    }
  };
}

export default App;
