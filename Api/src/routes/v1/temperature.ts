import express from 'express';
const router = express.Router();

router.get('/', function(req: any, res: any, next: any) {
  throw new Error('Index')
});

export default router;
