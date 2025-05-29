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

  it('no agrega dos usuarios con el mismo nick', function() {
    sistema.agregarUsuario("ana");
    let res = sistema.agregarUsuario("ana");
    expect(res.nick).toBe(-1);
    expect(sistema.numeroUsuarios()).toBe(1);
  });

  it('elimina un usuario correctamente', function() {
    sistema.agregarUsuario("ana");
    sistema.eliminarUsuario("ana");
    expect(sistema.usuarioActivo("ana")).toBe(false);
  });

  it('verifica número correcto de usuarios conectados', function() {
    sistema.agregarUsuario("ana");
    sistema.agregarUsuario("juan");
    expect(sistema.numeroUsuarios()).toBe(2);
  });

  it('verifica secuencia correcta en el juego', function() {
    let juego = sistema.juego;
    let secuencia = juego.generarSiguiente();
    let resultado = juego.comprobarSecuencia(secuencia);
    expect(resultado.exito).toBe(true);
  });

  it('detecta secuencia incorrecta', function() {
    let juego = sistema.juego;
    juego.generarSiguiente(); // genera secuencia original
    let intentoIncorrecto = ['no-es-un-color-valido'];
    let resultado = juego.comprobarSecuencia(intentoIncorrecto);
    expect(resultado.exito).toBe(false);
  });

  it('reinicia correctamente la secuencia del juego', function() {
    let juego = sistema.juego;
    juego.generarSiguiente();
    juego.reiniciar();
    expect(juego.obtenerSecuencia().length).toBe(0);
  });
});
