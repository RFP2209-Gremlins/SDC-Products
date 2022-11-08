import http from 'k6/http';
import { sleep, check } from 'k6';

const URL = 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '2s', target: 1 },
    { duration: '2s', target: 1 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '45s', target: 100 },
    { duration: '45s', target: 100 },
    { duration: '2m', target: 1000 },
    { duration: '2m', target: 1000 },
    { duration: '2m', target: 0 },
  ]
};

export default function () {
  let product_id = Math.floor(Math.random() * 1000000) + 1;

  let responses = http.batch([
    ['GET', `${URL}/products/${product_id}`],
    ['GET', `${URL}/products/${product_id}/styles`],
    ['GET', `${URL}/products/${product_id}/related`],
  ]);

  check(responses[0], {
    'getProduct status was 200': (res) => res.status === 200,
  });

  check(responses[1], {
    'getStyles status was 200': (res) => res.status === 200,
  });

  check(responses[2], {
    'getRelated status was 200': (res) => res.status === 200,
  });

  sleep(1);
}
