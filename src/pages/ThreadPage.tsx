import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { threads, posts, categories, currentUser } from '@/data/mockData';

export default function ThreadPage() {
  const { id } = useParams();
  const thread = threads.find(t => t.id === Number(id));
  const threadPosts = posts.filter(p => p.threadId === Number(id));
  const category = categories.find(c => c.id === thread?.categoryId);
  const [replyText, setReplyText] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([2]);

  if (!thread) return (
    <div className="text-center py-20 text-muted-foreground">Тема не найдена</div>
  );

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <Link to="/" className="hover:text-foreground">Форум</Link>
        <Icon name="ChevronRight" size={14} />
        {category && (
          <>
            <Link to={`/category/${category.id}`} className="hover:text-foreground">{category.name}</Link>
            <Icon name="ChevronRight" size={14} />
          </>
        )}
        <span className="text-foreground font-medium truncate">{thread.title}</span>
      </div>

      <div>
        <div className="flex items-start justify-between gap-4 mb-1">
          <h1 className="text-xl font-display font-semibold text-foreground leading-snug">{thread.title}</h1>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
          {thread.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-secondary rounded-md">{tag}</span>
          ))}
          <span>·</span>
          <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} /> {thread.replies} ответов</span>
          <span className="flex items-center gap-1"><Icon name="Eye" size={12} /> {thread.views} просмотров</span>
        </div>
      </div>

      <div className="space-y-4">
        {threadPosts.map((post, i) => (
          <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex gap-5 p-5">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                  {post.author.avatar}
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-foreground leading-tight">{post.author.name.split(' ')[0]}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    post.author.role === 'admin' ? 'bg-red-100 text-red-600' :
                    post.author.role === 'moderator' ? 'bg-blue-100 text-blue-600' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    {post.author.role === 'admin' ? 'Админ' : post.author.role === 'moderator' ? 'Модер' : 'Участник'}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">{post.author.posts} постов</p>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                      <Icon name="Quote" size={13} />
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                      <Icon name="Flag" size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      likedPosts.includes(post.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name="ThumbsUp" size={13} />
                    {post.likes + (likedPosts.includes(post.id) && !post.isLiked ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="MessageCircle" size={13} />
                    Ответить
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
            {currentUser.avatar}
          </div>
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Напишите ответ..."
              className="w-full min-h-[100px] text-sm border border-border rounded-lg px-3 py-2.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors text-muted-foreground">
                  <Icon name="Bold" size={13} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors text-muted-foreground">
                  <Icon name="Italic" size={13} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors text-muted-foreground">
                  <Icon name="Link" size={13} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-secondary transition-colors text-muted-foreground">
                  <Icon name="Image" size={13} />
                </button>
              </div>
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40"
                disabled={!replyText.trim()}
              >
                Отправить ответ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
