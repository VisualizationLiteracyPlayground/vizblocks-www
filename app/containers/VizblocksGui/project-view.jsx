/* eslint-disable no-unused-vars */
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
      userId: this.props.user ? this.props.user.data.id : null,
      authorId: this.props.authorid ? this.props.authorid : null,
      authorUsername: this.props.user ? this.props.user.data.username : null,
      projectTitle: this.props.title ? this.props.title : '',
      isPlayerOnly: this.props.isPlayerOnly,
      history: this.props.history,
      location: this.props.location,
      setSuccess: this.props.setSuccess,
      setError: this.props.setError,
    };
    bindAll(this, [
      'setProjectId',
      'setProjectTitle',
      'canSave',
      'handleClickLogo',
      'handleUpdateProjectData',
      'handleUpdateProjectTitle',
      'loadProjectDetails',
      'handleUpdateProjectId',
      'handleUpdateProjectThumbnail',
      'handleGreenFlag',
    ]);
  }

  setProjectId(newId) {
    this.state.projectId = newId;
  }

  setProjectTitle(newTitle) {
    this.state.projectTitle = newTitle;
  }

  canSave() {
    return this.state.authorId ? this.state.authorId === this.state.userId : true;
  }

  handleClickLogo () {
    this.state.history.goBack();
  }

  handleUpdateProjectData (projectId, vmState, params) {
    const creatingProject = projectId === null || typeof projectId === 'undefined';
    const queryParams = {};
    if (!creatingProject && this.state.projectTitle !== '') queryParams.title = this.state.projectTitle;
    let qs = queryString.stringify(queryParams);
    if (qs) qs = `?${qs}`;

    if (this.canSave()) {
      return new Promise((resolve, reject) => {
        if (creatingProject) {
          api.post(
            `/project${qs}`,
            {
              vmState
            },
            response => {
              this.setProjectId(response.data.id);
              this.setProjectTitle(response.data["content-title"]);
              resolve(response.data);
              this.state.setSuccess('Created project!', '');
            },
            e => {
              reject(e.response);
              this.state.setError('Failed to create project', '');
            }
          );
        } else {
          api.put(
            `/project/${projectId}${qs}`,
            {
              vmState
            },
            response => {
              resolve(response.data);
              this.state.setSuccess('Updated project!', '');
            },
            e => {
              reject(e.response);
              this.state.setError('Failed to update project', '');
            }
          );
        }
      });
    }
  }

  handleUpdateProjectTitle (title) {
    // Scratch-gui inits project title to be "Scratch Project"
    // when creating new project
    if (this.state.projectId === 0) {
      // ignore this request
      return;
    }

    if (this.canSave()) {
      if (title.length > 50) {
        this.state.setError('Failed to Update Title', `Exceeded character limit: ${title.length}/50`);
        return;
      }
      return new Promise((resolve, reject) => {
        api.put(
          `/project/title/${this.state.projectId}`,
          {
            title
          },
          response => {
            this.setProjectTitle(title);
            // Update title in location state
            this.state.history.replace(
              this.state.location.pathname,
              {
                projectid: this.state.projectId,
                title,
              },
            );
            resolve(response.data);
            this.state.setSuccess('Updated Title', `New Title: ${title}`);
          },
          e => reject(e.response),
        );
      });
    } 
  }

  handleUpdateProjectThumbnail (_id, blob) {
    if (this.canSave()) {
      return new Promise((resolve, reject) => {
        api.post(
          `/asset/internalapi/project/thumbnail/${this.state.projectId}`,
          blob,
          response => {
            resolve(response.data);
          },
          e => reject(e.response),
        );
      });
    }
  };

  loadProjectDetails (projectId) {
    return new Promise((resolve, reject) => {
      api.get(
        `project/details/${projectId}`,
        response => {
          resolve(response.data);
        },
        e => reject(e.response),
      );
    });
  }

  handleUpdateProjectId (projectId, callback) {
    this.setProjectId(projectId);
    if (!this.state.isPlayerOnly) {
      this.state.history.replace(
        this.state.location.pathname,
        {
          projectid: projectId,
          title: this.state.projectTitle,
        },
      );
    }
    if (callback) callback();
  }

  handleGreenFlag () {
    // Bug: 
    // When navigating to project view after first visit
    // There is a green flag overlay present. It does not dissapear even upon clicking
    // The scratch project can still run, just the overlay remains.
    // This is a quick fix to hide the overlay upon clicking it.
    const flagOverlay = document.getElementsByClassName("stage_green-flag-overlay-wrapper_2hUi_ box_box_2jjDp");
    if (flagOverlay.length > 0) {
      flagOverlay[0].style.display="none";
    }
  }

  render() {
    return (
      <React.Fragment>
        <IntlGUI
          isPlayerOnly={this.state.isPlayerOnly}
          projectId={this.state.projectId}
          projectHost={process.env.PROJECT_HOST}
          projectTitle={this.state.projectTitle}
          assetHost={process.env.ASSET_HOST}
          authorId={this.state.userId}
          authorUsername={this.state.authorUsername}
          backpackVisible={false}
          basePath="/"
          canCreateNew
          canEditTitle
          canSave={this.canSave()}
          onClickLogo={this.handleClickLogo}
          onGreenFlag={this.handleGreenFlag}
          onUpdateProjectData={this.handleUpdateProjectData}
          onUpdateProjectTitle={this.handleUpdateProjectTitle}
          onUpdateProjectId={this.handleUpdateProjectId}
          onUpdateProjectThumbnail={this.handleUpdateProjectThumbnail}
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
