# E-Comerce Fugito Proyecto de Microservicios.

## Descripción
Este proyecto es un sistema e-comerce basado en microservicios desarrollado para aprender y practicar una quitectura back-end, 1con comunicación asincrona con kafka y despliegue con docker y bases de datos poliglotas (uso de múltiples bases de datos para una misma aplicación).

Los microservicios gestionan:
- <b>Productos</b>
- <b>Carrito de compras e items </b>
- <b>stock</b>
- <b>Usuarios</b>
## Tecnologías utilizadas
- Backend: .NET 8 (C#) , ASP.NET, Core Web API,
- Bases de datos:
  - MongoDB ( para Producto Service)
  - PostgreSQL ( para Auth Service, Cart Service, Stock Service)
- Mensajería: Apache Kafka + Zookeper
- Contenerización: Docker y Docker Compose
- Seguridad: JWT Authentication

  ## Arquitectura
<img width="4313" height="1463" alt="Diseño DB - Página 7" src="https://github.com/user-attachments/assets/3e7551e4-7799-4c0c-9b4a-77767eb092cf" />


  ## Configuración y Ejecución

1. Clonar repositorio

```console
git clone https://github.com/Paolaaaaaa/Fugito_ecomerce.git
```
2. Levantar la infraestructura

```console
docker-compose up --build
```
