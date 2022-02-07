import { Pool } from "pg";

//pegamos o Pool do banco de dados PostGres

const connectionString = 'url do banco de dados postgre';

//quero um novo Pool com base nas configurações "connectionString"

const db = new Pool({ connectionString});

// não se esquercer de exportar o pool 

export default db
