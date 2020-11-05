### CarDealer Platform

<img src="https://raw.githubusercontent.com/mehdishahdoost/rhdhv/dev/shot/shot.png" width="500" height="300"/>

#### Tech Stack


#### FrontEnd:
  
  * NodeJS 10
  * ReactJs
  * Redux
  * React Material UI
  * gRPC-web


#### BackEnd:
  
  * Kotlin
  * Java
  * MongoDB
  * gRPC
  * TestContainers

### How to build the project

#### run envoy proxy

<pre>
 docker run -d --name envoy --network="host" -v "$(pwd)/envoy-config.yml:/etc/envoy/envoy.yaml:ro" envoyproxy/envoy:v1.16-latest
</pre>

### build car dealer grpc server

<pre>

cd backend

./gradlew clean jar

</pre>

### build car dealer frontend 

<pre>
 cd frontend
 npm run build
</pre>
