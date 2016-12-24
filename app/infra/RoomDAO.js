function RoomDAO(connection){
    this._connection = connection;
}

/* Method to list rooms */
RoomDAO.prototype.list = function(callback){
    
    this._connection.connect(function(err, client, done) {
                
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query('SELECT * from room', function(err, results) {
            done();
            
            callback(err, results);

            if(err) {
              return console.error('error running query', err);
            }

          });
    });

    this._connection.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack)
    });
    
}

/* Method to save the ROOM */
RoomDAO.prototype.save = function(room,callback){
    
    this._connection.connect(function(err, client, done) {
                
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        
        client.query("insert into room (id, name, password) values (nextval('seq_room'),$1,$2)",[room.name,room.password],function(err, results) {
            done();
            
            callback(err, results);

            if(err) {
              return console.error('error running query', err);
            }

          });
    });

    this._connection.on('error', function (err, client) {
      console.error('idle client error', err.message, err.stack)
    });
    
}

module.exports = function(){
    return RoomDAO;
}


