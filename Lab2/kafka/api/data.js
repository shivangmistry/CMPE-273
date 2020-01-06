let currentUser = {}

module.exports.setUser =  function(data){
    console.log("Setting current user: "+data);
    currentUser.id = data.id;
    currentUser.name = data.name;
    currentUser.role = data.role;
    currentUser.image = data.image;
    currentUser.token = data.token;
}

module.exports.setAttr =  function(attr, value){
    console.log("Setting current user: ",data);
    currentUser.attr = value;
    console.log("Current User: ", currentUser)
}

module.exports.getUser =  function(){
    return currentUser;
}