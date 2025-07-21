# Manuscrito

## Instrucciones

### 1 - Lambda

Crear en la consola de AWS una Lambda con lenguaje de programacion Node version 18, la Lambda debe tener configurado URL Lambda Function y permisos sobre la instancia de base de datos, una ves creada, adjuntar el archivo .zip en la lambda. 

### 2 - Base de Datos

Crear base de datos en AWS, en el servicio de RDS Postgresql y ejecutar el siguiente script:

    CREATE TABLE public.manuscrito (
        manuscript varchar NULL,
        state varchar NULL,
        CONSTRAINT manuscrito_unique UNIQUE (manuscript)
    );
    CREATE INDEX manuscrito_state_idx ON public.manuscrito USING btree (state);

Configurar en el archivo de la Lambda src/resources/config.json los parametros para la conexion de la RDS

### 3 - Consumir servicio Clue

Para consumir el servicio de Clue y revisar pistas de los artefactos ejecutar el siguiente script:

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

### 4 - Consumir servicio Stas

Si deseas revisar las estadisticas de las pistas buscadas puedes consumir el siguiente servicio:

    curl --location 'https://vhyrh42xx63bmjqxrjdf2tm6wa0uxmge.lambda-url.us-east-1.on.aws/stats'

