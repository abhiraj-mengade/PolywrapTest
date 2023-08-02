import { PolywrapClient } from "@polywrap/client-js";

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

  export const getresponse=async (url) => {
    const client = new PolywrapClient();
    const result = await client.invoke({
        uri: "wrapscan.io/polywrap/http@1.0",
        method: "get",
        args: {
          url: url,
          request: {
            responseType: "TEXT",
            urlParams: [{key: "query", value: "foo"}],
            headers: [{key: "X-Request-Header", value: "req-foo"}],
          }
        }
      })

      return result.value.body;
    }
