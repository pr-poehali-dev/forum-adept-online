import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { categories, threads } from '@/data/mockData';

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === Number(id));
  const catThreads = threads.filter(t => t.categoryId === Number(id));

  if (!category) return (
    <div className="text-center py-20 text-muted-foreground">Категория не найдена</div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Форум</Link>
        <Icon name="ChevronRight" size={14} />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${category.color}`}>
            {category.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-display font-semibold">{category.name}</h1>
              {category.isPrivate && (
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full font-medium">
                  Закрытый
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
          </div>
        </div>
        <Link
          to="/new-thread"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Icon name="Plus" size={15} />
          Новая тема
        </Link>
      </div>

      {category.subcategories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {category.subcategories.map(sub => (
            <div key={sub.id} className={`flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-lg text-sm ${sub.isPrivate ? 'opacity-70' : ''}`}>
              {sub.isPrivate && <Icon name="Lock" size={13} className="text-muted-foreground" />}
              <span className="font-medium">{sub.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{sub.threads}</span>
            </div>
          ))}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-secondary/30 flex items-center justify-between">
          <span className="text-sm font-medium">Темы</span>
          <span className="text-xs text-muted-foreground">{catThreads.length} из {category.threads}</span>
        </div>
        {catThreads.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            <Icon name="MessageSquare" size={32} className="mx-auto mb-3 opacity-30" />
            Тем пока нет. Начните обсуждение!
          </div>
        ) : (
          catThreads.map(thread => (
            <Link
              key={thread.id}
              to={`/thread/${thread.id}`}
              className="thread-row flex items-center gap-4 px-5 py-4 border-b border-border last:border-0"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
                {thread.author.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {thread.isPinned && (
                    <span className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Icon name="Pin" size={11} /> Закреплено
                    </span>
                  )}
                  <p className="text-sm font-medium text-foreground">{thread.title}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {thread.tags.map(tag => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-secondary rounded text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground">· {thread.author.name} · {thread.lastReply.time}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 text-xs text-muted-foreground shrink-0">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} /> {thread.replies}</span>
                  <span className="flex items-center gap-1"><Icon name="Eye" size={12} /> {thread.views}</span>
                </div>
                <span>Посл.: {thread.lastReply.author}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
