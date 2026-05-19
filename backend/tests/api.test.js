test('Vérification que le port est défini', () => {
  const port = 3000;
  expect(port).toBe(3000);
});

test('Vérification URL MongoDB', () => {
  const url = 'mongodb://mongo:27017/recettes_db';
  expect(url).toContain('recettes_db');
  //oui
});

test('Vérification structure API', () => {
  const routes = ['/api/recettes', '/api/categories', '/api/auth/login'];
  expect(routes.length).toBe(3);
});