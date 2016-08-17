# movie-db

A Personal Movie DB using themoviedb.org API service to search for and provide information about movies
![TMDB](https://assets.tmdb.org/images/logos/var_1_0_PoweredByTMDB_Blk_Antitled.png "TMDB")

---

Install/Build Instruction
========

Frontend Resources
--------
1. sudo npm install
2. bower install
3. bourbon install in ./app/sass
4. gulp build

Start Mongodb
--------
1. sudo mongod
2. view db (optional) mongo: test > movie > db.movie.find()

Application Package
--------
1. mvn clean install
2. java -jar target/moviedb-0.0.1-SNAPSHOT.jar
