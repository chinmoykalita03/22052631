import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardHeader, Avatar, Chip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import api from '../services/api';
import { generateRandomImage } from '../utils/helpers';

interface Post {
  id: number;
  userid: number;
  content: string;
  commentCount: number;
}

const TrendingPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await api.get('/posts/popular');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Trending Posts</Typography>
      
      {loading ? (
        <CircularProgress />
      ) : (
        posts.map((post) => (
          <Card key={post.id} sx={{ mb: 3 }}>
            <CardHeader
              avatar={<Avatar>{post.userid}</Avatar>}
              title={`User ${post.userid}`}
              subheader={`Post ID: ${post.id}`}
            />
            <CardContent>
              <Typography paragraph>{post.content}</Typography>
              <Chip
                icon={<CommentIcon />}
                label={`${post.commentCount} comments`}
                color="primary"
              />
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default TrendingPosts;