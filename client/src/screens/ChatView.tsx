import React, { useEffect, useState, useRef } from 'react';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/slices/user';
import { toast, ToastContainer } from 'react-toastify';
import CustomToast from '../components/CustomToast';
import { IUser, IMessage } from '../interfaces';
import Message from '../components/Message';
import { messageService } from '../services/messageService';

function ChatView () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>('');
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);
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
      setMessage('');
      scrollToLastMessage();
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

  const scrollToLastMessage = () => {
    if (messageRef.current?.scrollIntoView) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyListener = (event: KeyboardEvent) => {
    if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !event.shiftKey) {
      event.preventDefault();
      submitRef.current?.click();
    }
  };

  const handleLogout = () => {
    // This is not enough. Prolly want to store JWT token in a blacklist in a db until it expires...
    localStorage.clear();
    navigate(routes.HOME);
  };

  useEffect(() => {
    scrollToLastMessage();
  }, [allMessages]);

  useEffect(() => {
    document.addEventListener('keydown', keyListener);
    getUserInfo();
    getAllMessages();
    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, []);

  return (
    <>
      <ToastContainer/>
      <div className="container">
        <div className="info-bar">
          <div role="username-div">Logged in as: {user.username}</div>
          <button role="logout-button" className="logout" onClick={handleLogout}>Logout</button>
        </div>
        <div className="messages-container">
          {chatMessages}
          <div ref={messageRef} ></div>
        </div>
        <form className="input-container" onSubmit={handleMessage}>
          <textarea
            role="message-input"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input role="message-submit" disabled={message.trim().length === 0} ref={submitRef} type="submit" value="SEND" className="send-button" />
        </form>
      </div>
    </>
  );
}

export default ChatView;
