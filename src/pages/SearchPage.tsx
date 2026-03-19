import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { threads, categories } from '@/data/mockData';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'threads' | 'users'>('all');

  const results = query.length > 1
    ? threads.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.some(tag => tag.includes(query.toLowerCase()))
      )
    : [];

  const getCategoryName = (id: number) => categories.find(c => c.id === id)?.name ?? '';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-semibold mb-4">Поиск</h1>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по темам и сообщениям..."
            autoFocus
            className="w-full pl-12 pr-4 py-3.5 text-base bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          {(['all', 'threads', 'users'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {f === 'all' ? 'Все' : f === 'threads' ? 'Темы' : 'Пользователи'}
            </button>
          ))}
        </div>
      </div>

      {query.length > 1 ? (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            {results.length > 0 ? `Найдено: ${results.length} результатов` : 'Ничего не найдено'}
          </p>
          {results.length > 0 && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {results.map(thread => (
                <Link
                  key={thread.id}
                  to={`/thread/${thread.id}`}
                  className="thread-row flex items-start gap-4 px-5 py-4 border-b border-border last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {thread.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{thread.title}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap text-xs text-muted-foreground">
                      <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">{getCategoryName(thread.categoryId)}</span>
                      <span>· {thread.author.name} · {thread.lastReply.time}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {thread.tags.map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 border border-border rounded text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} /> {thread.replies}</span>
                    <span className="flex items-center gap-1"><Icon name="Eye" size={12} /> {thread.views}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Популярные темы</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {['обновление', 'баги', 'react', 'настройка', 'frontend', 'api', 'авторизация'].map(tag => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm hover:bg-secondary transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Категории</h2>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl hover-lift"
              >
                <span className="text-lg">{cat.isPrivate ? '🔒' : cat.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.threads} тем</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
