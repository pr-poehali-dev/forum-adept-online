import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { categories, threads } from '@/data/mockData';

type Tab = 'overview' | 'categories' | 'threads' | 'users' | 'settings';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
  { key: 'categories', label: 'Категории', icon: 'FolderOpen' },
  { key: 'threads', label: 'Темы', icon: 'FileText' },
  { key: 'users', label: 'Пользователи', icon: 'Users' },
  { key: 'settings', label: 'Настройки', icon: 'Settings' },
];

const mockUsers = [
  { id: 1, name: 'Михаил Волков', username: 'mvolkov', avatar: 'МВ', role: 'admin', posts: 234, status: 'active', joined: '01.01.2023' },
  { id: 2, name: 'Ольга Сидорова', username: 'osidorova', avatar: 'ОС', role: 'member', posts: 67, status: 'active', joined: '15.03.2023' },
  { id: 3, name: 'Сергей Петров', username: 'spetrov', avatar: 'СП', role: 'moderator', posts: 145, status: 'active', joined: '22.06.2023' },
  { id: 4, name: 'Дмитрий Кузнецов', username: 'dkuznetsov', avatar: 'ДК', role: 'member', posts: 189, status: 'banned', joined: '10.08.2023' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [forumName, setForumName] = useState('Adept Online');
  const [forumDesc, setForumDesc] = useState('Форум сообщества Adept Online');
  const [regOpen, setRegOpen] = useState(true);
  const [moderation, setModeration] = useState(false);
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon name="Shield" size={18} />
        </div>
        <div>
          <h1 className="text-xl font-display font-semibold">Панель администратора</h1>
          <p className="text-xs text-muted-foreground">Управление форумом Adept Online</p>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-card shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Пользователей', value: '1 248', icon: 'Users', color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Тем на форуме', value: '300', icon: 'FileText', color: 'text-green-500', bg: 'bg-green-50' },
              { label: 'Сообщений', value: '3 182', icon: 'MessageSquare', color: 'text-orange-500', bg: 'bg-orange-50' },
              { label: 'Онлайн сейчас', value: '24', icon: 'Activity', color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                <div className={`w-8 h-8 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                  <Icon name={s.icon} size={16} />
                </div>
                <p className="text-2xl font-display font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="font-semibold text-sm">Требуют внимания</h2>
            </div>
            {[
              { icon: 'Flag', text: '3 жалобы на сообщения ожидают рассмотрения', color: 'text-red-500', bg: 'bg-red-50' },
              { icon: 'UserCheck', text: '12 новых пользователей за последние 24 часа', color: 'text-green-500', bg: 'bg-green-50' },
              { icon: 'MessageSquare', text: '47 новых сообщений сегодня', color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0">
                <div className={`w-7 h-7 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon name={item.icon} size={14} />
                </div>
                <p className="text-sm">{item.text}</p>
                <button className="ml-auto text-xs text-primary font-medium hover:underline shrink-0">
                  Просмотреть
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Управление категориями</h2>
            <button
              onClick={() => setShowNewCat(!showNewCat)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Icon name="Plus" size={14} />
              Добавить
            </button>
          </div>
          {showNewCat && (
            <div className="bg-card border border-border rounded-xl p-4 space-y-3 animate-fade-in">
              <h3 className="text-sm font-semibold">Новая категория</h3>
              <input
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="Название категории"
                className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input placeholder="Описание категории" className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Закрытая категория
                </label>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Создать</button>
                <button onClick={() => setShowNewCat(false)} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm">Отмена</button>
              </div>
            </div>
          )}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${cat.color}`}>
                  {cat.isPrivate ? '🔒' : cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{cat.name}</p>
                    {cat.isPrivate && <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-full">Закрытый</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{cat.threads} тем · {cat.posts} сообщений</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-secondary transition-colors text-muted-foreground">
                    <Icon name="Edit3" size={14} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'threads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Управление темами</h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {threads.map(thread => (
              <div key={thread.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{thread.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{thread.author.name} · {thread.replies} ответов · {thread.views} просмотров</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${thread.isPinned ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground'}`}>
                    <Icon name="Pin" size={12} />
                    {thread.isPinned ? 'Откреп.' : 'Закрепить'}
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="font-semibold">Пользователи</h2>
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Поиск пользователя..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {mockUsers.map(user => (
              <div key={user.id} className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">{user.name}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-600' :
                      user.role === 'moderator' ? 'bg-blue-100 text-blue-600' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {user.role === 'admin' ? 'Админ' : user.role === 'moderator' ? 'Модератор' : 'Участник'}
                    </span>
                    {user.status === 'banned' && <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full">Заблокирован</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">@{user.username} · {user.posts} постов · с {user.joined}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <select className="text-xs border border-border rounded-md px-2 py-1 bg-card focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="member">Участник</option>
                    <option value="moderator">Модератор</option>
                    <option value="admin">Админ</option>
                  </select>
                  <button className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
                    user.status === 'banned'
                      ? 'bg-green-50 text-green-600 hover:bg-green-100'
                      : 'hover:bg-red-50 text-muted-foreground hover:text-red-500'
                  }`}>
                    <Icon name={user.status === 'banned' ? 'UserCheck' : 'UserX'} size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Основные настройки</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1.5">Название форума</label>
                <input
                  value={forumName}
                  onChange={e => setForumName(e.target.value)}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Описание</label>
                <textarea
                  value={forumDesc}
                  onChange={e => setForumDesc(e.target.value)}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold">Доступ и модерация</h2>
            <div className="space-y-3">
              {[
                { label: 'Открытая регистрация', desc: 'Любой пользователь может зарегистрироваться', value: regOpen, set: setRegOpen },
                { label: 'Премодерация сообщений', desc: 'Новые сообщения проверяются перед публикацией', value: moderation, set: setModeration },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between gap-4 py-1">
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => s.set(!s.value)}
                    className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${s.value ? 'bg-primary' : 'bg-secondary'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.value ? 'left-5' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h2 className="font-semibold mb-4">Цветовая схема</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Синий', color: 'bg-blue-500', value: '217 91% 52%' },
                { label: 'Зелёный', color: 'bg-emerald-500', value: '160 84% 39%' },
                { label: 'Индиго', color: 'bg-indigo-500', value: '239 84% 67%' },
                { label: 'Розовый', color: 'bg-pink-500', value: '330 81% 60%' },
                { label: 'Оранжевый', color: 'bg-orange-500', value: '25 95% 53%' },
              ].map(scheme => (
                <button
                  key={scheme.label}
                  onClick={() => {
                    document.documentElement.style.setProperty('--primary', scheme.value);
                  }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className={`w-8 h-8 rounded-full ${scheme.color} ring-2 ring-offset-2 ring-transparent hover:ring-foreground/30 transition-all`} />
                  <span className="text-xs text-muted-foreground">{scheme.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            Сохранить настройки
          </button>
        </div>
      )}
    </div>
  );
}
