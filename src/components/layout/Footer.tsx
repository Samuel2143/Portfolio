import { GithubIcon, LinkedinIcon, XIcon } from '../ui/Icons';
import { personal } from '../../data/personal';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-xs font-mono">
          © {new Date().getFullYear()} Samuel. Built with intention.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={personal.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="X (Twitter)"
          >
            <XIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
