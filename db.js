var sqlite3 = require('sqlite3');

let db= new sqlite3.Database('./mu.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
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
    var newdb = new sqlite3.Database('mu.db', (err) => {
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
        values (1, 'Web Slinging , Super Strength and Total Nerd'),
               (2, 'Total Nerd'),
               (3, 'Telepathic Manipulation and Astral Projection');
               ` ,()=>{
               fifthQuery(newdb);
               });
}

function fifthQuery(newdb){
    newdb.exec(`
    create table characters (
        superhero text not null,
        publisher text not null,
        alter_ego text not null,
        first_appearance text not null,
        character text not null,
        url text not null);
    `,()=>{
        sixthQuery(newdb);
    })
}

function sixthQuery(newdb){
    newdb.exec(
     `insert into characters (superhero, publisher, alter_ego, first_appearance, character, url)
        values ('Batman', 'DC Comics' , 'Bruce Wayne', 'Detective Comics #27', 'Bruce Wayne', 'https://static.dc.com/dc/files/default_images/Char_Thumb_Batman_20190116_5c3fc4b40fae42.85141247.jpg?w=160'),
               ('Superman', 'DC Comics', 'Kal-El', 'Action Comics #1', 'Kal-El', 'https://static.dc.com/2023-02/Char_WhosWho_Superman_20190116_5c3fc71f524f38.28405711.jpg?w=160'),
               ('Flash', 'DC Comics', 'Jay Garrick', 'Flash Comics #1','Jay Garrick, Barry Allen, Wally West, Bart Allen', 'https://static.dc.com/2023-02/Char_WhosWho_Flash_20190116_5c3fcadbc6a963.74676553.jpg?w=160'),
               ('Green Lantern', 'DC Comics', 'Alan Scott', 'All-American Comics #16', 'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz', 'https://static.dc.com/2023-02/Char_WhosWho_GreenLantern20200721_5f173adcedb982.94529743.jpg?w=160'),
               ('Green Arrow', 'DC Comics', 'Oliver Queen', 'More Fun Comics #73', 'Oliver Queen', 'https://static.dc.com/dc/files/default_images/Char_Thumb_GreenArrow_5c4915494b3fb9.17530021.jpg?w=160'),
               ('Wonder Woman', 'DC Comics', 'Princess Diana','All Star Comics #8', 'Princess Diana', 'https://static.dc.com/2023-02/Char_WhosWho_WonderWoman_20190116_5c3fc6aa51d124.25659603.jpg?w=160'),
               ('Martian Manhunter', 'DC Comics', 'J onn J onzz','Detective Comics #225','Martian Manhunter', 'https://static.dc.com/dc/files/default_images/Char_Thumb_MartianManhunter_20190116_5c3fd5c45bcd52.92066763.jpg?w=640'),
               ('Robin/Nightwing', 'DC Comics', 'Dick Grayson', 'Detective Comics #38', 'Dick Grayson', 'https://static.dc.com/dc/files/default_images/Char_Thumb_Nightwing_2_5c50fa380942a3.78305981.jpg?w=384'),
               ('Blue Beetle', 'DC Comics', 'Dan Garret', 'Mystery Men Comics #1', 'Dan Garret, Ted Kord, Jaime Reyes', 'https://static.dc.com/dc/files/default_images/Char_Thumb_BlueBeetle_5c4118a71474e2.43949452.jpg?w=160'),
               ('Black Canary', 'DC Comics', 'Dinah Drake', 'Flash Comics #86', 'Dinah Drake, Dinah Lance', 'https://static.dc.com/dc/files/default_images/Char_Thumb_BlackCanary_5c41184e20ee69.98463239.jpg?w=160'),
               ('Spider Man', 'Marvel Comics', 'Peter Parker', 'Amazing Fantasy #15', 'Peter Parker', 'https://cdn.marvel.com/content/1x/037smm_com_crd_01.jpg'),
               ('Captain America', 'Marvel Comics', 'Steve Rogers', 'Captain America Comics #1', 'Steve Rogers', 'https://cdn.marvel.com/content/1x/ultimate_cap_hed.jpg'),
               ('Iron Man', 'Marvel Comics', 'Tony Stark', 'Tales of Suspense #39', 'Tony Stark', 'https://cdn.marvel.com/content/1x/002irm_ons_crd_03.jpg'),
               ('Thor', 'Marvel Comics', 'Thor Odinson', 'Journey into Myster #83', 'Thor Odinson', 'https://cdn.marvel.com/content/1x/thorult01.jpg'),
               ('Hulk', 'Marvel Comics', 'Bruce Banner', 'The Incredible Hulk #1', 'Bruce Banner', 'https://cdn.marvel.com/content/1x/349red_com_crd_01.png'),
               ('Wolverine', 'Marvel Comics', 'James Howlett', 'The Incredible Hulk #180', 'James Howlett','https://cdn.marvel.com/content/1x/ultwolv.jpg'),
               ('Daredevil', 'Marvel Comics', 'Matthew Michael Murdock', 'Daredevil #1', 'Matthew Michael Murdock', 'https://cdn.marvel.com/content/1x/daredevilult_head.jpg'),
               ('Hawkeye', 'Marvel Comics', 'Clinton Francis Barton', 'Tales of Suspense #57', 'Clinton Francis Barton', 'https://cdn.marvel.com/content/1x/hawkeyeult_head.jpg'),
               ('Cyclops', 'Marvel Comics', 'Scott Summers', 'X-Men #1', 'Scott Summers','https://cdn.marvel.com/content/1x/cyclopsaoa.jpg'),
               ('Silver Surfer', 'Marvel Comics', 'Norrin Radd', 'The Fantastic Four #48', 'Norrin Radd', 'https://cdn.marvel.com/content/1x/21_ba97.jpg');
               ` ,()=>{
                seventhQuery(newdb);
               });
}

function seventhQuery(newdb){
    newdb.exec(`
    create table comics (
        name text not null,
        date text not null,
        rating text not null,
        writer text not null,
        cover_artist text not null,
        editor text not null,
        digital text not null,
        link text null,
        price text not null,
        url text not null);
    `,()=>{
        eighthQuery(newdb);
    })
}

function eighthQuery(newdb){
    newdb.exec(
        `insert into comics (name, date , rating, writer, cover_artist, editor, digital, link, price, url)
           values ('I Am Groot Infinity Comic #6', '2023-10-13' , 'All Ages', 'Chiya', 'Chiya', 'Darren Shan' ,'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/00/64f9e0e83cfb6/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #12', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free','https://cdn.marvel.com/u/prod/marvel/i/mg/2/f0/65020e61f319b/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #11', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/c0/65020e53a8026/portrait_uncanny.jpg' ),
                  ('Amazing Spider-Man: Hunted Infinity Comic #10', '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/d0/65020e450337d/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #9',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/20/65020e2c327e9/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #8',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/8/d0/65020e191feac/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #7',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/f/30/65020e07032a3/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #6',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/70/65020deb7783e/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #5',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/2/a0/65020ea47a631/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #4',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/5/d0/65020daee5731/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #3',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/03/65020d966e845/portrait_uncanny.jpg'),
                  ('Amazing Spider-Man: Hunted Infinity Comic #2',  '2023-10-13' , ' Rated T+', 'Jeff Youngquist', 'Jeff Youngquist', 'Jeff Youngquist' , 'Digital issue is not currently available', '', 'free', 'https://cdn.marvel.com/u/prod/marvel/i/mg/2/50/65020d840b1a3/portrait_uncanny.jpg'),
                  ('G.O.D.S. First Look Infinity Comic #1', '2023-10-4',' Rated T+', 'Tim Smith' , 'Tim Smith', 'Tim Smith', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64482' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/d/50/651b158643236/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #1', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64190' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/a0/65031795bf64c/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #2', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64282' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/90/65031795b7f0e/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #3', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'Digital issue is not currently available' , '' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/4/10/65031795bd9d9/portrait_uncanny.jpg'), 
                  ('Loki: Agent of Asgard Infinity Comic #4', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64284' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/6/10/65031795bbd2b/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #5', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64285' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/40/65031795b1c4e/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #6', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64286' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/3/80/650317af80c69/portrait_uncanny.jpg'),
                  ('Loki: Agent of Asgard Infinity Comic #7', '2023-10-3' ,' Rated T+', 'Al Ewing' , 'Lee Garbett', 'Jeff Youngquist', 'DIGITAL ISSUE : Read online or on your iPhone, iPad or Android Device' , 'https://read.marvel.com/#/book/64287' , 'free' , 'https://cdn.marvel.com/u/prod/marvel/i/mg/b/b0/650317afae0eb/portrait_uncanny.jpg');
                  ` ,()=>{
                   runQueries(newdb);
                  });
}


function runQueries(db) {

    
    db.serialize(()=>{
        const statemnt=db.prepare("select * from comics")
        statemnt.all((err,tables)=>{
            console.log(tables);
            console.log(err);
        });
    });


}

exports.db = db;