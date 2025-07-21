# Manuscrito

Aplicacion que permite analizar antiguos manuscritos y determina si contiene pistas sobre la ubicacion de artefactos que otorgan habilidadles magicas a sus portadores.

## Instrucciones

### 1 - Lambda

La aplicacion se desplego en una Lambda de AWS en el lenguaje de programacion Node version 18, la Lambda tiene configurado URL Lambda Function y permisos sobre la instancia de base de datos.

### 2 - Base de Datos

Para poder analizar cuales artefactos fueron encontrados y no encontrados se creo una base datos relacional con el Motor PostgreSQL, con la siguiente configuracion. donde cada manuscrito sera unico.

    CREATE TABLE public.manuscrito (
        manuscript varchar NULL,
        state varchar NULL,
        CONSTRAINT manuscrito_unique UNIQUE (manuscript)
    );
    CREATE INDEX manuscrito_state_idx ON public.manuscrito USING btree (state);

En el archivo de la Lambda src/resources/config.json estan los parametros para la conexion de la RDS segun el ambiente

### 3 - Consumir servicio Clue

Para consumir el servicio de Clue y revisar pistas de los artefactos ejecutar el siguiente script, tener presente que el script es sensible con las Mayusculas y Minusculas. Ademas, puedes agregar mas si lo deseas y en cualquier dimension de letras.

    curl --location 'https://vhyrh42xx63bmjqxrjdf2tm6wa0uxmge.lambda-url.us-east-1.on.aws/clue' \
    --header 'Content-Type: application/json' \
    --data '{
        "manuscript": [
            "RTHGQW",
            "XRLORE",
            "NAAURR",
            "REVRAL",
            "EGSILE",
            "BRINDS"
        ]
    }'

### 4 - Consumir servicio Stats

Si deseas revisar las estadisticas de las pistas buscadas puedes consumir el siguiente servicio:

    curl --location 'https://vhyrh42xx63bmjqxrjdf2tm6wa0uxmge.lambda-url.us-east-1.on.aws/stats'


### 5 - Reporte

En el siguiente cuadro se presenta un resumen de una prueba de carga realizada en JMeter para medir los tiempos de respuesta de la API. La prueba se ejecutó con 100 hilos, los cuales se generaron progresivamente en un período de 60 segundos, y tuvo una duración total de 60 segundos.

De acuerdo con los resultados, se observa que el 90% de las peticiones para el servicio Clue obtuvieron un tiempo de respuesta igual o menor a 244 ms, mientras que para el servicio Stats, el tiempo de respuesta para el percentil 90 fue de 685 ms.

En la carpeta performanceTest se encuentra el archivo con los resultados en formato .cvs

## 📊 Resultados de Prueba de Performance

| Label               | # Samples | Average (ms) | Median (ms) | 90% Line (ms) | 95% Line (ms) | 99% Line (ms) | Min (ms) | Max (ms) | Error % | Throughput (req/s) | Received KB/sec | Sent KB/sec |
|---------------------|-----------|---------------|--------------|----------------|----------------|----------------|----------|----------|---------|---------------------|-----------------|--------------|
| HTTP Request Stats  | 4315      | 536           | 508          | 619            | 685            | 1139           | 411      | 2785     | 39977%  | 6,939.642           | 24.48           | 11.32        |
| HTTP Request Clue   | 4237      | 173           | 160          | 211            | 244            | 408            | 122      | 2309     | 41232%  | 7,106.676           | 22.17           | 25.96        |
| **TOTAL**           | 8552      | 356           | 437          | 566            | 623            | 895            | 122      | 2785     | 40599%  | 13,753.840          | 45.74           | 36.21        |
