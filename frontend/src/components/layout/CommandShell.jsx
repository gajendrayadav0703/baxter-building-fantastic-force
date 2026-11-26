import Navbar from './Navbar';

/**
 * Main layout wrapper shared across all Nexus Command Center pages.
 * Includes a keyboard-accessible skip-to-content link.
 */
export default function CommandShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-nexus-void text-nexus-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-nexus-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-nexus-void focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
    </div>
  );
}
