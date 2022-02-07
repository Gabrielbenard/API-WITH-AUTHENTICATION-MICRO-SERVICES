import { Pool } from "pg";

//pegamos o Pool do banco de dados PostGres

const connectionString = 'postgres://qsoolaax:g3HOIho9UEBA3IMVvmAkuvjD4wi46mlA@kesavan.db.elephantsql.com/qsoolaax';

//quero um novo Pool com base nas configurações "connectionString"

const db = new Pool({ connectionString});

// não se esquercer de exportar o pool 

export default db