/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
 *
 * ProjectComments
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import {
  Avatar,
  BanCircleIcon,
  Button,
  Dialog,
  DirectionRightIcon,
  Heading,
  IconButton,
  Pane,
  Paragraph,
  Switch,
  Text,
  TextInput,
  TickCircleIcon,
} from 'evergreen-ui';

import CommentsBackground from 'images/comments-background.jpg';
import { getAvaterImage } from 'utils/util';
import CommentBubble from 'components/CommentBubble';

const debugIntervalFlag = false;
const pageCount = 50;
const intervalWindow = 5000;

function getPermissionsDialogContentBasedOnState(currentPermission) {
  return currentPermission
    ? 'This action will disable other users from being able to comment on your project'
    : 'This action will allow other users to comment on your project';
}

function ProjectComments({
  user,
  project,
  setError,
  comments,
  addProjectComment,
  loadProjectComments,
  updateProjectCommentPermissions,
}) {
  const [commentingAllowed, setCommentingAllowed] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [loadMoreNumber, setLoadMoreNumber] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [addCommentTriggered, setAddCommentTriggered] = useState(false);
  // Polling Call States
  const [refreshComment, setRefreshComment] = useState(null);
  const lastInterval = useRef();

  const commentsListRef = useRef(null);

  function resetCommentsScroll() {
    if (commentsListRef) {
      commentsListRef.current.scrollTop = 0;
    }
  }

  function captureNewCommentInput() {
    if (commentValue !== '') {
      if (commentValue.length > 255) {
        setError(`Comment too long ${commentValue.length}/255`);
      } else {
        if (debugIntervalFlag) {
          console.log(`Clearup interval initiated in add comment button`);
        }
        cleanupInterval();
        addProjectComment(project._id, commentValue, comments);
        setAddCommentTriggered(true);
        setCommentValue('');
      }
      resetCommentsScroll();
    }
  }

  function cleanupInterval() {
    if (refreshComment) {
      if (debugIntervalFlag) {
        console.log(`Interval cleared up, PageIndex:${pageIndex}`);
      }
      clearInterval(refreshComment);
      setRefreshComment(null);
    }
  }

  function showLoadMoreButton() {
    return (
      comments &&
      comments.length % pageCount === 0 &&
      !fullyLoaded &&
      comments.length > 0
    );
  }

  function showAllLoadedText() {
    return comments && (comments.length % pageCount !== 0 || fullyLoaded);
  }

  useEffect(() => {
    if (project) {
      setCommentingAllowed(project.comments_allowed);
    }
  }, [project]);

  useEffect(() => {
    setLoaded(true);
    if (loadMoreNumber !== 0 && loadMoreNumber === comments.length) {
      // Load more doesn't modify the comments loaded
      setFullyLoaded(true);
    }
    if (addCommentTriggered) {
      if (debugIntervalFlag) {
        console.log(`Initiated interval in [comments], PageIndex:${pageIndex}`);
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () =>
            loadProjectComments(project._id, {
              offset: 0,
              limit: pageIndex * pageCount,
            }),
          intervalWindow,
        ),
      );
      setAddCommentTriggered(false);
    }
  }, [comments]);

  useEffect(() => {
    lastInterval.current = refreshComment;
  }, [refreshComment]);

  useEffect(() => {
    if (pageIndex !== 1) {
      if (debugIntervalFlag) {
        console.log(`Clearup interval initiated in [pageIndex]`);
      }
      cleanupInterval();
      loadProjectComments(project._id, {
        offset: 0,
        limit: pageIndex * pageCount,
      });
      if (debugIntervalFlag) {
        console.log(
          `Initiated new interval in [pageIndex], PageIndex:${pageIndex}`,
        );
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () =>
            loadProjectComments(project._id, {
              offset: 0,
              limit: pageIndex * pageCount,
            }),
          intervalWindow,
        ),
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (!loaded) {
      // Initial loading of comments
      loadProjectComments(project._id, {
        offset: 0,
        limit: pageIndex * pageCount,
      });
      if (debugIntervalFlag) {
        console.log(`Initiated first interval, PageIndex:${pageIndex}`);
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () =>
            loadProjectComments(project._id, {
              offset: 0,
              limit: pageIndex * pageCount,
            }),
          intervalWindow,
        ),
      );
    }
    return () => {
      if (lastInterval.current) {
        if (debugIntervalFlag) {
          console.log(`Cleaned up interval`);
        }
        clearInterval(lastInterval.current);
      }
    };
  }, []);

  return (
    <Pane
      height="100%"
      paddingTop="1rem"
      marginY="1rem"
      paddingX="1.5rem"
      marginX="1.5rem"
      display="flex"
      background="white"
      elevation={1}
      flexDirection="column"
    >
      <Pane aria-label="header panel" display="flex" alignItems="center">
        {project && <Heading size={400}>{project.title}</Heading>}
        <Pane flex={1} />
        {project && user && project.author._id === user.data.id && (
          <Pane
            aria-label="author-permissions-view"
            display="flex"
            alignItems="center"
          >
            <Heading size={300} marginRight="1rem">
              Comments Permission
            </Heading>
            <Switch
              checked={commentingAllowed}
              // eslint-disable-next-line no-unused-vars
              onChange={_e => {
                setShowPermissionsDialog(true);
              }}
            />
          </Pane>
        )}
        {project && user && project.author._id !== user.data.id && (
          <Pane
            aria-label="user-permissions-view"
            display="flex"
            alignItems="center"
          >
            <Heading size={300} marginRight="1rem">
              {'Commenting: '}
            </Heading>
            {!commentingAllowed && <BanCircleIcon color="danger" />}
            {commentingAllowed && <TickCircleIcon color="success" />}
          </Pane>
        )}
        {project && !user && (
          <Heading size={300}>Login required to comment</Heading>
        )}
      </Pane>
      <Pane flex={1} />
      <Pane
        aria-label="comments pane"
        display="flex"
        flexDirection="column-reverse"
        backgroundImage={`url(${CommentsBackground})`}
        backgroundSize="cover"
        height="75vh"
      >
        <Pane
          padding="1rem"
          display="flex"
          background="rgba(198, 198, 198, 0.3)"
          aria-label="Input area for user's comment"
        >
          <Avatar
            isSolid
            src={user ? getAvaterImage(user.data) : null}
            name={user ? user.data.username : 'Guest'}
            size={32}
            marginRight="1rem"
          />
          <TextInput
            width="100%"
            placeholder="Leave a comment..."
            value={commentValue}
            onChange={e => setCommentValue(e.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                captureNewCommentInput();
              }
            }}
            disabled={!(user && commentingAllowed)}
          />
          <IconButton
            icon={DirectionRightIcon}
            marginLeft="0.5rem"
            borderRadius={40}
            intent="success"
            onClick={() => captureNewCommentInput()}
            disabled={!(user && commentingAllowed)}
          />
        </Pane>
        <Pane
          padding="1rem"
          display="flex"
          flexGrow={1}
          flexDirection="column-reverse"
          overflowY="auto"
          ref={commentsListRef}
          aria-label="List of comments by other users"
        >
          {comments &&
            comments.map(comment => (
              <CommentBubble key={comment._id} user={user} comment={comment} />
            ))}
          {showLoadMoreButton() && (
            <Pane>
              <Pane flexGrow={1} />
              <Pane display="flex">
                <Pane flexGrow={1} />
                <Button
                  onClick={() => {
                    setPageIndex(pageIndex + 1);
                    setLoadMoreNumber(comments.length);
                  }}
                  marginTop="1rem"
                >
                  Load more
                </Button>
                <Pane flexGrow={1} />
              </Pane>
            </Pane>
          )}
          {showAllLoadedText() && (
            <Pane>
              <Pane flexGrow={1} />
              <Pane display="flex">
                <Pane flexGrow={1} />
                <Text size={300} color="grey" marginTop="1rem">
                  All comments loaded
                </Text>
                <Pane flexGrow={1} />
              </Pane>
            </Pane>
          )}
        </Pane>
      </Pane>
      <Pane flex={1} />
      <Dialog
        isShown={showPermissionsDialog}
        title="Modifying Project Commenting Permissions"
        intent="warning"
        onCloseComplete={() => {
          // Revert switch state
          setShowPermissionsDialog(false);
        }}
        onConfirm={() => {
          updateProjectCommentPermissions(project._id, !commentingAllowed);
          setCommentingAllowed(!commentingAllowed);
          setShowPermissionsDialog(false);
        }}
        confirmLabel="Confirm"
      >
        <Paragraph>
          <b>{getPermissionsDialogContentBasedOnState(commentingAllowed)}</b>
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

ProjectComments.propTypes = {};

export default memo(ProjectComments);
