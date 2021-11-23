import type { NextApiRequest, NextApiResponse } from "next";

export default async function apiProxyHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.url) {
    const { search } = new URL(req.url, "http://a.b");
    const query = req.query.query as string[];
    const pathname = query.join("/");
    const fetchUrl = `${process.env.BACKEND_URL}/${pathname}${search}`;
    const headers = req.headers as HeadersInit;
    await fetch(fetchUrl, {
      method: req.method,
      headers,
      body: req.body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return res
          .status(response.status)
          .json(`${response.statusText}: ${fetchUrl}`);
      })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        }
      })
      .catch((error) => {
        res.status(500).json(`${error.toString()}: ${fetchUrl}`);
      });
  }
}
