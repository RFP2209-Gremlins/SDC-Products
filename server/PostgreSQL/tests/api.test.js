const axios = require('axios');

const URL = 'http://localhost:3000';

describe('/products retrieves a list of products', () => {
  it('gets 5 products with no query params', () => {
    axios.get(`${URL}/products`)
      .then(res => expect(res.data.length).toBe(5))
      .catch(err => { throw (err); });
  });

  it('gets 10 products with query param count=10', () => {
    axios.get(`${URL}/products?count=10`)
      .then(res => expect(res.data.length).toBe(10))
      .catch(err => { throw (err); });
  });
});

describe('/products/:product_id returns all product level information for a specified product id', () => {
  it('contains all product level information', () => {
    axios.get(`${URL}/products/1`)
      .then(res => {
        let product = res.data;
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.slogan).toBeTruthy();
        expect(product.description).toBeTruthy();
        expect(product.category).toBeTruthy();
        expect(product.default_price).toBeTruthy();
        expect(product.features).toBeTruthy();
      })
      .catch(err => { throw (err); });
  });
});

describe('/products/:product_id/styles returns all styles available for the given product', () => {
  it('contains all style level information', () => {
    axios.get(`${URL}/products/1/styles`)
      .then(res => {
        let style = res.data.results[0];
        expect(style.style_id).toBeTruthy();
        expect(style.name).toBeTruthy();
        expect(style.original_price).toBeTruthy();
        expect(style.sale_price).toBeTruthy();
        // expect(style['default?']).toBeTruthy();
        expect(style.photos).toBeTruthy();
        expect(style.skus).toBeTruthy();
      })
      .catch(err => { throw (err); });
  });
});

describe('/products/:product_id/related returns the IDs of products related to the product specified', () => {
  it('returns an array of IDs', () => {
    axios.get(`${URL}/products/1/related`)
      .then(res => {
        let related = res.data;
        expect(Array.isArray(related)).toBeTruthy();
      })
      .catch(err => { throw (err); });
  });
});
