import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { messages, currentUser } from '@/data/mockData';

const conversation = [
  { id: 1, from: 'them', text: 'Привет! Видела твой пост про обновление, очень полезно', time: '10:10' },
  { id: 2, from: 'me', text: 'Спасибо! Старался максимально подробно расписать', time: '10:15' },
  { id: 3, from: 'them', text: 'Кстати, есть вопрос по интеграции — можешь помочь?', time: '10:20' },
  { id: 4, from: 'them', text: 'Привет! Видела твой пост про обновление, очень полезно', time: '10:24' },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(messages[0]);
  const [text, setText] = useState('');

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-display font-semibold mb-6">Сообщения</h1>

      <div className="bg-card border border-border rounded-xl overflow-hidden flex" style={{ height: '580px' }}>
        <div className="w-72 border-r border-border flex flex-col shrink-0">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск..."
                className="w-full pl-8 pr-3 py-2 text-sm bg-secondary border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.map(msg => (
              <button
                key={msg.id}
                onClick={() => setActiveChat(msg)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-border last:border-0 transition-colors ${
                  activeChat.id === msg.id ? 'bg-primary/8' : 'hover:bg-secondary/50'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                    {msg.with.avatar}
                  </div>
                  {msg.with.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{msg.with.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{msg.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground truncate flex-1">{msg.lastMessage}</p>
                    {msg.unread > 0 && (
                      <span className="w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                        {msg.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Icon name="Plus" size={14} />
              Новое сообщение
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="px-5 py-3.5 border-b border-border flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                {activeChat.with.avatar}
              </div>
              {activeChat.with.online && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">{activeChat.with.name}</p>
              <p className="text-xs text-muted-foreground">{activeChat.with.online ? 'онлайн' : 'не в сети'}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {conversation.map(msg => (
              <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'them' && (
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center mr-2 mt-auto shrink-0">
                    {activeChat.with.avatar}
                  </div>
                )}
                <div className={`max-w-xs px-3.5 py-2.5 rounded-2xl text-sm leading-snug ${
                  msg.from === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-foreground rounded-bl-sm'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {msg.time}
                  </div>
                </div>
                {msg.from === 'me' && (
                  <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center ml-2 mt-auto shrink-0">
                    {currentUser.avatar}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-border flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <Icon name="Paperclip" size={16} />
            </button>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1 text-sm bg-secondary border-0 rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
              onKeyDown={e => e.key === 'Enter' && setText('')}
            />
            <button
              className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40"
              disabled={!text.trim()}
              onClick={() => setText('')}
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
