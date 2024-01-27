import React from 'react';
import dayjs from 'dayjs';


interface Props {
  author: string;
  message: string;
  date: string;
}

const MessageItem: React.FC<Props> = ({
                                        author,
                                        message,
                                        date
                                      }) => {
  return (
    <div className="card mb-2">
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <span>{author}</span><span>{dayjs(date).format('DD-MMM, YYYY HH:mm')}</span>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;