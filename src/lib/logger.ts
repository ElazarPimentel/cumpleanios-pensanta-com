"use server";

import Database from "better-sqlite3";
import path from "path";

// Log levels: 1=error, 2=warning, 3=info, 4=message, 5=debug
export type LogLevel = 1 | 2 | 3 | 4 | 5;

const LEVEL_NAMES: Record<LogLevel, string> = {
  1: "error",
  2: "warning",
  3: "info",
  4: "message",
  5: "debug",
};

// Get config from env
function getConfig() {
  const logLevel = parseInt(process.env.LOG_LEVEL || "0", 10);
  const logMode = parseInt(process.env.LOG_MODE || "0", 10);
  return { logLevel, logMode };
}

// SQLite connection (lazy init)
let sqliteDb: Database.Database | null = null;

function getSqliteDb(): Database.Database {
  if (!sqliteDb) {
    const dbPath = path.join(process.cwd(), "logs.db");
    sqliteDb = new Database(dbPath);
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level INTEGER NOT NULL,
        level_name TEXT NOT NULL,
        message TEXT NOT NULL,
        data TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `);
  }
  return sqliteDb;
}

// App DB connection (uses DATABASE_URL)
// Note: Install pg or mysql2 when using LOG_MODE=2
// pnpm add pg @types/pg (for postgres)
// pnpm add mysql2 (for mysql/mariadb)
async function logToAppDb(level: LogLevel, message: string, data?: unknown) {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("[logger] DATABASE_URL not set, cannot log to app db");
    return;
  }

  const dataStr = data ? JSON.stringify(data) : null;

  try {
    // Detect DB type from URL
    if (dbUrl.startsWith("postgres")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Pool } = require("pg");
      const pool = new Pool({ connectionString: dbUrl });
      await pool.query(
        `INSERT INTO logs (level, level_name, message, data, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [level, LEVEL_NAMES[level], message, dataStr]
      );
      await pool.end();
    } else if (dbUrl.startsWith("mysql") || dbUrl.startsWith("mariadb")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mysql = require("mysql2/promise");
      const conn = await mysql.createConnection(dbUrl);
      await conn.execute(
        `INSERT INTO logs (level, level_name, message, data, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [level, LEVEL_NAMES[level], message, dataStr]
      );
      await conn.end();
    } else {
      console.error("[logger] Unsupported DATABASE_URL format");
    }
  } catch (err) {
    console.error("[logger] Failed to log to app db:", err);
  }
}

// Main log function
export async function log(
  level: LogLevel,
  message: string,
  data?: unknown
): Promise<void> {
  const { logLevel, logMode } = getConfig();

  // Check if logging is enabled
  if (logMode === 0 || logLevel === 0) return;

  // Check if this level should be logged based on LOG_LEVEL config
  // LOG_LEVEL: 1=errors+warnings (levels 1-2), 2=+info (1-3), 3=+messages (1-4), 4=+debug+console (1-5)
  const maxLevel = logLevel + 1; // LOG_LEVEL 1 allows levels 1-2, etc.
  if (level > maxLevel) return;

  const dataStr = data ? JSON.stringify(data) : null;

  // Console output for LOG_LEVEL 4
  if (logLevel >= 4) {
    const prefix = `[${LEVEL_NAMES[level].toUpperCase()}]`;
    if (level === 1) {
      console.error(prefix, message, data ?? "");
    } else if (level === 2) {
      console.warn(prefix, message, data ?? "");
    } else {
      console.log(prefix, message, data ?? "");
    }
  }

  // SQLite (mode 1)
  if (logMode === 1) {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO logs (level, level_name, message, data) VALUES (?, ?, ?, ?)`
    );
    stmt.run(level, LEVEL_NAMES[level], message, dataStr);
  }

  // App DB (mode 2)
  if (logMode === 2) {
    await logToAppDb(level, message, data);
  }
}

// Convenience exports
export async function logError(message: string, data?: unknown) {
  return log(1, message, data);
}

export async function logWarning(message: string, data?: unknown) {
  return log(2, message, data);
}

export async function logInfo(message: string, data?: unknown) {
  return log(3, message, data);
}

export async function logMessage(message: string, data?: unknown) {
  return log(4, message, data);
}

export async function logDebug(message: string, data?: unknown) {
  return log(5, message, data);
}
