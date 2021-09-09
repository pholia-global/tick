import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

import type { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function getSessionId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession(req, res);
    res.status(200).json({ session });
  } catch (error) {
    console.error(error);
  }
});
