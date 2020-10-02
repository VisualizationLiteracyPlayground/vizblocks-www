/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
// project-view.jsx

const React = require('react');
const bindAll = require('lodash').bindAll;
const queryString = require('query-string');
const injectIntl = require('react-intl').injectIntl;
const GUI = require('scratch-gui');

const api = require('../../utils/api');
const IntlGUI = injectIntl(GUI.AppStateHOC(GUI.default));

class Preview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      projectId: this.props.projectid ? this.props.projectid : 0,
      authorId: this.props.user ? this.props.user.data.id : null,
      authorUsername: this.props.user ? this.props.user.data.username : null,
      projectTitle: this.props.title ? this.props.title : '',
    };
    bindAll(this, [
      'setProjectId',
      'handleClickLogo',
      'handleUpdateProjectData',
      'handleUpdateProjectTitle',
    ]);
  }
  
  setProjectId(newId) {
    this.state.projectId = newId;
  }

  setProjectTitle(newTitle) {
    this.state.projectTitle = newTitle;
  }

  handleClickLogo () {
    this.props.history.push('/');
  }

  handleUpdateProjectData (projectId, vmState, params) {
    const creatingProject = projectId === null || typeof projectId === 'undefined';
    const queryParams = {};
    if (params.hasOwnProperty('originalId')) queryParams.original_id = params.originalId;
    if (params.hasOwnProperty('isCopy')) queryParams.is_copy = params.isCopy;
    if (params.hasOwnProperty('isRemix')) queryParams.is_remix = params.isRemix;
    if (params.hasOwnProperty('title')) queryParams.title = params.title;
    let qs = queryString.stringify(queryParams);
    if (qs) qs = `?${qs}`;
    return new Promise((resolve, reject) => {
      if (creatingProject) {
        api.post(
          `/project${qs}`,
          {
            vmState
          },
          response => {
            this.setProjectId(response.data.id);
            resolve(response.data);
          },
          e => reject(e.response),
        );
      } else {
        api.put(
          `/project/${projectId}${qs}`,
          {
            vmState
          },
          response => resolve(response.data),
          e => reject(e.response),
        );
      }
    });
  }

  handleUpdateProjectTitle (title) {
    return new Promise((resolve, reject) => {
      api.put(
        `/project/title/${this.state.projectId}`,
        {
          title
        },
        response => {
          this.setProjectTitle(title);
          resolve(response.data);
        },
        e => reject(e.response),
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <IntlGUI
          projectId={this.state.projectId}
          projectHost={process.env.PROJECT_HOST}
          projectTitle={this.state.projectTitle}
          assetHost={process.env.ASSET_HOST}
          authorId={this.state.authorId}
          authorUsername={this.state.authorUsername}
          backpackVisible={false}
          basePath="/"
          canCreateNew
          canEditTitle
          canSave
          onClickLogo={this.handleClickLogo}
          onUpdateProjectData={this.handleUpdateProjectData}
          onUpdateProjectTitle={this.handleUpdateProjectTitle}
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