import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Freebitco.in | Бесплатный Биткоин Каждый Час — Самый Надежный Кран',
  description: 'Зарабатывай сатоши каждый час бесплатно и без вложений. Получай 50% реферальных комиссионных, участвуй в лотереях и умножай свой Bitcoin!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var originalFetch = window.fetch;
                  var currentFetch = originalFetch;
                  try {
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return currentFetch; },
                      set: function(val) { currentFetch = val; },
                      configurable: true,
                      enumerable: true
                    });
                  } catch (e1) {
                    try {
                      Object.defineProperty(Window.prototype, 'fetch', {
                        get: function() { return currentFetch; },
                        set: function(val) { currentFetch = val; },
                        configurable: true,
                        enumerable: true
                      });
                    } catch (e2) {
                      console.warn('Failed to define fetch on Window.prototype:', e2);
                    }
                  }
                } catch (err) {
                  console.warn('Failed to apply fetch getter/setter patch:', err);
                }
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-[#0a0b1e] text-[#d0d0e0] min-h-screen font-sans bg-grain antialiased selection:bg-[#f7971e] selection:text-[#0a0b1e]">
        {children}
      </body>
    </html>
  );
}
