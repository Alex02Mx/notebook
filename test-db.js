import mariadb from 'mariadb';

// Configuración de la conexión
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user: 'node_user',      // El usuario que creamos antes
     password: 'proyectsDB', // La contraseña que elegiste en Linux
     database: 'notebook_test',
     connectionLimit: 5
});

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("-----------------------------------------");
        console.log("✅ ¡Conexión exitosa a MariaDB!");
        
        // Hagamos una consulta simple para estar 100% seguros
        const res = await conn.query("SELECT DATABASE() as db");
        console.log("🛰️  Conectado a la base de datos:", res[0].db);
        console.log("-----------------------------------------");

    } catch (err) {
        console.error("❌ Error al conectar:");
        console.error(err);
    } finally {
        if (conn) conn.end();
        process.exit();
    }
}

testConnection();