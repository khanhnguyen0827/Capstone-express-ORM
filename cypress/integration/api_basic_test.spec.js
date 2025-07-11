describe('API Basic Tests', () => {
  const baseUrl = 'http://localhost:3069';

  it('GET /images should return list of images', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/images`,
      qs: { page: 1, pageSize: 5, search: 'flower' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('items');
    });
  });

  it('POST /auth/login should login successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        email: 'existing@example.com',
        password: 'password123',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

  it('POST /auth/login should fail with wrong password', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      body: {
        email: 'existing@example.com',
        password: 'wrongpassword',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
