import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, CircularProgress, Typography } from '@mui/material';
import api from '../services/api';


const TopUsers = () => {
  const [users, setUsers] = useState<{userId: string, postCount: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/top')
      .then(response => {
        setUsers(response.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Top Users</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {users.map(user => (
            <ListItem key={user.userId}>
              <ListItemAvatar>
                <Avatar>{user.userId.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`User ${user.userId}`}
                secondary={`${user.postCount} posts`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TopUsers;