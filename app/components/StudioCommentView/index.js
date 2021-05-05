/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * StudioCommentView
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Avatar,
  Button,
  DirectionRightIcon,
  IconButton,
  Pane,
  Text,
  TextInput,
} from 'evergreen-ui';

import { makeSelectComments } from 'containers/StudioPage/selectors';
import { addComment, loadComments } from 'containers/StudioPage/actions';
import CommentsBackground from 'images/comments-background.jpg';
import { getAvaterImage } from 'utils/util';
import CommentBubble from 'components/CommentBubble';

import { USER_ROLE } from '../../containers/StudioPage/constants';

const debugIntervalFlag = false;
const pageCount = 50;
const intervalWindow = 5000;

function StudioCommentView({
  memberCommentPermission,
  user,
  userRole,
  studioid,
  currentTabIdx,
  setError,
  comments,
  addComment,
  loadComments,
}) {
  const [commentValue, setCommentValue] = useState('');
  const [loadMoreNumber, setLoadMoreNumber] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [addCommentTriggered, setAddCommentTriggered] = useState(false);
  const [refreshComment, setRefreshComment] = useState(null);
  const lastInterval = useRef();
  const commentsListRef = useRef(null);

  function isCommentingDisabled() {
    switch (userRole) {
      case USER_ROLE.GUEST:
      case USER_ROLE.UNLISTED:
        // Commenting is disabled for non-signed in and unlisted users
        return true;
      case USER_ROLE.MANAGER:
        // Manager of studio can always comment
        return false;
      case USER_ROLE.MEMBER:
        // Member of studio can comment base on permissions settings
        return !memberCommentPermission;
      default:
        return true;
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

  function cleanupInterval() {
    if (refreshComment) {
      if (debugIntervalFlag) {
        console.log(`Interval cleared up, PageIndex:${pageIndex}`);
      }
      clearInterval(refreshComment);
      setRefreshComment(null);
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
        addComment(studioid, commentValue, comments);
        setAddCommentTriggered(true);
        setCommentValue('');
      }
      resetCommentsScroll();
    }
  }

  function resetCommentsScroll() {
    if (commentsListRef) {
      commentsListRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    if (!loaded) {
      // Initial loading of comments
      loadComments(studioid, { offset: 0, limit: pageIndex * pageCount });
      if (debugIntervalFlag) {
        console.log(`Initiated first interval, PageIndex:${pageIndex}`);
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () =>
            loadComments(studioid, { offset: 0, limit: pageIndex * pageCount }),
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

  useEffect(() => {
    // Reset scroll position upon switching tabs in Studio
    resetCommentsScroll();
  }, [currentTabIdx]);

  useEffect(() => {
    lastInterval.current = refreshComment;
  }, [refreshComment]);

  useEffect(() => {
    if (pageIndex !== 1) {
      if (debugIntervalFlag) {
        console.log(`Clearup interval initiated in [pageIndex]`);
      }
      cleanupInterval();
      loadComments(studioid, { offset: 0, limit: pageIndex * pageCount });
      if (debugIntervalFlag) {
        console.log(
          `Initiated new interval in [pageIndex], PageIndex:${pageIndex}`,
        );
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () =>
            loadComments(studioid, { offset: 0, limit: pageIndex * pageCount }),
          intervalWindow,
        ),
      );
    }
  }, [pageIndex]);

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
            loadComments(studioid, { offset: 0, limit: pageIndex * pageCount }),
          intervalWindow,
        ),
      );
      setAddCommentTriggered(false);
    }
  }, [comments]);

  return (
    <Pane
      display="flex"
      flexDirection="column-reverse"
      backgroundImage={`url(${CommentsBackground})`}
      backgroundSize="cover"
      height="54vh"
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
          disabled={isCommentingDisabled()}
        />
        <IconButton
          icon={DirectionRightIcon}
          marginLeft="0.5rem"
          borderRadius={40}
          intent="success"
          onClick={() => captureNewCommentInput()}
          disabled={isCommentingDisabled()}
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
  );
}

StudioCommentView.propTypes = {};

const mapStateToProps = createStructuredSelector({
  comments: makeSelectComments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addComment: (studioid, comment, loadedComments) =>
      dispatch(addComment(studioid, comment, loadedComments)),
    loadComments: (studioid, queryPacket) =>
      dispatch(loadComments(studioid, queryPacket)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StudioCommentView);
