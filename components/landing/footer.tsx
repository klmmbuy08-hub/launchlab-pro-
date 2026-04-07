'use client'

import Link from 'next/link'
import { Terminal } from 'lucide-react'

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const Github = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

export function Footer() {
  const footerLinks = {
    producto: [
      { name: 'Agentes', href: '#agentes' },
      { name: 'Cómo funciona', href: '#como-funciona' },
      { name: 'Precios', href: '#precios' },
      { name: 'Roadmap', href: '#' },
    ],
    recursos: [
      { name: 'Documentación', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Casos de estudio', href: '#' },
      { name: 'API', href: '#' },
    ],
    empresa: [
      { name: 'Sobre nosotros', href: '#' },
      { name: 'Contacto', href: '#' },
      { name: 'Carreras', href: '#' },
    ],
    legal: [
      { name: 'Privacidad', href: '#' },
      { name: 'Términos', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  }

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-neutral-950" />
              </div>
              <span className="font-heading font-bold text-xl text-neutral-100">
                LaunchOS
              </span>
            </div>
            <p className="text-sm text-neutral-400 mb-6">
              Sistema Operativo de Lanzamientos con IA
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Twitter className="w-5 h-5 text-neutral-400" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Linkedin className="w-5 h-5 text-neutral-400" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <Github className="w-5 h-5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-neutral-100 mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © 2026 LaunchOS. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-neutral-400">
            <Link href="#" className="hover:text-neutral-100 transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-neutral-100 transition-colors">
              Términos
            </Link>
            <Link href="#" className="hover:text-neutral-100 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
