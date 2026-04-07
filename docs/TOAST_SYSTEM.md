# Sistema de Notificaciones (Toast)

## Componentes creados

**Context:** `lib/toast/context.tsx`
- `ToastProvider` — proveedor para toda la app
- `useToast()` — hook para usar toasts
- Tipos: `success`, `error`, `info`

**UI:** `components/ui/toast.tsx`
- `Toast` — componente individual
- `ToastContainer` — contenedor fijo bottom-right

## Uso en componentes

```tsx
import { useToast } from "@/lib/toast/context"

export function MyComponent() {
  const { addToast } = useToast()

  const handleClick = () => {
    addToast("¡Éxito!", "success", 3000) // 3 segundos
    addToast("Error inesperado", "error")
    addToast("Información importante", "info")
  }
}
```

## Parámetros

```typescript
addToast(message: string, type: "success" | "error" | "info", duration?: number)
```

- **message**: Texto a mostrar
- **type**: Tipo de notificación (determina color e icono)
- **duration**: Milisegundos antes de auto-cerrarse (default: 4000, 0 = permanente)

## Validación del formulario

El formulario de nuevos lanzamientos ahora valida:
- Nombre: requerido, mínimo 3 caracteres
- Tipo: requerido
- Precio: requerido, valor válido
- Audiencia: requerido, mínimo 10 caracteres

Los errores se muestran:
- Inline bajo cada campo
- Toast al presionar submit sin validar
- Toast de éxito al crear lanzamiento
- Toast de error si falla la API
