/* global window */

import React, { Component } from 'react';

import store from 'app/redux/store';
import i18n from 'app/config/i18n';
import { language, theme } from 'app/redux/action/showtime';
import amClass from 'app/util/amClass';

class Setting extends Component {
  constructor(props) {
    const state = store.getState();

    super(props);
    this.state = {
      language: state.language,
      theme: state.theme,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.setState({ language: state.language, theme: state.theme });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeLanguage() {
    language(this.state.language === 'en' ? 'am' : 'en');
  }

  changeTheme() {
    theme(this.state.theme === 'night' ? 'light' : 'night');
  }

  render() {
    return (
      <div className="view-setting">
        <i className="icon-setting" />

        <button
          onClick={() => this.changeLanguage()}
          className={`btn ${amClass(this.state.language)}`}
        >
          { i18n[this.state.language].CHANGE_LANGUAGE }
        </button>

        <button
          onClick={() => this.changeTheme()}
          className={`btn ${amClass(this.state.language)}`}
        >
          { i18n[this.state.language].CHANGE_THEME }
        </button>
      </div>
    );
  }
}

module.exports = Setting;
