docker build -t node-app-image .
docker run -p 3000:3000 -d --name node-app node-app-image
docker exec -it node-app bash
docker image rm 4472ff72f334
docker rm node-app -f
docker rm node-app -fv // delete volume also
docker volume prune // do not delete volume assoiated with runing container

// blind mout volume

docker run -v pathfolderlocal:pathfoldercontainer -p 3000:3000 -d --name node-app node-app-image
docker run -v %cd%:/app -p 3000:3000 -d --name node-app node-app-image // for cmd
%cd% //for cmd
${pwd} // powershell
$(pwd) // linux

// delete node_module
docker run -v %cd%:/app -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image 

// docker create file to local machine
docker run -v %cd%:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image 

// docker change the default listening port by env
docker run -v %cd%:/app -v /app/node_modules --env PORT=4000 -p 3000:4000 -d --name node-app node-app-image 
docker run -v %cd%:/app -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image // use .env file instead

// long command with many docker using docker-compose
 docker-compose down -v
 docker-compose up -d
 docker-compose up -d --build // build: path/dockerfile

 //production deployment (sperate command for diff environment)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build // --build if we make change with dockerfile
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v // delete named volume also
docker-compose* // add to dockerignore
//prevent nodemon install in production
RUN npm install --only=production

// mongodb and named volume
docker exec -it backend-mongo-1 mongosh -u "root" -p "example"
use mydbs //create db in mongo
db.books.insertOne({"name":"unknow"})
db.books.find()

// docker network changes handle
docker inspect backend-mongo-1
docker logs backend-node-app-1 -f
docker network ls // docker has DNS in their custom network (not default bridged network)
"mongodb://root:example@172.23.0.2:27017/?authSource=admin" => 
"mongodb://root:example@mongo:27017/?authSource=admin" // replace ip with service name
ping mongo
docker network inspect backend_default

// load service in order
depends_on key in docker compose

// retry conection to mongo
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --no-deps node-app// no dependency only start  node-app