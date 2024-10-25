function Sistema(){
    this.usuarios={}; // que tipo coleccion???
    //operaciones sobre la colección
    this.agregarUsuario=function(nick){
        if (!this.usuarios[nick]){
            this.usuarios[nick]=new Usuario(nick);
        }
    }
    this.eliminarUsuario=function(nick){
        let res=false;
        if (this.usuarios[nick]){
            delete this.usuarios[nick];
            res=true;
        }
        return res;
    }
    this.usuarioActivo = function(nick) {
        return !!this.usuarios[nick]; 
    }
}

function Usuario(nick){
    this.nick=nick;
}
