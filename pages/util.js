import { PolywrapClient } from "@polywrap/client-js";
import IpfsHttpClientLite from "ipfs-http-client-lite";

export const encrypt = async (strings) => {
  const client = new PolywrapClient();
  const res = [];
  for (const string of strings) {
    const result = await client.invoke({
      uri: "ens/greentrust.eth",
      method: "encrypt",
      args: {
        text: string,
      },
    });
    res.push(result.value);
  }
  return res;
};

export const decrypt = async (strings) => {
  const client = new PolywrapClient();
  const res = [];
  for (const string of strings) {
    const result = await client.query({
      uri: "ens/greentrust.eth",
      method: "decrypt",
      args: {
        text: string,
      },
    });
    res.push(result.value);
  }
  return res;
};

export const getresponse = async (url) => {
  const client = new PolywrapClient();
  const result = await client.invoke({
    uri: "wrapscan.io/polywrap/http@1.0",
    method: "get",
    args: {
      url: url,
      request: {
        responseType: "TEXT",
        urlParams: [{ key: "query", value: "foo" }],
        headers: [{ key: "X-Request-Header", value: "req-foo" }],
      },
    },
  });

  return result.value.body;
};

export const uploadString = async (string) => {
  const projectId = "2Ln8ZP0EreH0IInN40eJm52wZa7";
  const projectSecret = "ffc9d27761543211de14432fee351c80";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfs = IpfsHttpClientLite({
    apiUrl: "https://ipfs.infura.io:5001",
    headers: {
      Authorization: auth,
    },
  });

  const cid = await ipfs.add(string);
  return cid;
};

export const downloadString = async (cid) => {
  const client = new PolywrapClient();
  const projectId = "2Ln8ZP0EreH0IInN40eJm52wZa7";
  const projectSecret = "ffc9d27761543211de14432fee351c80";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const result = await client.invoke({
    uri: "ens/wraps.eth:ipfs-http-client@1.0.0",
    method: "cat",
    args: {
      cid: cid,
      ipfsProvider: "https://ipfs.infura.io:5001",
      Authorization: auth,
    },
  });
  return result.value;
  // const projectId = "2Ln8ZP0EreH0IInN40eJm52wZa7";
  // const projectSecret = "ffc9d27761543211de14432fee351c80";
  // const auth =
  //   "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  // // const client = new IpfsHttpClientLite();

  // const ipfs = IpfsHttpClientLite({
  //   apiUrl: "https://ipfs.infura.io:5001",
  //   headers: {
  //     Authorization: auth,
  //   },
  // });
  // const res = ipfs.cat(cid);
  // return res;
};
