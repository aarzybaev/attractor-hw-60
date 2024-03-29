import {useEffect, useState} from 'react';

import Appbar from './components/Appbar/Appbar';
import FormSend from './components/FormSend/FormSend';
import MessageItem from './components/MessageItem/MessageItem';
import {FormMessage, Message} from './type';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

function App() {

  const [messages, setMessages] = useState<Message[]>([]);

  let URL = 'http://146.185.154.90:8000/messages/?datetime=';
  let lastDate: string = '';

  const getMessages = async () => {
 
      const response = await fetch(URL);

      if (response.ok) {
        const parsedMessages: Message[] = await response.json();
        const messagesLength = parsedMessages.length;

        if (messagesLength) {
          lastDate = parsedMessages[messagesLength - 1].datetime;
          URL = 'http://146.185.154.90:8000/messages/?datetime=' + lastDate;
          setMessages(
            prevState => [...prevState, ...parsedMessages]
            .sort((a, b) => dayjs(a.datetime).format('X') < dayjs(b.datetime).format('X') ? 1 :-1)
          );
        }

      }

  };

  useEffect(() => {
    setInterval(() => {
      void getMessages().catch(e => console.error(e));;
    }, 5000);

  }, []);

  const sendMessage = async (item: FormMessage) => {
    const url = 'http://146.185.154.90:8000/messages';
    const data = new URLSearchParams();
    data.set('message', item.message);
    data.set('author', item.author);

    const response = await fetch(url, {
      method: 'post',
      body: data,
    });
    
    if (!response.ok) {
      console.log('Something went wrong..');
    }

  };

  const formHandler = (message: FormMessage) => {
    void sendMessage(message).catch(e => console.error(e));
  };

  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className="container-fluid">
        <section>
          <div className="row mt-2">
            <div className="col">
              <FormSend onSubmit={formHandler}/>
            </div>
          </div>
        </section>
        <section>
          <div className="row mt-5">
            <div className="col">
              <div className="row justify-content-center">
                <div className="col-5">
                  {
                  messages.map(item => {
                    return (
                      <MessageItem
                        key={Math.random().toString()}
                        author={item.author}
                        message={item.message}
                        date={item.datetime}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
