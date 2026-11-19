
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# ---- Palet ----
GREEN  = RGBColor(0x2E, 0x7D, 0x32)
ORANGE = RGBColor(0xE6, 0x51, 0x00)
BLUE   = RGBColor(0x02, 0x77, 0xBD)
DARK   = RGBColor(0x09, 0x17, 0x2C)
RED    = RGBColor(0xC2, 0x18, 0x5B)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT  = RGBColor(0x9C, 0xC6, 0xFF)
GREY   = RGBColor(0x60, 0x6C, 0x7B)

FOOTER = "TaniPintar Bot  ·  Progres 4 November 2026  ·  Capstone 2"

prs = Presentation()
SW, SH = prs.slide_width, prs.slide_height

def bg(slide, color):
    f = slide.background.fill; f.solid(); f.fore_color.rgb = color

def footer(slide):
    tb = slide.shapes.add_textbox(Inches(0.3), SH - Inches(0.42), SW - Inches(0.6), Inches(0.3))
    p = tb.text_frame.paragraphs[0]; p.text = FOOTER
    p.font.size = Pt(9); p.font.color.rgb = GREY; p.alignment = PP_ALIGN.RIGHT

def notes(slide, txt):
    slide.notes_slide.notes_text_frame.text = txt

def _style_title(slide, accent):
    t = slide.shapes.title.text_frame.paragraphs[0]
    t.font.color.rgb = accent; t.font.size = Pt(26); t.font.bold = True

# ---------- Slide types ----------
def s_title(title, sub, date_line):
    s = prs.slides.add_slide(prs.slide_layouts[6]); bg(s, DARK)
    tb = s.shapes.add_textbox(Inches(0.7), Inches(2.0), SW - Inches(1.4), Inches(2.6))
    tf = tb.text_frame; tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]; p.text = title
    p.font.size = Pt(32); p.font.bold = True; p.font.color.rgb = WHITE; p.alignment = PP_ALIGN.CENTER
    p2 = tf.add_paragraph(); p2.text = sub
    p2.font.size = Pt(17); p2.font.color.rgb = LIGHT; p2.alignment = PP_ALIGN.CENTER
    p3 = tf.add_paragraph(); p3.text = date_line
    p3.font.size = Pt(15); p3.font.bold = True; p3.font.color.rgb = GREEN; p3.alignment = PP_ALIGN.CENTER
    notes(s, "Buka presentasi. Sebutkan nama proyek, konteks Capstone 2, dan tekankan bahwa ini rekapan progres 4 Nov 2026 + roadmap ke depan.")
    return s

def s_divider(title, desc, color=ORANGE):
    s = prs.slides.add_slide(prs.slide_layouts[6]); bg(s, color)
    tb = s.shapes.add_textbox(Inches(0.7), Inches(2.4), SW - Inches(1.4), Inches(2.2))
    tf = tb.text_frame; tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]; p.text = title
    p.font.size = Pt(30); p.font.bold = True; p.font.color.rgb = WHITE; p.alignment = PP_ALIGN.CENTER
    p2 = tf.add_paragraph(); p2.text = desc
    p2.font.size = Pt(15); p2.font.color.rgb = WHITE; p2.alignment = PP_ALIGN.CENTER
    footer(s)
    return s

def s_bullets(title, items, accent=BLUE, note=""):
    s = prs.slides.add_slide(prs.slide_layouts[1]); _style_title(s, accent)
    body = s.placeholders[1].text_frame; body.word_wrap = True
    first = True
    for lvl, txt in items:
        p = body.paragraphs[0] if first else body.add_paragraph()
        first = False; p.text = txt; p.level = lvl
        p.font.size = Pt(15 if lvl == 0 else 13)
        if lvl == 0: p.font.bold = True
    footer(s)
    if note: notes(s, note)
    return s

def s_table(title, headers, rows, accent=GREEN, note=""):
    s = prs.slides.add_slide(prs.slide_layouts[5]); _style_title(s, accent)
    nr, nc = len(rows) + 1, len(headers)
    gf = s.shapes.add_table(nr, nc, Inches(0.5), Inches(1.6), SW - Inches(1.0), Inches(0.45 * nr))
    tbl = gf.table
    for j, h in enumerate(headers):
        c = tbl.cell(0, j); c.text = h
        pr = c.text_frame.paragraphs[0]; pr.font.bold = True; pr.font.size = Pt(12); pr.font.color.rgb = WHITE
    for i, row in enumerate(rows, 1):
        for j, v in enumerate(row):
            c = tbl.cell(i, j); c.text = str(v); c.text_frame.paragraphs[0].font.size = Pt(11)
    footer(s)
    if note: notes(s, note)
    return s

def _place_image_or_ph(s, path, left, top, width, height, caption):
    if path and os.path.exists(path):
        s.shapes.add_picture(path, left, top, width=width, height=height)
    else:
        bx = s.shapes.add_shape(1, left, top, width, height)  # rectangle
        bx.fill.solid(); bx.fill.fore_color.rgb = RGBColor(0xEC, 0xEF, 0xF1)
        bx.line.color.rgb = GREY
        tf = bx.text_frame; tf.word_wrap = True; tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = tf.paragraphs[0]; p.text = "[ GAMBAR: " + (caption or os.path.basename(path or "-")) + " ]"
        p.font.size = Pt(13); p.font.bold = True; p.font.color.rgb = DARK; p.alignment = PP_ALIGN.CENTER
        p2 = tf.add_paragraph(); p2.text = "Taruh file '" + (os.path.basename(path) if path else "?") + "' di folder ini agar otomatis terpasang."
        p2.font.size = Pt(10); p2.font.color.rgb = GREY; p2.alignment = PP_ALIGN.CENTER

def s_image(title, img, caption, accent=ORANGE, note="", extra=None):
    s = prs.slides.add_slide(prs.slide_layouts[5]); _style_title(s, accent)
    _place_image_or_ph(s, img, Inches(1.4), Inches(1.5), SW - Inches(2.8), Inches(4.6), caption)
    if extra:
        tb = s.shapes.add_textbox(Inches(0.6), Inches(6.2), SW - Inches(1.2), Inches(0.9))
        tf = tb.text_frame; tf.word_wrap = True
        for i, line in enumerate(extra):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.text = line; p.font.size = Pt(12); p.font.color.rgb = DARK
    footer(s)
    if note: notes(s, note)
    return s

def s_two_col(title, left_items, img, cap, accent=BLUE, note=""):
    s = prs.slides.add_slide(prs.slide_layouts[5]); _style_title(s, accent)
    tb = s.shapes.add_textbox(Inches(0.5), Inches(1.5), Inches(6.6), Inches(5.0))
    tf = tb.text_frame; tf.word_wrap = True
    first = True
    for lvl, txt in left_items:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False; p.text = ("• " if lvl == 0 else "   – ") + txt; p.level = lvl
        p.font.size = Pt(14 if lvl == 0 else 12)
        if lvl == 0: p.font.bold = True
    _place_image_or_ph(s, img, Inches(7.3), Inches(1.5), Inches(5.4), Inches(4.6), cap)
    footer(s)
    if note: notes(s, note)
    return s

# ============ 17 SLIDES ============
# 1
s_title("TaniPintar Bot: WhatsApp AI Support Agent with RAG & Memory",
        "Capstone 2 · Rekapan Progres & Roadmap Arsitektur",
        "Progres per 4 November 2026")

# 2
s_bullets("Agenda Presentasi", [
    (0, "BAGIAN A — Progres Hari Ini (4 Nov 2026)"),
    (1, "Finalisasi Blueprint Arsitektur Sistem v2.0 (Source of Truth)"),
    (1, "Plan Eksekusi P0 & Perbaikan Dokumentasi"),
    (0, "BAGIAN B — Planning Ke Depan"),
    (1, "Migrasi infrastruktur ke Tencent Cloud (Cloud-Native, Modular Monolith, Event-Driven)"),
    (1, "Desain database domain-based & strategi Vector Database"),
    (1, "Roadmap migrasi & tahapan implementasi"),
], accent=DARK,
   note="Jelaskan pembagian: slide 3-11 = apa yang selesai hari ini (dari arsitektur.md & plan_eksekusi_p0). Slide 12-16 = rencana ke depan (dari arsitektur.txt, ERD, diagram mermaid, screenshot VectorDB).")

# 3
s_divider("BAGIAN A · PROGRES HARI INI", "4 November 2026 — Blueprint v2.0 + Plan Eksekusi P0")

# 4
s_bullets("Executive Summary & 4 Pilar Desain Inti", [
    (0, "TaniPintar = asisten agronomis WhatsApp multimodal (cabai & padi)"),
    (1, "Skrining hama/penyakit · harga pasar · cuaca mikrolokal · nutrisi & pestisida berimbang"),
    (0, "Pilar 1 — Deep Modules & Seams"),
    (1, "Antarmuka ramping; sembunyikan kompleksitas (OpenCV, embedding, weather cascade)"),
    (0, "Pilar 2 — 3-Tier Layer Invariance"),
    (1, "Transport (FastAPI) / Domain (LangGraph) / Repository (Supabase, pgvector, WAHA, Gemini)"),
    (0, "Pilar 3 — Decision-Support Ethics (Anti Over-Claim)"),
    (1, "Wajib estimasi Taraf Serangan + rekomendasi konsultasi fisik ke PPL"),
    (0, "Pilar 4 — Multi-Modal Token Frugality"),
    (1, "Gatekeeper OpenCV <15 ms cegah input tak layak ke LLM (hemat 100% token)"),
], note="Ini ringkasan bab 1 arsitektur.md. Tekankan 4 pilar sebagai fondasi rekayasa, bukan sekadar fitur.")

# 5
s_image("Arsitektur Tingkat Tinggi (C4 Container Model)", "img_c4.png",
        "Render Mermaid C4 dari arsitektur.md",
        note="Diagram C4: Klien (Petani/PPL) → WhatsApp Gateway (WAHA + Meta Cloud) → App Server 3-Tier (FastAPI+Python3.12) → Supabase Cloud (PostgreSQL+pgvector+Storage) → External API (Gemini, BMKG, WeatherAPI, Open-Meteo). Export dari mermaid.live ke PNG lalu namakan img_c4.png.",
        extra=["Dual gateway WAHA + Meta Cloud · 3-Tier keras · pgvector 768-dim IVFFlat · failover cuaca 3 lapis."])

# 6
s_bullets("Orkestrasi LangGraph — 14-Node State Machine", [
    (0, "State terstruktur: TaniState (TypedDict)"),
    (0, "Router → 14 node pekerja:"),
    (1, "vision · diagnosis · price · history · weather · fertilizer · greeting"),
    (1, "photo_instruction · disease_text_prompt · price_prompt · price_region_prompt"),
    (1, "weather_prompt · fertilizer_prompt"),
    (0, "→ format_and_guardrail_node (anti over-claim) → audit_saver_node"),
    (0, "Fitur Unggulan:"),
    (1, "User Context Priority Principle — koreksi petani mengalahkan inferensi visual"),
    (1, "Auto-Reset Sesi 30 Menit + alert transparan"),
], accent=ORANGE,
   note="Bab 3 arsitektur.md. Jelaskan router sebagai intent classifier, lalu 14 node, lalu guardrail formatter, lalu audit saver. Sebut 2 fitur unggulan.")

# 7
s_table("Pipeline Computer Vision & Gating Efisiensi Token",
    ["Metrik Kualitas", "Ambang Batas", "Metode", "Dampak"],
    [
        ["Dimensi Minimum", "≥ 200×200 px", "image.shape[:2]", "Tolak thumbnail rusak"],
        ["Iluminasi", "30.0 ≤ B̄ ≤ 242.0", "grayscale mean", "Tolak gelap/silau"],
        ["Ketajaman", "Laplacian var ≥ 35.0", "cv2.Laplacian().var()", "Tolak motion blur"],
        ["Proporsi Tanaman", "≥ 8.0% bidang", "segmentasi HSV", "Tolak non-tanaman"],
        ["Latensi Gatekeeper", "< 15 ms (CPU)", "OpenCV native", "Hemat 258–1000+ token/penolakan"],
    ],
    note="Bab 4 arsitektur.md. Ini tabel parameter gatekeeper. Poin kunci: penolakan terjadi di CPU lokal <15 ms sehingga 0 token Gemini terpakai untuk input cacat.")

# 8
s_bullets("Arsitektur Dual-RAG (Semantic Text + Visual)", [
    (0, "Text RAG Pipeline"),
    (1, "Query → text-embedding-004 (768d) → RPC match_knowledge (cosine)"),
    (1, "11 SOP Penyakit Resmi Kementan (6 cabai, 5 padi) → konteks agronomi"),
    (0, "Visual-to-Visual RAG Pipeline"),
    (1, "Foto lolos OpenCV → visual embedding 768d"),
    (1, "RAM cache np.dot (72 foto <5 ms) → fallback pgvector → top-1 referensi"),
    (0, "Sintesis: Gemini 3.5 Flash Multimodal"),
    (1, "Output decision-support + foto referensi (bukan kepastian lab)"),
], accent=BLUE,
   note="Bab 5 arsitektur.md. Dua pipeline RAG berjalan simultan lalu digabung di synthesizer Gemini. Tekankan visual RAG pakai cache RAM dulu, pgvector sebagai fallback.")

# 9
s_bullets("Arsitektur Keamanan & Privasi (P0 Hardened)", [
    (0, "Gerbang Keamanan Masuk (fail-closed)"),
    (1, "/api/v1/admin/* → wajib header X-Admin-Key valid (semua environment)"),
    (1, "/webhook (WAHA) production → verifikasi HMAC SHA-512 body"),
    (1, "Secret tidak dikonfigurasi → TOLAK request (fail-closed)"),
    (0, "Proteksi Privasi Data Petani"),
    (1, "PhoneMaskingFormatter → sensor nomor: 62812****6789"),
    (1, "CORS allow_origins=['*'] + allow_credentials=False (anti-CSRF, W3C spec)"),
], accent=RED,
   note="Bab 9 arsitektur.md. Jelaskan pola fail-closed: kalau secret belum diset, request ditolak, bukan diterima diam-diam. Plus masking nomor & aturan CORS yang benar.")

# 10
s_table("Metrik Kinerja (SLA) & Pola Ketahanan Sistem",
    ["Komponen", "Target Latensi", "Mekanisme Optimasi"],
    [
        ["Transport Webhook", "≤ 200 ms", "FastAPI BackgroundTasks (ACK instan)"],
        ["OpenCV Gatekeeper", "≤ 15 ms", "Komputasi matriks C++ native"],
        ["Visual RAG Cosine", "≤ 10 ms", "RAM cache ndarray float32"],
        ["Semantic RAG pgvector", "≤ 350 ms", "Indeks IVFFlat + RPC"],
        ["Gemini Multimodal", "≤ 1800 ms", "gemini-3.5-flash, token budget"],
        ["TOTAL Round-Trip", "≤ 2500 ms", "Pipeline terpadu"],
        ["Resilience", "—", "Supabase offline fallback · weather 3-tier · LRU dedup"],
    ],
    note="Bab 10 arsitektur.md. Tunjukkan alokasi latensi per komponen hingga total ≤2.5 detik, lalu baris resilience: graceful degradation saat Supabase down, failover cuaca, dedup anti re-entrancy.")

# 11
s_bullets("Rekap Progres 4 November 2026 — Deliverable", [
    (0, "✅ Blueprint Arsitektur Sistem v2.0 terfinalisasi"),
    (1, "Dokumen acuan resmi (Source of Truth) untuk kode, uji integrasi & laporan Capstone 2"),
    (0, "✅ Plan Eksekusi P0 & Perbaikan tersusun"),
    (1, "Hardening keamanan fail-closed (admin key, HMAC, masking, CORS)"),
    (1, "Tokenomics gatekeeper OpenCV (<15 ms, 0 token untuk input cacat)"),
    (1, "Dual-RAG (text + visual) & State Machine 14-node + guardrail anti over-claim"),
    (1, "SLA latensi & Resilience/Failover matrix terdokumentasi"),
    (0, "✅ Dokumentasi MD diperbaiki & diselaraskan dengan implementasi kode"),
], accent=GREEN,
   note="Penutup Bagian A. Ini bukti kerja hari ini: dua dokumen (arsitektur.md v2.0 + plan_eksekusi_p0) selesai dan selaras dengan kode.")

# 12
s_divider("BAGIAN B · PLANNING KE DEPAN",
          "Migrasi Tencent Cloud · Database Domain-Based · Vector DB · Roadmap", color=BLUE)

# 13
s_image("Target Arsitektur — Tencent Cloud", "img_tencent.png",
        "Render Mermaid arsitektur.txt",
        accent=BLUE,
        note="Berasal dari arsitektur.txt. Prinsip: Cloud-Native, Modular Monolith, Event-Driven — BUKAN microservice prematur di VPS 2GB. Stack: Lighthouse SG 2vCPU/2GB (Nginx+FastAPI+WAHA+Redis+Worker+LangGraph+Agents+Audit), CloudBase PG Mode (PostgreSQL/Auth/RLS/pgvector), Cloud Storage, TokenHub (Hy3/Vision/embedding), BMKG & harga terverifikasi. Batas: jangan jalankan PostgreSQL/Ollama/VectorDB lokal; OpenCV dibatasi ukuran & konkurensi.",
        extra=["Modul backend tetap 1 FastAPI + 1 worker (bukan 1 container/agent). Auth disesuaikan mekanisme CloudBase PG Mode."])

# 14
s_image("Rancangan Database Domain-Based (ERD)", "img_erdd.png",
        "ERD dari arsitektur.txt",
        accent=GREEN,
        note="Berasal dari arsitektur.txt (bukan SQL final, masih konseptual). Alur: USERS→CONSULTATIONS→MESSAGES/DIAGNOSES→DIAGNOSIS_IMAGES; USER_LOCATIONS→WEATHER_RECORDS; PLANT_DISEASES→DISEASE_TREATMENTS/DISEASE_IMAGES; COMMODITIES→MARKET_PRICES; AUDIT_LOGS. Schema split: auth/public/storage/extensions. Aturan vector: embedding teks & visual TERPISAH; dimensi ikut model (1024/2048); jangan campur model; catat model_version.",
        extra=["Pemisahan domain mencegah data konsultasi bercampur katalog & operasional. Skema nyata dicocokkan dgn tabel/FK/RPC/trigger/RLS Supabase existing."])

# 15
s_two_col("Strategi Vector Database (MVP → Scale)", [
    (0, "MVP — pgvector (CloudBase PG Mode)"),
    (1, "Satu sumber kebenaran bersama data relasional; hemat biaya & ops"),
    (0, "Scale-up — Tencent Cloud VectorDB"),
    (1, "Dipakai saat corpus & QPS retrieval membesar"),
    (0, "Alur VectorDB (rujukan screenshot):"),
    (1, "Generation: Split → Embedding → Insert"),
    (1, "Retrieval: Embed Question → Vector Query → Top Similar → LLM → Answer"),
    (0, "Keputusan: mulai pgvector, evaluasi VectorDB bertahap"),
], "img_vectordb.png", "Screenshot Tencent Cloud VectorDB",
   accent=BLUE,
   note="Kiri = poin strategi. Kanan = screenshot produk Tencent Cloud VectorDB (knowledge base generation & retrieval) sebagai ilustrasi alur. Keputusan: MVP pakai pgvector dulu karena satu sumber kebenaran; VectorDB saat scale. Nama model embedding kandidat: kinfra-text-embedding-0.6b & kinfra-vl-embedding-2b (verifikasi dimensi sebelum pakai).")

# 16
s_bullets("Roadmap Migrasi & Tahapan Implementasi", [
    (0, "Fase Orkestrasi Kontainer:"),
    (1, "1 MVP (VPS 2 GB, Docker Compose) → 2 Stabil (VPS 4 GB, K3s)"),
    (1, "3 Scale (multi-node K3s/K8s) → 4 Production (K8s + observability)"),
    (0, "Migrasi Supabase → Tencent (8 langkah):"),
    (1, "Audit → Staging CloudBase → Migrasi DB → Storage → Auth → AI Adapter → Integration Test → Cutover"),
    (1, "Jangan hapus Supabase sebelum semua tervalidasi"),
    (0, "Monitoring & Ketahanan:"),
    (1, "CPU/RAM/disk · API & AI latency · queue depth · webhook failure · DB conn · error rate"),
    (1, "Retry berbatas + Dead-Letter Queue + timeout + idempotency"),
], accent=ORANGE,
   note="Bab 8-10 arsitektur.txt. Tekankan K8s bertahap (jangan dipaksakan di 2GB). 8 langkah migrasi harus berurutan & cutover hanya setelah validasi. Monitoring mencakup metrik resource + latensi + queue + error.")

# 17
s_bullets("Penutup & Next Steps", [
    (0, "Progres 4 Nov 2026 SELESAI:"),
    (1, "Blueprint arsitektur v2.0 + Plan Eksekusi P0 (Source of Truth Capstone 2)"),
    (0, "Langkah Berikutnya:"),
    (1, "Audit repository TaniPintar aktual"),
    (1, "Tulis ARCHITECTURE.md, MIGRATION_PLAN.md, IMPLEMENTATION_PLAN.md"),
    (1, "Implementasi adapter TokenHub & CloudBase bertahap (tanpa merusak fitur berjalan)"),
    (0, "Catatan Biaya:"),
    (1, "Hitung CloudBase, Storage, TokenHub, bandwidth TERPISAH dari promo Lighthouse"),
    (0, "Terima kasih · Sesi Tanya Jawab"),
], accent=GREEN,
   note="Tutup dengan menegaskan progres hari ini selesai, lalu next steps konkret (audit repo + 3 dokumen + adapter bertahap). Ingatkan biaya layanan cloud dihitung terpisah dari promo VPS.")

out = "TaniPintar_Bot_Capstone2.pptx"
prs.save(out)
print(f"OK -> {out}  ({len(prs.slides._sldIdLst)} slide)")
print("Gambar opsional yang akan otomatis terpasang bila ada di folder:")
for f in ["img_c4.png", "img_tencent.png", "img_erdd.png", "img_vectordb.png"]:
    print("  -", f, "(ada)" if os.path.exists(f) else "(tidak ada -> pakai placeholder)")