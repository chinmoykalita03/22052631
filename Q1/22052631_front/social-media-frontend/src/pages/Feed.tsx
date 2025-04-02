import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PostCard from '../components/PostCard';
import api from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      api.get('/posts/latest')
        .then(response => {
          setPosts(response.data.data);
        })
        .finally(() => setLoading(false));
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Latest Posts</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </Box>
  );
};

export default Feed;