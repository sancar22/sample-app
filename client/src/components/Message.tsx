import moment from 'moment';
import { MessageProps } from '../interfaces';

function Message ({ isUser, content, date, fullName, username}: MessageProps) {
  return (
    <div className={isUser ? 'right message' : 'left message'}>
      <div className="message-time bold">
        {!isUser && fullName + ' - ' + username}
      </div>
      <div className="message-text">{content}</div>
      <div
        className="message-time"
        style={{ textAlign: isUser ? 'left' : 'right' }}
      >
        {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
      </div>
    </div>
  );
}

export default Message;
