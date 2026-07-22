import { Link } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { APP_NAME } from '@/app/config';
import { MessageSquare, Sparkles } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function Footer() {
  const sections = [
    {
      title: 'Product',
      links: [
        { name: 'Studio', href: '#features' },
        { name: 'Workflow Builder', href: '#features' },
        { name: 'Agents', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: 'Developer',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'GitHub SDK', href: '#' },
        { name: 'System Status', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Templates', href: '#templates' },
        { name: 'Marketplace', href: '#marketplace' },
        { name: 'Blog', href: '#' },
        { name: 'Community Forum', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Solutions', href: '#features' },
        { name: 'Data Privacy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Contact Support', href: '#' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        
        {/* Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link 
              to={ROUTES.HOME} 
              className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-90"
            >
              <Sparkles className="h-4.5 w-4.5 text-primary" />
              <span>{APP_NAME}</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              The next-generation visual workspace to design, orchestrate, and host autonomous agent models and pipelines.
            </p>
            <div className="flex gap-4 text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors"><GithubIcon className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><TwitterIcon className="h-4 w-4" /></a>
              <a href="#" className="hover:text-foreground transition-colors"><MessageSquare className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Nav columns */}
          {sections.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{col.title}</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-foreground transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {APP_NAME} Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Security Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
