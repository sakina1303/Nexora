const express = require('express');
const prisma = require('../prisma');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { service: true }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { customerName, email, serviceId } = req.body;

    if (!customerName || !email || serviceId === undefined) {
      return res.status(400).json({ error: 'customerName, email, and serviceId are required.' });
    }

    const normalizedServiceId = Number(serviceId);
    if (Number.isNaN(normalizedServiceId)) {
      return res.status(400).json({ error: 'serviceId must be a number.' });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        email,
        serviceId: normalizedServiceId
      }
    });

    res.status(201).json(order);
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'serviceId does not exist.' });
    }
    next(error);
  }
});

module.exports = router;
