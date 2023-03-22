import express from 'express';
import http from 'http';

const stdin = process.stdin;
const app = express();
const server = http.Server(app);
const port = 3000;
const AUTO_RESET_INTERVAL = 200; //ms

let count = 0;
let ts = 0;

server.listen(port, () => {
    console.log('Server listening on ', port);
});

//TEST ENDPOINT
app.get('/', (req, res) => {
    let ts2 = Date.now();

    //Auto reset counter and timestamp
    if(ts2 - ts > AUTO_RESET_INTERVAL){
      ts = 0;
      count = 0;
    }

    count++;

    //don't display time between calls if first call
    if(ts2 - ts == ts2 ){ console.log('Endpoint called: ', count, 'Timestamp: ', ts2); }

    //display time between
    if(ts2 - ts < ts2 ){ console.log('Endpoint called: ', count, 'Timestamp: ', ts2, "Interval: ", ts2 - ts); }
    ts = ts2;
    res.sendStatus(200);
});



//Keypress listener for manual reset
stdin.setRawMode( true );
stdin.resume();
stdin.setEncoding( 'utf8' );
stdin.on( 'data', function( key ){
    count = 0;
    ts = 0;
    console.log('Reset');

  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }
});