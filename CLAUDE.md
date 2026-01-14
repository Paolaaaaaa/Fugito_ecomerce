# CLAUDE.md - Arquitectura del Sistema Fugito

## Resumen Ejecutivo

**Fugito** es un proyecto de **e-commerce basado en arquitectura de microservicios** desarrollado con **.NET 8** (backend) y **Angular 21** (frontend). Implementa patrones empresariales como **Event-Driven Architecture**, **persistencia poliglota** y **comunicación asíncrona con Apache Kafka**.

---

## Big Picture - Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Angular 21)                        │
│                         Puerto: 4200 (Dev) / 80 (Prod)               │
│           Features: Products | Cart | Auth (Login/Register)         │
└─────────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │   Proxy Routing   │
                    │ (proxy.conf.json) │
                    └─────────┬─────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
   ┌──────────────┐   ┌────────────────┐   ┌──────────────┐
   │ Auth Service │   │ Product Service│   │ Cart Service │
   │  Port: 5001  │   │  Port: 5002    │   │  Port: 5003  │
   └──────┬───────┘   └───────┬────────┘   └──────┬───────┘
          │                   │                   │
          │           (Kafka Producer)            │
          │                   │                   │
          │                   ▼                   │
          │         ┌────────────────────┐        │
          │         │   Apache Kafka     │        │
          │         │   Port: 9092       │        │
          │         │   SASL/SSL         │        │
          │         └────────┬───────────┘        │
          │                  │                    │
          │                  ▼                    │
          │         ┌────────────────┐            │
          │         │ Stock Service  │            │
          │         │  Port: 5004    │            │
          │         │ (Kafka Consumer)│            │
          │         └───────┬────────┘            │
          │                 │                     │
          ▼                 ▼                     ▼
   ┌──────────┐      ┌──────────┐          ┌──────────┐
   │PostgreSQL│      │PostgreSQL│          │PostgreSQL│
   │fugito_db │      │ stockdb  │          │ cartdb   │
   │ (Users)  │      │ (Stock)  │          │ (Carts)  │
   └──────────┘      └──────────┘          └──────────┘
                                                 │
                                           ┌──────────┐
                                           │ MongoDB  │
                                           │ECommerceDb│
                                           │(Products)│
                                           └──────────┘
```

---

## Estructura del Proyecto

```
Fugito/
├── Back-end/
│   ├── AuthService/        # Servicio de autenticación
│   ├── ProductService/     # Servicio de productos
│   ├── CartService/        # Servicio de carrito
│   ├── StockService/       # Servicio de inventario
│   ├── certs/              # Certificados TLS para Kafka
│   ├── Postman/            # Colecciones de prueba
│   ├── docker-compose.yml  # Orquestación de servicios
│   ├── kafka_jaas.conf     # Configuración SASL Kafka
│   └── Fugito.sln          # Solución .NET
│
├── frontend-Angular/
│   └── frontendFugito/     # Aplicación Angular 21
│       ├── src/app/
│       │   ├── core/       # Servicios singleton
│       │   ├── features/   # Componentes por dominio
│       │   └── pages/      # Rutas lazy-loaded
│       ├── environments/   # Configuración por entorno
│       └── proxy.conf.json # Proxy a microservicios
│
└── CLAUDE.md               # Este archivo
```

---

## Backend - Microservicios (.NET 8)

### Resumen de Servicios

| Servicio | Puerto | Base de Datos | Responsabilidad |
|----------|--------|---------------|-----------------|
| **AuthService** | 5001 | PostgreSQL (fugito_db) | Registro, Login, JWT tokens |
| **ProductService** | 5002 | MongoDB (ECommerceDb) | CRUD productos, Kafka producer |
| **CartService** | 5003 | PostgreSQL (cartdb) | Gestión de carritos |
| **StockService** | 5004 | PostgreSQL (stockdb) | Inventario, Kafka consumer |

### Estructura de cada Microservicio

```
[ServiceName]/
├── appsettings.json              # Configuración
├── appsettings.Development.json  # Configuración dev
├── Program.cs                    # Bootstrap y DI
├── Dockerfile                    # Contenerización
├── [ServiceName].csproj          # Definición del proyecto
├── Controller/                   # Endpoints HTTP
├── Model/                        # Entidades de BD
├── DTOs/                         # Data Transfer Objects
├── Services/                     # Lógica de negocio
└── Migrations/                   # EF Core migrations (si aplica)
```

---

### AuthService (Puerto 5001)

**Base de Datos:** PostgreSQL (fugito_db)

#### Endpoints
```
POST /api/v1/auth/register   # Registrar usuario
POST /api/v1/auth/login      # Iniciar sesión
```

#### Modelo de Datos
```csharp
User {
  Id: Guid (PK)
  Email: string (unique, indexed)
  PasswordHash: string (BCrypt)
  Role: string ("Customer" | "Admin")
  CreatedAt: DateTime
}
```

#### DTOs
```typescript
RegisterDTO { email, password, role }
LoginDTO { email, password }
AuthResponseDTO { token, id, email, role }
```

#### Seguridad
- Contraseñas hasheadas con BCrypt
- JWT con 3 horas de expiración
- Claims: UserId, Email, Role

---

### ProductService (Puerto 5002)

**Base de Datos:** MongoDB (ECommerceDb.Products)

#### Endpoints
```
GET    /api/v1/product          # Listar todos (público)
GET    /api/v1/product/{id}     # Obtener por ID (público)
POST   /api/v1/product          # Crear [ADMIN]
PUT    /api/v1/product/{id}     # Actualizar [ADMIN]
DELETE /api/v1/product/{id}     # Eliminar [ADMIN]
```

#### Modelo de Datos
```csharp
Product {
  Id: Guid
  Name: string
  Description: string
  Price: int
  Image: string (URL)
  CreatedAt: DateTime
}
```

#### Kafka Integration
- **Producer:** Publica eventos cuando se crea un producto
- **Topic:** `ecomerce.product.created.v1`
- **Estado:** Estructura lista, pendiente de activar

---

### CartService (Puerto 5003)

**Base de Datos:** PostgreSQL (cartdb)

#### Endpoints
```
POST   /api/v1/cart              # Crear carrito
GET    /api/v1/cart/{id}         # Obtener carrito por ID
GET    /api/v1/cart/user/{userId}# Obtener carrito por usuario
GET    /api/v1/cart              # Listar todos los carritos
```

#### Modelo de Datos
```csharp
Cart {
  Id: Guid (PK)
  UserId: Guid
  CreatedAt: DateTime
  UpdatedAt: DateTime
  CartItems: List<ItemCart>  // Relación 1:N
}

ItemCart {
  Id: Guid (PK)
  CartId: Guid (FK)
  ProductId: Guid
  Quantity: int (1-MaxValue)
}
```

#### Comunicación Inter-Servicios
- HTTP Client a ProductService para validar productos

---

### StockService (Puerto 5004)

**Base de Datos:** PostgreSQL (stockdb)

#### Endpoints
```
GET    /api/v1/stock                                    # Listar stocks
GET    /api/v1/stock/product/{id}                       # Stock por producto
GET    /api/v1/stock/product/{idProduct}/location/{loc} # Stock específico
POST   /api/v1/stock                                    # Agregar stock
PUT    /api/v1/stock                                    # Actualizar stock
```

#### Modelo de Datos
```csharp
Stock {
  ProductId: Guid (Composite PK)
  StorageLocation: string (Composite PK)
  Quantity: int
}
```

#### Kafka Integration
- **Consumer:** Escucha eventos de producto creado
- **Topic:** `ecomerce.product.created.v1`
- **Grupo:** `stock-service`

---

### Stack Tecnológico Backend

```
.NET 8 / C#
├── ASP.NET Core Web API
├── Entity Framework Core 9.0.7
│   └── Npgsql.EntityFrameworkCore.PostgreSQL
├── MongoDB.Driver 3.4.2
├── Confluent.Kafka 2.11-2.13
├── Microsoft.AspNetCore.Authentication.JwtBearer
├── BCrypt.Net
├── Swagger/OpenAPI
└── Dependency Injection (built-in)
```

---

## Frontend - Angular 21

**Ubicación:** `/frontend-Angular/frontendFugito`
**Puerto:** 4200 (dev) / 80 (prod con nginx)

### Arquitectura Feature-based

```
src/app/
├── app.ts                    # Componente raíz
├── app.routes.ts             # Configuración de rutas
├── app.config.ts             # Providers (HTTP, Router, SSR)
├── app.html                  # Layout principal
│
├── core/                     # Servicios singleton
│   └── services/
│       └── auth.service.ts   # Manejo de token JWT
│
├── features/                 # Componentes por dominio
│   ├── AppShell/             # Navbar + Footer
│   ├── products/             # Product list + card
│   ├── auth/                 # Login + Register forms
│   ├── cart/                 # Carrito de compras
│   └── general/              # Componentes compartidos
│
└── pages/                    # Rutas lazy-loaded
    ├── products/
    ├── login/
    ├── cart/
    └── registration/
```

### Rutas

| Ruta | Componente | Estado |
|------|------------|--------|
| `/` | Redirect → `/app/products` | Implementado |
| `/app/products` | Products | Implementado |
| `/app/cart` | Cart | Estructura lista |
| `/auth/login` | Login | Estructura lista |
| `/auth/registration` | Registration | Implementado |

### Proxy Configuration

**Archivo:** `proxy.conf.json`
```json
{
  "/api/v1/auth":    { "target": "http://localhost:5001" },
  "/api/v1/product": { "target": "http://localhost:5002" },
  "/api/v1/cart":    { "target": "http://localhost:5003" }
}
```

### Stack Frontend

```
Angular 21.0.8
├── @angular/core, router, forms, http
├── @angular/ssr (Server-Side Rendering)
├── RxJS 7.8
├── Tailwind CSS 4.1.18
├── DaisyUI 5.5.14
└── TypeScript 5.9
```

### Convenciones de Código

```typescript
// Componentes: Siempre standalone
@Component({
  standalone: true,
  imports: [/* dependencias */],
  templateUrl: './nombre.html'
})
export class NombreComponent { }

// Servicios: Siempre providedIn root
@Injectable({ providedIn: 'root' })
export class NombreService { }

// Templates: Control flow moderno
@if (loading) { <spinner /> }
@for (item of items; track item.id) { <card [data]="item" /> }
```

---

## Infraestructura

### Docker Compose

**Archivo:** `/Back-end/docker-compose.yml`

```yaml
Services:
├── kafka          # Confluent CP-Kafka 7.6.1 (Puerto 9092)
├── kafka-ui       # Monitor Kafka (Puerto 8080)
├── postgres       # PostgreSQL (Puerto 5432)
├── mongo          # MongoDB (Puerto 27017)
├── auth-service   # Puerto 5001
├── product-service # Puerto 5002
├── cart-service   # Puerto 5003
└── stock-service  # Puerto 5004

Network: fugito-net (bridge)
Volumes: postgres_data, mongo_data, kafka_data
```

### Bases de Datos

| Servicio | Tipo | Database | Uso |
|----------|------|----------|-----|
| AuthService | PostgreSQL | fugito_db | Usuarios |
| CartService | PostgreSQL | cartdb | Carritos |
| StockService | PostgreSQL | stockdb | Inventario |
| ProductService | MongoDB | ECommerceDb | Productos |

### Kafka Configuration

**Seguridad:** SASL/PLAIN + SSL

**Usuarios (kafka_jaas.conf):**
```
admin: admin-secret (superusuario)
stock_service: stock-user-secret (consumer)
product_service: product-user-secret (producer)
```

**Topics:**
```
ecomerce.product.created.v1 (partitions: 3)
```

**Certificados:** `/Back-end/certs/`
- ca.crt, ca.key
- kafka.crt, kafka.csr
- kafka.keystore.jks, kafka.truststore.jks

---

## Flujos de Comunicación

### 1. Registro de Usuario
```
Frontend (RegisterForm)
    → POST /api/v1/auth/register
    → Proxy → AuthService
        → Valida email único
        → Hash password (BCrypt)
        → Crea User en PostgreSQL
        → Genera JWT (3h)
    ← AuthResponseDTO { token, id, email, role }
```

### 2. Obtener Productos
```
Frontend (ProductList)
    → GET /api/v1/product
    → Proxy → ProductService
        → MongoDB Query
    ← List<Product>
```

### 3. Evento de Producto Creado (Kafka)
```
ProductService
    → Crea producto en MongoDB
    → Publica a Kafka: ecomerce.product.created.v1

Kafka Broker
    → Topic: ecomerce.product.created.v1

StockService (Consumer)
    → Recibe evento
    → Crea registro de stock inicial
```

---

## Seguridad

### Autenticación JWT
```
Header: Authorization: Bearer <token>
Claims: sub (UserId), email, role, exp (3h)
Issuer: Auth-Service
Audience: ecomerce
```

### Autorización por Roles
```csharp
[Authorize(Roles = "ADMIN")]  // Solo admin
[Authorize]                    // Usuario autenticado
```

### Kafka SASL/SSL
- Autenticación por usuario/contraseña
- Comunicación encriptada con TLS
- ACLs por topic y operación

---

## Comandos de Desarrollo

### Backend
```bash
cd Back-end/
docker-compose up -d           # Levantar infraestructura
docker-compose logs -f [svc]   # Ver logs de un servicio
docker-compose down            # Detener todo
```

### Frontend
```bash
cd frontend-Angular/frontendFugito/
npm install                    # Instalar dependencias
npm start                      # Dev server (localhost:4200)
npm run build                  # Build producción
npm test                       # Ejecutar tests
```

### Kafka (dentro del contenedor)
```bash
docker exec -it kafka sh

# Crear topic
kafka-topics.sh --bootstrap-server kafka:9092 \
  --create --topic ecomerce.product.created.v1 \
  --partitions 3 --replication-factor 1

# Listar topics
kafka-topics.sh --bootstrap-server kafka:9092 --list
```

---

## Estado del Proyecto

### Implementado
- [x] AuthService completo (Register/Login + JWT)
- [x] ProductService CRUD completo
- [x] CartService estructura básica
- [x] StockService estructura básica
- [x] Docker Compose con toda la infraestructura
- [x] Kafka configurado con SASL/SSL
- [x] Frontend Angular con SSR
- [x] Product List + Product Card
- [x] Register Form con validación
- [x] Proxy routing configurado

### Pendiente
- [ ] Activar Kafka producer en ProductService
- [ ] Completar Kafka consumer en StockService
- [ ] HTTP Interceptor para JWT en frontend
- [ ] Guards de rutas autenticadas
- [ ] Carrito funcional completo
- [ ] Tests unitarios e integración
- [ ] CI/CD pipeline
- [ ] Logging centralizado
- [ ] Monitoring (Prometheus/Grafana)

---

## Patrones de Arquitectura Utilizados

1. **Microservicios:** Servicios independientes con BD propia
2. **Event-Driven:** Kafka para comunicación asíncrona
3. **Persistencia Poliglota:** PostgreSQL + MongoDB según necesidad
4. **Repository Pattern:** Abstracción de acceso a datos
5. **DTO Pattern:** Desacoplamiento request/response de modelos
6. **Container/Presentational:** Separación de lógica y UI en Angular
7. **Feature-based Modules:** Organización por dominio en frontend

---

## Referencias Rápidas

### Puertos
| Servicio | Puerto |
|----------|--------|
| Frontend (dev) | 4200 |
| AuthService | 5001 |
| ProductService | 5002 |
| CartService | 5003 |
| StockService | 5004 |
| PostgreSQL | 5432 |
| MongoDB | 27017 |
| Kafka | 9092 |
| Kafka UI | 8080 |

### Archivos Clave
| Archivo | Propósito |
|---------|-----------|
| `Back-end/docker-compose.yml` | Orquestación de servicios |
| `Back-end/kafka_jaas.conf` | Usuarios Kafka |
| `frontend-Angular/frontendFugito/proxy.conf.json` | Proxy a microservicios |
| `frontend-Angular/frontendFugito/environments/` | Configuración por entorno |