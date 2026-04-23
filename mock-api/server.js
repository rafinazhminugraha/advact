import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");

const server = jsonServer.create();
const router = jsonServer.router(dbPath);

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

server.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const db = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  const user = db.users.find((u) => u.email === email);

  if (!user || password !== "password123") {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: `mock-token-${user.id}`,
  });
});

server.use("/api", router);

server.listen(3001, () => {
  console.log("Mock API running at http://localhost:3001");
});
