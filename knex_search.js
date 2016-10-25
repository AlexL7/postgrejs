'use strict';

const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

var name = process.argv[2];


knex.select('*').from('famous_people')
.where('first_name', name)
.orWhere('last_name', name)
.asCallback(function(err, rows) {
  if (err) return console.error(err);

  rows.forEach((person) => {
      var date = person.birthdate.toString().substring(4,15) ;
      console.log(`-${person.id}: ${person.first_name} ${person.last_name}, born ${date}`);
    });

    });






//console.log(knex().select('*').table('famous_people'));

/*knex('famous_people').where(function (){
  this.where({first_name: name}).orWhere({last_name: name})
*/


