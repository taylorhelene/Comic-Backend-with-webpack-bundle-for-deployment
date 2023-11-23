var sqlite3 = require('sqlite3');
const { db } = require ('./db.js')


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
                    db.prepare("SELECT distinct h.hero_id id ,hero_name name,is_xman xman,was_snapped snapped , hero_power power, image image  FROM hero h join hero_power hp on h.hero_id = hp.hero_id WHERE h.hero_id  = ?").get(id,(err,rows)=>{
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
            

           
           
        },
        superheroeslist : ()=>{

            var myans=[];
            var records=[];
           
            function getRecords(){
                return new Promise((resolve,reject)=>{
                db.prepare("SELECT distinct  superhero , publisher , alter_ego , first_appearance , character , url FROM characters ").all((err,rows)=>{
                  if(err){
                      return console.error(err.message);
                  }
                  rows.forEach((row)=>{
                      myans.push(row);
                  });
                
                 resolve(myans);
              })
                
                })
              }

             
              return records= getRecords();
        },
        comics :()=>{
            var myans=[];
            var records=[];
           
            function getRecords(){
                return new Promise((resolve,reject)=>{
                db.prepare("SELECT * FROM comics ").all((err,rows)=>{
                  if(err){
                      return console.error(err.message);
                  }
                  rows.forEach((row)=>{
                      myans.push(row);
                  });
                
                 resolve(myans);
              })
                
                })
              }

             
              return records= getRecords();
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


exports.resolvers=resolvers;