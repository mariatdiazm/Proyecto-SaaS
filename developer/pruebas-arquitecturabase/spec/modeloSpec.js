describe('El sistema', function() {
  let sistema;

  beforeEach(function() {
    sistema = new Sistema();
  });

  it('inicialmente no hay usuarios', function() {
    expect(sistema.numeroUsuarios()).toEqual(0);
  });

  it('agrega un usuario correctamente', function() {
    let res = sistema.agregarUsuario("ana");
    expect(res.nick).toEqual("ana");
    expect(sistema.usuarioActivo("ana")).toBe(true);
  });

  it('verifica secuencia correcta en el juego', function() {
    let juego = sistema.juego;
    let secuencia = juego.generarSiguiente();
    expect(juego.comprobarSecuencia(secuencia).exito).toBe(true);
  });
});
