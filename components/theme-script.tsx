// This script prevents flash of wrong theme
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('ada-lab-theme') || 'system';
        var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.toggle('dark', isDark);
      } catch (e) {}
    })();
  `

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
