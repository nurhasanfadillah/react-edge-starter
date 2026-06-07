#!/usr/bin/env node

/**
 * react-edge-starter — setup script
 *
 * Jalankan sekali setelah clone untuk:
 *   - Reset git history (putus dari repo boilerplate)
 *   - Hapus file internal boilerplate (.paul, .spec-workflow, .turbo/cache)
 *   - Ganti nama project di package.json
 *   - Inisialisasi commit pertama
 *   - Set remote git (opsional)
 */

const { execSync } = require('child_process')
const { rmSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { createInterface } = require('readline')
const { resolve, basename } = require('path')

// ─── helpers ─────────────────────────────────────────────────────────────────

const ROOT = resolve(__dirname, '..')

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
}

const c = (color, text) => `${colors[color]}${text}${colors.reset}`

function log(msg) {
  console.log(msg)
}

function step(msg) {
  console.log(`\n${c('cyan', '→')} ${msg}`)
}

function ok(msg) {
  console.log(`  ${c('green', '✓')} ${msg}`)
}

function warn(msg) {
  console.log(`  ${c('yellow', '!')} ${msg}`)
}

function err(msg) {
  console.error(`  ${c('red', '✗')} ${msg}`)
}

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { cwd: ROOT, stdio: opts.silent ? 'pipe' : 'inherit' })
    return true
  } catch (e) {
    if (!opts.ignoreError) throw e
    return false
  }
}

function ask(rl, question) {
  return new Promise((res) => rl.question(question, res))
}

function removeDir(rel) {
  const abs = resolve(ROOT, rel)
  if (existsSync(abs)) {
    rmSync(abs, { recursive: true, force: true })
    ok(`Dihapus: ${rel}`)
  }
}

// ─── main ────────────────────────────────────────────────────────────────────

async function main() {
  log('')
  log(c('bold', '╔══════════════════════════════════════════╗'))
  log(c('bold', '║   react-edge-starter — Project Setup     ║'))
  log(c('bold', '╚══════════════════════════════════════════╝'))
  log('')
  log(c('dim', 'Script ini akan:'))
  log(c('dim', '  • Reset git history (putus dari repo asal)'))
  log(c('dim', '  • Hapus file internal boilerplate'))
  log(c('dim', '  • Ganti nama project di package.json'))
  log(c('dim', '  • Buat commit pertama'))
  log(c('dim', '  • Set remote git (opsional)'))
  log('')

  const rl = createInterface({ input: process.stdin, output: process.stdout })

  // ── 1. nama project ──────────────────────────────────────────────────────
  const defaultName = basename(ROOT)
  const rawName = await ask(rl, `Nama project ${c('dim', `(default: ${defaultName})`)} : `)
  const projectName = rawName.trim() || defaultName

  // ── 2. remote URL ────────────────────────────────────────────────────────
  const remoteUrl = await ask(
    rl,
    `Remote git URL ${c('dim', '(kosongkan untuk skip)')} : `,
  )

  // ── 3. hapus docs ────────────────────────────────────────────────────────
  const keepDocs = await ask(
    rl,
    `Simpan folder docs/ (README komponen & codebase)? ${c('dim', '(Y/n)')} : `,
  )

  rl.close()

  log('')

  // ── eksekusi ─────────────────────────────────────────────────────────────

  // 1. hapus folder boilerplate-internal
  step('Menghapus file internal boilerplate...')
  removeDir('.paul')
  removeDir('.spec-workflow')
  removeDir('.turbo/cache')

  if (keepDocs.trim().toLowerCase() === 'n') {
    removeDir('docs')
    ok('Folder docs/ dihapus')
  } else {
    ok('Folder docs/ dipertahankan')
  }

  // 2. update package.json
  step(`Mengupdate nama project → ${c('cyan', projectName)}`)
  const pkgPath = resolve(ROOT, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  pkg.name = projectName
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  ok('package.json diperbarui')

  // 3. reset git
  step('Reset git history...')
  removeDir('.git')
  run('git init', { silent: true })
  run('git add .', { silent: true })
  run(
    `git commit -m "chore: initial setup from react-edge-starter"`,
    { silent: true },
  )
  ok('Git diinisialisasi dengan fresh history')

  // 4. set remote (opsional)
  if (remoteUrl.trim()) {
    step('Menambahkan remote origin...')
    run(`git remote add origin ${remoteUrl.trim()}`, { silent: true })
    ok(`Remote origin → ${remoteUrl.trim()}`)

    log('')
    warn(`Untuk push ke remote, jalankan:`)
    log(`     ${c('cyan', 'git push -u origin main')}`)
  }

  // ── selesai ───────────────────────────────────────────────────────────────
  log('')
  log(c('green', c('bold', '  Setup selesai! Langkah berikutnya:')))
  log('')
  log(`  1. ${c('cyan', 'cp .env.example .env')}  dan isi DATABASE_URL`)
  log(`  2. ${c('cyan', 'pnpm install')}`)
  log(`  3. ${c('cyan', 'pnpm dev')}`)
  log('')
}

main().catch((e) => {
  err(`Setup gagal: ${e.message}`)
  process.exit(1)
})
