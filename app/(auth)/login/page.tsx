'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if there is already a session
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session) {
        router.push('/dashboard')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session) {
        router.push('/dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Evitar hydration mismatch renderizando solo en cliente
  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-100 mb-2">
          Bienvenido a LaunchOS
        </h1>
        <p className="text-neutral-400">
          Inicia sesión o crea una cuenta para continuar
        </p>
      </div>

      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#f97316', // Orange-500 (Primary logic)
                brandAccent: '#ea580c', // Orange-600
                brandButtonText: 'white',
                defaultButtonBackground: '#262626', // Neutral-800
                defaultButtonBackgroundHover: '#404040', // Neutral-700
                defaultButtonBorder: '#404040', // Neutral-700
                defaultButtonText: 'white',
                dividerBackground: '#404040', // Neutral-700
                inputBackground: 'transparent',
                inputBorder: '#404040', // Neutral-700
                inputBorderHover: '#737373', // Neutral-500
                inputBorderFocus: '#f97316',
                inputText: 'white',
                inputLabelText: '#a3a3a3', // Neutral-400
                inputPlaceholder: '#737373', // Neutral-500
                messageText: '#a3a3a3', // Neutral-400
                messageTextDanger: '#ef4444', // Red-500
                anchorTextColor: '#a3a3a3', // Neutral-400
                anchorTextHoverColor: 'white',
              },
              space: {
                spaceSmall: '4px',
                spaceMedium: '8px',
                spaceLarge: '16px',
                labelBottomMargin: '8px',
                anchorBottomMargin: '4px',
                emailInputSpacing: '4px',
                socialAuthSpacing: '4px',
                buttonPadding: '10px 15px',
                inputPadding: '10px 15px',
              },
              radii: {
                borderRadiusButton: '8px',
                buttonBorderRadius: '8px',
                inputBorderRadius: '8px',
              },
            },
          },
          className: {
            button: 'font-semibold',
            container: 'w-full',
            label: 'font-medium',
          }
        }}
        theme="dark"
        providers={['google']}
        redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Correo Electrónico',
              password_label: 'Contraseña',
              button_label: 'Iniciar sesión',
              loading_button_label: 'Iniciando sesión...',
              social_provider_text: 'Continuar con {{provider}}',
              link_text: '¿Ya tienes una cuenta? Inicia sesión',
            },
            sign_up: {
              email_label: 'Correo Electrónico',
              password_label: 'Contraseña',
              button_label: 'Registrarse',
              loading_button_label: 'Registrando...',
              social_provider_text: 'Registrarse con {{provider}}',
              link_text: '¿No tienes cuenta? Regístrate',
            },
            forgotten_password: {
              link_text: '¿Olvidaste tu contraseña?',
              button_label: 'Enviar instrucciones',
              loading_button_label: 'Enviando...',
              email_label: 'Correo Electrónico',
            },
          },
        }}
      />
    </div>
  )
}
