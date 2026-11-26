import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  await connectDB(env.MONGO_URI);

  const app = createApp();
  app.listen(env.PORT, () => {
    console.log(`Baxter Nexus API listening on http://localhost:${env.PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start backend server:', err.message);
  process.exit(1);
});
