import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import routes from '../../routes.js';

const MainPage = () => {
  const history = useHistory();
  const [content, setContent] = useState(null);

  useEffect(async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      const response = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${userId.token}` } });
      setContent(response.status);
      return;
    }

    history.push('/login');
  }, []);

  return (
    <div className="text-center">
      <h1>Welcome to Hexlet Chat</h1>

      <p>
        Response status:
        {' '}
        {content}
      </p>
    </div>
  );
};

export default MainPage;
