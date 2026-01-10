# FrontendFugito

 Arquitectura del Proyecto

  Resumen General
  ┌───────────┬────────────────────────────────────┐
  │           │                                    │
  ├───────────┼────────────────────────────────────┤
  │ Proyecto  │ frontendFugito (E-commerce)        │
  ├───────────┼────────────────────────────────────┤
  │ Framework │ Angular 21 con SSR                 │
  ├───────────┼────────────────────────────────────┤
  │ UI        │ Tailwind CSS + DaisyUI             │
  ├───────────┼────────────────────────────────────┤
  │ Patrón    │ Feature-based Modular Architecture │
  └───────────┴────────────────────────────────────┘
  ---
  Estructura de Carpetas

  src/app/
  ├── features/                    # Componentes reutilizables por dominio
  │   ├── general/
  │   │   └── breadcrumbs/
  │   └── products/
  │       ├── product-card/        # Componente presentacional
  │       ├── product-list/        # Componente contenedor
  │       ├── Service/             # Servicios del dominio
  │       └── product.model.ts     # Modelos de datos
  │
  └── pages/                       # Componentes de página (rutas)
      ├── products/
      ├── login/
      └── cart/

  ---
  Patrón Arquitectónico

  Container/Presentational Pattern:
  ProductService (HTTP/Data)
         ↓
  ProductList (Container - fetch, estado, lógica)
         ↓
  ProductCard (Presentational - @Input/@Output, solo UI)

  ---
  Características Clave
  ┌────────────────┬──────────────────────────────────────┐
  │ Característica │            Implementación            │
  ├────────────────┼──────────────────────────────────────┤
  │ Componentes    │ Standalone (sin NgModules)           │
  ├────────────────┼──────────────────────────────────────┤
  │ Routing        │ Lazy loading con loadComponent()     │
  ├────────────────┼──────────────────────────────────────┤
  │ Estado         │ Signals + RxJS Observables           │
  ├────────────────┼──────────────────────────────────────┤
  │ Control Flow   │ @if, @for (Angular 17+)              │
  ├────────────────┼──────────────────────────────────────┤
  │ SSR            │ Prerendering habilitado              │
  ├────────────────┼──────────────────────────────────────┤
  │ HTTP           │ HttpClient con servicios inyectables │
  └────────────────┴──────────────────────────────────────┘
  ---
  Configuración de Rutas

  routes = [
    { path: '', redirectTo: 'products' },
    { path: 'products', loadComponent: () => Products },  // Lazy
    { path: 'cart', loadComponent: () => Cart },          // Lazy
    { path: 'login', loadComponent: () => Login },        // Lazy
    { path: '**', redirectTo: 'products' }
  ]

  ---
  Flujo de Datos (Products)

  environment.apiBaseUrl → ProductService.getAll()
                                ↓
                          ProductList (subscribe)
                                ↓
                      loading / error / products[]
                                ↓
                        @for → ProductCard × n

  ---
  Áreas a Mejorar

  1. Autenticación - Login page es placeholder, falta AuthService/Guards
  2. Interceptores HTTP - Para tokens, manejo de errores global
  3. Caché - Sin estrategia de caching para HTTP
  4. Route Guards - No hay canActivate implementado
  5. Breadcrumbs - Componente existe pero no está conectado al router

  ---
  La arquitectura está bien estructurada para escalar. Sigue buenas prácticas de Angular moderno con standalone components, lazy loading, y separación clara entre features y pages.
