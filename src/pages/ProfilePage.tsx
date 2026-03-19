import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { currentUser, threads } from '@/data/mockData';

export default function ProfilePage() {
  const userThreads = threads.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="px-6 pb-6 -mt-8">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-xl font-display font-bold flex items-center justify-center border-4 border-card shadow-md">
              {currentUser.avatar}
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Icon name="Edit3" size={13} />
              Редактировать
            </button>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-display font-semibold">{currentUser.name}</h1>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                  Администратор
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Calendar" size={11} />
                  С января 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Сообщений', value: currentUser.posts, icon: 'MessageSquare' },
          { label: 'Репутация', value: currentUser.reputation, icon: 'Star' },
          { label: 'Тем создано', value: 28, icon: 'FileText' },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl px-4 py-4 text-center">
            <Icon name={stat.icon} size={18} className="text-primary mx-auto mb-2" />
            <p className="text-xl font-display font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="font-semibold text-sm">Последние темы</h2>
        </div>
        {userThreads.map(thread => (
          <Link
            key={thread.id}
            to={`/thread/${thread.id}`}
            className="thread-row flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0"
          >
            <Icon name="FileText" size={14} className="text-muted-foreground shrink-0" />
            <p className="text-sm flex-1 truncate">{thread.title}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
              <span className="flex items-center gap-1"><Icon name="MessageCircle" size={11} /> {thread.replies}</span>
              <span>{thread.lastReply.time}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-semibold text-sm mb-4">Настройки профиля</h2>
        <div className="space-y-3">
          {[
            { label: 'Email уведомления', desc: 'Получать уведомления на почту', checked: true },
            { label: 'Уведомления об ответах', desc: 'Когда кто-то отвечает на ваши темы', checked: true },
            { label: 'Упоминания', desc: 'Когда вас упоминают в постах', checked: true },
          ].map(setting => (
            <div key={setting.label} className="flex items-center justify-between gap-4 py-2">
              <div>
                <p className="text-sm font-medium">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.desc}</p>
              </div>
              <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${setting.checked ? 'bg-primary' : 'bg-secondary'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${setting.checked ? 'left-5' : 'left-1'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
