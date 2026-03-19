import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { categories, threads } from '@/data/mockData';

export default function HomePage() {
  const recentThreads = [...threads].sort((a, b) => b.replies - a.replies).slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-semibold text-foreground">Форум</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Сообщество Adept Online</p>
        </div>
        <Link
          to="/new-thread"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Icon name="Plus" size={15} />
          Новая тема
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="bg-card border border-border rounded-xl p-5 hover-lift block"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${cat.color}`}>
                {cat.isPrivate ? '🔒' : cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold text-foreground">{cat.name}</h2>
                  {cat.isPrivate && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium">
                      Закрытый
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{cat.description}</p>
                {cat.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cat.subcategories.map(sub => (
                      <span key={sub.id} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md">
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 text-right">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span><span className="font-semibold text-foreground">{cat.threads}</span> тем</span>
                  <span><span className="font-semibold text-foreground">{cat.posts}</span> сообщений</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="text-foreground font-medium">{cat.lastPost.author}</span>
                  <span className="text-muted-foreground"> · {cat.lastPost.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate max-w-40">{cat.lastPost.title}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground shrink-0 mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Icon name="Flame" size={16} className="text-orange-500" />
            Активные обсуждения
          </h2>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {recentThreads.map((thread, i) => (
            <Link
              key={thread.id}
              to={`/thread/${thread.id}`}
              className="thread-row flex items-center gap-4 px-5 py-4 border-b border-border last:border-0"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                {thread.author.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {thread.isPinned && <Icon name="Pin" size={13} className="text-primary shrink-0" />}
                  <p className="text-sm font-medium text-foreground truncate">{thread.title}</p>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                  <span>{thread.author.name}</span>
                  <span>·</span>
                  <span>{thread.lastReply.time}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1">
                  <Icon name="MessageCircle" size={13} />
                  {thread.replies}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={13} />
                  {thread.views}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Участников', value: '1 248', icon: 'Users' },
          { label: 'Тем', value: '300+', icon: 'FileText' },
          { label: 'Сообщений', value: '3 182', icon: 'MessageSquare' },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl px-4 py-4 text-center">
            <Icon name={stat.icon} size={18} className="text-primary mx-auto mb-2" />
            <p className="text-xl font-display font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
