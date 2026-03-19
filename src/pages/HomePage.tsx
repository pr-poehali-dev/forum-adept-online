import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/mockData';

export default function HomePage() {
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
              <Icon name="ChevronRight" size={16} className="text-muted-foreground shrink-0 mt-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}