import { Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

interface PostCardProps {
  post: {
    id: number;
    userid: number;
    content: string;
    commentCount: number;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Avatar>{post.userid}</Avatar>
          <Typography variant="subtitle1">User {post.userid}</Typography>
        </div>
        <Typography paragraph>{post.content}</Typography>
        <Chip
          icon={<CommentIcon fontSize="small" />}
          label={`${post.commentCount} comments`}
          size="small"
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;