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
- Event Driven Communication: Kraft Kafka
- Contenerización: Docker y Docker Compose
- Seguridad en Backend: JWT Authentication
- Seguridad en Kafka: SASL (Autenticación), ACL (Autorización)

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



## Configuración de Kafka + KRaft

1. Abrir consola de él docker de kafka

```console
docker exec -it kafka sh 
```
2. Creación de Topics (con 3 particiones y un factor de replicación de 1)

```console
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --topic ecomerce.product.created.v1 --partitions 3   --replication-factor 1   --command-config /opt/kafka/config/client.properties
```
<https://hub.docker.com/r/apache/kafka>


3. Revisar que el Topic ha sido creado correctamente

```console
/opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --list --command-config /opt/kafka/config/client.properties
```
<https://hub.docker.com/r/apache/kafka> 

4. Configuración de Autorización de escritura a product service

```console
/opt/kafka/bin/kafka-acls.sh --bootstrap-server kafka:9092 --add --allow-principal User:product-user-secret --operation Write --topic ecomerce.product.created.v1   --command-config /opt/kafka/config/client.properties
```


5. Configuración de Autorización de lectura a stock service

```console
/opt/kafka/bin/kafka-acls.sh --bootstrap-server kafka:9092 --add --allow-principal User:stock-user-secret --operation Read --topic ecomerce.product.created.v1  --group stock-service --command-config /opt/kafka/config/client.properties
```


6. Configuración de Autorización completa para Administrador

```console
/opt/kafka/bin/kafka-acls.sh --bootstrap-server kafka:9092 --add --allow-principal User:admin --operation All --topic '*' --group stock-service --command-config /opt/kafka/config/client.properties
```


7. Verificar la Autorización

```console
/opt/kafka/bin/kafka-acls.sh  --bootstrap-server kafka:9092 --list --command-config /opt/kafka/config/client.properties
```

## Configuración de certificados


8. TLS CA (Certification Authority): Generación de llaves privadas 

```console
openssl genrsa -out ca.key 4096

```

9. TLS CA (Certification Authority): Generación de certificado público 

```console
openssl req -new -x509 \
  -key ca.key \
  -out ca.crt \
  -days 3650 \
  -subj "/CN=Kafka-CA" 
```


10. TLS Kafka Keypair RSA 2048 bits: Generación de llave privada y certificado firmado propio

```console
keytool -genkeypair \
  -alias kafka \
  -keyalg RSA \
  -keystore kafka.keystore.jks \
  -storepass kafka-secret \
  -keypass kafka-secret \
  -dname "CN=kafka"
  ```


11. TLS Crear petición de firma de certificado  : Generación de solicitud de certificado

```console
keytool -certreq \
  -alias kafka \
  -keystore kafka.keystore.jks \
  -file kafka.csr \
  -storepass kafka-secret
  ```

12. Firma a certificado Kafka : CA firma el certificado

```console
openssl x509 -req \
  -CA ca.crt \
  -CAkey ca.key \
  -in kafka.csr \
  -out kafka.crt \
  -days 365 \
  -CAcreateserial
  ```



13. Importar Certification en Keystore : Importar CA a Keystore

```console
keytool -importcert \
  -alias CARoot \
  -file ca.crt \
  -keystore kafka.keystore.jks \
  -storepass kafka-secret \
  -noprompt
  ```


12. Importar certificado firmado de KAFKA : Remplaza el certificado con firma propia a uno confiable

```console
keytool -importcert \
  -alias kafka \
  -file kafka.crt \
  -keystore kafka.keystore.jks \
  -storepass kafka-secret
  ```
13. Crear kafka Truststore 
```console
keytool -importcert \
  -alias CARoot \
  -file ca.crt \
  -keystore kafka.truststore.jks \
  -storepass kafka-secret \
  -noprompt
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





## Próximos Pasos
+ Implementar frontend en Angular + Tailwind.
+ Script para configuración de kafka

+ Añadir pruebas unitarias y de integración.
+ Integrar CI/CD con GitHub Actions.
+ Desplegar en AWS ECS o Kubernetes.
