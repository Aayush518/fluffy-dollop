import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <ul className="flex items-center space-x-8">
          <li>
            <a 
              href="/" 
              className="text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="/resume" 
              className="text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              Resume
            </a>
          </li>
          {/* Add other navigation items */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;