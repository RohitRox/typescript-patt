import express from 'express';

import { ServiceStatusController } from '../controllers';
import { IAuthRequest } from 'sputnik-app-kit';

const router = express.Router();

router.get('/service-status', (iReq, res) => {
  const req = iReq as IAuthRequest;
  return new ServiceStatusController(req, res).handler()
});

export default router;
