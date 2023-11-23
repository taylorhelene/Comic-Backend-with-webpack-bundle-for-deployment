var sqlite3 = require('sqlite3');
const { gql } = require('apollo-server');

let db= new sqlite3.Database('./dl.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
    createDatabase();
});

function createDatabase() {
    var newdb = new sqlite3.Database('dl.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(newdb) {
    newdb.exec(`
    create table hero (
        hero_id int primary key not null,
        hero_name text not null,
        is_xman text not null,
        was_snapped text not null,
        image text not null,
        views int not null
    );
        `, ()  => {
            secondQuery(newdb);
    });
}

function secondQuery(newdb){
    newdb.exec(`
    insert into hero (hero_id, hero_name, is_xman, was_snapped, image , views)
    values (1, 'Spiderman', 'N', 'Y', 'https://www.transparentpng.com/thumb/spiderman/ld3cDH-countdown-launch-marvelu-spider-man-playstation.png', 0),
           (2, 'Tony Stark', 'N', 'N', 'https://www.transparentpng.com/thumb/iron-man/b4NpBS-iron-man-clipart-png-file.png', 0),
           (3, 'Jean Grey', 'Y', 'N', 'https://www.transparentpng.com/thumb/phoenix/1zlrBH-phoenix-picture.png', 0);
    `,()=>{
        thirdQuery(newdb);
    })
}

function thirdQuery(newdb){
    newdb.exec(`
    create table hero_power (
        hero_id int not null,
        hero_power text not null);
    `,()=>{
        fourthQuery(newdb);
    })
}

function fourthQuery(newdb){
    newdb.exec(
     `insert into hero_power (hero_id, hero_power)
        values (1, 'Web Slinging'),
               (1, 'Super Strength'),
               (1, 'Total Nerd'),
               (2, 'Total Nerd'),
               (3, 'Telepathic Manipulation'),
               (3, 'Astral Projection');
               ` ,()=>{
                runQueries(newdb);
               });
}

function runQueries(db) {
  

    db.serialize(function () {
        db.all("WITH tables AS (SELECT name tableName, sql FROM sqlite_master WHERE type = 'table' AND tableName NOT LIKE 'sqlite_%') SELECT fields.name, fields.type, tableName FROM tables CROSS JOIN pragma_table_info(tables.tableName) fields", function (err, tables) {
            console.log(tables);
        });
    });

    db.serialize(()=>{
        const statemnt=db.prepare("select * from hero_power")
        statemnt.all((err,tables)=>{
            console.log(tables);
            console.log(err);
        });
    });


}

const typeDefs = gql`
type Hero{
    id: ID
    name: String
    xman: String
    snapped: String
    power :String
    image: String
    views:Int
}

type Power{
    id:ID
    power: String
}

type Query{
    heroes: [Hero]
    hero(id:ID!): Hero

}

type Mutation{
    hero(views:Int! , id:ID!): Hero
}

`

const resolvers = {
    Query: {
        heroes: ()=> {
                
            var myans=[];
            var records=[];
           
            function getRecords(){
                return new Promise((resolve,reject)=>{
                db.prepare("SELECT distinct h.hero_id id ,hero_name name,is_xman xman,was_snapped snapped, hero_power power, image image ,views views FROM hero  h join hero_power hp on h.hero_id = hp.hero_id ").all((err,rows)=>{
                  if(err){
                      return console.error(err.message);
                  }
                  rows.forEach((row)=>{
                      myans.push(row);
                  });
                console.log(myans)
                 resolve(myans);
              })
                
                })
              }

             
              return records= getRecords();
             
        },
        hero : (_,{id})=>{
            
            var myans= {}
            var record={}
            function getHero(){
                return new Promise((resolve,reject)=>{
                    db.prepare("SELECT h.hero_id id ,hero_name name,is_xman xman,was_snapped snapped , hero_power power, image image  FROM hero h join hero_power hp on h.hero_id = hp.hero_id WHERE h.hero_id  = ?").get(id,(err,rows)=>{
                        if(err){
                            return console.error(err.message);
                        }
                        myans=rows
                       return (myans=rows,  resolve(myans));

                      
                    })
                })
            }
            record = getHero();
            return record;
            

           
           
        }
    },
    Mutation : {

        hero:(_,{views,id})=>{
            var myans= {}
            var record={}

            function changeHero(){
                return new Promise((resolve,reject)=>{
                    db.prepare("UPDATE hero SET views= ? WHERE hero_id= ? ").run([views,id],(err,rows)=>{
                        if(err){
                            return console.error(err.message);
                        }
                        myans=rows;
                        console.log(rows)
                        return(myans=rows,resolve(myans))

                    })
                })
            }

            record=changeHero();
            return record
        }
    }
}

exports.typeDefs = typeDefs;
exports.resolvers = resolvers;