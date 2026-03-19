import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { notifications, currentUser, messages } from '@/data/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMsgs = messages.filter(m => m.unread > 0).length;

  const navLinks = [
    { to: '/', label: 'Форум', icon: 'LayoutGrid' },
    { to: '/search', label: 'Поиск', icon: 'Search' },
    { to: '/messages', label: 'Сообщения', icon: 'MessageSquare', badge: unreadMsgs },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-display font-bold">A</span>
            </div>
            <span className="font-display font-semibold text-sm text-foreground hidden sm:block tracking-tight">
              Adept Online
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon name={link.icon} size={15} />
                {link.label}
                {link.badge ? (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
              >
                <Icon name="Bell" size={17} className="text-muted-foreground" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-10 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <span className="text-sm font-semibold">Уведомления</span>
                    <span className="text-xs text-muted-foreground">{unreadNotifs} новых</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`px-4 py-3 flex gap-3 items-start border-b border-border last:border-0 ${!n.read ? 'bg-primary/5' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        n.type === 'reply' ? 'bg-blue-100 text-blue-600' :
                        n.type === 'mention' ? 'bg-orange-100 text-orange-600' :
                        'bg-pink-100 text-pink-600'
                      }`}>
                        <Icon name={n.type === 'reply' ? 'MessageCircle' : n.type === 'mention' ? 'AtSign' : 'Heart'} size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-secondary transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                {currentUser.avatar}
              </div>
              <span className="text-sm font-medium hidden sm:block">{currentUser.name.split(' ')[0]}</span>
            </Link>

            {currentUser.role === 'admin' && (
              <Link
                to="/admin"
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                  location.pathname.startsWith('/admin') ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground'
                }`}
                title="Панель администратора"
              >
                <Icon name="Settings" size={17} />
              </Link>
            )}

            <button
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name="Menu" size={17} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-2 flex flex-col gap-1 animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
                {link.badge ? <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">{link.badge}</span> : null}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-border bg-card mt-8">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 Adept Online</span>
          <span>Форум сообщества</span>
        </div>
      </footer>
    </div>
  );
}