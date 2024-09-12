import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
  const { method, originalUrl } = req;

  console.error(`
    ===== 404 Not Found =====
      Status Code: 404
      Message: Not Found
      Path: ${originalUrl}
      Method: ${method}
      Body: ${JSON.stringify(req.body)}
      Params: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
    =========================
  `);
  res.status(404).json({ message: 'Not Found' });
};

export default notFoundHandler;
