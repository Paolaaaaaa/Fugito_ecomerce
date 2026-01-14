# Etapas de Desarrollo - Proyecto Fugito

## Objetivo
Completar el proyecto para usar como portfolio y preparación para primer empleo como desarrollador.

---

## Resumen de Tiempos

| Fase | Descripción | Tiempo Estimado |
|------|-------------|-----------------|
| Fase 0 | Arreglar errores actuales | 2-4 horas |
| Fase 1 | Funcionalidad core | 1-2 semanas |
| Fase 2 | Kafka (diferenciador) | 1-2 semanas |
| Fase 3 | Features profesionales | 1 semana |
| Fase 4 | Preparación entrevistas | Continuo |

**Total estimado:** 4-6 semanas (trabajando 2-3 horas/día)

---

## Fase 0: Arreglar Errores Actuales

**Tiempo estimado:** 2-4 horas

**Prioridad:** ALTA - No puedes mostrar algo roto en una entrevista.

### Tareas

| # | Tarea | Tiempo | Estado |
|---|-------|--------|--------|
| 0.1 | Crear base de datos `cartdb` en PostgreSQL | 15 min | [x] |
| 0.2 | Crear base de datos `stockdb` en PostgreSQL | 15 min | [x] |
| 0.3 | Ejecutar migraciones de CartService | 30 min | [x] |
| 0.4 | Ejecutar migraciones de StockService | 30 min | [x] |
| 0.5 | Arreglar configuración de Kafka (SASL_PLAINTEXT) | 1-2 horas | [x] |
| 0.6 | Verificar todos los servicios funcionando | 30 min | [x] |

### Criterio de éxito
- [x] `docker compose up -d` levanta todos los servicios sin errores
- [x] Todos los endpoints responden correctamente
- [x] Kafka UI muestra el broker conectado

---

## Fase 1: Completar Funcionalidad Core

**Tiempo estimado:** 1-2 semanas (10-20 horas)

**Objetivo:** Tener un e-commerce funcional end-to-end.

### Tareas

| # | Tarea | Tiempo | Habilidad que demuestra | Estado |
|---|-------|--------|------------------------|--------|
| 1.1 | Login funcional - Conectar formulario con AuthService | 2-3 h | Integración API | [x] |
| 1.2 | Guardar token en localStorage/memory | 1 h | Manejo de estado | [x] |
| 1.3 | HTTP Interceptor - Agregar JWT a requests | 2-3 h | Patrones Angular | [ ] |
| 1.4 | Guards de rutas - Proteger /cart | 1-2 h | Autorización frontend | [ ] |
| 1.5 | Carrito: Agregar productos | 3-4 h | CRUD, relaciones BD | [ ] |
| 1.6 | Carrito: Listar items del carrito | 2-3 h | Queries, joins | [ ] |
| 1.7 | Carrito: Modificar cantidad | 2 h | Updates parciales | [ ] |
| 1.8 | Carrito: Eliminar items | 1-2 h | DELETE operations | [ ] |
| 1.9 | Manejo de errores global - Toast/alertas | 2-3 h | UX, error handling | [ ] |
| 1.10 | Navbar: Mostrar usuario logueado | 1 h | Estado global | [ ] |

### Criterio de éxito
- [ ] Usuario puede registrarse y hacer login
- [ ] Usuario puede agregar productos al carrito
- [ ] Usuario puede ver y modificar su carrito
- [ ] Rutas protegidas redirigen a login si no hay sesión

---

## Fase 2: Kafka - Tu Diferenciador

**Tiempo estimado:** 1-2 semanas (10-15 horas)

**Por qué importa:** Pocos desarrolladores junior conocen event-driven architecture. Esto te distingue significativamente de otros candidatos.

### Conceptos a aprender primero (2-3 horas de estudio)

- [ ] Qué es Apache Kafka y para qué sirve
- [ ] Producer vs Consumer
- [ ] Topics, Partitions, Consumer Groups
- [ ] Consistencia eventual vs inmediata

### Tareas

| # | Tarea | Tiempo | Concepto | Estado |
|---|-------|--------|----------|--------|
| 2.1 | Estudiar código existente de Kafka en el proyecto | 1-2 h | Comprensión | [ ] |
| 2.2 | Activar Kafka Producer en ProductService | 2-3 h | Publicación eventos | [ ] |
| 2.3 | Completar Kafka Consumer en StockService | 2-3 h | Consumo eventos | [ ] |
| 2.4 | Crear stock automático al crear producto | 2-3 h | Event workflow | [ ] |
| 2.5 | Nuevo evento: "ProductPurchased" | 2-3 h | Diseño de eventos | [ ] |
| 2.6 | Decrementar stock al comprar | 2-3 h | Consistencia eventual | [ ] |
| 2.7 | Probar flujo completo con Kafka UI | 1 h | Debugging | [ ] |

### Flujo a implementar

```
┌─────────────────┐     Kafka Topic:           ┌─────────────────┐
│ ProductService  │ ──── product.created ────► │  StockService   │
│ (Producer)      │                            │  (Consumer)     │
└─────────────────┘                            └─────────────────┘
        │                                              │
        │ POST /product                                │ Crea stock
        │ {name, price}                                │ inicial = 0
        ▼                                              ▼

┌─────────────────┐     Kafka Topic:           ┌─────────────────┐
│  CartService    │ ──── product.purchased ──► │  StockService   │
│ (Producer)      │                            │  (Consumer)     │
└─────────────────┘                            └─────────────────┘
        │                                              │
        │ POST /checkout                               │ Decrementa
        │ {cartId}                                     │ stock
        ▼                                              ▼
```

### Criterio de éxito
- [ ] Al crear producto, automáticamente se crea registro de stock
- [ ] Al "comprar", el stock se decrementa
- [ ] Puedes ver los mensajes en Kafka UI
- [ ] Puedes explicar el flujo en una entrevista

---

## Fase 3: Features Profesionales

**Tiempo estimado:** 1 semana (8-12 horas)

**Objetivo:** Demostrar prácticas profesionales que usan equipos reales.

### Tareas

| # | Tarea | Tiempo | Por qué impresiona | Estado |
|---|-------|--------|-------------------|--------|
| 3.1 | Tests unitarios backend (xUnit) - 3-5 tests | 3-4 h | Calidad de código | [ ] |
| 3.2 | Tests unitarios frontend (Vitest) - 3-5 tests | 3-4 h | Testing frontend | [ ] |
| 3.3 | Documentar API con Swagger (comentarios XML) | 1-2 h | Comunicación técnica | [ ] |
| 3.4 | Health checks en cada microservicio | 1-2 h | Producción-ready | [ ] |
| 3.5 | GitHub Actions - CI básico (build + test) | 2-3 h | DevOps, automatización | [ ] |
| 3.6 | README.md profesional con screenshots | 1-2 h | Presentación | [ ] |

### Criterio de éxito
- [ ] Tests pasan en local y en CI
- [ ] Swagger muestra documentación clara
- [ ] README explica cómo ejecutar el proyecto
- [ ] GitHub muestra badge verde de CI

---

## Fase 4: Preparación para Entrevistas

**Tiempo:** Continuo (mientras desarrollas)

### Conceptos Backend que debes poder explicar

| Concepto | Pregunta típica |
|----------|-----------------|
| Microservicios | ¿Por qué separar en servicios? ¿Cuándo no hacerlo? |
| HTTP vs Kafka | ¿Cuándo usar comunicación síncrona vs asíncrona? |
| JWT | ¿Cómo funciona? ¿Dónde se guarda? ¿Qué contiene? |
| PostgreSQL vs MongoDB | ¿Por qué usaste cada uno? |
| Entity Framework | ¿Qué es Code-First? ¿Qué son las migraciones? |
| Docker | ¿Qué es un contenedor? ¿Diferencia con VM? |
| CORS | ¿Qué es y por qué existe? |

### Conceptos Kafka que debes poder explicar

| Concepto | Pregunta típica |
|----------|-----------------|
| Producer/Consumer | ¿Qué hace cada uno? |
| Topic | ¿Qué es? ¿Cómo se organiza? |
| Particiones | ¿Para qué sirven? |
| Consumer Group | ¿Cómo funciona el balanceo? |
| Consistencia eventual | ¿Qué pasa si falla el consumer? |
| Idempotencia | ¿Cómo manejas mensajes duplicados? |

### Conceptos Frontend que debes poder explicar

| Concepto | Pregunta típica |
|----------|-----------------|
| Standalone components | ¿Diferencia con NgModules? |
| Lazy loading | ¿Por qué es importante? |
| Interceptors | ¿Para qué los usaste? |
| Guards | ¿Cómo proteges rutas? |
| RxJS/Observables | ¿Qué es? ¿Cuándo usar subscribe? |
| Signals | ¿Qué son? ¿Diferencia con Observables? |

### Recursos recomendados

- **Kafka:** [Confluent Developer Tutorials](https://developer.confluent.io/)
- **Angular:** [Angular.dev](https://angular.dev/)
- **.NET:** [Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/)
- **System Design:** [ByteByteGo YouTube](https://www.youtube.com/@ByteByteGo)

---

## Calendario Sugerido

### Semana 1
- [x] Fase 0 completa (día 1-2)
- [ ] Fase 1: Tasks 1.1-1.4 (auth completo)

### Semana 2
- [ ] Fase 1: Tasks 1.5-1.10 (carrito completo)

### Semana 3
- [ ] Fase 2: Tasks 2.1-2.4 (Kafka básico)

### Semana 4
- [ ] Fase 2: Tasks 2.5-2.7 (Kafka avanzado)
- [ ] Fase 3: Tasks 3.1-3.2 (tests)

### Semana 5
- [ ] Fase 3: Tasks 3.3-3.6 (profesionalización)
- [ ] Revisar y practicar Fase 4

### Semana 6
- [ ] Pulir detalles
- [ ] Grabar demo
- [ ] Preparar para mostrar en entrevistas

---

## Checklist Final para Currículum

### Mínimo viable
- [ ] Demo funcional: Login → Productos → Carrito
- [ ] Kafka funcionando con al menos 1 evento
- [ ] Código en GitHub público
- [ ] README con instrucciones claras

### Ideal
- [ ] Todo lo anterior +
- [ ] Tests pasando
- [ ] CI/CD configurado
- [ ] Video demo de 2-3 minutos
- [ ] Puedes explicar cada decisión técnica

---

## Notas

- Los tiempos son aproximados para alguien aprendiendo (no experto)
- Si ya conoces algún concepto, será más rápido
- Es mejor hacer menos cosas bien que muchas a medias
- Practica explicar lo que hiciste en voz alta

---

*Última actualización: Enero 2026*