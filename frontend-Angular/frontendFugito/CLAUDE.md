# CLAUDE.md - Memoria del Proyecto

## Resumen del Proyecto

**Nombre:** frontendFugito
**Tipo:** E-commerce Frontend
**Framework:** Angular 21 con SSR
**UI:** Tailwind CSS 4.x + DaisyUI 5.x
**Puerto API:** `http://localhost:882`
**Puerto Dev:** `http://localhost:4200`

---

## Arquitectura

### Patrón: Feature-based Modular Architecture

```
src/app/
├── features/           # Componentes reutilizables por dominio
│   ├── general/        # Features compartidas (breadcrumbs, etc.)
│   └── products/       # Feature de productos
│       ├── product-card/    # Presentational component
│       ├── product-list/    # Container component
│       ├── Service/         # Servicios del dominio
│       └── product.model.ts # Tipos/interfaces
│
└── pages/              # Componentes de página (rutas lazy-loaded)
    ├── products/
    ├── login/
    └── cart/
```

### Container/Presentational Pattern

- **Container** (`product-list`): Maneja estado, fetch de datos, lógica
- **Presentational** (`product-card`): Solo UI, recibe `@Input`, emite `@Output`

---

## Convenciones de Código

### Componentes

```typescript
// Siempre standalone, sin NgModules
@Component({
  selector: 'app-nombre',
  standalone: true,
  imports: [/* dependencias */],
  templateUrl: './nombre.html',
  styleUrl: './nombre.css'
})
export class NombreComponent { }
```

### Servicios

```typescript
// Siempre providedIn: 'root'
@Injectable({ providedIn: 'root' })
export class NombreService {
  private readonly baseUrl = `${environment.apiBaseUrl}/endpoint`;
  constructor(private http: HttpClient) {}
}
```

### Templates - Control Flow (Angular 17+)

```html
<!-- Usar @if/@for en lugar de *ngIf/*ngFor -->
@if (loading) {
  <div>Loading...</div>
}

@for (item of items; track item.id) {
  <app-item [data]="item" />
}
```

### Event Bindings

```html
<!-- Correcto -->
(click)="handleClick($event)"
(view)="handleView($event)"

<!-- Incorrecto -->
(click)="(handleClick)"
```

---

## Estructura de Archivos por Componente

```
nombre-componente/
├── nombre-componente.ts       # Clase del componente
├── nombre-componente.html     # Template
├── nombre-componente.css      # Estilos (Tailwind)
└── nombre-componente.spec.ts  # Tests (Vitest)
```

---

## Rutas

| Ruta | Componente | Estado |
|------|------------|--------|
| `/` | Redirect → `/products` | ✅ |
| `/products` | Products (lazy) | ✅ |
| `/cart` | Cart (lazy) | Placeholder |
| `/login` | Login (lazy) | Placeholder |
| `/**` | Redirect → `/products` | ✅ |

**Archivo:** `src/app/app.routes.ts`

---

## Comandos

```bash
npm start          # Dev server (localhost:4200)
npm run build      # Build producción
npm run watch      # Build con watch mode
npm test           # Ejecutar tests (Vitest)
npm run serve:ssr:frontendFugito  # Servir SSR build
```

---

## Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `src/app/app.ts` | Componente raíz |
| `src/app/app.routes.ts` | Configuración de rutas |
| `src/app/app.config.ts` | Providers (HttpClient, Router, SSR) |
| `src/app/app.html` | Layout principal (navbar, router-outlet, footer) |
| `environments/environment.ts` | Config desarrollo |
| `environments/environment.prod.ts` | Config producción |

---

## Modelo de Datos

### Product

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
```

---

## SSR/Prerendering

- **Habilitado:** Sí
- **Modo:** `RenderMode.Prerender` para todas las rutas
- **Server:** Express en `src/server.ts`
- **Hydration:** `withEventReplay()` habilitado

---

## Styling

### Tailwind + DaisyUI

```html
<!-- Componentes DaisyUI disponibles -->
<button class="btn btn-primary">Botón</button>
<div class="card">Card</div>
<div class="alert alert-error">Error</div>
<span class="loading loading-spinner">Loading</span>
<div class="navbar">Navbar</div>
<div class="dropdown">Dropdown</div>
```

### Grid de Productos

```html
<div class="grid grid-cols-4 gap-4">
  <!-- ProductCards -->
</div>
```

---

## Estado Actual del Proyecto

### Implementado
- [x] Estructura base del proyecto
- [x] Routing con lazy loading
- [x] SSR/Prerendering
- [x] ProductService (getAll, getById)
- [x] ProductList + ProductCard
- [x] Navbar con navegación
- [x] Manejo de loading/error states
- [x] Docker + nginx config

### Pendiente
- [ ] Autenticación (AuthService, AuthGuard)
- [ ] Carrito de compras funcional
- [ ] Login funcional
- [ ] HTTP Interceptors (tokens, errores)
- [ ] Breadcrumbs conectado al router
- [ ] Caché de HTTP requests
- [ ] Tests completos

---

## API Endpoints

**Base URL:** `environment.apiBaseUrl` (`http://localhost:882`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Lista todos los productos |
| GET | `/products/:id` | Obtiene producto por ID |

---

## Dependencias Principales

```json
{
  "@angular/core": "^21.0.0",
  "@angular/router": "^21.0.0",
  "@angular/ssr": "^21.0.4",
  "tailwindcss": "^4.1.18",
  "daisyui": "^5.5.14",
  "rxjs": "~7.8.0"
}
```

---

## Notas para Desarrollo

1. **Nuevos componentes:** Crear en `features/[dominio]/` si es reutilizable, en `pages/` si es página
2. **Nuevos servicios:** Crear en `features/[dominio]/Service/`
3. **Modelos:** Definir en `features/[dominio]/[dominio].model.ts`
4. **Imports:** Usar CommonModule solo si necesitas pipes, de lo contrario no es necesario con el nuevo control flow
5. **Estado:** Preferir Signals para estado local, RxJS para datos async
6. **Build errors SSR:** Si el API no está corriendo, el prerender fallará pero el build continúa
