module.exports = function(app){
  
    app.get('/api/:guild', function(req, res){
       response.send("Simple Call users Route from Here!");
    });
  
    app.get('/posts', function(req, res){
       response.send("Simple Call posts Route from Here!");
    });
}