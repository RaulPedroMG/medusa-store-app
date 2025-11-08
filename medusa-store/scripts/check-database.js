const { Pool } = require("pg");

// Obtener la URL de la base de datos desde la variable de entorno
const dbUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@medusa-database:5432/medusa-db";

console.log("Verificando conexión a la base de datos...");
console.log(`URL de conexión: ${dbUrl}`);

// Crear un cliente PostgreSQL
const pool = new Pool({
  connectionString: dbUrl,
});

// Función principal asíncrona para verificar la conexión y las tablas
async function checkDatabase() {
  try {
    // Conectar a la base de datos
    const client = await pool.connect();
    console.log("✅ Conexión exitosa a la base de datos");

    try {
      // Verificar si existen tablas creadas por Medusa
      const tablesQuery = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
      `;

      const { rows } = await client.query(tablesQuery);

      if (rows.length === 0) {
        console.log(
          "⚠️ No se encontraron tablas en la base de datos. Es posible que Medusa no haya completado las migraciones.",
        );
        process.exit(1);
      } else {
        console.log(
          `✅ Se encontraron ${rows.length} tablas en la base de datos:`,
        );

        // Mostrar solo hasta 10 tablas para no saturar la salida
        const tablesToShow = rows.slice(0, 10);
        tablesToShow.forEach((row) => console.log(`   - ${row.table_name}`));

        if (rows.length > 10) {
          console.log(`   ... y ${rows.length - 10} más`);
        }

        // Verificar tablas específicas de Medusa
        const medusaTables = [
          "user",
          "product",
          "customer",
          "order",
          "region",
          "store",
        ];
        const missingTables = medusaTables.filter(
          (table) => !rows.some((row) => row.table_name === table),
        );

        if (missingTables.length > 0) {
          console.log("⚠️ Faltan algunas tablas esenciales de Medusa:");
          missingTables.forEach((table) => console.log(`   - ${table}`));
          console.log(
            "Es posible que las migraciones no se hayan ejecutado correctamente.",
          );
          process.exit(1);
        } else {
          console.log(
            "✅ Se encontraron todas las tablas esenciales de Medusa",
          );
          process.exit(0);
        }
      }
    } finally {
      // Siempre liberar el cliente
      client.release();
    }
  } catch (error) {
    console.error("❌ Error al verificar la base de datos:", error.message);
    process.exit(1);
  } finally {
    // Cerrar el pool
    await pool.end();
  }
}

// Ejecutar la función principal
checkDatabase().catch((err) => {
  console.error("Error no controlado:", err);
  process.exit(1);
});
