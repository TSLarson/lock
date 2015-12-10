import React from 'react';
import Screen from '../lock/screen';
import EmailPane from '../cred/email/email_pane';
import PasswordPane from '../cred/password/password_pane';
import UsernamePane from '../cred/username/username_pane';
import { authWithUsername, hasActivity } from './index';
import { signUp } from './actions';
import LoginSignUpTabs from './login_sign_up_tabs';
import { renderSignedUpConfirmation } from './signed_up_confirmation';

export default class SignUp extends Screen {

  constructor() {
    super("signUp");
  }

  submitHandler() {
    return signUp;
  }

  renderAuxiliaryPane(lock) {
    return renderSignedUpConfirmation(lock);
  }

  render({lock}) {
    const usernamePane = authWithUsername(lock)
      ? <UsernamePane
          lock={lock}
          placeholder={this.t(lock, ["usernameInputPlaceholder"], {__textOnly: true})}
        />
      : null;

    const tabs = hasActivity(lock, "login")
      ? <LoginSignUpTabs lock={lock}/>
      : null;

    return (
      <div>
        {tabs}
        <EmailPane
          lock={lock}
          placeholder={this.t(lock, ["emailInputPlaceholder"], {__textOnly: true})}
        />
        {usernamePane}
        <PasswordPane
          lock={lock}
          placeholder={this.t(lock, ["passwordInputPlaceholder"], {__textOnly: true})}
        />
      </div>
    );
  }

}