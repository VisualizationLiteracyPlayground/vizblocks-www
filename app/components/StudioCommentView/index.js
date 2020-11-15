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
import CommentBubble from 'components/CommentBubble';

const debugIntervalFlag = false;
const pageCount = 50;
const intervalWindow = 5000;

function StudioCommentView({
  user,
  studioid,
  commentsListRef,
  comments,
  addComment,
  loadComments,
}) {
  const [commentValue, setCommentValue] = useState('');
  const [loadMoreNumber, setLoadMoreNumber] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [addCommentTriggered, setAddCommentTriggered] = useState(false);
  const [refreshComment, setRefreshComment] = useState(null);
  const lastInterval = useRef();

  function showLoadMoreButton() {
    return (
      comments &&
      comments.length % 50 === 0 &&
      !fullyLoaded &&
      comments.length > 0
    );
  }

  function showAllLoadedText() {
    return comments && (comments.length % 50 !== 0 || fullyLoaded);
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

  useEffect(() => {
    if (!loaded) {
      // Initial loading of comments
      loadComments(studioid, pageIndex, comments);
      if (debugIntervalFlag) {
        console.log(`Initiated first interval, PageIndex:${pageIndex}`);
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () => loadComments(studioid, pageIndex, []),
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
    lastInterval.current = refreshComment;
  }, [refreshComment]);

  useEffect(() => {
    if (debugIntervalFlag) {
      console.log(`Clearup interval initiated in [pageIndex]`);
    }
    cleanupInterval();
    loadComments(studioid, pageIndex, comments);
    if (pageIndex !== 0) {
      if (debugIntervalFlag) {
        console.log(
          `Initiated new interval in [pageIndex], PageIndex:${pageIndex}`,
        );
        console.log(comments);
      }
      setRefreshComment(
        setInterval(
          () => loadComments(studioid, pageIndex, comments),
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
      let commentPayload = [...comments];
      if (pageIndex * pageCount < comments.length) {
        // Update page index and trigger interval call
        if (debugIntervalFlag) {
          console.log('Comments spliced');
        }
        commentPayload = commentPayload.splice(0, pageIndex * pageCount);
      }
      if (debugIntervalFlag) {
        console.log(`Initiated interval in [comments], PageIndex:${pageIndex}`);
        console.log(commentPayload);
      }
      setRefreshComment(
        setInterval(
          () => loadComments(studioid, pageIndex, commentPayload),
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
          name={user.data.username}
          size={32}
          marginRight="1rem"
        />
        <TextInput
          width="100%"
          placeholder="Leave a comment..."
          value={commentValue}
          onChange={e => setCommentValue(e.target.value)}
        />
        <IconButton
          icon={DirectionRightIcon}
          marginLeft="0.5rem"
          borderRadius={50}
          intent="success"
          onClick={() => {
            if (commentValue !== '') {
              if (debugIntervalFlag) {
                console.log(`Clearup interval initiated in add comment button`);
              }
              cleanupInterval();
              addComment(studioid, commentValue, comments);
              setAddCommentTriggered(true);
            }
            setCommentValue('');
          }}
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
                marginTop="0.2rem"
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
              <Text size={300} color="grey" marginTop="0.2rem">
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
    loadComments: (studioid, pageIndex, loadedComments) =>
      dispatch(loadComments(studioid, pageIndex, loadedComments)),
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
