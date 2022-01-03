import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/user';
import { toast } from 'react-toastify';
import CustomToast from '../components/CustomToast';
import { IUser, IMessage } from '../interfaces';
import Message from '../components/Message';
import { messageService } from '../services/messageService';

function ChatView () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>('');
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const user: IUser = useSelector((state: RootState) => state.user);

  const getUserInfo = async () => {
    const jwt = localStorage.getItem('jwt');
    const { res, error } = await userService.getUserById(jwt);
    if (!error) dispatch(setUser(res));
    else {
      toast(<CustomToast title={res} />);
      navigate(routes.HOME);
    }
  };

  const getAllMessages = async () => {
    const jwt = localStorage.getItem('jwt');
    const { res, error } = await messageService.getAllMessages(jwt);
    if (!error) setAllMessages(res);
    else {
      toast(<CustomToast title={res} />);
    }
  };

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jwt = localStorage.getItem('jwt');
    const { res, error } = await messageService.postMessage(message, jwt);
    if (!error) {
      setAllMessages((prevMessages) => {
        const copyMessages = [...prevMessages];
        const newMessage = {...res, User: user};
        copyMessages.push(newMessage);
        return copyMessages;
      });
    } else {
      toast(<CustomToast title={res} />);
    }
  };

  const chatMessages = allMessages.map((message: IMessage) => {
    const { User, ownerId, text, createdAt, id } = message;
    const { firstName, surname, username } = User;
    return (
      <Message
        key={id}
        fullName={`${firstName} ${surname}`}
        isUser={user.id === ownerId}
        content={text}
        date={createdAt}
        username={username}
      />
    );
  });

  useEffect(() => {
    getUserInfo();
    getAllMessages();
  }, []);

  return (
    <div className="container">
      <div className="info-bar">
        <div>Logged in as: {user.username}</div>
        <button className="logout">Logout</button>
      </div>
      <div className="messages-container">{chatMessages}</div>
      <form className="input-container" onSubmit={handleMessage}>
        <textarea
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="SEND" className="send-button" />
      </form>
    </div>
  );
}

export default ChatView;
