'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import axios from "axios";

type AIDialogProps = {
  title?: string;
  type?: string;
  detail?: string;
  item?: any;
};

type ChatRecord = {
  role: string;
  content: string;
}

const AIAvatar = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-1xl h-12 w-12 rounded-full box-border border-white">
      <span className="block text-center h-10 w-10 leading-10 text-white bg-tertiary-light rounded-full">
        AI
      </span>
    </div>
  );
}

const RecordRender = ({record}: {record: ChatRecord}) => {
  if (record.role === 'ai') {
    return (
      <div className="flex justify-start mb-4">
        <AIAvatar />
        <p
          className="flex-1 bg-white border-2 rounded-lg mx-3 p-3 flex items-center"
        >
          {record.content}
        </p>
      </div>
    );
  }
  if (record.role === 'user') {
    return (
      <div className="flex flex-row-reverse justify-start mb-4">
        <Avatar url='/images/avatar.png' size={14} />
        <p
          className="flex-1 bg-white border-2 rounded-lg mx-3 p-3 flex items-center"
        >
          {record.content}
        </p>
      </div>
    );
  }
  if (record.role === 'system') {
    return (
      <div className="flex justify-center">
        <span className="border-2 border-red-400 bg-red-100 px-4 py-1 rounded-md text-red-600">
          {record.content}
        </span>
      </div>
    );
  }
  return null;
}

const AIDialog = ({title, type, detail, item}: AIDialogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const [userInput, setUserInput] = useState('');
  const [records, setRecords] = useState<ChatRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const srcollToBottom = () => {
    if (scrollRef.current) {
      const clientHeight = scrollRef.current.firstElementChild?.clientHeight || 0;
      scrollRef.current.scrollTo({top: clientHeight});
    }
  }

  const sendMsg = useCallback(async () => {
    const json = JSON.stringify(item);
    const prefixText = `You are a helpful assistant and you should give some advice and useful information for the user based on the following json string info about the ${type === 'Place' ? 'Tourist attractions' : 'Hotel and Room'}: ${json}`;
    const messages = [{role: 'system', content: prefixText}];
    messages.push({role: 'user', content: userInput});       
    const nRecords = [...records, {role: 'user', content: userInput}];
    setRecords(nRecords);
    setLoading(true);
    setUserInput('');
    try {
      const { data: {data} } = await axios.post('/api/ai/gpt', {messages});
      console.log(data.message.content);
      nRecords.push({role: 'ai', content: data.message.content});
      setRecords(nRecords);
      setLoading(false);
    } catch(e) {
      nRecords.push({role: 'system', content: 'AI reply failed.'});
      setRecords(nRecords);
      setLoading(false);
    }
  }, [detail, records, userInput]);

  useEffect(() => {
    srcollToBottom();
  }, [records]);

  return (
    <div className='fixed right-16 bottom-10'>
      {open && <div className="flex flex-col w-[30rem] h-[36rem] border-2 bg-white bg-opacity-80 mb-16 mr-16 rounded-lg">
        <h3
          className="border-b-2 py-4 pl-4"
        >
          <b>{type}</b> - {title}
        </h3>
        <div ref={scrollRef} className="flex-1 border-b-2 overflow-auto">
          <ul className="p-4">
            {records.map((record, ind) => (
              <li key={ind}>{RecordRender({record})}</li>
            ))}
          </ul>
        </div>
        <div className="h-40 flex flex-col">
          <textarea
            className="flex-1 w-[100%] resize-none p-3 focus:outline-none"
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                sendMsg();
              }
            }}
            value={userInput}
          />
          <div className="text-right m-3">
            <button
              className="bg-blue-400 px-2 py-1 text-white rounded-md"
              onClick={sendMsg}
              disabled={loading || !userInput}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>}
      
      <div className='fixed right-16 bottom-10'>
        <button
          className="flex flex-1 justify-center items-center gap-2 p-2 text-3xl h-16 w-16 text-white bg-tertiary-light rounded-full hover:bg-orange-400"
          onClick={() => setOpen(!open)}
        >
          AI
        </button>
      </div>
    </div>
  )
  // return (
  //   <button
  //     className='flex flex-1 justify-center items-center gap-2 p-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200'
  //     onClick={() => {
  //       if (onClick) {
  //         onClick();
  //       }
  //     }}
  //   >
  //     {children}
  //   </button>
  // )
};

export default AIDialog;
