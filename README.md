# E-Comerce Fugito Proyecto de Microservicios.

## Descripción
Este proyecto es un sistema e-comerce basado en microservicios desarrollado para aprender y practicar una quitectura back-end, con comunicación asincrona con kafka y despliegue con docker y bases de datos poliglotas (uso de múltiples bases de datos para una misma aplicación).

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
cd ./Back-end/
```
3. Levantar contenedores de todos los servicios

```console
docker-compose up 
```


## Migraciones y Cambios a base de datos

1. Nombrar la migración



```console
dotnet ef migrate [NAME OF MIGRATION]
```
2. Realizar los cambios a base de datos

```console
dotnet ef database update .

```
## Configuración de Kafka + KRaft

1. Abrir consola de él docker de kafka

```console
docker exec --workdir /opt/kafka/bin/ -it [broker name] sh 
```
2. Creación de Topics (with 3 partitions and a replication factor of 1)

```console
./kafka-topics.sh \--bootstrap-server localhost:9092 --create --topic ecomerce.prod.stock.productNotCreated --partitions 3   --replication-factor 1

```
<https://hub.docker.com/r/apache/kafka>

## Próximos Pasos
+ Implementar frontend en Angular + Tailwind.
+ Script para configuración de kafka

+ Añadir pruebas unitarias y de integración.
+ Integrar CI/CD con GitHub Actions.
+ Desplegar en AWS ECS o Kubernetes.
