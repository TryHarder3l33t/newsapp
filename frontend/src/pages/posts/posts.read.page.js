import React, { useEffect, useState } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import {
  readPosts,
  selectAllPosts,
  selectPage,
  selectTotalPages,
} from '../../store/posts.slice.js';

export const PostsReadPage = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(readPosts({ page }));
  }, []);

  const fetchMoreData = () => {
    console.log('Called Fetch More Data');
    if (page < totalPages) {
      dispatch(readPosts({ page: +page + 1 }));
    }
  };

  const rowRenderer = ({ index, key, style }) => (
    <div key={key} style={style}>
      <img
        width={100}
        height={100}
        src={posts[index].imageURL}
        alt={`localhost:3000/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg`}
      />
      <p>{index}</p>
      <p>{posts[index].title}</p>
      <br />
      <p>{posts[index].firstName}</p>
      <br />
    </div>
  );

  const handleOnRowsRendered = ({
    overscanStartIndex,
    overscanStopIndex,
    stopIndex,
  }) => {
    // Check if the user is near the end of the list and more data is available
    if (stopIndex === posts.length - 1) {
      fetchMoreData();
    }
  };

  return (
    <div>
      <h1> Hello these are the posts</h1>
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={window.innerHeight}
            rowCount={posts.length}
            rowHeight={200}
            rowRenderer={rowRenderer}
            onRowsRendered={handleOnRowsRendered}
          />
        )}
      </AutoSizer>
      {/* {page < totalPages && <p>Loading More...</p>} */}
    </div>
  );
};
