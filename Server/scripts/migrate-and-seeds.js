import { execSync } from "child_process";
import fs from "fs";
import crypto from "crypto";

const hashFile = "migrations-hash.txt";

// Función para obtener un hash de todos los archivos de migración y seed
function getMigrationsHash() {
  const files = [
    ...fs.readdirSync("./migrations").map((f) => "./migrations/" + f),
    ...fs.readdirSync("./seeders").map((f) => "./seeders/" + f),
  ];
  const content = files.map((f) => fs.readFileSync(f, "utf8")).join("");
  return crypto.createHash("sha256").update(content).digest("hex");
}

// Obtiene el hash actual y el previo guardado
const currentHash = getMigrationsHash();
const previousHash = fs.existsSync(hashFile)
  ? fs.readFileSync(hashFile, "utf8")
  : null;

if (currentHash !== previousHash) {
  console.log("🔄 Cambios detectados en migraciones o seeders. Ejecutando...");
  try {
    execSync("npx sequelize-cli db:migrate", { stdio: "inherit" });
    execSync("npx sequelize-cli db:seed:all", { stdio: "inherit" });
    fs.writeFileSync(hashFile, currentHash);
    console.log("✅ Migraciones y seeders actualizados correctamente.");
  } catch (err) {
    console.error("❌ Error ejecutando migraciones o seeders:", err);
    process.exit(1);
  }
} else {
  console.log("✅ Migraciones y seeders ya actualizados. No se ejecuta nada.");
}
