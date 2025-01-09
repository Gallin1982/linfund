'use strict';

import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

const products = {
  electronics: [
    { id: "A1", name: "Aspiradora", rrp: "99.99", info: "La aspiradora más potente del mundo." },
    { id: "A2", name: "Soplador de hojas", rrp: "303.33", info: "Este producto te dejará sin aliento." },
  ],
  confectionery: [
    { id: "B1", name: "Barra de Chocolate", rrp: "22.40", info: "Delicioso chocolate a sobreprecio." },
    { id: "B2", name: "Caña de Dulce", rrp: "5.99", info: "Dulce y refrescante para las fiestas." },
  ],
};

fastify.get('/products/:category', async (request, reply) => {
  const { category } = request.params;
  if (products[category]) {
    return products[category];
  } else {
    reply.code(404).send({ error: "Categoría no encontrada" });
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor ejecutándose en ${address}`);
});
