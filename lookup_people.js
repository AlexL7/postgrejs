const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv[2];

    let query = `SELECT * FROM famous_people
                  WHERE first_name = '${name}' OR last_name = '${name}'`;
                //WHERE first_name = '${name};'


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    let found = result.rows;
    console.log('Searching . . .');
    console.log(`Found ${found.length} person(s) by the name '${name}':`);

    found.forEach((person) => {
      var date = person.birthdate.toString().substring(4,15) ;
      console.log(`-${person.id}: ${person.first_name} ${person.last_name}, born ${date}`);
    });

    client.end();
  });
});