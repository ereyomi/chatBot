const path = require( 'path' )
console.log(__dirname)
// Require Express to run server and routes
const express = require( 'express' );

// Start up an instance of app
const app = express();

/* Dependences */
const bodyParser = require( 'body-parser' );

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require( 'cors' );
app.use( cors() );

// Initialize the main project folder
app.use( express.static( 'client' ) );


var RiveScript = require('rivescript')
var bot = new RiveScript();
 
// Load a directory full of RiveScript documents (.rive files). This is for
// Node.JS only: it doesn't work on the web!
//bot.loadDirectory("brain").then(loading_done).catch(loading_error);
 
// Load an individual file.
//bot.loadFile("brain/testsuite.rive").then(loading_done).catch(loading_error);
 
// Load a list of files all at once (the best alternative to loadDirectory
// for the web!)
 /* bot.loadFile([
  "brain/begin.rive",
  "brain/admin.rive",
  "brain/clients.rive"
]).then(loading_done).catch(loading_error); */
 
// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.

function loading_done(userData) {
  console.log("Bot has finished loading!");
 
  // Now the replies must be sorted!
  bot.sortReplies();
 
  // And now we're free to get a reply from the brain!
 
  // RiveScript remembers user data by their username and can tell
  // multiple users apart.
  let username = "local-user";
 
    let holdReply = '';
  // NOTE: the API has changed in v2.0.0 and returns a Promise now.
  bot.reply(username, `${userData}`).then(function(reply) {
      console.log( "The bot says: " + reply );
  } );
}
 
// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}

const replyToUser = ( req, res ) => {
    const text = req.body.text
    
    bot.loadDirectory( "brain" )
        .then( data => {
            console.log("Bot has finished loading!");
 
            // Now the replies must be sorted!
            bot.sortReplies();
            
            // And now we're free to get a reply from the brain!
            
            // RiveScript remembers user data by their username and can tell
            // multiple users apart.
            let username = "local-user";
            
                let holdReply = '';
            // NOTE: the API has changed in v2.0.0 and returns a Promise now.
            bot.reply(username, `${text}`).then(function(reply) {
                //console.log( "The bot says: " + reply );
                res.send( {
                    reply,
                })
            } );
            
        } )
        .catch( loading_error );
}
    // Post Route
app.post( '/api/botreply', replyToUser)


// Setup Server

const port = 8000;

const server = app.listen( port, () => {
    console.log( "server running" );
    console.log( "running on localhost: ", port );
} )


//bot

// Make a new bot with UTF-8 mode enabled.
//var bot = new RiveScript({utf8: true});
 
// Override the punctuation characters that get stripped from the
// user's message.
//bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);
