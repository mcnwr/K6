import { sleep } from 'k6';
import http from 'k6/http';
import { Counter } from "k6/metrics";
import { check } from 'k6';

const opt1 = {
  thresholds: {
    server_bun_get_success: ['count>190'],
    server_node_get_success: ['count>190'],
  },
  scenarios: {
    bunServer: {
      exec: "bunServer", //
      executor: "constant-vus",
      vus: 10,
      duration: "60s"
    },
    nodeServer: {
      exec: "nodeServer",
      executor: "constant-vus",
      vus: 10,
      duration: "10s"
    }
  }
};

const opt2 = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 }
  ]
}

const opt3 = {
  vu: 10,
  duration: "1m"
}

export const options = opt3

// const bunServerGetSuccess = new Counter("server_bun_get_success");
// const nodeServerGetSuccess = new Counter("server_node_get_success");

// export function bunServer() {
//   const res = http.get('http://202.157.185.246:4000');
//   if (res.status === 200) {
//     bunServerGetSuccess.add(1);
//   }
//   sleep(1)
// }

// export function nodeServer() {
//   const res = http.get('http://localhost:3001');
//   if (res.status === 200) {
//     nodeServerGetSuccess.add(1);
//   }
// }

export default function () {
  const res = http.get('http://localhost:4000');
  check(res, {
    'is status 2xx': (r) => r.status >= 200 && r.status < 300,
  });
}