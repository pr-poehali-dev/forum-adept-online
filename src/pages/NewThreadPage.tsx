import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { categories } from '@/data/mockData';

export default function NewThreadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Форум</Link>
        <Icon name="ChevronRight" size={14} />
        <span className="text-foreground font-medium">Новая тема</span>
      </div>

      <h1 className="text-2xl font-display font-semibold">Создать тему</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">Категория *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              className="w-full text-sm border border-border rounded-lg px-3 py-2.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Выберите категорию...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} disabled={cat.isPrivate}>
                  {cat.isPrivate ? '🔒 ' : ''}{cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Заголовок темы *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Кратко опишите суть вопроса или обсуждения"
              required
              className="w-full text-sm border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Содержимое *</label>
            <div className="border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30">
              <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-secondary/30">
                {['Bold', 'Italic', 'Underline', 'Link', 'Image', 'List'].map(tool => (
                  <button key={tool} type="button" className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors text-muted-foreground">
                    <Icon name={tool} size={13} />
                  </button>
                ))}
              </div>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Подробно опишите ваш вопрос или тему для обсуждения..."
                required
                className="w-full min-h-[200px] text-sm px-3 py-2.5 bg-background focus:outline-none resize-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5">Теги</label>
            <input
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="вопрос, помощь, обсуждение (через запятую)"
              className="w-full text-sm border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Опубликовать тему
          </button>
          <Link
            to="/"
            className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
