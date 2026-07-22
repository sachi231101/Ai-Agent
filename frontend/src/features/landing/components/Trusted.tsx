export function Trusted() {
  const brandLogos = [
    {
      name: 'Notion',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.414-.793c.28 0 .047-.28-.047-.326L15.66 1.83c-.42-.326-.98-.56-1.54-.42L3.106 3.09c-.42.093-.56.42-.42.7.233.373.933 1.026 1.773 1.418zm.793 4.293v12.414c0 .793.42 1.167 1.213 1.12l14.28-.933c.746-.047 1.026-.466 1.026-1.213V7.242c0-.653-.28-.98-.84-.933l-14.7.933c-.7.047-.98.373-.98 1.259zm14.047.886c.093.42.047.84-.326.886l-.606.093v9.847c-.513.28-.98.42-1.4.42-.653 0-.933-.233-1.446-.886l-5.18-8.12v7.747l1.493.326c.047.373-.187.793-.746.793l-3.92.233c-.093-.187.047-.653.373-.746l1.026-.28V9.387l-1.446-.14c-.047-.42.14-.84.606-.886l4.247-.28 5.413 8.307V9.06l-1.213-.187c-.047-.42.233-.793.746-.84l3.36-.233z"/>
        </svg>
      )
    },
    {
      name: 'Loom',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5a2.5 2.5 0 11-2.5-2.5 2.5 2.5 0 012.5 2.5zm0-5a2.5 2.5 0 11-2.5-2.5A2.5 2.5 0 0113 11.5zm3.5 2.5a2.5 2.5 0 11-2.5-2.5 2.5 2.5 0 012.5 2.5z"/>
        </svg>
      )
    },
    {
      name: 'CleverTap',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4a8 8 0 100 16 8 8 0 000-16zm-3 9a3 3 0 116 0 3 3 0 01-6 0z"/>
        </svg>
      )
    },
    {
      name: 'HubSpot',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.433 10.742a2.913 2.913 0 00-1.297.307L10.373 6.95a2.898 2.898 0 10-1.84.975l5.522 3.921a2.909 2.909 0 00-1.42 2.518c0 1.61 1.305 2.915 2.915 2.915a2.916 2.916 0 002.915-2.915 2.915 2.915 0 00-1.032-2.222z"/>
        </svg>
      )
    },
    {
      name: 'Calendly',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      )
    },
    {
      name: 'Perplexity',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.2L17.5 8 12 11.5 6.5 8 12 5.2z"/>
        </svg>
      )
    },
    {
      name: 'ramp',
      icon: (
        <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 18h16l-8-12L4 18z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="py-12 border-y border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-8">
          Trusted by builders at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          {brandLogos.map((brand) => (
            <div key={brand.name} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-extrabold text-base tracking-tight hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
              {brand.icon}
              <span>{brand.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
