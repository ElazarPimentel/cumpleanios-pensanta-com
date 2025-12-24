// Quick test script - run with: npx tsx src/lib/test-logger.ts
import Database from "better-sqlite3";
import path from "path";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

type LogLevel = 1 | 2 | 3 | 4 | 5;

const LEVEL_NAMES: Record<LogLevel, string> = {
  1: "error",
  2: "warning",
  3: "info",
  4: "message",
  5: "debug",
};

function getConfig() {
  const logLevel = parseInt(process.env.LOG_LEVEL || "0", 10);
  const logMode = parseInt(process.env.LOG_MODE || "0", 10);
  return { logLevel, logMode };
}

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

function log(level: LogLevel, message: string, data?: unknown): void {
  const { logLevel, logMode } = getConfig();
  if (logMode === 0 || logLevel === 0) return;
  const maxLevel = logLevel + 1;
  if (level > maxLevel) return;

  const dataStr = data ? JSON.stringify(data) : null;

  if (logLevel >= 4) {
    const prefix = `[${LEVEL_NAMES[level].toUpperCase()}]`;
    console.log(prefix, message, data ?? "");
  }

  if (logMode === 1) {
    const db = getSqliteDb();
    const stmt = db.prepare(
      `INSERT INTO logs (level, level_name, message, data) VALUES (?, ?, ?, ?)`
    );
    stmt.run(level, LEVEL_NAMES[level], message, dataStr);
  }
}

console.log("Testing logger...");
console.log("Config:", getConfig());
console.log("");

log(1, "Test error message", { code: 500, details: "Something broke" });
log(2, "Test warning message", { userId: 123 });
log(3, "Test info message");
log(4, "Test message", { action: "button_click" });
log(5, "Test debug message", { verbose: true, items: [1, 2, 3] });

console.log("\nDone! Check logs.db with: sqlite3 logs.db 'SELECT * FROM logs'");
