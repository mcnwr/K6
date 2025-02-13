import http from 'k6/http';
import { Counter } from "k6/metrics";

export const options = {
  thresholds: {
    server_bun_get_success: ['count>190'],
    server_node_get_success: ['count>190'],
  },
  scenarios: {
    bunServer: {
      exec: "bunServer", // Must match a function name
      executor: "constant-vus",
      vus: 10,
      duration: "10s"
    },
    nodeServer: {
      exec: "nodeServer", // Must match a function name
      executor: "constant-vus",
      vus: 10,
      duration: "10s"
    }
  }
};

const bunServerGetSuccess = new Counter("server_bun_get_success");
const nodeServerGetSuccess = new Counter("server_node_get_success");

export function bunServer() {
  const res = http.get('http://localhost:3000');
  if (res.status === 200) {
    bunServerGetSuccess.add(1);
  }
}

export function nodeServer() {
  const res = http.get('http://localhost:3001');
  if (res.status === 200) {
    nodeServerGetSuccess.add(1);
  }
}
