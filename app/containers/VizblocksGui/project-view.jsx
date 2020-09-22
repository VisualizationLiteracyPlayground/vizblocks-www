/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
// project-view.jsx
const React = require('react');
const injectIntl = require('react-intl').injectIntl;
const GUI = require('scratch-gui');
const IntlGUI = injectIntl(GUI.AppStateHOC(GUI.default));


class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      projectId: 0
    };
  }

  render() {
    return (
      <React.Fragment>
        <IntlGUI
          projectId={this.state.projectId}
          backpackVisible={false}
          assetHost={process.env.ASSET_HOST}
        />
      </React.Fragment>
    );
  }
}

module.exports.View = Preview;
GUI.setAppElement(document.getElementById('app'));
module.exports.initGuiState = guiInitialState => GUI.initFullScreen(guiInitialState)
module.exports.guiReducers = GUI.guiReducers;
module.exports.guiInitialState = GUI.guiInitialState;
module.exports.guiMiddleware = GUI.guiMiddleware;
module.exports.initLocale = GUI.initLocale;
module.exports.localesInitialState = GUI.localesInitialState;