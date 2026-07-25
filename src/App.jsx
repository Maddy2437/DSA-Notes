import { useState, useMemo, useRef, useEffect } from "react";

// ─── STYLES ──────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0f;--bg2:#12121a;--bg3:#1a1a26;--bg4:#22223a;
  --accent:#7c5cfc;--accent2:#c084fc;--accent3:#06ffa5;
  --text:#f0f0ff;--text2:#a0a0c0;--text3:#5a5a90;
  --border:#1e1e35;--card:#111118;
  --red:#ff5c5c;--yellow:#ffd166;--green:#06ffa5;
}
.light{
  --bg:#f4f4ff;--bg2:#eaeaf8;--bg3:#ddddf2;--bg4:#d0d0ec;
  --accent:#5b3fd6;--accent2:#7c3aed;--accent3:#059669;
  --text:#0f0f2a;--text2:#3a3a6a;--text3:#8080b0;
  --border:#c8c8e8;--card:#ffffff;
  --red:#cc2222;--yellow:#c48000;--green:#059669;
}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);transition:all .25s}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:var(--bg2)}
::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}
.nav{position:sticky;top:0;z-index:100;background:var(--bg);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 24px;height:58px;gap:16px}
.logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;color:var(--accent);cursor:pointer;white-space:nowrap;flex-shrink:0}
.logo span{color:var(--accent3)}
.sw{flex:1;max-width:400px;position:relative}
.si{width:100%;background:var(--bg2);border:1px solid var(--border);border-radius:8px;padding:7px 12px 7px 34px;color:var(--text);font-size:.83rem;outline:none;transition:border .2s;font-family:'Inter',sans-serif}
.si:focus{border-color:var(--accent)}
.s-icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:.85rem;pointer-events:none}
.sr{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--bg2);border:1px solid var(--border);border-radius:10px;max-height:260px;overflow-y:auto;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,.4)}
.sri{padding:9px 14px;cursor:pointer;border-bottom:1px solid var(--border);transition:background .1s}
.sri:hover{background:var(--bg3)}
.sri-t{font-size:.83rem;font-weight:500;color:var(--text)}
.sri-s{font-size:.72rem;color:var(--text3)}
.tbtn{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:6px 14px;cursor:pointer;color:var(--text2);font-size:.8rem;transition:all .2s;margin-left:auto;flex-shrink:0}
.tbtn:hover{border-color:var(--accent);color:var(--accent)}
/* HOME */
.home{padding:44px 32px;max-width:1100px;margin:0 auto}
.hero{margin-bottom:52px}
.htag{display:inline-flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);border-radius:20px;padding:4px 14px;font-size:.72rem;color:var(--accent2);margin-bottom:14px;font-family:'Space Mono',monospace}
.hero h1{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;line-height:1.1;margin-bottom:12px;background:linear-gradient(130deg,var(--text) 0%,var(--accent2) 55%,var(--accent3) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero p{color:var(--text2);font-size:.95rem;max-width:520px;line-height:1.75}
.stats{display:flex;gap:36px;margin-top:22px}
.sn{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;color:var(--accent3)}
.sl{font-size:.73rem;color:var(--text3);margin-top:2px}
.slabel{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--accent3);letter-spacing:2px;margin-bottom:14px;text-transform:uppercase}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.tc{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;cursor:pointer;transition:all .22s}
.tc:hover{transform:translateY(-3px);border-color:var(--accent);background:var(--bg2)}
.tci{font-size:1.7rem;margin-bottom:11px}
.tcn{font-family:'Syne',sans-serif;font-weight:700;font-size:.92rem;margin-bottom:3px}
.tcc{font-size:.73rem;color:var(--text3)}
.tag{display:inline-block;margin-top:10px;padding:3px 10px;border-radius:20px;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.te{background:rgba(6,255,165,.12);color:var(--green)}
.tm{background:rgba(255,209,102,.12);color:var(--yellow)}
.th{background:rgba(255,92,92,.12);color:var(--red)}
/* TOPIC PAGE */
.tpage{display:flex;min-height:calc(100vh - 58px)}
.sidebar{width:255px;flex-shrink:0;border-right:1px solid var(--border);padding:18px 0;position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto}
.sbt{font-family:'Syne',sans-serif;font-size:.78rem;font-weight:700;padding:0 18px 10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px}
.sbi{display:flex;align-items:center;justify-content:space-between;padding:9px 18px;cursor:pointer;font-size:.83rem;transition:all .18s;border-left:2px solid transparent;color:var(--text2)}
.sbi:hover{background:var(--bg2);color:var(--text)}
.sbi.active{background:var(--bg3);color:var(--accent);border-left-color:var(--accent);font-weight:600}
.tcontent{flex:1;padding:32px 48px;max-width:860px;overflow-x:hidden}
.ctitle{font-family:'Syne',sans-serif;font-size:1.9rem;font-weight:800;margin-bottom:8px;line-height:1.2}
.drow{display:flex;align-items:center;gap:10px;margin-bottom:28px;flex-wrap:wrap}
/* SECTIONS */
.sec{margin-bottom:34px}
.stitle{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:11px;display:flex;align-items:center;gap:9px;color:var(--text)}
.stitle::before{content:'';display:block;width:3px;height:16px;background:var(--accent);border-radius:2px;flex-shrink:0}
.prose{color:var(--text2);line-height:1.85;font-size:.875rem}
.prose strong{color:var(--text);font-weight:600}
.intuition-box{background:var(--bg3);border:1px solid var(--border);border-left:3px solid var(--accent2);border-radius:10px;padding:14px 18px;color:var(--text2);line-height:1.85;font-size:.875rem}
.steps{display:flex;flex-direction:column;gap:9px}
.step{display:flex;gap:13px;align-items:flex-start}
.snum{width:25px;height:25px;border-radius:50%;background:var(--accent);color:#fff;font-size:.72rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Space Mono',monospace;margin-top:1px}
.stext{color:var(--text2);font-size:.85rem;line-height:1.72;padding-top:3px}
.cxgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.cxcard{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:13px 17px}
.cxl{font-size:.7rem;color:var(--text3);margin-bottom:5px;font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.5px}
.cxv{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700;color:var(--accent2)}
.code-tabs{display:flex;border-radius:8px 8px 0 0;overflow:hidden;border:1px solid var(--border);border-bottom:none}
.ctab{padding:7px 18px;font-size:.76rem;cursor:pointer;background:var(--bg2);color:var(--text3);font-family:'Space Mono',monospace;transition:all .18s;border:none}
.ctab.active{background:var(--bg3);color:var(--accent);font-weight:700}
.cblock{background:var(--bg2);border:1px solid var(--border);border-radius:0 0 8px 8px;overflow:hidden}
pre{padding:18px 22px;font-size:.78rem;line-height:1.8;font-family:'Space Mono',monospace;overflow-x:auto;color:var(--text)}
.kw{color:#c792ea}.fn{color:#82aaff}.str{color:#c3e88d}.cm{color:#546e7a}.num{color:#f78c6c}
.dry-run{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px 20px;font-family:'Space Mono',monospace;font-size:.76rem;overflow-x:auto;color:var(--text2);line-height:2;white-space:pre-wrap}
.dry-run .hl{color:var(--accent3);font-weight:700}
.dry-run .arr{color:var(--accent2)}
.pcgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pcbox{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:15px}
.pct{font-size:.78rem;font-weight:700;margin-bottom:9px;display:flex;align-items:center;gap:5px}
.pcl{list-style:none;display:flex;flex-direction:column;gap:6px}
.pcl li{font-size:.8rem;color:var(--text2);display:flex;align-items:flex-start;gap:6px;line-height:1.55}
.when-box{padding:12px 16px;background:rgba(6,255,165,.06);border:1px solid rgba(6,255,165,.18);border-radius:10px;color:var(--text2);font-size:.875rem;line-height:1.8}
.pqlist{display:flex;flex-direction:column;gap:9px}
.pq{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.pqn{font-size:.85rem;color:var(--text)}
.bc{display:flex;align-items:center;gap:7px;padding:10px 18px;font-size:.78rem;color:var(--text3);margin-bottom:4px}
.bc span{cursor:pointer;transition:color .15s}.bc span:hover{color:var(--accent)}
.bcsep{color:var(--text3)}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 20px;text-align:center;gap:10px}
.eicon{font-size:2.8rem}.etitle{font-family:'Syne',sans-serif;font-size:1.25rem;font-weight:700}
.esub{color:var(--text2);font-size:.85rem;max-width:300px;line-height:1.7}
/* ── NEW UI COMPONENTS ── */
.info-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-top:8px}
.info-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:4px}
.ic-label{font-size:.68rem;color:var(--text3);font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.5px}
.ic-val{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700}
.ic-sub{font-size:.7rem;color:var(--text3);line-height:1.4}
.mem-viz{display:flex;align-items:stretch;gap:0;margin:12px 0;overflow-x:auto;padding-bottom:4px}
.mem-cell{display:flex;flex-direction:column;align-items:center;min-width:52px}
.mc-val{background:var(--bg3);border:1px solid var(--accent);padding:10px 6px;font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:var(--accent2);width:100%;text-align:center;border-right:none}
.mc-val:last-of-type,.mem-cell:last-child .mc-val{border-right:1px solid var(--accent)}
.mc-idx{font-size:.68rem;color:var(--text3);font-family:'Space Mono',monospace;margin-top:4px}
.mc-addr{font-size:.6rem;color:var(--accent3);font-family:'Space Mono',monospace;margin-top:2px}
.pattern-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.ppill{padding:6px 14px;border-radius:20px;font-size:.75rem;font-weight:600;background:var(--bg3);border:1px solid var(--border);color:var(--text2);cursor:default;transition:all .2s}
.ppill:hover{border-color:var(--accent);color:var(--accent)}
.lang-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:700;font-family:'Space Mono',monospace}
.lb-cpp{background:rgba(124,92,252,.12);color:var(--accent);border:1px solid rgba(124,92,252,.25)}
.lb-py{background:rgba(6,255,165,.08);color:var(--accent3);border:1px solid rgba(6,255,165,.2)}
.lb-java{background:rgba(255,209,102,.08);color:var(--yellow);border:1px solid rgba(255,209,102,.2)}
.fn-table{width:100%;border-collapse:collapse;font-size:.8rem;margin-top:8px}
.fn-table th{background:var(--bg3);padding:8px 12px;text-align:left;font-family:'Space Mono',monospace;font-size:.68rem;color:var(--text3);font-weight:600;letter-spacing:.5px;border-bottom:1px solid var(--border)}
.fn-table td{padding:8px 12px;border-bottom:1px solid var(--border);color:var(--text2);font-family:'Space Mono',monospace;font-size:.76rem}
.fn-table tr:hover td{background:var(--bg3)}
.fn-table .op{color:var(--accent2);font-weight:600}
.fn-table .cx-g{color:var(--green)}.fn-table .cx-y{color:var(--yellow)}.fn-table .cx-r{color:var(--red)}
.callout{display:flex;gap:10px;padding:12px 16px;border-radius:10px;margin-top:8px;align-items:flex-start}
.callout-warn{background:rgba(255,209,102,.07);border:1px solid rgba(255,209,102,.2)}
.callout-tip{background:rgba(6,255,165,.06);border:1px solid rgba(6,255,165,.18)}
.callout-icon{font-size:1rem;flex-shrink:0;margin-top:1px}
.callout-text{font-size:.83rem;color:var(--text2);line-height:1.7}
/* ── LINKED LIST VIZ ── */
.ll-viz{display:flex;align-items:flex-end;flex-wrap:nowrap;overflow-x:auto;gap:0;margin:12px 0 4px}
.ll-node{display:flex;align-items:flex-end;flex-shrink:0}
.ll-wrap{display:flex;flex-direction:column;align-items:center}
.ll-box{display:flex;flex-direction:column;border:1px solid var(--accent2);border-radius:6px;overflow:hidden;min-width:54px}
.ll-data{background:var(--bg3);padding:8px;font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:var(--text);text-align:center;border-bottom:1px solid var(--accent2)}
.ll-next{background:var(--bg2);padding:5px 6px;font-family:'Space Mono',monospace;font-size:.6rem;color:var(--accent2);text-align:center}
.ll-arrow{display:flex;align-items:center;padding:0 5px;color:var(--accent2);font-size:1rem;flex-shrink:0;margin-bottom:10px}
.ll-null{display:flex;align-items:center;padding:0 8px;font-family:'Space Mono',monospace;font-size:.72rem;color:var(--red);font-weight:700;margin-bottom:10px}
.ll-lbl{font-size:.62rem;color:var(--accent3);font-family:'Space Mono',monospace;text-align:center;margin-top:4px}
.ll-head-lbl{font-size:.6rem;color:var(--accent);font-family:'Space Mono',monospace;font-weight:700;margin-bottom:3px;text-align:center}
.op-badge{display:inline-flex;padding:3px 10px;border-radius:6px;font-size:.7rem;font-weight:700;font-family:'Space Mono',monospace;margin:2px}
.ob-o1{background:rgba(6,255,165,.1);color:var(--green);border:1px solid rgba(6,255,165,.25)}
.ob-on{background:rgba(255,209,102,.1);color:var(--yellow);border:1px solid rgba(255,209,102,.25)}
.theorem-box{background:linear-gradient(135deg,rgba(124,92,252,.08),rgba(192,132,252,.05));border:1px solid rgba(124,92,252,.3);border-left:3px solid var(--accent);border-radius:10px;padding:14px 18px;margin-top:8px}
.theorem-label{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--accent2);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.theorem-text{font-size:.85rem;color:var(--text2);line-height:1.8}
.constraint-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
.cr-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:12px 16px;flex:1;min-width:160px}
.cr-n{font-family:'Space Mono',monospace;font-size:.82rem;color:var(--accent2);font-weight:700;margin-bottom:4px}
.cr-algo{font-size:.78rem;color:var(--text2);line-height:1.7}
@media(max-width:700px){
  .hero h1{font-size:1.9rem}.sidebar{display:none}.tcontent{padding:18px 16px}
  .cxgrid,.pcgrid,.info-cards{grid-template-columns:1fr}.tgrid{grid-template-columns:repeat(auto-fill,minmax(145px,1fr))}
  .stats{gap:20px}
}
/* ── COPY BUTTON ── */
.cblock-wrap{position:relative}
.copy-btn{position:absolute;top:10px;right:10px;background:var(--bg4);border:1px solid var(--border);border-radius:6px;padding:5px 10px;font-size:.65rem;font-family:'Space Mono',monospace;color:var(--text3);cursor:pointer;transition:all .2s;z-index:2}
.copy-btn:hover{border-color:var(--accent);color:var(--accent)}
.copy-btn.copied{border-color:var(--green);color:var(--green)}
/* ── PROGRESS TRACKER ── */
.prog-ring-wrap{position:relative;width:52px;height:52px;flex-shrink:0}
.prog-ring-wrap svg{transform:rotate(-90deg)}
.prog-ring-bg{fill:none;stroke:var(--bg3);stroke-width:4}
.prog-ring-fill{fill:none;stroke-width:4;stroke-linecap:round;transition:stroke-dashoffset .6s ease}
.prog-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:.62rem;font-weight:700}
.tc-prog{display:flex;align-items:center;gap:12px}
.prog-bar-wrap{background:var(--bg3);border-radius:20px;height:4px;flex:1;overflow:hidden;margin-top:6px}
.prog-bar{height:100%;border-radius:20px;background:linear-gradient(90deg,var(--accent),var(--accent3));transition:width .5s ease}
.prog-page{max-width:1100px;margin:0 auto;padding:36px 32px}
.prog-overview{background:var(--bg2);border:1px solid var(--border);border-radius:16px;padding:24px 28px;margin-bottom:32px;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.prog-score{text-align:center}
.prog-score-num{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;background:linear-gradient(130deg,var(--accent2),var(--accent3));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.prog-score-label{font-size:.72rem;color:var(--text3);font-family:'Space Mono',monospace;margin-top:4px}
.prog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.prog-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px;transition:border .2s;cursor:pointer}
.prog-card:hover{border-color:var(--accent)}
.prog-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.prog-icon{font-size:1.4rem}
.prog-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem}
.prog-count{font-size:.7rem;color:var(--text3);margin-top:2px}
.subtopic-check{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);cursor:pointer}
.subtopic-check:last-child{border-bottom:none}
.check-box{width:18px;height:18px;border-radius:5px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s}
.check-box.done{background:var(--green);border-color:var(--green)}
.check-label{font-size:.8rem;color:var(--text2);flex:1}
.check-label.done{color:var(--text3);text-decoration:line-through}
.streak-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,209,102,.1);border:1px solid rgba(255,209,102,.25);border-radius:20px;padding:5px 14px;font-size:.75rem;color:var(--yellow);font-family:'Space Mono',monospace;font-weight:700}
/* ── AI CODE REVIEWER ── */
.reviewer-page{max-width:860px;margin:0 auto;padding:36px 32px}
.rev-split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
@media(max-width:700px){.rev-split{grid-template-columns:1fr}}
.rev-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.rev-card-head{padding:12px 16px;border-bottom:1px solid var(--border);background:var(--bg3);font-family:'Space Mono',monospace;font-size:.72rem;color:var(--text3);display:flex;align-items:center;gap:8px}
.rev-textarea{width:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:'Space Mono',monospace;font-size:.77rem;line-height:1.8;resize:none;padding:14px 16px;min-height:200px}
.verdict-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:.72rem;font-weight:700;font-family:'Space Mono',monospace}
.verdict-good{background:rgba(6,255,165,.12);color:var(--green);border:1px solid rgba(6,255,165,.3)}
.verdict-ok{background:rgba(255,209,102,.12);color:var(--yellow);border:1px solid rgba(255,209,102,.3)}
.verdict-bad{background:rgba(255,92,92,.12);color:var(--red);border:1px solid rgba(255,92,92,.3)}
.issue-item{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);align-items:flex-start}
.issue-item:last-child{border-bottom:none}
.issue-icon{font-size:.9rem;flex-shrink:0;margin-top:1px}
.issue-text{font-size:.82rem;color:var(--text2);line-height:1.65}
/* ── AI SOLVER ── */
.ai-page{max-width:860px;margin:0 auto;padding:36px 32px}
.ai-hero{margin-bottom:32px}
.ai-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(124,92,252,.2),rgba(192,132,252,.15));border:1px solid rgba(124,92,252,.4);border-radius:20px;padding:5px 16px;font-size:.72rem;color:var(--accent2);font-family:'Space Mono',monospace;margin-bottom:14px}
.ai-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;margin-bottom:8px;background:linear-gradient(130deg,var(--text) 0%,var(--accent2) 60%,var(--accent3) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ai-sub{color:var(--text2);font-size:.88rem;line-height:1.75;max-width:560px}
.ai-input-area{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:20px;transition:border .2s}
.ai-input-area:focus-within{border-color:var(--accent)}
.ai-label{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--accent3);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.ai-textarea{width:100%;background:transparent;border:none;outline:none;color:var(--text);font-family:'Inter',sans-serif;font-size:.875rem;line-height:1.8;resize:vertical;min-height:140px}
.ai-textarea::placeholder{color:var(--text3)}
.ai-controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:14px}
.ai-btn{display:flex;align-items:center;gap:8px;padding:10px 22px;border-radius:10px;font-size:.82rem;font-weight:700;cursor:pointer;transition:all .2s;border:none;font-family:'Space Mono',monospace}
.ai-btn-primary{background:var(--accent);color:#fff}
.ai-btn-primary:hover{background:#6a4de0;transform:translateY(-1px)}
.ai-btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.ai-btn-secondary{background:var(--bg3);color:var(--text2);border:1px solid var(--border)}
.ai-btn-secondary:hover{border-color:var(--accent);color:var(--accent)}
.ai-lang{display:flex;gap:8px;margin-left:auto}
.ai-lang-btn{padding:6px 14px;border-radius:8px;font-size:.72rem;font-family:'Space Mono',monospace;cursor:pointer;border:1px solid var(--border);background:var(--bg3);color:var(--text3);transition:all .18s}
.ai-lang-btn.active{background:rgba(124,92,252,.15);border-color:var(--accent);color:var(--accent);font-weight:700}
.ai-response{animation:fadeIn .3s ease}
.ai-response-card{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:16px}
.ai-response-header{display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid var(--border);background:var(--bg3)}
.ai-response-icon{font-size:1.1rem}
.ai-response-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem}
.ai-response-body{padding:20px;color:var(--text2);line-height:1.85;font-size:.875rem;white-space:pre-wrap;font-family:'Inter',sans-serif}
.ai-response-body code{background:var(--bg3);padding:2px 7px;border-radius:4px;font-family:'Space Mono',monospace;font-size:.82rem;color:var(--accent2)}
.ai-streaming{display:inline-block;width:8px;height:16px;background:var(--accent);border-radius:2px;animation:blink .7s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.ai-error{background:rgba(255,92,92,.08);border:1px solid rgba(255,92,92,.25);border-radius:10px;padding:14px 18px;color:var(--red);font-size:.85rem}
.ai-examples{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.ai-example{padding:7px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:20px;font-size:.75rem;cursor:pointer;color:var(--text2);transition:all .18s}
.ai-example:hover{border-color:var(--accent);color:var(--accent)}
.ai-pattern-tag{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:.7rem;font-weight:700;font-family:'Space Mono',monospace;background:rgba(6,255,165,.1);color:var(--accent3);border:1px solid rgba(6,255,165,.25);margin:3px}
.ai-complexity-row{display:flex;gap:10px;flex-wrap:wrap;margin:10px 0}
.ai-cx{background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:8px 14px;font-family:'Space Mono',monospace;font-size:.74rem}
.ai-cx-label{color:var(--text3);font-size:.65rem;text-transform:uppercase;margin-bottom:3px}
.ai-cx-val{color:var(--accent2);font-weight:700}
.nbtn{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none;border-radius:8px;padding:7px 14px;font-size:.75rem;font-weight:700;cursor:pointer;font-family:'Space Mono',monospace;transition:all .2s;white-space:nowrap}
.nbtn:hover{opacity:.9;transform:translateY(-1px)}
`;

// ─── DATA ──────────────────────────────────────────────────────────
const DSA_DATA = {
  Sorting: {
    icon: "⚡", diff: "medium",
    desc: "Comparison-based (Selection, Bubble, Insertion, Merge, Quick) and non-comparison-based (Radix) sorting. Covers in-place and stable properties.",
    subtopics: {
      "Selection Sort": { diff: "easy", explanation: "Given an array of n items: (1) find the largest item x in the range [0…n−1], (2) swap x with the (n−1)th item, (3) reduce n by 1 and repeat.", intuition: "Each pass selects the maximum from the unsorted region and places it in its final sorted position. Always does exactly n−1 swaps.", steps: ["Set i = n−1 (last index of unsorted region).","Find maxIdx = index of the maximum element in a[0..i].","Swap a[i] with a[maxIdx] — the maximum is now in its final position.","Decrement i by 1 (shrink unsorted region).","Repeat until i = 0. Array is sorted."], dryRun: `Array: [29, 10, 14, 37, 13]\n\nPass 1 (i=4): max=37 @ idx3 → swap(idx3,idx4) → [29,10,14,13,37]\nPass 2 (i=3): max=29 @ idx0 → swap(idx0,idx3) → [13,10,14,29,37]\nPass 3 (i=2): max=14 @ idx2 → swap(idx2,idx2) → [13,10,14,29,37]\nPass 4 (i=1): max=13 @ idx0 → swap(idx0,idx1) → [10,13,14,29,37]\n\nResult: [10, 13, 14, 29, 37] ✓`, time: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" }, space: "O(1)", stable: false, when: "When minimising memory writes (exactly n−1 swaps). Not suitable for large n.", pros: ["Exactly n−1 swaps — minimum possible","In-place: O(1) extra space","Simple to implement"], cons: ["Always O(n²) — no early exit","Not stable","Worse cache performance than Insertion Sort"], cpp: `void selectionSort(int a[], int n) {\n    for (int i = n - 1; i >= 1; i--) {\n        int maxIdx = i;\n        for (int j = 0; j < i; j++)\n            if (a[j] >= a[maxIdx]) maxIdx = j;\n        swap(a[i], a[maxIdx]);\n    }\n}`, python: `def selection_sort(a):\n    n = len(a)\n    for i in range(n - 1, 0, -1):\n        max_idx = i\n        for j in range(i):\n            if a[j] >= a[max_idx]: max_idx = j\n        a[i], a[max_idx] = a[max_idx], a[i]\n    return a`, practice: [{ name: "Minimum Number of Swaps to Sort", diff: "medium" }] },
      "Bubble Sort": { diff: "easy", explanation: "Compare adjacent pairs, swap if out of order, bubble largest to end each pass. Version 2 adds early-termination: if no swaps in a pass, array is sorted — stop.", intuition: "Large items bubble to the end each pass. Early-termination makes best case O(n) on already-sorted input.", steps: ["Outer loop: i runs from n−1 down to 1.","Set is_sorted = true before inner loop.","Inner loop j from 1 to i: if a[j−1] > a[j], swap and set is_sorted = false.","If is_sorted still true after inner loop, return — array is sorted.","Otherwise decrement i and repeat."], dryRun: `Array: [29, 10, 14, 37, 13]\n\nPass 1 (i=4): after swaps → [10,14,29,13,37] ← 37 fixed ✓\nPass 2 (i=3): after swaps → [10,14,13,29,37] ← 29 fixed ✓\nPass 3 (i=2): [10,13,14,29,37] ← 14 fixed ✓\nPass 4 (i=1): no swaps → is_sorted=true → return early ✓\n\nResult: [10, 13, 14, 29, 37] ✓`, time: { best: "O(n) v2", avg: "O(n²)", worst: "O(n²) descending" }, space: "O(1)", stable: true, when: "Nearly sorted data with v2 early termination. Educational purposes.", pros: ["Stable sort","In-place: O(1)","O(n) best case with early termination"], cons: ["O(n²) worst case","More swaps than Insertion Sort"], cpp: `void bubbleSort(int a[], int n) {\n    for (int i = n - 1; i >= 1; i--) {\n        bool is_sorted = true;\n        for (int j = 1; j <= i; j++) {\n            if (a[j-1] > a[j]) {\n                swap(a[j], a[j-1]);\n                is_sorted = false;\n            }\n        }\n        if (is_sorted) return;\n    }\n}`, python: `def bubble_sort(a):\n    n = len(a)\n    for i in range(n - 1, 0, -1):\n        is_sorted = True\n        for j in range(1, i + 1):\n            if a[j-1] > a[j]:\n                a[j-1], a[j] = a[j], a[j-1]\n                is_sorted = False\n        if is_sorted: return a\n    return a`, practice: [{ name: "Sort Colors (Dutch National Flag)", diff: "medium" }] },
      "Insertion Sort": { diff: "easy", explanation: "Like sorting poker cards. Left portion a[0..i−1] is always sorted; for each new element a[i], shift larger sorted elements right, insert a[i] at the correct gap.", intuition: "Each new card slides left into correct position. Best case: sorted array — O(n). Worst case: reverse sorted — O(n²).", steps: ["Start with i=1 (a[0] is sorted subarray of size 1).","Save next = a[i] (element to insert).","While j ≥ 0 AND a[j] > next: shift a[j] right, j−−.","Insert next at a[j+1].","Repeat until i = n."], dryRun: `Array: [40, 13, 20, 8]\n\ni=1: next=13, 40>13 → shift → insert → [13,40,20,8]\ni=2: next=20, 40>20 → shift → insert → [13,20,40,8]\ni=3: next=8,  all>8 → shift → insert → [8,13,20,40]\n\nResult: [8, 13, 20, 40] ✓`, time: { best: "O(n) sorted", avg: "O(n²)", worst: "O(n²) reverse" }, space: "O(1)", stable: true, when: "Small arrays (n<20), nearly-sorted data, online/streaming. Used inside Timsort.", pros: ["Stable, in-place","O(n) best case","Online algorithm"], cons: ["O(n²) worst case","Many element shifts for large n"], cpp: `void insertionSort(int a[], int n) {\n    for (int i = 1; i < n; i++) {\n        int next = a[i];\n        int j;\n        for (j = i - 1; j >= 0 && a[j] > next; j--)\n            a[j + 1] = a[j];\n        a[j + 1] = next;\n    }\n}`, python: `def insertion_sort(a):\n    for i in range(1, len(a)):\n        next_val = a[i]\n        j = i - 1\n        while j >= 0 and a[j] > next_val:\n            a[j + 1] = a[j]\n            j -= 1\n        a[j + 1] = next_val\n    return a`, practice: [{ name: "Insertion Sort List (LeetCode 147)", diff: "medium" }] },
      "Merge Sort": { diff: "medium", explanation: "Divide-and-conquer. Divide: split into two halves, recursively sort. Conquer: merge the sorted halves. Merging two sorted arrays of size k takes O(k). Recursion tree has O(log n) levels → O(n log n) total, guaranteed.", intuition: "Divide until size-1 (trivially sorted), then merge upward. O(n) work per level × O(log n) levels = O(n log n). No bad inputs — guaranteed.", steps: ["Base case: low >= high → return.","Compute mid = (low+high)/2.","mergeSort(a, low, mid) — sort left half.","mergeSort(a, mid+1, high) — sort right half.","merge(a, low, mid, high) using temp array b[].","Two pointers pick smaller element into b[]. Copy remaining. Copy b[] back."], dryRun: `Array: [38, 16, 27, 39, 12, 27]\n\nDivide → [38,16,27] | [39,12,27]\n         [38,16]|[27] [39,12]|[27]\n         [38][16]     [39][12]\n\nMerge up:\n[16,38] [12,39] → [16,27,38] [12,27,39]\nFinal merge → [12,16,27,27,38,39] ✓`, time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n) temp array", stable: true, when: "Guaranteed O(n log n) needed. Sorting linked lists. Stability required.", pros: ["Guaranteed O(n log n)","Stable sort","External sort capable"], cons: ["O(n) extra memory","Slower than Quick Sort in practice (cache misses)"], cpp: `void merge(int a[], int low, int mid, int high) {\n    int n = high - low + 1;\n    int* b = new int[n];\n    int left = low, right = mid+1, bIdx = 0;\n    while (left <= mid && right <= high)\n        b[bIdx++] = (a[left] <= a[right]) ? a[left++] : a[right++];\n    while (left  <= mid)  b[bIdx++] = a[left++];\n    while (right <= high) b[bIdx++] = a[right++];\n    for (int k = 0; k < n; k++) a[low+k] = b[k];\n    delete[] b;\n}\nvoid mergeSort(int a[], int low, int high) {\n    if (low < high) {\n        int mid = (low+high)/2;\n        mergeSort(a, low, mid);\n        mergeSort(a, mid+1, high);\n        merge(a, low, mid, high);\n    }\n}`, python: `def merge_sort(a, low, high):\n    if low < high:\n        mid = (low + high) // 2\n        merge_sort(a, low, mid)\n        merge_sort(a, mid+1, high)\n        merge(a, low, mid, high)\n\ndef merge(a, low, mid, high):\n    b = []\n    l, r = low, mid+1\n    while l <= mid and r <= high:\n        if a[l] <= a[r]: b.append(a[l]); l+=1\n        else: b.append(a[r]); r+=1\n    while l <= mid: b.append(a[l]); l+=1\n    while r <= high: b.append(a[r]); r+=1\n    for k in range(len(b)): a[low+k] = b[k]`, practice: [{ name: "Sort a Linked List", diff: "medium" },{ name: "Count Inversions in Array", diff: "hard" }] },
      "Quick Sort": { diff: "medium", explanation: "Divide-and-conquer. Choose pivot p = a[i]. Partition array into S1 (items < p) and S2 (items ≥ p). Pivot lands in final sorted position. Recursively sort S1 and S2. Conquer step: do nothing — pivot is already placed.", intuition: "After partition, pivot never moves again. Only sort the two sub-arrays. Cache-friendly, in-place. Average O(n log n) but O(n²) worst case on sorted input.", steps: ["Choose pivot p = a[low]. Set m = low.","For k from low+1 to high: if a[k] < p, m++, swap(a[k], a[m]). Else skip (S2).","swap(a[low], a[m]) — place pivot at index m. Return m as pivotIdx.","quickSort(a, low, pivotIdx-1) — sort S1.","quickSort(a, pivotIdx+1, high) — sort S2.","Base case: low >= high."], dryRun: `Array: [27,38,12,39,27,16], pivot=27\n\nk=1: 38≥27 skip  k=2: 12<27 → m=1, swap → [27,12,38,39,27,16]\nk=3: 39≥27 skip  k=4: 27≥27 skip\nk=5: 16<27 → m=2, swap → [27,12,16,39,27,38]\nPlace pivot: swap(a[0],a[2]) → [16,12,27,39,27,38]\nPivot 27 at index 2 ✓ (FINAL)\nLeft [16,12]→[12,16]  Right [39,27,38]→[27,38,39]\nResult: [12,16,27,27,38,39] ✓`, time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²) sorted input" }, space: "O(log n) stack", stable: false, when: "General-purpose in-place sorting. Fastest in practice for random data. Randomize pivot to avoid O(n²).", pros: ["Fastest in practice — cache-friendly, in-place","O(n log n) average","Pivot in final position — trivial conquer"], cons: ["O(n²) worst case without randomization","Not stable","Recursive stack overflow risk on pathological input"], cpp: `int partition(int a[], int i, int j) {\n    int p = a[i], m = i;\n    for (int k = i+1; k <= j; k++)\n        if (a[k] < p) { m++; swap(a[k], a[m]); }\n    swap(a[i], a[m]);\n    return m;\n}\nvoid quickSort(int a[], int low, int high) {\n    if (low < high) {\n        int pi = partition(a, low, high);\n        quickSort(a, low, pi-1);\n        quickSort(a, pi+1, high);\n    }\n}`, python: `def partition(a, i, j):\n    p, m = a[i], i\n    for k in range(i+1, j+1):\n        if a[k] < p:\n            m += 1\n            a[k], a[m] = a[m], a[k]\n    a[i], a[m] = a[m], a[i]\n    return m\n\ndef quick_sort(a, low, high):\n    if low < high:\n        pi = partition(a, low, high)\n        quick_sort(a, low, pi-1)\n        quick_sort(a, pi+1, high)`, practice: [{ name: "Kth Largest Element in Array", diff: "medium" },{ name: "Wiggle Sort II", diff: "hard" }] },
      "Radix Sort": { diff: "medium", explanation: "Non-comparison sort. Treats numbers as digit strings. Groups items by digit position (1s→10s→100s) using 10 queues. Repeat for d digit positions. O(dn) total — beats O(n log n) when d is small.", intuition: "No comparisons — group by digit. Queues preserve relative order (stable). After d passes the array is sorted. d=3 for numbers ≤999.", steps: ["Determine d = max digits in any element.","Set power=1 (1s place).","distribute(): push v[i] into digitQueue[(v[i]/power)%10].","collect(): concatenate queues 0–9 back into array.","power *= 10. Repeat d times."], dryRun: `Array: [170,45,75,90,802,24,2,66] (d=3)\n\nPass 1 (1s): buckets 0:[170,90] 2:[802,2] 4:[24] 5:[45,75] 6:[66]\n  Collect: [170,90,802,2,24,45,75,66]\nPass 2 (10s): buckets 0:[802,2] 2:[24] 4:[45] 6:[66] 7:[170,75] 9:[90]\n  Collect: [802,2,24,45,66,170,75,90]\nPass 3 (100s): buckets 0:[2,24,45,66,75,90] 1:[170] 8:[802]\n  Collect: [2,24,45,66,75,90,170,802] ✓`, time: { best: "O(dn)", avg: "O(dn)", worst: "O(dn)" }, space: "O(n)", stable: true, when: "Large volumes of integers with small d. d << log n → faster than comparison sorts.", pros: ["O(dn) beats O(n log n) when d small","Stable, no comparisons","Predictable performance"], cons: ["Not in-place — extra queue storage","Only integers or fixed-length strings","Degrades when d is large"], cpp: `#include <queue>\nvoid radixSort(vector<int>& v, int d) {\n    queue<int> dq[10];\n    int power = 1;\n    for (int i = 0; i < d; i++) {\n        for (int x : v) dq[(x/power)%10].push(x);\n        int k = 0;\n        for (int d = 0; d < 10; d++)\n            while (!dq[d].empty()) { v[k++]=dq[d].front(); dq[d].pop(); }\n        power *= 10;\n    }\n}`, python: `from collections import deque\ndef radix_sort(v, d):\n    power = 1\n    for _ in range(d):\n        buckets = [deque() for _ in range(10)]\n        for num in v: buckets[(num//power)%10].append(num)\n        i = 0\n        for b in buckets:\n            while b: v[i]=b.popleft(); i+=1\n        power *= 10\n    return v`, practice: [{ name: "Maximum Gap", diff: "hard" }] },
      "Algorithm Comparison": { diff: "easy", explanation: "Summary table of all sorting algorithms: time complexity, space, stability, and in-place property. Classic exam question — know this cold.", intuition: "Each algorithm trades off differently. O(n²) = simple, in-place, slow. O(n log n) = faster but may need space or sacrifice stability.", steps: ["Selection Sort: O(n²)/O(n²) | In-place ✓ | NOT stable ✗","Insertion Sort: O(n)/O(n²) | In-place ✓ | Stable ✓","Bubble Sort v2: O(n)/O(n²) | In-place ✓ | Stable ✓","Merge Sort: O(n lg n)/O(n lg n) | NOT in-place ✗ | Stable ✓","Quick Sort: O(n lg n)/O(n²) | In-place ✓ | NOT stable ✗","Radix Sort: O(dn)/O(dn) | NOT in-place ✗ | Stable ✓"], dryRun: `Algorithm      Best       Worst      In-place  Stable\n────────────────────────────────────────────────────\nSelection      O(n²)      O(n²)      Yes       No\nInsertion      O(n)       O(n²)      Yes       Yes\nBubble v2      O(n)       O(n²)      Yes       Yes\nMerge          O(n lg n)  O(n lg n)  No        Yes\nQuick          O(n lg n)  O(n²)      Yes       No\nRadix          O(dn)      O(dn)      No        Yes\n\nLower bound for comparison sort: Ω(n log n)\nMerge Sort is optimal among comparison sorts ✓`, time: { best: "Varies", avg: "Varies", worst: "Varies" }, space: "Varies", stable: true, when: "Use as exam reference. Know stability, in-place, and why Quick Sort has O(n²) worst case.", pros: ["Merge Sort: guaranteed O(n log n), stable","Quick Sort: fastest in practice, in-place","Radix: beats O(n log n) for integer data with small d"], cons: ["No single algorithm wins all criteria","Merge needs O(n) memory","Quick degrades on sorted input"], cpp: `// std::sort       -> introsort (Quick+Heap+Insertion)\n// std::stable_sort -> merge sort (stable, O(n log n))\n// For nearly sorted  -> Insertion Sort\n// For guaranteed stable O(n log n) -> Merge Sort`, python: `# sorted()/list.sort() -> Timsort (Merge+Insertion)\n# Timsort: stable, O(n log n) worst case\n# For integers -> Radix Sort O(dn)\n# Custom key -> sorted(arr, key=lambda x: x[1])`, practice: [{ name: "Sort Colors", diff: "medium" },{ name: "Largest Number", diff: "medium" }] }
    }
  },
  Arrays: {
    icon: "📦", diff: "easy",
    desc: "Foundation of DSA — contiguous memory, O(1) access. Most-asked topic in coding interviews.",
    subtopics: {
      "Introduction & Memory": { diff: "easy", explanation: "An array stores elements of the same type in contiguous memory. Each element is identified by an index (0-based). Address formula: Address(arr[i]) = Base + (i × size_of_element). This gives O(1) random access — no traversal needed.", intuition: "Like numbered lockers in a corridor. Locker #3 is always 3 steps from #0 — jump straight there. O(1) access. Trade-off: must book fixed number upfront; inserting in middle requires shifting.", steps: ["Declare array with fixed size or use dynamic type (vector/list).","Elements stored at consecutive addresses.","Access arr[i] in O(1): compute address directly.","Address = Base + (i × size). No loop needed.","Index range 0 to n−1. Accessing arr[n] → Index Out of Bounds."], dryRun: `arr=[10,20,30,40], Base=1000, size=4\n\narr[0]=1000+(0×4)=1000 → 10\narr[2]=1000+(2×4)=1008 → 30\narr[5]=1000+(5×4)=1020 → ⚠ Out of Bounds! ✗`, time: { best: "O(1)", avg: "O(1)", worst: "O(1)" }, space: "O(n)", stable: undefined, when: "Always — default data structure. Use for fast random access with known/bounded size.", pros: ["O(1) random access","Cache-friendly: contiguous memory","Foundation for stacks, queues, heaps"], cons: ["Fixed size in static arrays","O(n) insert/delete due to shifting","Memory wastage if over-allocated"], cpp: `int arr[4] = {10,20,30,40};  // static\nvector<int> v = {10,20,30,40}; // dynamic\ncout << arr[2]; // 30 — O(1)\nint mat[2][3] = {{1,2,3},{4,5,6}};`, python: `arr = [10,20,30,40]\nprint(arr[2])   # 30 — O(1)\nprint(arr[-1])  # 40 last element\nmat = [[1,2,3],[4,5,6]]\nprint(mat[1][2]) # 6`, practice: [{ name: "Find Maximum and Minimum", diff: "easy" },{ name: "Reverse an Array", diff: "easy" }] },
      "Types of Arrays": { diff: "easy", explanation: "1D: flat sequence. 2D: matrix with rows/columns. Static: fixed size at compile time. Dynamic: resizable (vector, list, ArrayList). Dynamic arrays double capacity when full — O(1) amortised append.", intuition: "Static = fixed parking lot. Dynamic = lot that doubles when full, amortising O(n) copy cost over many inserts.", steps: ["1D: arr[i].","2D: arr[i][j] — row i, col j. Row-major memory storage.","Static: int arr[10] — size fixed.","Dynamic: auto-grows. O(1) amortised append. O(n) on resize.","Multi-dim: arr[i][j][k]..."], dryRun: `2D: mat=[[1,2,3],[4,5,6]]\nmat[1][2]=6  addr=base+(1×3+2)×4=base+20\n\nDynamic growth:\ncap=1→[10] push(20)→cap=2→[10,20]\npush(30)→cap=4→[10,20,30,_]\npush(50)→cap=8→[10,20,30,40,50,_,_,_] ✓`, time: { best: "O(1) access", avg: "O(1) access", worst: "O(n) resize" }, space: "O(n·m) for 2D", stable: undefined, when: "2D for grids/matrices/DP tables. Dynamic arrays (vector/list) almost always in interviews.", pros: ["2D models grids naturally","Dynamic: O(1) amortised append","Row-major keeps row access cache-friendly"], cons: ["2D traversal O(n×m)","Resize has occasional O(n) spike"], cpp: `vector<int> v = {1,2,3};\nv.push_back(4);  // O(1) amortised\nvector<vector<int>> grid(3, vector<int>(4,0));`, python: `arr = [1,2,3]\narr.append(4)   # O(1) amortised\ngrid = [[0]*4 for _ in range(3)]`, practice: [{ name: "Spiral Matrix", diff: "medium" },{ name: "Rotate Image", diff: "medium" }] },
      "Core Operations": { diff: "easy", explanation: "Access O(1). Search O(n) linear / O(log n) binary (sorted). Insert O(n) — shift right. Delete O(n) — shift left. Update O(1). Insert/delete O(1) only at end of dynamic array.", intuition: "Access free — compute address. Search unsorted = check every element. Insert/delete mid-array = move everything. Update = overwrite in-place.", steps: ["ACCESS: arr[i] → compute address. O(1).","SEARCH linear: scan until found. O(n).","SEARCH binary (sorted): compare mid, eliminate half. O(log n).","INSERT at k: shift arr[k..n-1] right. O(n).","DELETE at k: shift arr[k+1..n-1] left. O(n).","UPDATE: arr[k] = value. O(1)."], dryRun: `INSERT 25 at index 2 in [10,20,30,40]:\nShift right → [10,20,_,30,40] → arr[2]=25 → [10,20,25,30,40] ✓\n\nDELETE index 1 from [10,20,30]:\nShift left → [10,30,30] → size-- → [10,30] ✓\n\nBINARY SEARCH 30 in [10,20,30,40,50]:\nlo=0,hi=4,mid=2 → arr[2]=30 ✓ O(log n)`, time: { best: "O(1) access/update", avg: "O(n) insert/delete", worst: "O(n) insert/delete" }, space: "O(1) extra", stable: undefined, when: "Access/update O(1) — perfect. Avoid frequent mid-array insert/delete; use linked list.", pros: ["O(1) access and update","Binary search O(log n) on sorted","In-place operations"], cons: ["O(n) insert/delete at arbitrary position","Must be sorted for binary search"], cpp: `vector<int> a={10,20,30,40};\nint x=a[2];          // O(1)\na[2]=99;             // O(1)\na.insert(a.begin()+2,25); // O(n)\na.erase(a.begin()+1);     // O(n)`, python: `a=[10,20,30,40]\nx=a[2]          # O(1)\na[2]=99         # O(1)\na.insert(2,25)  # O(n)\na.pop(1)        # O(n)`, practice: [{ name: "Search in Rotated Sorted Array", diff: "medium" },{ name: "Remove Element In-place", diff: "easy" }] },
      "Key Patterns": { diff: "medium", explanation: "Five patterns solve ~80% of array interview problems: (1) Prefix Sum — O(1) range queries after O(n) build. (2) Sliding Window — O(n) subarray problems. (3) Two Pointers — eliminates nested loops on sorted arrays. (4) Kadane's Algorithm — max subarray sum O(n). (5) Dutch National Flag — 3-way partition O(n).", intuition: "Prefix sum trades precomputation for O(1) queries. Sliding window avoids recomputing overlapping windows. Two pointers replaces O(n²) nested loops. Kadane's DP recurrence: maxHere = max(arr[i], maxHere+arr[i]).", steps: ["PREFIX SUM: prefix[i]=prefix[i-1]+arr[i]. Range[l,r]=prefix[r]-prefix[l-1]. O(n) build, O(1) query.","SLIDING WINDOW: expand right, shrink left when constraint violated. O(n).","TWO POINTERS: l=0,r=n-1. Move based on comparison. O(n).","KADANE'S: maxHere=max(arr[i],maxHere+arr[i]). Track maxSoFar. O(n).","DUTCH FLAG: 3 pointers lo/mid/hi. Elements<pivot→left, =pivot→mid, >pivot→right. O(n)."], dryRun: `KADANE'S on [-2,1,-3,4,-1,2,1,-5,4]:\ni=3: cur=4,max=4  i=4: cur=3,max=4\ni=5: cur=5,max=5  i=6: cur=6,max=6 ← answer ✓\n\nTWO POINTERS: Two Sum sorted [2,7,11,15] target=9\nl=0,r=3: 17>9→r--  l=0,r=2: 13>9→r--\nl=0,r=1: 9==9 ✓ return [0,1]`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(n) prefix, O(1) others", stable: undefined, when: "Range queries→Prefix Sum. Window subarray→Sliding Window. Sorted pair problems→Two Pointers. Max subarray→Kadane's.", pros: ["All O(n) — optimal","Eliminate O(n²) nested loops","Cover ~80% of array interview problems"], cons: ["Prefix sum uses O(n) space","Variable window can be tricky","Two pointers needs sorted array for many problems"], cpp: `// Prefix Sum\nvector<int> pre(n); pre[0]=arr[0];\nfor(int i=1;i<n;i++) pre[i]=pre[i-1]+arr[i];\nint sum=pre[r]-(l>0?pre[l-1]:0);\n// Kadane's\nint cur=arr[0],mx=arr[0];\nfor(int i=1;i<n;i++){cur=max(arr[i],cur+arr[i]);mx=max(mx,cur);}\n// Two Pointers\nint l=0,r=n-1;\nwhile(l<r){int s=arr[l]+arr[r];if(s==t)return{l,r};else if(s<t)l++;else r--;}`, python: `# Prefix Sum\npre=[0]*n; pre[0]=arr[0]\nfor i in range(1,n): pre[i]=pre[i-1]+arr[i]\n# Kadane's\ncur=mx=arr[0]\nfor x in arr[1:]: cur=max(x,cur+x); mx=max(mx,cur)\n# Two Pointers\nl,r=0,len(arr)-1\nwhile l<r:\n    s=arr[l]+arr[r]\n    if s==t: return [l,r]\n    elif s<t: l+=1\n    else: r-=1`, practice: [{ name: "Maximum Subarray (Kadane's)", diff: "medium" },{ name: "Two Sum", diff: "easy" },{ name: "Container With Most Water", diff: "medium" }] },
      "Important Problems": { diff: "medium", explanation: "Canonical array problems every CS student must know from scratch: Reverse, Move Zeros, Remove Duplicates, Rotate (3-reversal), Merge Sorted, Majority Element (Boyer-Moore). All O(n)/O(1).", intuition: "3-reversal rotate: no extra O(n) space. Remove duplicates: slow/fast pointer. Move zeros: write pointer. Boyer-Moore majority: candidate+count.", steps: ["REVERSE: swap a[l] and a[r], move inward. O(n),O(1).","MOVE ZEROS: writePtr=0, copy non-zeros, fill rest with 0s. O(n),O(1).","REMOVE DUPS (sorted): writePtr=1, copy when arr[i]≠arr[i-1]. O(n),O(1).","ROTATE RIGHT k: reverse all, reverse first k, reverse last n-k. O(n),O(1).","MAJORITY (Boyer-Moore): candidate+count. O(n),O(1)."], dryRun: `ROTATE [1,2,3,4,5] right by 2:\nReverse all   → [5,4,3,2,1]\nReverse 0..1  → [4,5,3,2,1]\nReverse 2..4  → [4,5,1,2,3] ✓\n\nMOVE ZEROS [0,1,0,3,12]:\nw=0: skip0→write1→skip0→write3→write12→fill0s\n→ [1,3,12,0,0] ✓\n\nBOYER-MOORE [3,2,3]:\ncand=3,cnt=1 → 2≠3,cnt=0 → cand=3,cnt=1 → ans=3 ✓`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(1) most", stable: undefined, when: "Building blocks — solve each in <5 min. Appear as sub-problems in harder questions.", pros: ["All O(n) time, O(1) space","Cover most common patterns"], cons: ["Off-by-one errors common in rotate","Majority only works when majority exists (>n/2)"], cpp: `void rotate(vector<int>&a,int k){int n=a.size();k%=n;\n  reverse(a.begin(),a.end());\n  reverse(a.begin(),a.begin()+k);\n  reverse(a.begin()+k,a.end());}\nint majority(vector<int>&a){\n  int c=a[0],cnt=1;\n  for(int i=1;i<a.size();i++) cnt+=(a[i]==c)?1:-1,cnt==0&&(c=a[i],cnt=1);\n  return c;}`, python: `def rotate(a,k):\n    n=len(a);k%=n\n    a.reverse();a[:k]=reversed(a[:k]);a[k:]=reversed(a[k:])\ndef majority(a):\n    c,cnt=a[0],1\n    for x in a[1:]: cnt+=1 if x==c else -1;\n    if cnt==0: c=x;cnt=1\n    return c`, practice: [{ name: "Rotate Array", diff: "medium" },{ name: "Move Zeroes", diff: "easy" },{ name: "Majority Element", diff: "easy" }] },
      "Complexity & Edge Cases": { diff: "easy", explanation: "Complete complexity reference and edge case checklist. In interviews, state complexity and edge cases before coding.", intuition: "Complexity table is exam-mandatory. Edge cases break most solutions: empty array, single element, all duplicates, negatives, sorted/reversed.", steps: ["Access O(1) — address arithmetic.","Search O(n) — scan all worst case.","Insert/Delete O(n) — shift elements.","Append amortised O(1) — O(n) only on resize.","Binary search O(log n) — sorted only."], dryRun: `Operation     | Best    | Worst   | Space\n──────────────┼─────────┼─────────┼──────\nAccess arr[i] | O(1)    | O(1)    | O(1)\nSearch        | O(1)    | O(n)    | O(1)\nInsert (mid)  | O(n)    | O(n)    | O(1)\nDelete (mid)  | O(n)    | O(n)    | O(1)\nAppend        | O(1)*   | O(n)    | O(1)\nBinary Search | O(1)    | O(log n)| O(1)\n\nEdge Cases:\n  ✓ Empty array → check before indexing\n  ✓ Single element → loop-based solutions may break\n  ✓ All duplicates → remove-dups edge case\n  ✓ Negative numbers → max subarray, Two Sum\n  ✓ Already sorted / reverse sorted`, time: { best: "O(1) access", avg: "O(n) general", worst: "O(n) insert/del" }, space: "O(n) storage", stable: undefined, when: "Memorise this table. State complexity + 3 edge cases before writing code in any interview.", pros: ["O(1) access — unmatched","Binary search on sorted is powerful"], cons: ["O(n) insert/delete — frequent mods prefer linked list"], cpp: `void safe(vector<int>&a,int t){\n  if(a.empty()) return;\n  int lo=0,hi=a.size()-1;\n  while(lo<=hi){\n    int mid=lo+(hi-lo)/2; // avoid overflow\n    if(a[mid]==t) return;\n    else if(a[mid]<t) lo=mid+1;\n    else hi=mid-1;\n  }\n}`, python: `def safe(a,t):\n    if not a: return -1\n    lo,hi=0,len(a)-1\n    while lo<=hi:\n        mid=(lo+hi)//2\n        if a[mid]==t: return mid\n        elif a[mid]<t: lo=mid+1\n        else: hi=mid-1\n    return -1`, practice: [{ name: "Binary Search", diff: "easy" },{ name: "Missing Number", diff: "easy" },{ name: "Product of Array Except Self", diff: "medium" }] }
    }
  },
  Strings: {
    icon: "🔤", diff: "medium",
    desc: "Sequences of characters. Two Pointers, KMP, Tries, Suffix Arrays — second most asked after arrays.",
    subtopics: {
      "Basics & Representations": { diff: "easy", explanation: "A string is a sequence of characters. Two representations: (1) Null-terminated — array ending with '$'. Length = O(n) scan. Used in C/C++. (2) Pointer/Length — (pointer, length) pair. Length = O(1). Substring = O(1) as new (p+i, m) pair. In Python/Java strings are immutable.", intuition: "Null-terminated: scan to '$' for length — wasteful. Pointer/length: length stored explicitly. Substring is pure pointer arithmetic — no copy. This is why Patricia Trees and Suffix Trees can store all substrings in O(n) total space.", steps: ["Null-terminated: access char[i] in O(1). Length requires O(n) scan.","Pointer/length: (p, l). Length = O(1). Substring s[i..i+m-1] = (p+i, m). O(1).","String comparison: O(min(|s1|,|s2|)) — not O(1).","Python/Java: immutable. Use ''.join() or StringBuilder for many concatenations.","C++ std::string: mutable, length() = O(1)."], dryRun: `"grain-fed organic" (length=17)\n\nNull-terminated: scan until '$' → O(17)\nPointer/length: p=&arr[0], l=17\nExtract "organ" (idx 10, len 5):\n  new pair (p+10, 5) → O(1), no copy ✓\n\nComparison "apple" vs "apply":\na==a,p==p,p==p,l==l,e<y → not equal  O(4) ✓`, time: { best: "O(1) access", avg: "O(n) compare", worst: "O(n) null-term length" }, space: "O(n)", stable: undefined, when: "Use pointer/length for many substring extractions. Null-terminated for C API compatibility.", pros: ["O(1) access","Pointer/length: O(1) substring","Chars are integers — usable as array indices"], cons: ["Comparison O(n)","Null-terminated length O(n)","Immutable strings make repeated += O(n²)"], cpp: `string s = "hello";\nchar c = s[4];       // O(1)\nint n = s.size();    // O(1) in C++ std::string\nstring sub = s.substr(1,3); // O(k) copy\nbool eq = (s == "hello");   // O(n) comparison`, python: `s = "hello"\nc = s[4]        # O(1)\nn = len(s)      # O(1)\nsub = s[1:4]    # O(k) copy\n# Build efficiently:\nresult = ''.join(['h','e','l','l','o']) # O(n)`, practice: [{ name: "Reverse a String", diff: "easy" },{ name: "Valid Palindrome", diff: "easy" }] },
      "Core Techniques": { diff: "medium", explanation: "Six techniques cover ~80% of string problems: (1) Two Pointers — palindromes, reversals. (2) Sliding Window — substring with constraints. (3) Frequency Count int[26] — anagrams. (4) String Hashing — O(1) substring comparison. (5) Sorting — anagram canonical form. (6) Char as Index — c-'a' gives 0-25.", intuition: "Frequency count turns char comparison into integer array comparison. Sliding window avoids recomputing overlapping windows. Two pointers replaces O(n²) generation of all substrings.", steps: ["TWO POINTERS: l=0,r=n-1. Compare s[l] and s[r], move inward. O(n).","SLIDING WINDOW: expand right, shrink left on violation. O(n).","FREQ COUNT: freq[c-'a']++. Compare two freq arrays in O(26)=O(1).","HASHING: hash=(hash*base+s[i])%MOD. Slide in O(1).","CHAR AS INDEX: s[i]-'a' gives 0-25 directly — no HashMap needed."], dryRun: `TWO POINTERS: "racecar" palindrome?\nl=0,r=6: r==r ✓  l=1,r=5: a==a ✓\nl=2,r=4: c==c ✓  l=3,r=3: l>=r → YES ✓\n\nFREQ: "listen" vs "silent" anagram?\nfreq[listen]={l,i,s,t,e,n}\nfreq[silent]={s,i,l,e,n,t}\nArrays equal → YES ✓\n\nSLIDING WINDOW: longest no-repeat "abcabcbb"\nExpand: {a}→{a,b}→{a,b,c} len=3\nr=3:'a' repeat! shrink l to 1 → {b,c,a} len=3 ✓`, time: { best: "O(n)", avg: "O(n)", worst: "O(n)" }, space: "O(1) freq / O(n) window", stable: undefined, when: "Anagram→Freq. Substring→Sliding Window. Palindrome→Two Pointers. Duplicate substr→Hashing.", pros: ["All O(n)","freq[26] is O(1) space for fixed alphabets","Two pointers avoids O(n²) substr generation"], cons: ["Hashing has collision risk","Variable window conditions can be subtle"], cpp: `bool isPalindrome(string s){\n  int l=0,r=s.size()-1;\n  while(l<r) if(s[l++]!=s[r--]) return false;\n  return true;}\nbool isAnagram(string s,string t){\n  if(s.size()!=t.size()) return false;\n  int f[26]={};\n  for(char c:s) f[c-'a']++;\n  for(char c:t) f[c-'a']--;\n  for(int x:f) if(x) return false;\n  return true;}`, python: `def is_palindrome(s):\n    l,r=0,len(s)-1\n    while l<r:\n        if s[l]!=s[r]: return False\n        l+=1;r-=1\n    return True\ndef is_anagram(s,t):\n    if len(s)!=len(t): return False\n    f=[0]*26\n    for c in s: f[ord(c)-97]+=1\n    for c in t: f[ord(c)-97]-=1\n    return all(x==0 for x in f)`, practice: [{ name: "Valid Anagram", diff: "easy" },{ name: "Longest Substring Without Repeating Characters", diff: "medium" },{ name: "Minimum Window Substring", diff: "hard" }] },
      "Pattern Matching": { diff: "medium", explanation: "KMP: builds LPS (Longest Proper Prefix = Suffix) array for pattern P in O(m). Search in O(n). Never backtracks in T. Z-Algorithm: Z[i] = length of longest substring starting at i that matches a prefix. O(n+m). Rabin-Karp: rolling hash for O(1) window comparison. O(n+m) average.", intuition: "KMP: on mismatch at j, LPS[j-1] tells how far to jump back in P without moving i backward in T. Z-algo encodes same info differently. Both guarantee O(n+m).", steps: ["KMP BUILD LPS: lps[0]=0,len=0,i=1. If p[i]==p[len]: lps[i++]=++len. Else if len>0: len=lps[len-1]. Else: lps[i++]=0.","KMP SEARCH: i scans T, j scans P. Match→i++,j++. j==m→found, j=lps[j-1]. Mismatch: j>0→j=lps[j-1] else i++.","Z-ALGO: maintain [l,r]. Z[i]=min(r-i,Z[i-l]) if i<r, then extend. Update l,r.","RABIN-KARP: rolling hash for each T window. On match verify chars. O(n+m) avg."], dryRun: `KMP LPS for "aabaabaaa": [0,1,0,1,2,3,4,5,2]\n\nSearch "aba" in "ababcababa":\ni=0,j=0:a==a→i=1,j=1  i=1,j=1:b==b→i=2,j=2\ni=2,j=2:a==a→j=3=m→MATCH@0 ✓ j=lps[2]=1\ni=3,j=1:b==b→i=4,j=2  i=4,j=2:c≠a→j=lps[1]=0\ni=5-7: match → MATCH@5 ✓  i=8-9: MATCH@7 ✓`, time: { best: "O(n+m)", avg: "O(n+m)", worst: "O(n+m) KMP/Z" }, space: "O(m) LPS", stable: undefined, when: "Single pattern→KMP/Z. Multiple→Rabin-Karp. Many patterns→Aho-Corasick.", pros: ["KMP/Z: guaranteed O(n+m)","Never backtracks in T"], cons: ["LPS construction adds complexity","Rabin-Karp O(nm) worst case on collisions"], cpp: `vector<int> buildLPS(string&p){\n  int m=p.size(); vector<int> lps(m,0);\n  int len=0,i=1;\n  while(i<m){\n    if(p[i]==p[len]) lps[i++]=++len;\n    else if(len>0) len=lps[len-1];\n    else lps[i++]=0;}\n  return lps;}`, python: `def build_lps(p):\n    m=len(p);lps=[0]*m;length=0;i=1\n    while i<m:\n        if p[i]==p[length]: length+=1;lps[i]=length;i+=1\n        elif length>0: length=lps[length-1]\n        else: lps[i]=0;i+=1\n    return lps`, practice: [{ name: "Find the Index of First Occurrence", diff: "easy" },{ name: "Repeated Substring Pattern", diff: "easy" },{ name: "Shortest Palindrome", diff: "hard" }] },
      "DP on Strings": { diff: "hard", explanation: "Edit Distance: min insert/delete/replace to convert s1→s2. LCS: longest common subsequence (not contiguous). Longest Common Substring: must be contiguous. Palindromic Subsequence. All O(nm) DP on 2D table. Recurrence based on whether last chars match.", intuition: "All define dp[i][j] over prefixes. If last chars match: extend previous. Else: try skipping one char. Space reducible to O(min(n,m)) with rolling array.", steps: ["EDIT DIST: dp[i][j]=dp[i-1][j-1] if match, else 1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]).","LCS: dp[i][j]=dp[i-1][j-1]+1 if match, else max(dp[i-1][j],dp[i][j-1]).","LONGEST COMMON SUBSTR: same match case but reset to 0 on mismatch. Track max.","PALINDROMIC SUBSEQ: dp[i][j]=dp[i+1][j-1]+2 if s[i]==s[j], else max(dp[i+1][j],dp[i][j-1]).","BASE: dp[i][0]=i, dp[0][j]=j."], dryRun: `EDIT DISTANCE "horse"→"ros":\n     "" r  o  s\n""  [0  1  2  3]\nh   [1  1  2  3]\no   [2  2  1  2]\nr   [3  2  2  2]\ns   [4  3  3  2]\ne   [5  4  4  3] ← answer=3 ✓`, time: { best: "O(nm)", avg: "O(nm)", worst: "O(nm)" }, space: "O(nm) or O(min(n,m)) rolling", stable: undefined, when: "Edit distance: spell-check, diff tools. LCS: bioinformatics. n,m≤1000: O(n²) fine.", pros: ["Elegant 2D DP","Space reducible to O(min(n,m))"], cons: ["O(nm) — not for large n,m without optimisation"], cpp: `int editDist(string s1,string s2){\n  int n=s1.size(),m=s2.size();\n  vector<int> p(m+1),c(m+1);\n  iota(p.begin(),p.end(),0);\n  for(int i=1;i<=n;i++){\n    c[0]=i;\n    for(int j=1;j<=m;j++)\n      c[j]=s1[i-1]==s2[j-1]?p[j-1]:1+min({p[j],c[j-1],p[j-1]});\n    swap(p,c);}\n  return p[m];}`, python: `def edit_distance(s1,s2):\n    n,m=len(s1),len(s2)\n    prev=list(range(m+1))\n    for i in range(1,n+1):\n        cur=[i]+[0]*m\n        for j in range(1,m+1):\n            if s1[i-1]==s2[j-1]: cur[j]=prev[j-1]\n            else: cur[j]=1+min(prev[j],cur[j-1],prev[j-1])\n        prev=cur\n    return prev[m]`, practice: [{ name: "Edit Distance", diff: "hard" },{ name: "Longest Common Subsequence", diff: "medium" },{ name: "Longest Palindromic Subsequence", diff: "medium" }] },
      "Important Problems": { diff: "medium", explanation: "Top 6 string interview problems: Longest Palindromic Substring (expand around center O(n)), Minimum Window Substring (variable sliding window), Group Anagrams (sorted key), Decode String (stack), Reverse Words (3-reversal), Valid Palindrome II (skip one char).", intuition: "Palindrome expansion: 2n-1 centers, expand while matching. O(n). Minimum Window: 'formed' counter avoids scanning freq array every step.", steps: ["PALINDROME EXPAND: for each center expand while s[l]==s[r]. O(n).","GROUP ANAGRAMS: sort each string as map key. O(nm log m).","MIN WINDOW: need/window dicts + formed counter. Expand r, shrink l when formed==required. O(n+m).","DECODE STRING: stack of (string, count). On ']': pop, repeat, concat. O(n).","REVERSE WORDS: strip, reverse all, reverse each word. O(n).","VALID PAL II: on mismatch try skip s[l] or s[r], check rest. O(n)."], dryRun: `LONGEST PAL "babad":\ncenter 'a'(idx1): expand → "bab" len=3 ✓\ncenter 'b'(idx2): expand → "aba" len=3 ✓\nAnswer: "bab" ✓\n\nGROUP ANAGRAMS ["eat","tea","tan","ate","nat","bat"]:\n"eat"→"aet"  "tea"→"aet"  "ate"→"aet" → group1\n"tan"→"ant"  "nat"→"ant" → group2\n"bat"→"abt" → group3 ✓`, time: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" }, space: "O(n)", stable: undefined, when: "Top 6 must-know problems. Practice until each takes <8 min.", pros: ["All O(n) or O(n log n)","Each demonstrates a distinct reusable pattern"], cons: ["Min window 'formed' counter logic is subtle","Decode string edge cases: nested brackets"], cpp: `string longestPal(string s){\n  int n=s.size(),st=0,mx=1;\n  auto exp=[&](int l,int r){\n    while(l>=0&&r<n&&s[l]==s[r])l--,r++;\n    if(r-l-1>mx){mx=r-l-1;st=l+1;}};\n  for(int i=0;i<n;i++){exp(i,i);exp(i,i+1);}\n  return s.substr(st,mx);}`, python: `def longest_palindrome(s):\n    n=len(s);res=""\n    def exp(l,r):\n        while l>=0 and r<n and s[l]==s[r]: l-=1;r+=1\n        return s[l+1:r]\n    for i in range(n):\n        for p in [exp(i,i),exp(i,i+1)]:\n            if len(p)>len(res): res=p\n    return res`, practice: [{ name: "Longest Palindromic Substring", diff: "medium" },{ name: "Minimum Window Substring", diff: "hard" },{ name: "Group Anagrams", diff: "medium" },{ name: "Decode String", diff: "medium" }] }
    }
  },
  "Linked List": {
    icon: "🔗", diff: "easy",
    desc: "Dynamic node-based structure. O(1) head insert/delete. Reversal, cycle detection, slow-fast pointer — core interview topics.",
    subtopics: {
      "Basics & Node Structure": {
        diff: "easy",
        explanation: "A linked list is a linear data structure where elements (nodes) are stored non-contiguously in memory. Each node contains two fields: (1) data — the value stored, and (2) next — a pointer to the next node. The list is accessed via a head pointer. The last node's next pointer is NULL, marking the end. The LinkedList object holds only a reference to the first node (head). From the tutorialspoint PDF: 'Each Link carries a data field and a Link Field called next. Last Link carries a Link as null to mark the end of the list.'",
        intuition: "Imagine a treasure hunt where each clue tells you where the next clue is. You can't jump to clue 5 directly — you must follow the chain from head. No address formula exists like arrays. The key trade-off: no O(1) random access, but inserting or deleting at the head is O(1) — just update one pointer with no shifting.",
        steps: [
          "Create a Node: allocate memory, set node.data = value, node.next = NULL.",
          "Create LinkedList: maintain a head pointer pointing to the first node.",
          "Traverse: start at head, follow .next pointers until NULL. Each step visits one node. O(n).",
          "Access node at index k: start at head, advance k times. O(k) — no shortcut.",
          "End of list: when node.next == NULL, you are at the last node.",
          "Empty list: head == NULL."
        ],
        dryRun: `Node structure:
  [ data | next→ ] → [ data | next→ ] → [ data | next→ ] → NULL

Example: head → [10|→] → [20|→] → [30|→] → NULL

Traverse:
  temp = head        → data=10
  temp = temp.next   → data=20
  temp = temp.next   → data=30
  temp = temp.next   → NULL → STOP ✓

Access index 2:
  head(0) → node(1) → node(2) ← found in 2 steps
  O(n) — no O(1) shortcut like arrays ✗

Insert at beginning — O(1):
  Before: head → [10] → [20] → NULL
  newNode(5).next = head
  head = newNode(5)
  After:  head → [5] → [10] → [20] → NULL ✓`,
        time: { best: "O(1) head", avg: "O(n) traverse", worst: "O(n) access" },
        space: "O(n)",
        stable: undefined,
        when: "Use when frequent insertion/deletion at head or middle is needed and random access is NOT required. Prefer arrays for O(1) access by index.",
        pros: [
          "O(1) insert/delete at head — no shifting needed",
          "Dynamic size — no pre-allocation required",
          "Efficient memory use — allocate only what's needed",
          "Foundation for stacks, queues, adjacency lists"
        ],
        cons: [
          "O(n) access — no random access by index",
          "Extra memory per node for pointer field",
          "Cache-unfriendly — nodes scattered in memory",
          "No backward traversal in singly linked list"
        ],
        cpp: `// Linked List Node and basic operations — C++
struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

// Insert at beginning — O(1) (from tutorialspoint PDF)
void insertFirst(Node*& head, int val) {
    Node* link = new Node(val);
    link->next = head;   // point to old first node
    head = link;         // point head to new first node
}

// Delete at beginning — O(1)
Node* deleteFirst(Node*& head) {
    Node* tempLink = head;   // save reference to first link
    head = head->next;       // mark next as first
    return tempLink;         // return the deleted link
}

// Traversal — O(n)
void printList(Node* head) {
    Node* ptr = head;
    while (ptr != nullptr) {
        cout << ptr->data << " → ";
        ptr = ptr->next;
    }
    cout << "NULL" << endl;
}`,
        python: `# Linked List Node and basic operations — Python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None   # pointer to next node

class LinkedList:
    def __init__(self):
        self.head = None   # start of list (First link)

    # Insert at beginning — O(1)
    def insert_first(self, val):
        link = Node(val)
        link.next = self.head   # point to old first node
        self.head = link        # point head to new first node

    # Delete at beginning — O(1)
    def delete_first(self):
        if not self.head: return None
        temp = self.head         # save reference to first link
        self.head = self.head.next  # mark next as first
        return temp

    # Traversal — O(n)
    def print_list(self):
        ptr = self.head
        while ptr:
            print(ptr.data, end=" → ")
            ptr = ptr.next
        print("NULL")`,
        practice: [
          { name: "Design Linked List", diff: "medium" },
          { name: "Middle of the Linked List", diff: "easy" },
          { name: "Convert Binary Number in LL to Integer", diff: "easy" }
        ]
      },
      "Types of Linked Lists": {
        diff: "easy",
        explanation: "Four types: (1) Singly Linked List — each node has one next pointer; navigation forward only. (2) Doubly Linked List — each node has next AND prev; bidirectional traversal; O(1) delete of any node if you have its pointer. (3) Circular Linked List — last node's next points back to head instead of NULL; used in round-robin scheduling. (4) Circular Doubly Linked List — both next and prev are circular. From tutorialspoint: 'Simple Linked List: forward only. Doubly: forward and backward. Circular: last item links to first, first links to last.'",
        intuition: "Singly: one-way street. Doubly: two-way street — go back. Circular: roundabout — loops back. Doubly costs extra memory (prev pointer) but enables O(1) delete of any node without finding its predecessor. Circular eliminates NULL sentinel for naturally cyclic applications.",
        steps: [
          "SINGLY: Node={data,next}. head→A→B→C→NULL. Forward only. O(n) traversal.",
          "DOUBLY: Node={prev,data,next}. NULL←A⇄B⇄C→NULL. Bidirectional. O(1) delete with node pointer.",
          "CIRCULAR: tail.next=head (not NULL). Must check temp!=head to stop traversal.",
          "CIRCULAR DOUBLY: tail.next=head AND head.prev=tail. No NULLs anywhere.",
          "DOUBLY INSERT at head: new.next=head; head.prev=new; head=new. O(1).",
          "DOUBLY DELETE node: node.prev.next=node.next; node.next.prev=node.prev. O(1)."
        ],
        dryRun: `SINGLY:
  head → [A|→] → [B|→] → [C|→] → NULL
  Forward only. No prev pointer.

DOUBLY:
  NULL ← [←A→] ⇄ [←B→] ⇄ [←C→] → NULL
  Delete B in O(1): A.next=C, C.prev=A ✓

CIRCULAR:
  [A|→] → [B|→] → [C|→]
    ↑________________________|
  tail.next = head (not NULL) ↺
  Traversal: start at head, stop when temp==head again

CIRCULAR DOUBLY:
  head.prev = tail  AND  tail.next = head
  No NULL pointers anywhere ↺`,
        time: { best: "O(1) insert head", avg: "O(n) search", worst: "O(n) access" },
        space: "O(n) singly, O(2n) doubly",
        stable: undefined,
        when: "Singly: default, minimal memory. Doubly: backward traversal needed, or O(1) delete. Circular: queues, round-robin, LRU cache. Doubly Circular: most flexible.",
        pros: [
          "Doubly: O(1) delete with node pointer — no need to find predecessor",
          "Doubly: bidirectional traversal",
          "Circular: natural fit for cyclic applications (playlists, scheduling)"
        ],
        cons: [
          "Doubly: 2× pointer memory per node",
          "Circular: traversal must check for loop — no NULL sentinel",
          "More complex to implement than singly"
        ],
        cpp: `// Doubly Linked List — C++
struct DNode {
    int data;
    DNode *prev, *next;
    DNode(int val): data(val), prev(nullptr), next(nullptr) {}
};

// Insert at beginning — O(1)
void insertFirst(DNode*& head, int val) {
    DNode* node = new DNode(val);
    node->next = head;
    if (head) head->prev = node;
    head = node;
}

// Delete node given pointer — O(1) ← KEY ADVANTAGE
void deleteNode(DNode*& head, DNode* target) {
    if (target->prev) target->prev->next = target->next;
    else head = target->next;     // deleting head
    if (target->next) target->next->prev = target->prev;
    delete target;
}

// Circular traversal
void printCircular(Node* head) {
    if (!head) return;
    Node* temp = head;
    do {
        cout << temp->data << " → ";
        temp = temp->next;
    } while (temp != head);
    cout << "(head)" << endl;
}`,
        python: `# Doubly Linked List — Python
class DNode:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self): self.head = None

    # Insert at beginning — O(1)
    def insert_first(self, val):
        node = DNode(val)
        node.next = self.head
        if self.head: self.head.prev = node
        self.head = node

    # Delete node given pointer — O(1)
    def delete_node(self, target):
        if target.prev: target.prev.next = target.next
        else: self.head = target.next   # deleting head
        if target.next: target.next.prev = target.prev

# Circular traversal
def print_circular(head):
    if not head: return
    temp = head
    while True:
        print(temp.data, end=" → ")
        temp = temp.next
        if temp == head: break
    print("(head)")`,
        practice: [
          { name: "Design Circular Queue", diff: "medium" },
          { name: "LRU Cache (Doubly LL + HashMap)", diff: "medium" },
          { name: "Flatten Multilevel Doubly Linked List", diff: "medium" }
        ]
      },
      "Core Operations": {
        diff: "easy",
        explanation: "Five core operations from both your notes and the tutorialspoint PDF. Insertion: at beginning O(1), at end O(n), at position k O(n). Deletion: of head O(1), of last O(n), by value O(n). Traversal/Navigation O(n). Search O(n). The PDF describes insertion as a 3-step process: create new link, point it to old first, point head to new link. Deletion: save head reference, advance head to next.",
        intuition: "All operations except head insert/delete require traversal first — O(n). There is no address formula. The 'stop one before target' pattern is key: to delete node with value V, stop at the node BEFORE it and rewire. To insert at position k, stop at node k-1 and rewire two pointers.",
        steps: [
          "INSERT AT HEAD: newNode.next=head; head=newNode. O(1). Two pointer updates.",
          "INSERT AT END: traverse until temp.next==NULL, then temp.next=newNode. O(n).",
          "INSERT AT POSITION k: traverse to node k-1. newNode.next=temp.next; temp.next=newNode. O(k).",
          "DELETE HEAD: head=head.next. O(1). Free old head.",
          "DELETE LAST: traverse until temp.next.next==NULL, then temp.next=NULL. O(n).",
          "DELETE BY VALUE: traverse until temp.next.data==val, then temp.next=temp.next.next. O(n).",
          "SEARCH: traverse and compare each node's data with target. O(n)."
        ],
        dryRun: `INSERT 25 at position 2 in [10→20→30→40]:
  traverse to index 1 (k-1=1): temp = node(20)
  newNode(25).next = node(30)
  node(20).next = newNode(25)
  Result: [10→20→25→30→40] ✓  O(n)

DELETE value 30 from [10→20→30→40]:
  traverse until temp.next.data==30: temp=node(20)
  node(20).next = node(30).next = node(40)
  Result: [10→20→40] ✓  O(n)

NAVIGATION (tutorialspoint PDF):
  current = First (head)
  while current != NULL:
      display current.data
      current = current.next  ← advance to Next Link`,
        time: { best: "O(1) head ops", avg: "O(n)", worst: "O(n)" },
        space: "O(1) extra",
        stable: undefined,
        when: "O(1) insert/delete at head is the signature advantage. For arbitrary position: O(n) — use arrays if index-based access dominates.",
        pros: [
          "O(1) insert/delete at head — no shifting",
          "Insert at middle only rewires pointers (not shift)",
          "Doubly LL: O(1) delete with node pointer"
        ],
        cons: [
          "O(n) for all operations except head insert/delete",
          "Must traverse to find position before operating",
          "No O(1) random access"
        ],
        cpp: `// Core Operations — C++
// Insert at beginning — O(1) (from tutorialspoint)
void insertFirst(Node*& head, int val) {
    Node* link = new Node(val);
    link->next = head;   // point to old first
    head = link;         // update head
}

// Delete at beginning — O(1)
Node* deleteFirst(Node*& head) {
    Node* temp = head;
    head = head->next;
    return temp;
}

// Insert at position k — O(k)
void insertAt(Node*& head, int val, int k) {
    if (k == 0) { insertFirst(head, val); return; }
    Node* temp = head;
    for (int i = 0; i < k-1 && temp; i++)
        temp = temp->next;
    if (!temp) return;
    Node* node = new Node(val);
    node->next = temp->next;
    temp->next = node;
}

// Delete by value — O(n)
void deleteByVal(Node*& head, int val) {
    if (!head) return;
    if (head->data == val) { deleteFirst(head); return; }
    Node* temp = head;
    while (temp->next && temp->next->data != val)
        temp = temp->next;
    if (temp->next)
        temp->next = temp->next->next;
}`,
        python: `# Core Operations — Python
class LinkedList:
    def __init__(self): self.head = None

    # Insert at beginning — O(1)
    def insert_first(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node

    # Insert at end — O(n)
    def insert_end(self, val):
        node = Node(val)
        if not self.head: self.head = node; return
        temp = self.head
        while temp.next: temp = temp.next
        temp.next = node

    # Insert at position k — O(k)
    def insert_at(self, val, k):
        if k == 0: self.insert_first(val); return
        temp = self.head
        for _ in range(k-1):
            if not temp: return
            temp = temp.next
        node = Node(val)
        node.next = temp.next
        temp.next = node

    # Delete by value — O(n)
    def delete_by_val(self, val):
        if not self.head: return
        if self.head.data == val:
            self.head = self.head.next; return
        temp = self.head
        while temp.next and temp.next.data != val:
            temp = temp.next
        if temp.next:
            temp.next = temp.next.next`,
        practice: [
          { name: "Remove Linked List Elements", diff: "easy" },
          { name: "Delete Node in a Linked List", diff: "medium" },
          { name: "Remove Duplicates from Sorted List", diff: "easy" }
        ]
      },
      "Slow-Fast Pointer": {
        diff: "medium",
        explanation: "The slow-fast (tortoise and hare) technique uses two pointers moving at different speeds. Slow advances 1 step; fast advances 2 steps. Three applications: (1) Find Middle — when fast reaches end, slow is at middle. (2) Detect Cycle (Floyd's Algorithm) — if slow==fast at any point, a cycle exists. (3) Find Cycle Start — after detection, move slow to head and advance both 1 step until they meet again at the cycle entry point.",
        intuition: "Two runners on a circular track — the faster one always laps the slower one if there's a loop. For finding middle: fast covers 2× the distance, so when fast finishes, slow is halfway. For cycle start: the mathematical proof shows the distance from head to cycle start equals the distance from meeting point to cycle start.",
        steps: [
          "FIND MIDDLE: slow=head, fast=head. While fast&&fast.next: slow=slow.next, fast=fast.next.next. Return slow.",
          "DETECT CYCLE: same movement. If slow==fast → cycle exists. Return true.",
          "FIND CYCLE START: Phase 1: detect (find meeting point). Phase 2: move slow=head, keep fast at meeting point. Advance both 1 step until slow==fast. Return slow.",
          "Even-length list: slow lands at second middle node. Use fast!=NULL&&fast.next!=NULL as condition.",
          "Odd-length list: slow lands exactly at middle."
        ],
        dryRun: `FIND MIDDLE [1→2→3→4→5]:
  slow=1,fast=1
  step1: slow=2, fast=3
  step2: slow=3, fast=5
  fast.next=NULL → STOP → middle=slow=node(3) ✓

DETECT CYCLE [1→2→3→4→2 (loop)]:
  step1: slow=2, fast=3
  step2: slow=3, fast=2 (looped)
  step3: slow=4, fast=4 → slow==fast → CYCLE ✓

FIND CYCLE START (meeting at node 4):
  Move slow=head=1, keep fast=4
  step1: slow=2, fast=2 (loop entry)
  slow==fast → Cycle starts at node(2) ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1)",
        stable: undefined,
        when: "Finding middle → slow-fast. Cycle detection → Floyd's. Nth from end → two pointers gap of n. Palindrome LL → find middle + reverse second half.",
        pros: [
          "O(1) space — no extra data structure",
          "O(n) single pass",
          "Works without modifying the list"
        ],
        cons: [
          "Finding cycle START requires a second pass",
          "Off-by-one with even-length lists — check loop condition carefully"
        ],
        cpp: `// Slow-Fast Pointer — C++

// Find Middle — O(n), O(1)
Node* findMiddle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

// Detect Cycle — Floyd's, O(n), O(1)
bool hasCycle(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find Cycle Start — O(n), O(1)
Node* cycleStart(Node* head) {
    Node* slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next; fast = fast->next->next;
        if (slow == fast) break;
    }
    if (!fast || !fast->next) return nullptr;
    slow = head;
    while (slow != fast) { slow = slow->next; fast = fast->next; }
    return slow;
}`,
        python: `# Slow-Fast Pointer — Python

# Find Middle — O(n), O(1)
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Detect Cycle — Floyd's, O(n), O(1)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast: return True
    return False

# Find Cycle Start — O(n), O(1)
def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
        if slow is fast: break
    else: return None
    slow = head
    while slow is not fast:
        slow = slow.next; fast = fast.next
    return slow`,
        practice: [
          { name: "Linked List Cycle", diff: "easy" },
          { name: "Linked List Cycle II (find start)", diff: "medium" },
          { name: "Middle of the Linked List", diff: "easy" },
          { name: "Happy Number (cycle in sequence)", diff: "easy" }
        ]
      },
      "Reverse & Classic Algorithms": {
        diff: "medium",
        explanation: "Reverse Linked List is the #1 most asked LL interview question. Iterative approach: three pointers (prev, curr, next) — O(n) time, O(1) space. The tutorialspoint PDF gives this exact implementation. Two other classics: Merge Two Sorted Lists (dummy head + two pointers, O(n+m), O(1)) and Remove Nth Node from End (two-pointer gap technique, O(n), O(1)).",
        intuition: "Reversal: at each step make curr.next point backward (to prev). Save next before destroying it. Three-pointer dance: save→flip→advance. Dummy node in merge avoids special-casing the head. Nth from end: advance fast pointer n steps ahead, then both pointers until fast reaches end — slow is at the node before target.",
        steps: [
          "REVERSE: prev=NULL, curr=head. Loop: next=curr.next; curr.next=prev; prev=curr; curr=next. head=prev.",
          "MERGE SORTED: dummy node as sentinel. tail=dummy. Compare l1.data vs l2.data, attach smaller, advance. Append remaining. Return dummy.next.",
          "REMOVE NTH FROM END: advance fast n steps. If fast==NULL, delete head. Move both until fast.next==NULL. slow.next=slow.next.next.",
          "PALINDROME: find middle → reverse second half → compare halves → (restore).",
          "REVERSE K-GROUPS: reverse first k nodes, recursively solve rest, connect."
        ],
        dryRun: `REVERSE [1→2→3→4→5]:
  prev=NULL, curr=1
  step1: next=2, 1.next=NULL, prev=1, curr=2
  step2: next=3, 2.next=1,    prev=2, curr=3
  step3: next=4, 3.next=2,    prev=3, curr=4
  step4: next=5, 4.next=3,    prev=4, curr=5
  step5: next=NULL, 5.next=4, prev=5, curr=NULL
  head=prev=5
  Result: 5→4→3→2→1→NULL ✓

MERGE [1→3→5] and [2→4→6]:
  dummy→tail
  1<2→take1  2<3→take2  3<4→take3
  4<5→take4  5<6→take5  append6
  Result: 1→2→3→4→5→6 ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) iterative, O(n) recursive",
        stable: undefined,
        when: "Reverse: always iterative in interviews (O(1) space). Merge: subroutine in Merge Sort on LL. Palindrome: reverse-second-half is optimal O(n)/O(1).",
        pros: [
          "Iterative reverse is O(1) space",
          "Three-pointer pattern is universally applicable",
          "Dummy node eliminates head edge cases in merge"
        ],
        cons: [
          "Recursive reverse uses O(n) stack — avoid for large lists",
          "Palindrome check modifies list — restore if needed",
          "K-group reverse is significantly more complex"
        ],
        cpp: `// Reverse & Classics — C++

// Reverse Linked List — O(n), O(1) ← from tutorialspoint PDF
void reverse(Node** head) {
    Node* prev = nullptr;
    Node* current = *head;
    Node* next = nullptr;
    while (current != nullptr) {
        next = current->next;    // save next
        current->next = prev;    // reverse pointer
        prev = current;          // advance prev
        current = next;          // advance current
    }
    *head = prev;
}

// Merge Two Sorted Lists — O(n+m), O(1)
Node* mergeSorted(Node* l1, Node* l2) {
    Node dummy(-1);
    Node* tail = &dummy;
    while (l1 && l2) {
        if (l1->data <= l2->data) { tail->next=l1; l1=l1->next; }
        else { tail->next=l2; l2=l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

// Remove Nth from End — O(n), O(1)
Node* removeNth(Node* head, int n) {
    Node dummy(0); dummy.next = head;
    Node* fast = &dummy, *slow = &dummy;
    for (int i = 0; i <= n; i++) fast = fast->next;
    while (fast) { fast=fast->next; slow=slow->next; }
    slow->next = slow->next->next;
    return dummy.next;
}`,
        python: `# Reverse & Classics — Python

# Reverse Linked List — O(n), O(1)
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next    # save next
        curr.next = prev   # reverse pointer
        prev = curr        # advance prev
        curr = nxt         # advance curr
    return prev            # new head

# Merge Two Sorted Lists — O(n+m), O(1)
def merge_sorted(l1, l2):
    dummy = Node(-1)
    tail = dummy
    while l1 and l2:
        if l1.data <= l2.data: tail.next=l1; l1=l1.next
        else: tail.next=l2; l2=l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next

# Remove Nth from End — O(n), O(1)
def remove_nth(head, n):
    dummy = Node(0); dummy.next = head
    fast = slow = dummy
    for _ in range(n+1): fast = fast.next
    while fast: fast=fast.next; slow=slow.next
    slow.next = slow.next.next
    return dummy.next`,
        practice: [
          { name: "Reverse Linked List", diff: "easy" },
          { name: "Reverse Linked List II (sublist)", diff: "medium" },
          { name: "Merge Two Sorted Lists", diff: "easy" },
          { name: "Remove Nth Node From End", diff: "medium" },
          { name: "Palindrome Linked List", diff: "easy" },
          { name: "Reverse Nodes in K-Group", diff: "hard" }
        ]
      },
      "Complexity & Interview Guide": {
        diff: "easy",
        explanation: "Complete complexity reference for all linked list operations and a curated must-know problem list. Linked lists appear in nearly every technical interview. Master these 7 problems: Reverse LL, Detect Cycle, Find Cycle Start, Find Middle, Palindrome LL, Merge Two Sorted, Remove Nth from End. Three core interview patterns: dummy node, two-pointer gap, slow-fast.",
        intuition: "Linked list interviews test pointer manipulation, not algorithmic complexity. The difficulty is getting pointer updates right without losing nodes. Always draw the list on paper first. Use dummy nodes for cleaner code. Always check NULL before dereferencing.",
        steps: [
          "Access: O(n) — traverse from head. No formula.",
          "Search: O(n) — scan all nodes.",
          "Insert at head: O(1) — two pointer updates.",
          "Insert at end/position: O(n) — traverse first.",
          "Delete head: O(1). Delete other: O(n).",
          "INTERVIEW PATTERN 1: dummy node → avoids edge cases for head operations.",
          "INTERVIEW PATTERN 2: two pointers with gap of n → find nth from end.",
          "INTERVIEW PATTERN 3: slow-fast → middle, cycle detection, cycle start."
        ],
        dryRun: `Operation      | Time  | Space | Notes
───────────────┼───────┼───────┼───────────────────────
Access (index) | O(n)  | O(1)  | Traverse from head
Search         | O(n)  | O(1)  | Scan each node
Insert (head)  | O(1)  | O(1)  | Signature advantage
Insert (end)   | O(n)  | O(1)  | Traverse to tail first
Insert (mid)   | O(n)  | O(1)  | Traverse to position
Delete (head)  | O(1)  | O(1)  | Just update head
Delete (end)   | O(n)  | O(1)  | Traverse to 2nd last
Delete (mid)   | O(n)  | O(1)  | Traverse to prev node
Reverse        | O(n)  | O(1)  | 3-pointer iterative
Detect cycle   | O(n)  | O(1)  | Floyd's algorithm
Find middle    | O(n)  | O(1)  | Slow-fast pointer

Edge Cases — always check:
  ✓ head = NULL (empty list) → return early
  ✓ Single node → loop-based solutions may fail
  ✓ Two nodes → many off-by-one errors here
  ✓ k > length (remove nth) → edge case for dummy
  ✓ All same values → delete by value issues`,
        time: { best: "O(1) head ops", avg: "O(n)", worst: "O(n)" },
        space: "O(1) most ops",
        stable: undefined,
        when: "Use this as your interview quick-reference. Draw the list before coding. Use dummy nodes. Always check NULL before ->next.",
        pros: [
          "O(1) head insert/delete — no shifting like arrays",
          "Dynamic size — grows/shrinks freely",
          "Efficient for stacks, queues, graph adjacency lists"
        ],
        cons: [
          "No O(1) random access — must traverse",
          "Cache unfriendly — scattered memory",
          "Extra pointer field per node"
        ],
        cpp: `// Interview Patterns — C++

// PATTERN 1: Dummy head (avoids head edge cases)
Node dummy(0);
dummy.next = head;
Node* tail = &dummy;
// ... build result list ...
return dummy.next;

// PATTERN 2: Two pointers with gap of n
Node* fast = head, *slow = head;
for (int i = 0; i < n; i++) fast = fast->next;
while (fast->next) { fast=fast->next; slow=slow->next; }
// slow.next is the nth node from end

// PATTERN 3: Intersection of two lists
Node* a = headA, *b = headB;
while (a != b) {
    a = a ? a->next : headB;
    b = b ? b->next : headA;
}
return a; // intersection or NULL

// Always: safe NULL check
while (temp && temp->next) { // NOT while(temp->next)
    // safe to use temp->next->next here
}`,
        python: `# Interview Patterns — Python

# PATTERN 1: Dummy head
dummy = Node(0); dummy.next = head
tail = dummy
# build result... return dummy.next

# PATTERN 2: Two pointers gap of n
fast = slow = head
for _ in range(n): fast = fast.next
while fast.next:
    fast = fast.next; slow = slow.next
# slow.next is nth from end

# PATTERN 3: List intersection
a, b = head_a, head_b
while a is not b:
    a = a.next if a else head_b
    b = b.next if b else head_a
# a is intersection or None

# Edge case template
def solve(head):
    if not head: return None          # empty
    if not head.next: return head     # single node
    # your logic here...`,
        practice: [
          { name: "Reverse Linked List", diff: "easy" },
          { name: "Linked List Cycle II", diff: "medium" },
          { name: "Intersection of Two Linked Lists", diff: "easy" },
          { name: "Sort List (Merge Sort on LL)", diff: "medium" },
          { name: "Reorder List", diff: "medium" },
          { name: "Copy List with Random Pointer", diff: "medium" }
        ]
      }
    }
  },
  Stack: {
    icon: "📚", diff: "easy",
    desc: "LIFO structure. Push, pop, peek all O(1). Powers recursion, expression evaluation, parsing, and monotonic stack problems.",
    subtopics: {
      "Basics & LIFO": {
        diff: "easy",
        explanation: "A stack is a non-primitive linear data structure. It is an ordered list in which addition of new data items and deletion of already existing data items is done from only one end, known as the Top of Stack (TOS). Because all insertions and deletions happen at the top, the last added element is the first to be removed — this is why a stack is called a Last-In-First-Out (LIFO) type of list. Core terms: Top — pointer/index to the last inserted element. Push — insert an element. Pop — remove the top element. Peek — return top element without removing it. isEmpty — check if stack is empty. isFull — check if stack is full (array implementation only).",
        intuition: "Think of a pile of plates at a marriage party. Fresh plates are pushed onto the top and popped off the top. Or biscuits in a pack torn at one end — you push biscuits back in and pop them out from the same end. Whenever a stack is created the base remains fixed. As new elements are added the top increases; as elements are removed the top decrements.",
        steps: [
          "PUSH: (1) Check if stack is full (overflow check). (2) Increment top. (3) Insert element at stack[top].",
          "POP: (1) Check if stack is empty (underflow check). (2) Save stack[top] in NUM. (3) Decrement top. (4) Return NUM.",
          "PEEK: Return stack[top] without changing top. Check empty first.",
          "isEmpty: Return top == -1 (array) or top == NULL (linked list).",
          "isFull: Return top == MAXSIZE - 1 (array implementation only).",
          "OVERFLOW: Trying to push when stack is full. UNDERFLOW: Trying to pop when stack is empty."
        ],
        dryRun: `Stack: [10, 20, 30]  top=2

Push(40):
  top == MAXSIZE-1? No → top=3, stack[3]=40
  Stack: [10, 20, 30, 40]  top=3 ✓

Pop():
  top == -1? No → NUM=stack[3]=40, top=2
  Stack: [10, 20, 30]  top=2 ✓

Peek():
  top == -1? No → return stack[2]=30
  Stack unchanged ✓

Push on full stack (MAXSIZE=3, top=2):
  top == MAXSIZE-1? YES → STACK OVERFLOW ✗

Pop on empty stack (top=-1):
  top == -1? YES → STACK UNDERFLOW ✗`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n)",
        stable: undefined,
        when: "Use a stack whenever you need LIFO access: function call management, undo/redo, expression evaluation, backtracking, DFS, balanced parentheses checking.",
        pros: [
          "All operations O(1) — push, pop, peek are constant time",
          "Simple to implement (array or linked list)",
          "Natural fit for recursion simulation and backtracking",
          "Memory efficient for LIFO use cases"
        ],
        cons: [
          "Array-based: fixed size — overflow if capacity exceeded",
          "No random access — can only access the top element",
          "Linked list-based: extra memory per node for pointer",
          "Not suitable when you need to access arbitrary elements"
        ],
        cpp: `// Stack — Array-based (Static Implementation)
#define MAXSIZE 100
class Stack {
    int top;
    int arr[MAXSIZE];
public:
    Stack() { top = -1; }

    void push(int x) {
        if (top >= MAXSIZE - 1) {
            cout << "Stack Overflow\n"; return;
        }
        arr[++top] = x;    // increment top, then insert
    }

    int pop() {
        if (top < 0) {
            cout << "Stack Underflow\n"; return -1;
        }
        return arr[top--]; // return top, then decrement
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];   // just look, don't remove
    }

    bool isEmpty() { return top < 0; }
    bool isFull()  { return top >= MAXSIZE - 1; }
};

// STL stack (preferred in interviews)
#include <stack>
stack<int> st;
st.push(10);          // push
int x = st.top();     // peek
st.pop();             // pop
bool empty = st.empty();`,
        python: `# Stack — using Python list (dynamic, no size limit)
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, x):
        self.stack.append(x)       # O(1) amortised

    def pop(self):
        if not self.stack:
            return "Underflow"
        return self.stack.pop()    # O(1)

    def peek(self):
        if not self.stack:
            return None
        return self.stack[-1]      # O(1), no removal

    def is_empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

# Usage
s = Stack()
s.push(10); s.push(20); s.push(30)
print(s.peek())   # 30
print(s.pop())    # 30
print(s.pop())    # 20`,
        practice: [
          { name: "Implement Stack using Arrays", diff: "easy" },
          { name: "Valid Parentheses", diff: "easy" },
          { name: "Min Stack", diff: "medium" }
        ]
      },
      "Implementations": {
        diff: "easy",
        explanation: "Stacks can be implemented in two ways: (1) Static Implementation (Array-based) — uses a fixed-size array. Fast access, but size must be declared at design time. If too few elements are stored, memory is wasted; if too many elements need to be stored, the fixed size causes overflow. (2) Dynamic Implementation (Linked List-based) — uses nodes with data and a link pointer. No fixed size limit (until memory is full). The pointer to the beginning of the linked list serves as the top of the stack. Each push allocates a new node; each pop deallocates the top node. (3) Dynamic Stack (C++ vector/Python list) — resizes automatically; best of both worlds for most use cases.",
        intuition: "Array stack: contiguous memory, cache-friendly, but rigid. Linked list stack: flexible size, but each node needs extra memory for the pointer. In interviews, Python list or C++ STL stack are preferred — they handle resizing automatically. Know both for exam questions on static vs dynamic implementation.",
        steps: [
          "ARRAY PUSH: if top==MAXSIZE-1 → overflow. Else arr[++top]=value.",
          "ARRAY POP: if top==-1 → underflow. Else return arr[top--].",
          "LINKED LIST PUSH: allocate new node PTR. PTR->info=value. PTR->link=top. top=PTR.",
          "LINKED LIST POP: if top==NULL → underflow. PTR=top. NUM=PTR->info. top=top->link. free(PTR). Return NUM.",
          "Array: top starts at -1. Full when top==MAXSIZE-1.",
          "Linked list: top starts as NULL. Full only when system memory is exhausted."
        ],
        dryRun: `── ARRAY STACK (MAXSIZE=5, top=-1 initially) ─────────
Push(23): top=-1 → top=0, arr[0]=23
Push(-16): top=0 → top=1, arr[1]=-16
Push(11): top=1 → top=2, arr[2]=11
Push(10): top=2 → top=3, arr[3]=10
Stack: [23,-16,11,10]  top=3

Pop(): NUM=arr[3]=10, top=2 ✓
Stack: [23,-16,11]  top=2

── LINKED LIST STACK (top=NULL initially) ────────
Push(23): new node PTR. PTR->info=23. PTR->link=NULL. top=PTR
  top → [23|NULL]
Push(-16): new node. link=top. top=new
  top → [-16|→] → [23|NULL]
Push(11):  top → [11|→] → [-16|→] → [23|NULL]

Pop(): PTR=top. NUM=11. top=top->link. free(PTR)
  top → [-16|→] → [23|NULL] ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n) array / O(n) linked list + pointer overhead",
        stable: undefined,
        when: "Array: when max size is known and speed matters. Linked list: when size is unknown or varies greatly. Python list / C++ vector: default choice — dynamic sizing with amortised O(1) push.",
        pros: [
          "Array: faster (cache-friendly), no pointer overhead",
          "Linked list: truly dynamic — no overflow (until out of memory)",
          "Both give O(1) push and pop"
        ],
        cons: [
          "Array: fixed size declared at design time — wasted memory or overflow",
          "Linked list: extra memory for pointer in every node",
          "Linked list: slightly slower due to dynamic allocation"
        ],
        cpp: `// Static (Array) Stack — from textbook
#define MAXSIZE 5
int stack[MAXSIZE], top = -1;

void push(int num) {
    if (top == MAXSIZE - 1) { printf("Overflow"); return; }
    stack[++top] = num;
}
int pop() {
    if (top == -1) { printf("Underflow"); return -1; }
    return stack[top--];
}

// Dynamic (Linked List) Stack — from textbook
struct Node {
    int info;
    Node* link;
};
Node* top_ptr = nullptr;

void push_ll(int num) {
    Node* ptr = new Node();
    ptr->info = num;
    ptr->link = top_ptr;  // point to old top
    top_ptr = ptr;        // new top
}
void pop_ll() {
    if (!top_ptr) { printf("Underflow"); return; }
    Node* ptr = top_ptr;
    int num = ptr->info;
    top_ptr = top_ptr->link;
    delete ptr;           // free memory
}`,
        python: `# Static-style Stack (fixed max size) — Python
class ArrayStack:
    def __init__(self, maxsize=100):
        self.arr = [0] * maxsize
        self.top = -1
        self.maxsize = maxsize

    def push(self, num):
        if self.top == self.maxsize - 1:
            print("Stack Overflow"); return
        self.top += 1
        self.arr[self.top] = num

    def pop(self):
        if self.top == -1:
            print("Stack Underflow"); return -1
        num = self.arr[self.top]
        self.top -= 1
        return num

# Dynamic Stack — Python list (preferred)
class DynamicStack:
    def __init__(self):
        self.stack = []   # grows/shrinks automatically

    def push(self, num): self.stack.append(num)
    def pop(self):
        return self.stack.pop() if self.stack else "Underflow"
    def peek(self): return self.stack[-1] if self.stack else None`,
        practice: [
          { name: "Implement Stack using Linked List", diff: "easy" },
          { name: "Implement Stack using Queues", diff: "medium" },
          { name: "Design Min Stack", diff: "medium" }
        ]
      },
      "Polish Notations": {
        diff: "medium",
        explanation: "A Polish mathematician suggested a notation called Polish notation to remove ambiguity from arithmetic expressions. It has two forms: (1) Prefix — operator is written BEFORE operands (e.g. +AB). (2) Postfix — operator is written AFTER operands (e.g. AB+). The standard form we use in maths with operator between operands (A+B) is called Infix notation. The key property of Polish notation: the order of operations is completely determined by positions of operators and operands — parentheses are NOT required. Operator precedence (highest to lowest): ^ (exponent) > *,/ (multiply/divide) > +,- (add/subtract).",
        intuition: "In infix A+B*C, we need BODMAS rules to know * comes before +. In postfix ABC*+, the position alone tells us: multiply B and C first (BC*), then add A. A computer evaluating postfix needs only a stack — scan left to right, push operands, on operator pop two operands, compute, push result. No precedence rules needed. This is why compilers convert infix to postfix internally.",
        steps: [
          "INFIX TO POSTFIX MANUAL: (1) Parenthesize fully from left to right, higher-precedence operators first. (2) Move each operator to replace its corresponding right parenthesis. (3) Remove all parentheses.",
          "INFIX TO POSTFIX ALGORITHM: Push '(' onto stack, append ')' to expression. Scan left to right: operand→add to output. '('→push. operator→pop higher/equal precedence operators to output, then push. ')'→pop until '(' (discard both parens).",
          "EVALUATE POSTFIX: scan left to right. Operand→push. Operator→pop two operands (b=pop, a=pop), compute a⊕b, push result. Final answer = stack top.",
          "PRECEDENCE: ^ (3, right-assoc) > */ (2) > +- (1). When comparing operators at step 2, right-associative ^ does NOT pop equal precedence.",
          "EXAMPLE A+B*C: fully parenthesized = A+(B*C). Postfix = ABC*+.",
          "EXAMPLE (A+B)*(C-D): postfix = AB+CD-*."
        ],
        dryRun: `── INFIX TO POSTFIX: A + B * C ─────────────────────
Infix:  A + B * C
Step 1: A + (B * C)        [* higher than +]
Step 2: A + (BC*)          [move * inside right paren]
Step 3: A(BC*)+ → ABC*+   [move + inside right paren]
Postfix: ABC*+ ✓

── INFIX TO POSTFIX: (A+B)/(C-D) ───────────────────
(A+B) → (AB+)
(C-D) → (CD-)
(AB+)/(CD-) → AB+CD-/
Postfix: AB+CD-/ ✓

── EVALUATE POSTFIX: 2 3 4 * + ──────────────────────
Scan '2': push → [2]
Scan '3': push → [2,3]
Scan '4': push → [2,3,4]
Scan '*': pop 4,3 → 3*4=12 → push → [2,12]
Scan '+': pop 12,2 → 2+12=14 → push → [14]
Result = 14 ✓   (same as 2 + 3*4 = 14 infix)

── INFIX TO POSTFIX ALGORITHM TRACE: A+B*C ──────────
Stack: [(]  Output: ""
Scan A: output → "A"
Scan +: stack=[(,+]  Output: "A"
Scan B: output → "AB"
Scan *: * > + so push → stack=[(,+,*]  Output: "AB"
Scan C: output → "ABC"
Scan ): pop * → "ABC*", pop + → "ABC*+", pop (
Output: ABC*+ ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) stack",
        stable: undefined,
        when: "Compilers use infix→postfix conversion to generate machine instructions. Calculators evaluate postfix internally. Exam questions on expression conversion are very common.",
        pros: [
          "Postfix/Prefix remove need for parentheses and precedence rules",
          "Postfix evaluation is simple O(n) single-pass with a stack",
          "Unambiguous — position alone determines order of operations"
        ],
        cons: [
          "Less human-readable than infix",
          "Requires knowledge of algorithm for conversion",
          "Right-associative operators (^) need special handling"
        ],
        cpp: `// Evaluate Postfix Expression — C++
#include <stack>
#include <string>
int evalPostfix(string expr) {
    stack<int> st;
    for (char c : expr) {
        if (isdigit(c)) {
            st.push(c - '0');    // push operand
        } else {
            int b = st.top(); st.pop();  // second operand
            int a = st.top(); st.pop();  // first operand
            if (c == '+') st.push(a + b);
            if (c == '-') st.push(a - b);
            if (c == '*') st.push(a * b);
            if (c == '/') st.push(a / b);
        }
    }
    return st.top();  // final result
}

// Infix to Postfix — C++
int prec(char c){
    if(c=='^') return 3;
    if(c=='*'||c=='/') return 2;
    if(c=='+'||c=='-') return 1;
    return 0;
}
string infixToPostfix(string s) {
    stack<char> st; string result = "";
    for (char c : s) {
        if (isalnum(c)) result += c;
        else if (c == '(') st.push(c);
        else if (c == ')') {
            while (st.top() != '(') { result+=st.top(); st.pop(); }
            st.pop();
        } else {
            while (!st.empty() && prec(st.top()) >= prec(c))
                { result += st.top(); st.pop(); }
            st.push(c);
        }
    }
    while (!st.empty()) { result += st.top(); st.pop(); }
    return result;
}`,
        python: `# Evaluate Postfix Expression — Python
def eval_postfix(expr):
    stack = []
    for token in expr.split():
        if token.lstrip('-').isdigit():
            stack.append(int(token))   # push operand
        else:
            b = stack.pop()  # second operand
            a = stack.pop()  # first operand
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': stack.append(int(a / b))
    return stack[0]  # result

# Infix to Postfix — Python
def infix_to_postfix(expr):
    prec = {'^':3, '*':2, '/':2, '+':1, '-':1, '(':0}
    stack, result = [], []
    for c in expr:
        if c.isalnum(): result.append(c)
        elif c == '(': stack.append(c)
        elif c == ')':
            while stack and stack[-1] != '(': result.append(stack.pop())
            stack.pop()  # remove '('
        else:
            while stack and prec.get(stack[-1],0) >= prec[c]:
                result.append(stack.pop())
            stack.append(c)
    while stack: result.append(stack.pop())
    return ''.join(result)

# Test: A+B*C → ABC*+
print(infix_to_postfix("A+B*C"))  # ABC*+`,
        practice: [
          { name: "Evaluate Reverse Polish Notation", diff: "medium" },
          { name: "Basic Calculator II (infix with +,-,*,/)", diff: "medium" },
          { name: "Basic Calculator (with parentheses)", diff: "hard" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Four critical stack patterns appear repeatedly in interviews: (1) Balanced Parentheses — push opening brackets, on closing bracket check and match top. (2) Next Greater Element — use a decreasing monotonic stack; when current element is greater than stack top, the top's NGE is current element. (3) Monotonic Stack — maintains elements in increasing or decreasing order; processes each element in O(1) amortised giving O(n) total. (4) Min Stack — store (value, current_min) pairs so getMin() is O(1).",
        intuition: "Monotonic stack insight: each element is pushed and popped at most once → O(n) total even though there's a nested while loop. This is the amortised analysis. For balanced parentheses: a closing bracket can only be valid if it matches the most recent unmatched opening bracket — exactly what a stack top gives you.",
        steps: [
          "BALANCED PARENS: for each char: if '(' or '[' or '{' → push. If ')' or ']' or '}': check empty (invalid), pop and verify match. At end: stack must be empty.",
          "NEXT GREATER ELEMENT: for each element, while stack not empty AND current > stack.top(): stack.top()'s NGE = current, pop. Push current. After loop, remaining elements have no NGE (-1).",
          "PREVIOUS SMALLER ELEMENT: same as NGE but looking backward — pop while stack.top() >= current, then PSE = stack.top() (or -1 if empty), then push current.",
          "MIN STACK: push (val, min(val, current_min)). getMin() returns top's second element. Pop removes pair.",
          "LARGEST RECTANGLE IN HISTOGRAM: use stack. For each bar: while stack top bar >= current bar height, pop and calculate area (height × width). Width = current_index - stack.top() - 1.",
          "STOCK SPAN: for each price, pop while stack.top() price <= current price. Span = current_index - stack.top() (or current_index+1 if empty). Push current index."
        ],
        dryRun: `── BALANCED PARENTHESES: "{[()]}" ───────────────────
Scan '{': push → [{]
Scan '[': push → [{,[]
Scan '(': push → [{,[,(]
Scan ')': pop '(' → match ')' ✓ stack=[{,[]
Scan ']': pop '[' → match ']' ✓ stack=[{]
Scan '}': pop '{' → match '}' ✓ stack=[]
Stack empty → VALID ✓

── NEXT GREATER ELEMENT [4,5,2,10,8] ────────────────
i=0: push 4     → stack=[4]
i=1: 5>4 → NGE[4]=5, pop. Push 5 → stack=[5]
i=2: 2<5 → push  → stack=[5,2]
i=3: 10>2 → NGE[2]=10, pop. 10>5 → NGE[5]=10, pop. Push 10 → stack=[10]
i=4: 8<10 → push → stack=[10,8]
End: stack=[10,8] → NGE[10]=-1, NGE[8]=-1
Result: NGE = [5, 10, 10, -1, -1] ✓

── MIN STACK: push 5,3,7,2 ──────────────────────────
push(5): stack=[(5,5)]          getMin()=5
push(3): stack=[(5,5),(3,3)]    getMin()=3
push(7): stack=[(5,5),(3,3),(7,3)] getMin()=3
push(2): stack=[(5,5),(3,3),(7,3),(2,2)] getMin()=2
pop():   stack=[(5,5),(3,3),(7,3)] getMin()=3 ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n)",
        stable: undefined,
        when: "Balanced parens → any parsing/compiler problem. NGE/PSE → histogram, stock span, trap water. Monotonic stack → range problems where you need nearest greater/smaller. Min stack → when O(1) minimum with push/pop is needed.",
        pros: [
          "Monotonic stack: O(n) amortised — each element pushed and popped at most once",
          "NGE/PSE solves problems that naïve O(n²) approach misses",
          "Min stack achieves O(1) getMin with only O(n) extra space"
        ],
        cons: [
          "Monotonic stack logic requires careful order (push before or after pop?)",
          "Off-by-one errors common in histogram/span problems",
          "Multiple variations (NGE, PSE, NSE, PGE) easy to confuse"
        ],
        cpp: `// Important Stack Patterns — C++

// 1. Balanced Parentheses
bool isBalanced(string s) {
    stack<char> st;
    for (char c : s) {
        if (c=='('||c=='['||c=='{') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if (c==')' && top!='(') return false;
            if (c==']' && top!='[') return false;
            if (c=='}' && top!='{') return false;
        }
    }
    return st.empty();
}

// 2. Next Greater Element — O(n)
vector<int> nextGreater(vector<int>& arr) {
    int n = arr.size();
    vector<int> res(n, -1);
    stack<int> st; // store indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && arr[st.top()] < arr[i]) {
            res[st.top()] = arr[i];
            st.pop();
        }
        st.push(i);
    }
    return res; // remaining in stack have no NGE → -1
}

// 3. Min Stack — O(1) getMin
class MinStack {
    stack<pair<int,int>> st; // {val, current_min}
public:
    void push(int x) {
        int mn = st.empty() ? x : min(x, st.top().second);
        st.push({x, mn});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};`,
        python: `# Important Stack Patterns — Python

# 1. Balanced Parentheses
def is_balanced(s):
    stack = []
    match = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{': stack.append(c)
        elif c in ')]}':
            if not stack or stack[-1] != match[c]: return False
            stack.pop()
    return len(stack) == 0

# 2. Next Greater Element — O(n)
def next_greater(arr):
    n = len(arr)
    res = [-1] * n
    stack = []  # store indices
    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            res[stack.pop()] = arr[i]
        stack.append(i)
    return res  # remaining indices have no NGE

# 3. Min Stack — O(1) getMin
class MinStack:
    def __init__(self): self.stack = []  # (val, min_so_far)

    def push(self, x):
        mn = x if not self.stack else min(x, self.stack[-1][1])
        self.stack.append((x, mn))

    def pop(self): self.stack.pop()
    def top(self): return self.stack[-1][0]
    def get_min(self): return self.stack[-1][1]

# 4. Reverse string using stack
def reverse_string(s):
    stack = list(s)    # push all chars
    return ''.join(stack.pop() for _ in range(len(stack)))`,
        practice: [
          { name: "Valid Parentheses", diff: "easy" },
          { name: "Next Greater Element I", diff: "easy" },
          { name: "Min Stack", diff: "medium" },
          { name: "Largest Rectangle in Histogram", diff: "hard" },
          { name: "Daily Temperatures (NGE variant)", diff: "medium" },
          { name: "Trapping Rain Water", diff: "hard" }
        ]
      },
      "Applications & Complexity": {
        diff: "easy",
        explanation: "Stack operations are all O(1). Space is O(n) for n elements. Real-world applications: (1) Undo/Redo in text editors — each action pushed onto undo stack; undo pops it. (2) Browser history — Back button pops from history stack. (3) Function call management — the call stack stores return addresses and local variables; recursion uses the call stack. (4) Expression evaluation — compilers convert infix to postfix, then evaluate. (5) DFS (Depth First Search) — uses an explicit or implicit (recursion) stack. (6) Syntax parsing in compilers. From the textbook chapter: 'monotonic stack is very important for competitive programming.'",
        intuition: "Every recursive function call implicitly uses the call stack. When you call f(n) which calls f(n-1), each call frame is pushed. When a call returns, its frame is popped. Stack overflow in recursion = call stack overflow. Explicitly using a stack in DFS iteratively is equivalent to the implicit recursive call stack.",
        steps: [
          "All operations: Push O(1), Pop O(1), Peek O(1), isEmpty O(1).",
          "Space complexity: O(n) where n = number of elements stored.",
          "Array vs Linked List: Array faster (no allocation overhead), fixed size. LL dynamic, extra pointer memory.",
          "Recursion = implicit stack. Every function call pushes a frame. Return pops it.",
          "Monotonic Stack: each element pushed and popped at most once → O(n) amortised for the whole array.",
          "Stack overflow: too deep recursion or array-based stack exceeds MAXSIZE."
        ],
        dryRun: `Operation Complexity Summary:
Operation | Time  | Space | Notes
──────────┼───────┼───────┼──────────────────────────
Push      | O(1)  | O(1)  | Increment top, assign
Pop       | O(1)  | O(1)  | Return top, decrement top
Peek      | O(1)  | O(1)  | Read top, no change
isEmpty   | O(1)  | O(1)  | Check top == -1
isFull    | O(1)  | O(1)  | Check top == MAXSIZE-1

Array vs Linked List:
Feature      | Array Stack    | LL Stack
─────────────┼────────────────┼────────────────
Size         | Fixed          | Dynamic
Speed        | Faster         | Slightly slower
Overflow     | Yes (at max)   | Only if OOM
Memory       | Contiguous     | Scattered
Extra space  | None           | Pointer per node

Real-world applications:
  ✓ Undo/Redo in editors (Ctrl+Z)
  ✓ Browser back/forward navigation
  ✓ Function call stack (recursion)
  ✓ Expression evaluation (compilers)
  ✓ Syntax parsing (bracket matching)
  ✓ DFS graph traversal`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(1) all ops" },
        space: "O(n)",
        stable: undefined,
        when: "Any time LIFO access is needed. The call stack is already a stack. Expression parsing, undo systems, DFS are all natural stack applications.",
        pros: [
          "Simplest O(1) data structure for LIFO",
          "Works in O(n) for most common interview problems via monotonic stack",
          "STL stack / Python list make implementation trivial"
        ],
        cons: [
          "Only top element accessible — no random access",
          "Array stack has fixed size — must set MAXSIZE carefully"
        ],
        cpp: `// Stack Applications — C++

// 1. Reverse a string using stack
string reverseStr(string s) {
    stack<char> st;
    for (char c : s) st.push(c);
    string res = "";
    while (!st.empty()) { res += st.top(); st.pop(); }
    return res;
}

// 2. DFS using explicit stack (no recursion)
void dfs(vector<vector<int>>& adj, int start) {
    stack<int> st;
    vector<bool> visited(adj.size(), false);
    st.push(start);
    while (!st.empty()) {
        int node = st.top(); st.pop();
        if (visited[node]) continue;
        visited[node] = true;
        cout << node << " ";
        for (int nb : adj[node])
            if (!visited[nb]) st.push(nb);
    }
}

// 3. Stock Span Problem — O(n)
vector<int> stockSpan(vector<int>& prices) {
    int n = prices.size();
    vector<int> span(n);
    stack<int> st; // store indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && prices[st.top()] <= prices[i])
            st.pop();
        span[i] = st.empty() ? i+1 : i - st.top();
        st.push(i);
    }
    return span;
}`,
        python: `# Stack Applications — Python

# 1. Reverse string using stack
def reverse_str(s):
    stack = list(s)
    return ''.join(stack.pop() for _ in range(len(stack)))

# 2. DFS using explicit stack
def dfs_iterative(adj, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        if node in visited: continue
        visited.add(node); order.append(node)
        for nb in adj[node]:
            if nb not in visited: stack.append(nb)
    return order

# 3. Simulate call stack (recursion → iteration)
def factorial_stack(n):
    stack = []
    result = 1
    while n > 1:
        stack.append(n)
        n -= 1
    while stack:
        result *= stack.pop()
    return result

# Stack vs Queue comparison
# Stack: LIFO, one end (top)
# Queue: FIFO, two ends (front for dequeue, back for enqueue)
# Deque: flexible, both ends — superset of both`,
        practice: [
          { name: "Implement Stack using Queues", diff: "medium" },
          { name: "Stock Span Problem", diff: "medium" },
          { name: "Evaluate Postfix Expression", diff: "medium" },
          { name: "Largest Rectangle in Histogram", diff: "hard" },
          { name: "Trapping Rain Water (stack approach)", diff: "hard" }
        ]
      }
    }
  },
  Queue: {
    icon: "🎫", diff: "easy",
    desc: "FIFO structure. Insert at rear, remove from front. Powers BFS, scheduling, buffering, and sliding window maximum.",
    subtopics: {
      "Basics & FIFO": {
        diff: "easy",
        explanation: "A Queue is a linear data structure that follows the FIFO principle — First In, First Out. The element inserted first will be removed first. Core terms: Front — the position from where elements are removed. Rear — the position where elements are inserted. Enqueue — add an element at the rear. Dequeue — remove an element from the front. Peek/Front — return the front element without removing it. isEmpty — check if queue is empty. isFull — check if queue is full (array implementation only). Think of it like a line at a ticket counter: the person who comes first gets served first. Order matters. No jumping in between.",
        intuition: "Imagine standing in a queue for food: you join at the end (enqueue) and the first person gets served and leaves (dequeue). Unlike a stack where the last person in gets served first (LIFO), a queue is fair — first come, first served. This makes queues essential wherever the order of processing must be preserved: CPU scheduling, print jobs, network buffers, BFS.",
        steps: [
          "Initialize: front=0, rear=-1 (array) OR front=NULL, rear=NULL (linked list).",
          "ENQUEUE(x): Check if full. rear++. arr[rear]=x. O(1).",
          "DEQUEUE: Check if empty (front>rear). Save arr[front]. front++. Return saved value. O(1).",
          "PEEK: Return arr[front] without changing front or rear. O(1).",
          "isEmpty: return front > rear (array) OR front == NULL (linked list).",
          "isFull (array): return rear == size-1."
        ],
        dryRun: `Start: queue=[], front=0, rear=-1

Enqueue(10): rear=0, arr[0]=10  → [10]  front=0,rear=0
Enqueue(20): rear=1, arr[1]=20  → [10,20] front=0,rear=1
Enqueue(30): rear=2, arr[2]=30  → [10,20,30] front=0,rear=2
Enqueue(40): rear=3, arr[3]=40  → [10,20,30,40]

Dequeue(): return arr[0]=10, front=1 → [20,30,40]
Dequeue(): return arr[1]=20, front=2 → [30,40]

Peek(): return arr[front]=arr[2]=30 (no change) ✓

isEmpty? front(2) > rear(3)? NO → not empty
isEmpty after all dequeues: front > rear → YES ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(1)" },
        space: "O(n)",
        stable: undefined,
        when: "Use a queue whenever FIFO order matters: BFS, level-order tree traversal, task scheduling, print spooling, network buffers, sliding window problems.",
        pros: [
          "All core operations O(1) — enqueue, dequeue, peek",
          "Natural model for scheduling and buffering",
          "BFS and level-order traversal require a queue",
          "Python deque gives O(1) for both ends"
        ],
        cons: [
          "Array-based: wasted space after dequeues (front pointer advances but space not reused) — solved by circular queue",
          "Python list pop(0) is O(n) — use collections.deque instead",
          "No random access — only front element accessible"
        ],
        cpp: `// Queue — Array-based (Simple)
class Queue {
    int front, rear, size;
    int* arr;
public:
    Queue(int s) {
        size = s; arr = new int[size];
        front = 0; rear = -1;
    }
    void enqueue(int x) {
        if (rear == size - 1) { cout << "Queue Full\n"; return; }
        arr[++rear] = x;
    }
    void dequeue() {
        if (front > rear) { cout << "Queue Empty\n"; return; }
        front++;  // just advance front pointer
    }
    int peek() {
        if (front > rear) return -1;
        return arr[front];
    }
    bool isEmpty() { return front > rear; }
};

// STL queue (preferred in interviews)
#include <queue>
queue<int> q;
q.push(10);        // enqueue
q.push(20);
int f = q.front(); // peek — 10
q.pop();           // dequeue — removes 10
bool empty = q.empty();
int sz = q.size();`,
        python: `# Queue — Python list (simple but pop(0) is O(n))
class Queue:
    def __init__(self): self.queue = []

    def enqueue(self, x): self.queue.append(x)  # O(1)

    def dequeue(self):
        if not self.queue: return None
        return self.queue.pop(0)  # O(n) — SLOW for large n

    def peek(self):
        return self.queue[0] if self.queue else None

# ✓ PREFERRED: collections.deque — O(1) both ends
from collections import deque
q = deque()
q.append(10)     # enqueue at rear  — O(1)
q.append(20)
q.append(30)
x = q.popleft()  # dequeue from front — O(1) ✓
print(q[0])      # peek front — O(1)
print(len(q))    # size`,
        practice: [
          { name: "Implement Queue using Array", diff: "easy" },
          { name: "Number of Recent Calls", diff: "easy" },
          { name: "Design Circular Queue", diff: "medium" }
        ]
      },
      "Types of Queues": {
        diff: "medium",
        explanation: "Four main types: (1) Simple Queue — basic FIFO. Insert at rear, remove from front. Problem: after many dequeues, front advances and rear hits array end even if space exists at the front — wasted space. (2) Circular Queue — last position connects back to first using modulo arithmetic. rear=(rear+1)%size. Fixes wasted space problem. (3) Priority Queue — elements processed by priority, not insertion order. Implemented with a heap. O(log n) enqueue/dequeue. (4) Deque (Double Ended Queue) — insertion and deletion allowed at BOTH ends. Input-restricted deque: insert only at rear. Output-restricted deque: delete only from front. Python's collections.deque is a deque.",
        intuition: "Simple queue wastes array space — imagine 100 dequeues moving front to index 100, but rear is also at 100, so the queue appears full while indices 0–99 are empty. Circular queue solves this by treating the array as a ring. Priority queue is a heap in disguise. Deque is the most flexible — you can use it as both a stack AND a queue.",
        steps: [
          "SIMPLE QUEUE: enqueue at rear++, dequeue from front++. Full when rear==size-1 (even if space at front).",
          "CIRCULAR QUEUE: enqueue: rear=(rear+1)%size. Dequeue: front=(front+1)%size. Full: (rear+1)%size==front. Empty: front==rear.",
          "PRIORITY QUEUE: backed by a max-heap (or min-heap). Enqueue: insert and bubble up O(log n). Dequeue: remove root and heapify down O(log n).",
          "DEQUE: supports appendleft()/appendright() and popleft()/popright(). All O(1) with doubly linked list.",
          "CIRCULAR QUEUE advantage: utilises all n slots. No wasted space after front advances.",
          "Python collections.deque is implemented as a doubly-linked list of fixed-size blocks — O(1) for both ends."
        ],
        dryRun: `── CIRCULAR QUEUE (size=4) ────────────────────────────
front=0, rear=0 (empty when front==rear)

Enqueue(10): rear=(0+1)%4=1 → arr[1]=10
Enqueue(20): rear=(1+1)%4=2 → arr[2]=20
Enqueue(30): rear=(2+1)%4=3 → arr[3]=30
Full? (rear+1)%4==front? (3+1)%4=0==0 YES → FULL ✓

Dequeue(): val=arr[front=0]? No, front=0 is sentinel.
  (Implementation: val=arr[front+1], front=(front+1)%size)
  Return 10. front=1

Enqueue(40): rear=(3+1)%4=0 → arr[0]=40 (wraps around!) ✓
Circular saves slot that was freed by dequeue ✓

── PRIORITY QUEUE [5,3,8,1] (min-heap) ──────────────
Insert 5: [5]
Insert 3: [3,5]    (3<5, bubble up)
Insert 8: [3,5,8]
Insert 1: [1,5,8,3] (bubble up to root) → min always at front
Dequeue → returns 1 ✓  (highest priority = smallest)`,
        time: { best: "O(1) simple/circular", avg: "O(log n) priority", worst: "O(log n) priority" },
        space: "O(n)",
        stable: undefined,
        when: "Simple queue: default. Circular: when array-based and space efficiency matters. Priority queue: task scheduling by priority, Dijkstra's, Prim's. Deque: sliding window maximum, palindrome check, implementing both stack and queue.",
        pros: [
          "Circular queue: no wasted space — reuses freed slots",
          "Priority queue: O(log n) access to max/min element always",
          "Deque: O(1) both ends — most flexible queue variant"
        ],
        cons: [
          "Circular queue: full/empty condition check is tricky (off-by-one)",
          "Priority queue: O(log n) vs O(1) for simple queue",
          "Deque: more complex implementation than simple queue"
        ],
        cpp: `// Circular Queue — C++
class CircularQueue {
    int* arr; int front, rear, size, count;
public:
    CircularQueue(int s): size(s), front(0), rear(0), count(0) {
        arr = new int[size];
    }
    bool isFull()  { return count == size; }
    bool isEmpty() { return count == 0; }

    void enqueue(int x) {
        if (isFull()) { cout << "Full\n"; return; }
        arr[rear] = x;
        rear = (rear + 1) % size;  // wrap around!
        count++;
    }
    int dequeue() {
        if (isEmpty()) { cout << "Empty\n"; return -1; }
        int val = arr[front];
        front = (front + 1) % size; // wrap around!
        count--;
        return val;
    }
};

// Priority Queue — C++ STL (max-heap by default)
#include <queue>
priority_queue<int> pq;     // max-heap
pq.push(5); pq.push(3); pq.push(8);
cout << pq.top(); // 8 (maximum)
pq.pop();

// Min-heap
priority_queue<int,vector<int>,greater<int>> minPQ;

// Deque
#include <deque>
deque<int> dq;
dq.push_front(1); dq.push_back(2);
dq.pop_front();   dq.pop_back();`,
        python: `# Circular Queue — Python
class CircularQueue:
    def __init__(self, size):
        self.arr = [0] * size
        self.front = self.rear = 0
        self.size = size
        self.count = 0

    def is_full(self): return self.count == self.size
    def is_empty(self): return self.count == 0

    def enqueue(self, x):
        if self.is_full(): return False
        self.arr[self.rear] = x
        self.rear = (self.rear + 1) % self.size  # wrap!
        self.count += 1; return True

    def dequeue(self):
        if self.is_empty(): return -1
        val = self.arr[self.front]
        self.front = (self.front + 1) % self.size  # wrap!
        self.count -= 1; return val

# Priority Queue — Python (min-heap by default)
import heapq
pq = []
heapq.heappush(pq, 5)
heapq.heappush(pq, 3)
heapq.heappush(pq, 8)
print(heapq.heappop(pq))  # 3 (minimum first)

# Max-heap trick: negate values
heapq.heappush(pq, -8)
print(-heapq.heappop(pq)) # 8

# Deque — Python collections.deque (doubly-linked)
from collections import deque
dq = deque()
dq.appendleft(1); dq.append(2)  # both O(1)
dq.popleft();     dq.pop()       # both O(1)`,
        practice: [
          { name: "Design Circular Queue", diff: "medium" },
          { name: "Design Circular Deque", diff: "medium" },
          { name: "Kth Largest Element (Priority Queue)", diff: "medium" }
        ]
      },
      "Queue using Two Stacks": {
        diff: "medium",
        explanation: "A classic interview problem: implement a Queue using only two Stacks (FIFO using LIFO). Idea: Use Stack1 for enqueue and Stack2 for dequeue. When dequeue is called and Stack2 is empty, pour all elements from Stack1 into Stack2 (reversing the order). Now Stack2's top is the oldest element — pop it for dequeue. Key insight: pouring once for a batch of dequeues means each element is moved at most twice (push to S1, move to S2) → O(1) amortised dequeue.",
        intuition: "Stack1 reverses insertion order. Stack2 reverses it again, restoring FIFO. Two reversals = original order. The expensive pour (O(n)) only happens when Stack2 is empty, and each element is poured at most once → amortised O(1) per operation.",
        steps: [
          "ENQUEUE(x): Always push x onto Stack1. O(1).",
          "DEQUEUE: If Stack2 is empty: pop all elements from Stack1 and push them onto Stack2. Pop from Stack2. If Stack2 was not empty: just pop from Stack2.",
          "PEEK: Same as dequeue but peek Stack2.top() instead of popping.",
          "isEmpty: Both Stack1 and Stack2 must be empty.",
          "AMORTISED ANALYSIS: Each element enters S1 once (O(1)), moves to S2 once (O(1)), leaves S2 once (O(1)). Total O(3n) = O(n) for n operations → O(1) amortised each.",
          "VARIATION — Queue using 1 Stack + Recursion: On dequeue, recursively pop all, save bottom, push all back. O(n) per dequeue — much worse."
        ],
        dryRun: `Enqueue(1): S1=[1],  S2=[]
Enqueue(2): S1=[1,2], S2=[]
Enqueue(3): S1=[1,2,3], S2=[]

Dequeue():
  S2 is empty → pour S1 into S2:
    pop 3 → push to S2: S2=[3]
    pop 2 → push to S2: S2=[3,2]
    pop 1 → push to S2: S2=[3,2,1]  S1=[]
  pop S2 → return 1 ✓ (FIFO order preserved!)
  S1=[], S2=[3,2]

Dequeue():
  S2 not empty → pop S2 → return 2 ✓
  S2=[3]

Enqueue(4): S1=[4], S2=[3]

Dequeue():
  S2 not empty → pop S2 → return 3 ✓
  S2=[], S1=[4]

Dequeue():
  S2 empty → pour S1: S2=[4], S1=[]
  pop S2 → return 4 ✓`,
        time: { best: "O(1) enqueue", avg: "O(1) amortised", worst: "O(n) dequeue (pour)" },
        space: "O(n)",
        stable: undefined,
        when: "Asked directly in interviews. Also tests understanding of amortised analysis. Reverse: implement Stack using two Queues (O(n) push or O(n) pop).",
        pros: [
          "O(1) amortised dequeue — not O(n) each time",
          "Elegant use of two LIFO structures to achieve FIFO",
          "Classic demonstration of amortised analysis"
        ],
        cons: [
          "Worst-case single dequeue is O(n) — bad for real-time systems",
          "More complex than a direct queue implementation"
        ],
        cpp: `// Queue using Two Stacks — C++
#include <stack>
class MyQueue {
    stack<int> s1, s2; // s1=enqueue, s2=dequeue
public:
    // Enqueue — always push to s1, O(1)
    void push(int x) { s1.push(x); }

    // Pour s1 into s2 when s2 is empty
    void pour() {
        if (s2.empty())
            while (!s1.empty()) {
                s2.push(s1.top()); s1.pop();
            }
    }

    // Dequeue — O(1) amortised
    int pop() {
        pour();
        int val = s2.top(); s2.pop();
        return val;
    }

    // Peek front — O(1) amortised
    int peek() { pour(); return s2.top(); }

    bool empty() { return s1.empty() && s2.empty(); }
};`,
        python: `# Queue using Two Stacks — Python
class MyQueue:
    def __init__(self):
        self.s1 = []  # enqueue stack
        self.s2 = []  # dequeue stack

    # Enqueue — always push to s1, O(1)
    def push(self, x): self.s1.append(x)

    def _pour(self):
        # Pour s1 into s2 only when s2 is empty
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())

    # Dequeue — O(1) amortised
    def pop(self):
        self._pour()
        return self.s2.pop()

    # Peek — O(1) amortised
    def peek(self):
        self._pour()
        return self.s2[-1]

    def empty(self):
        return not self.s1 and not self.s2

# Test
q = MyQueue()
q.push(1); q.push(2); q.push(3)
print(q.pop())  # 1 ✓ FIFO
print(q.peek()) # 2 ✓`,
        practice: [
          { name: "Implement Queue using Stacks (LeetCode 232)", diff: "easy" },
          { name: "Implement Stack using Queues (LeetCode 225)", diff: "easy" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Four critical queue patterns: (1) BFS (Breadth First Search) — use a queue to explore level by level. All nodes at distance k are processed before nodes at distance k+1. (2) Level Order Traversal — BFS on trees. Process each level by enqueueing children. (3) Sliding Window Maximum (Monotonic Deque) — use a deque maintaining a decreasing sequence of indices. For each new element, remove smaller elements from rear; remove out-of-window elements from front. O(n). (4) First Non-Repeating Character in Stream — use queue to track candidates; character becomes repeating when its frequency > 1.",
        intuition: "BFS explores by layers — a queue naturally enforces this because the first nodes enqueued (neighbours at distance 1) are dequeued first. Monotonic deque for sliding window: the deque always stores indices of potential maximums in decreasing order, so the front is always the current window's maximum. When window slides, pop front if it's out of range.",
        steps: [
          "BFS: enqueue start. While queue not empty: dequeue u, process u, enqueue all unvisited neighbours of u.",
          "LEVEL ORDER: enqueue root. While queue not empty: process all nodes at current level (queue size = level size). Enqueue their children.",
          "SLIDING WINDOW MAX (k window): for each i: remove from rear while arr[deque.rear] <= arr[i]. Remove front if out of window (deque.front <= i-k). Enqueue i. Max = arr[deque.front].",
          "GENERATE BINARY NUMBERS 1..n: enqueue '1'. Loop: dequeue s, print s, enqueue s+'0' and s+'1'.",
          "ROTTEN ORANGES: multi-source BFS. Enqueue all initially rotten oranges. BFS spreads rot level by level. Count minutes = levels.",
          "FIRST NON-REPEATING: maintain a queue. On new char: update freq. While queue front's freq > 1: dequeue. Answer = queue front (or -1 if empty)."
        ],
        dryRun: `── BFS on graph 0→1,0→2,1→3,2→3 ──────────────────
Start: enqueue 0 → queue=[0], visited={0}
Dequeue 0: neighbours 1,2 → enqueue → queue=[1,2], visited={0,1,2}
Dequeue 1: neighbour 3 → enqueue → queue=[2,3], visited={0,1,2,3}
Dequeue 2: neighbour 3 → already visited, skip → queue=[3]
Dequeue 3: no unvisited neighbours → queue=[]
BFS order: 0,1,2,3 ✓

── SLIDING WINDOW MAX [1,3,-1,-3,5,3,6,7], k=3 ──────
i=0: deq=[0]  (arr[0]=1)
i=1: 3>1 → remove 0, deq=[1]  (arr[1]=3)
i=2: -1<3 → deq=[1,2]   window[0..2]: max=arr[1]=3 ✓
i=3: -3<-1 → deq=[1,2,3] window[1..3]: max=arr[1]=3 ✓
i=4: 5>-3,5>-1,5>3 → remove all, deq=[4] max=arr[4]=5 ✓
i=5: 3<5 → deq=[4,5]  max=arr[4]=5 ✓
i=6: 6>3,6>5 → deq=[6]  max=arr[6]=6 ✓
i=7: 7>6 → deq=[7]  max=arr[7]=7 ✓
Result: [3,3,5,5,6,7] ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) BFS / O(k) sliding window",
        stable: undefined,
        when: "BFS/level-order → always use queue. Sliding window max → monotonic deque. Rotten oranges/shortest path in grid → multi-source BFS. First non-repeating → queue + freq map.",
        pros: [
          "BFS guarantees shortest path in unweighted graphs",
          "Monotonic deque gives O(n) sliding window max vs O(nk) brute force",
          "Level order traversal is the natural tree BFS"
        ],
        cons: [
          "BFS uses O(V) space for the queue",
          "Monotonic deque logic requires careful boundary checks",
          "Multi-source BFS initialization (all sources at once) is non-obvious"
        ],
        cpp: `// Queue Patterns — C++

// 1. BFS — O(V+E)
void bfs(vector<vector<int>>& adj, int start) {
    queue<int> q;
    vector<bool> vis(adj.size(), false);
    q.push(start); vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << " ";
        for (int v : adj[u])
            if (!vis[v]) { vis[v]=true; q.push(v); }
    }
}

// 2. Level Order Traversal
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    queue<TreeNode*> q; q.push(root);
    vector<vector<int>> res;
    while (!q.empty()) {
        int sz = q.size(); // current level size
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}

// 3. Sliding Window Maximum — O(n)
vector<int> maxSlidingWindow(vector<int>& arr, int k) {
    deque<int> dq; // stores indices, decreasing values
    vector<int> res;
    for (int i = 0; i < arr.size(); i++) {
        // remove out-of-window indices from front
        while (!dq.empty() && dq.front() <= i-k) dq.pop_front();
        // remove smaller elements from rear
        while (!dq.empty() && arr[dq.back()] <= arr[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k-1) res.push_back(arr[dq.front()]);
    }
    return res;
}`,
        python: `# Queue Patterns — Python

# 1. BFS — O(V+E)
from collections import deque
def bfs(adj, start):
    visited = {start}
    q = deque([start])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            if v not in visited:
                visited.add(v); q.append(v)
    return order

# 2. Level Order Traversal
def level_order(root):
    if not root: return []
    q = deque([root]); result = []
    while q:
        level_size = len(q)
        level = []
        for _ in range(level_size):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result

# 3. Sliding Window Maximum — O(n)
def max_sliding_window(arr, k):
    dq = deque()  # stores indices, decreasing values
    result = []
    for i, x in enumerate(arr):
        # remove out-of-window from front
        while dq and dq[0] <= i - k: dq.popleft()
        # remove smaller from rear
        while dq and arr[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if i >= k - 1: result.append(arr[dq[0]])
    return result`,
        practice: [
          { name: "Binary Tree Level Order Traversal", diff: "medium" },
          { name: "Sliding Window Maximum (LeetCode 239)", diff: "hard" },
          { name: "Rotten Oranges (Multi-source BFS)", diff: "medium" },
          { name: "01 Matrix — BFS", diff: "medium" },
          { name: "Generate Binary Numbers 1 to N", diff: "easy" }
        ]
      },
      "Complexity & Applications": {
        diff: "easy",
        explanation: "All queue operations are O(1): enqueue, dequeue, peek, isEmpty. Space complexity is O(n). Important caveat: Python list.pop(0) is O(n) — always use collections.deque for O(1) dequeue in Python. Real-world applications: CPU scheduling (process queue), printer queue (jobs printed in order), network buffering (packets), call center systems, multiplayer gaming event queues, data streaming. BFS is the algorithmic backbone of shortest path in unweighted graphs, social network distance, web crawlers.",
        intuition: "A queue is the data structure of fairness. Whoever arrives first leaves first. This property makes it essential for any system where order must be preserved — OS scheduling, network packet queues, BFS. The monotonic deque is the advanced version that adds an ordering constraint to enable O(n) sliding window queries.",
        steps: [
          "Enqueue: O(1) — insert at rear.",
          "Dequeue: O(1) — remove from front. Exception: Python list.pop(0) is O(n).",
          "Peek: O(1) — read front element.",
          "isEmpty/isFull: O(1).",
          "Space: O(n) for n elements in queue.",
          "Note: Python list dequeue is O(n), deque.popleft() is O(1). C++ queue.pop() is O(1)."
        ],
        dryRun: `Operation Complexity:
Operation | Array/LL Queue | Python list | Python deque
──────────┼────────────────┼─────────────┼─────────────
Enqueue   | O(1)           | O(1) append | O(1) append
Dequeue   | O(1)           | O(n) pop(0) | O(1) popleft
Peek      | O(1)           | O(1)        | O(1)
isEmpty   | O(1)           | O(1)        | O(1)
Space     | O(n)           | O(n)        | O(n)

Queue vs Stack:
Feature    | Queue      | Stack
───────────┼────────────┼──────────
Principle  | FIFO       | LIFO
Insert     | At rear    | At top
Remove     | From front | From top
Algorithm  | BFS        | DFS

Real-world uses:
  ✓ CPU scheduling (Round Robin)
  ✓ Printer spooler (jobs in order)
  ✓ Network buffers (packets)
  ✓ BFS / shortest path
  ✓ Level-order tree traversal
  ✓ Call center (first caller served first)
  ✓ Sliding window maximum (monotonic deque)`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(1) all ops" },
        space: "O(n)",
        stable: undefined,
        when: "Use queue for FIFO processing. Use deque for sliding window. Use priority queue for greedy algorithms (Dijkstra, Prim). Use two-stack queue to demonstrate amortised O(1).",
        pros: [
          "O(1) all operations — enqueue, dequeue, peek",
          "Natural model for scheduling, BFS, and buffering",
          "Circular queue eliminates wasted space in array implementation"
        ],
        cons: [
          "Only front element accessible — no random access",
          "Python list pop(0) is O(n) — must use deque",
          "Array simple queue wastes space (use circular queue)"
        ],
        cpp: `// Queue Applications — C++

// Generate binary numbers 1 to n using queue
vector<string> generateBinary(int n) {
    queue<string> q; q.push("1");
    vector<string> res;
    while (n--) {
        string s = q.front(); q.pop();
        res.push_back(s);
        q.push(s + "0");  // enqueue s0
        q.push(s + "1");  // enqueue s1
    }
    return res; // 1,10,11,100,101,110,111...
}

// Reverse a queue
queue<int> reverseQueue(queue<int> q) {
    stack<int> st;
    while (!q.empty()) { st.push(q.front()); q.pop(); }
    while (!st.empty()) { q.push(st.top()); st.pop(); }
    return q;
}

// First non-repeating char in stream
string firstNonRepeating(string stream) {
    unordered_map<char,int> freq;
    queue<char> q;
    string result = "";
    for (char c : stream) {
        freq[c]++;
        q.push(c);
        while (!q.empty() && freq[q.front()] > 1) q.pop();
        result += q.empty() ? '#' : q.front();
    }
    return result;
}`,
        python: `# Queue Applications — Python
from collections import deque

# Generate binary numbers 1 to n
def generate_binary(n):
    q = deque(["1"])
    result = []
    while n:
        s = q.popleft()
        result.append(s)
        q.append(s + "0")
        q.append(s + "1")
        n -= 1
    return result  # ["1","10","11","100",...]

# Reverse a queue using stack
def reverse_queue(q):
    stack = []
    while q: stack.append(q.popleft())
    while stack: q.append(stack.pop())
    return q

# First non-repeating char in stream
def first_non_repeating(stream):
    from collections import Counter
    freq = Counter()
    q = deque()
    result = []
    for c in stream:
        freq[c] += 1
        q.append(c)
        while q and freq[q[0]] > 1: q.popleft()
        result.append(q[0] if q else '#')
    return ''.join(result)`,
        practice: [
          { name: "Implement Queue using Linked List", diff: "easy" },
          { name: "Reverse a Queue", diff: "easy" },
          { name: "First Non-Repeating Character in Stream", diff: "medium" },
          { name: "Sliding Window Maximum", diff: "hard" },
          { name: "Rotten Oranges", diff: "medium" },
          { name: "Find Maximum of All Subarrays of Size K", diff: "medium" }
        ]
      }
    }
  },
  Recursion: {
    icon: "🔄", diff: "medium",
    desc: "Function calling itself. Base case + recursive case. Powers trees, backtracking, divide-and-conquer, and DP.",
    subtopics: {
      "Basics & Call Stack": {
        diff: "easy",
        explanation: "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Instead of solving a problem in one big step, recursion breaks it down into smaller subproblems until a simple base case is reached. Every recursive function has two components: (1) Base Case — the condition where recursion stops, preventing infinite calls. (2) Recursive Case — the function calls itself with a smaller/simpler input. The Call Stack stores each active function call as a frame. Each recursive call pushes a new frame; each return pops it. Stack Overflow happens when recursion depth exceeds the stack limit (infinite recursion or very deep calls).",
        intuition: "Golden Rule: 'Do not try to solve the entire problem. Just solve one step and let recursion handle the rest.' Think of climbing stairs — to reach step n, first reach step n-1, then take one step: f(n) = f(n-1) + 1. Trust the function to correctly solve the smaller problem. This is called the leap of faith — assume the recursive call works correctly, then build on it.",
        steps: [
          "IDENTIFY BASE CASE: the simplest input where the answer is known directly (no recursion needed). e.g. factorial(0)=1, fib(0)=0, fib(1)=1.",
          "IDENTIFY RECURSIVE CASE: express the problem in terms of a smaller version of itself. e.g. factorial(n) = n × factorial(n-1).",
          "ENSURE PROGRESS: each recursive call must move toward the base case. If n decrements each call, it will reach 0.",
          "CALL STACK: each call pushes a frame (local variables + return address). Frames pop in reverse order as functions return.",
          "DRY RUN with small input: trace the call stack manually for n=3 or n=4 before coding.",
          "STACK OVERFLOW guard: for very deep recursion, use iterative + explicit stack, or increase stack size."
        ],
        dryRun: `factorial(3):

PUSH phase (calls going down):
  factorial(3) → needs 3 × factorial(2)
    factorial(2) → needs 2 × factorial(1)
      factorial(1) → needs 1 × factorial(0)
        factorial(0) → BASE CASE: return 1

POP phase (returns going up):
        return 1
      return 1 × 1 = 1
    return 2 × 1 = 2
  return 3 × 2 = 6

Answer: 6 ✓

Call Stack at deepest point:
  ┌─────────────┐ ← top
  │ factorial(0)│
  ├─────────────┤
  │ factorial(1)│
  ├─────────────┤
  │ factorial(2)│
  ├─────────────┤
  │ factorial(3)│
  └─────────────┘ ← bottom`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(n) call stack",
        stable: undefined,
        when: "Use recursion when the problem has natural substructure (trees, graphs, divide-and-conquer, backtracking). Prefer iteration when recursion depth is large (> 10⁴) to avoid stack overflow.",
        pros: [
          "Code is shorter and more elegant than iterative equivalents",
          "Natural fit for tree/graph traversal and backtracking",
          "Divide-and-conquer (Merge Sort, Quick Sort) are naturally recursive",
          "Makes mathematical definitions directly translatable to code"
        ],
        cons: [
          "O(n) extra space for call stack — iteration uses O(1)",
          "Stack overflow on very deep recursion",
          "Can be slower than iteration due to function call overhead",
          "Naive recursion recomputes subproblems (fix with memoization)"
        ],
        cpp: `// Recursion Basics — C++

// Factorial — O(n) time, O(n) space
int factorial(int n) {
    if (n == 0) return 1;        // base case
    return n * factorial(n - 1); // recursive case
}

// Fibonacci (naive) — O(2^n) time
int fib(int n) {
    if (n <= 1) return n;        // base cases: fib(0)=0, fib(1)=1
    return fib(n-1) + fib(n-2); // tree recursion
}

// Print 1 to n using recursion
void print1ToN(int n) {
    if (n == 0) return;   // base case
    print1ToN(n - 1);     // recurse first (to print in order)
    cout << n << " ";     // print after return
}

// Reverse a string recursively
void reverseStr(string& s, int l, int r) {
    if (l >= r) return;           // base case
    swap(s[l], s[r]);             // solve one step
    reverseStr(s, l+1, r-1);     // recurse on smaller problem
}`,
        python: `# Recursion Basics — Python

# Factorial — O(n) time, O(n) space
def factorial(n):
    if n == 0: return 1          # base case
    return n * factorial(n - 1)  # recursive case

print(factorial(5))  # 120

# Fibonacci (naive) — O(2^n) time
def fib(n):
    if n <= 1: return n          # base cases
    return fib(n-1) + fib(n-2)  # tree recursion

# Print 1 to n recursively
def print_1_to_n(n):
    if n == 0: return            # base case
    print_1_to_n(n - 1)         # recurse first
    print(n, end=" ")            # print on way back

# Reverse string recursively
def reverse_str(s):
    if len(s) <= 1: return s     # base case
    return reverse_str(s[1:]) + s[0]  # last char + recurse rest

# Check palindrome recursively
def is_palindrome(s, l=0, r=None):
    if r is None: r = len(s) - 1
    if l >= r: return True
    if s[l] != s[r]: return False
    return is_palindrome(s, l+1, r-1)`,
        practice: [
          { name: "Factorial of a Number", diff: "easy" },
          { name: "Print Numbers 1 to N (Recursion)", diff: "easy" },
          { name: "Reverse a String Recursively", diff: "easy" },
          { name: "Check Palindrome using Recursion", diff: "easy" }
        ]
      },
      "Types of Recursion": {
        diff: "medium",
        explanation: "Six types of recursion: (1) Direct Recursion — function calls itself directly: f(n)→f(n-1). (2) Indirect/Mutual Recursion — function A calls B which calls A. (3) Tail Recursion — the recursive call is the LAST operation. The compiler can optimise this to a loop (Tail Call Optimisation). (4) Non-Tail Recursion — work is done AFTER the recursive call returns. Cannot be optimised directly. (5) Linear Recursion — exactly one recursive call per function. (6) Tree Recursion — multiple recursive calls per function (e.g. Fibonacci: two calls). Tree recursion creates exponential call trees.",
        intuition: "Tail recursion: the function does nothing with the returned value except return it — the compiler can reuse the current stack frame. Non-tail: must keep the frame because there's a pending operation (like multiplying by n). Tree recursion: each call spawns multiple children — the call tree grows exponentially. Fibonacci(5) spawns a tree with ~2⁵=32 calls for n=5.",
        steps: [
          "TAIL: f(n, acc) where acc accumulates result. Last line is just return f(n-1, acc*n). No pending work.",
          "NON-TAIL: return n * f(n-1). The multiply happens AFTER f(n-1) returns → frame must be kept.",
          "LINEAR: only one path of recursion. O(n) calls. Call stack grows to depth n.",
          "TREE: two or more paths. Fibonacci: fib(n-1) AND fib(n-2). Depth=n, but nodes = O(2^n).",
          "MUTUAL: isEven(n) calls isOdd(n-1), isOdd(n) calls isEven(n-1). Base: isEven(0)=true.",
          "Convert non-tail to tail by adding accumulator parameter. Enables compiler stack optimisation."
        ],
        dryRun: `── TAIL RECURSION: factorial with accumulator ─────────
fact_tail(3, 1):
  fact_tail(2, 3):    // 3*1=3 passed as acc
    fact_tail(1, 6):  // 2*3=6 passed as acc
      fact_tail(0, 6):  // 1*6=6, base case
        return 6 ✓
No pending operations — stack frames can be reused!

── NON-TAIL: classic factorial ────────────────────────
fact(3) → 3 × fact(2)   [must keep frame, pending ×3]
  fact(2) → 2 × fact(1) [must keep frame, pending ×2]
    fact(1) → 1 × fact(0)
      fact(0) = 1
    return 1×1=1
  return 2×1=2
return 3×2=6
All frames must be kept until base case returns!

── TREE RECURSION: fib(4) ─────────────────────────────
                  fib(4)
              /          \
          fib(3)          fib(2)
         /     \         /    \
     fib(2)  fib(1)  fib(1) fib(0)
    /    \
fib(1) fib(0)
Total calls: 9 (for n=4) → O(2^n) ✗ (use memoization!)`,
        time: { best: "O(n) linear", avg: "O(n) linear", worst: "O(2^n) tree" },
        space: "O(n) call stack depth",
        stable: undefined,
        when: "Prefer tail recursion when possible (compiler can optimise). Avoid naive tree recursion for large n (use memoization). Linear recursion for simple divide-and-conquer.",
        pros: [
          "Tail recursion: O(1) space with compiler optimisation (TCO)",
          "Linear recursion: simple O(n) stack space",
          "Tree recursion: elegant for problems with natural branching"
        ],
        cons: [
          "Tree recursion: O(2^n) calls without memoization — catastrophically slow",
          "Non-tail: all frames must be kept until base case",
          "Python does NOT optimise tail calls — always O(n) stack"
        ],
        cpp: `// Types of Recursion — C++

// 1. Tail Recursion (accumulator pattern)
int factTail(int n, int acc = 1) {
    if (n == 0) return acc;         // base case
    return factTail(n-1, n * acc);  // last op = recursive call ✓
}

// 2. Non-Tail Recursion (pending multiplication)
int factNonTail(int n) {
    if (n == 0) return 1;
    return n * factNonTail(n-1);   // pending × after return ✗
}

// 3. Tree Recursion (two recursive calls)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);   // two branches → O(2^n) ✗
}

// 4. Mutual/Indirect Recursion
bool isEven(int n);
bool isOdd(int n) {
    if (n == 0) return false;
    return isEven(n - 1);  // calls isEven
}
bool isEven(int n) {
    if (n == 0) return true;
    return isOdd(n - 1);   // calls isOdd
}`,
        python: `# Types of Recursion — Python

# 1. Tail Recursion (accumulator)
# Note: Python does NOT optimise tail calls
def fact_tail(n, acc=1):
    if n == 0: return acc
    return fact_tail(n-1, n * acc)  # last op = recursive call

# 2. Non-Tail Recursion
def fact_non_tail(n):
    if n == 0: return 1
    return n * fact_non_tail(n-1)  # pending × after return

# 3. Tree Recursion — O(2^n)
def fib_tree(n):
    if n <= 1: return n
    return fib_tree(n-1) + fib_tree(n-2)  # two branches!

# 4. Mutual Recursion
def is_even(n):
    if n == 0: return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0: return False
    return is_even(n - 1)

# 5. Convert to tail recursion to save stack
# Power(base, exp) → tail version:
def power_tail(base, exp, acc=1):
    if exp == 0: return acc
    return power_tail(base, exp-1, acc*base)`,
        practice: [
          { name: "Fibonacci Number", diff: "easy" },
          { name: "Power of Two (recursive)", diff: "easy" },
          { name: "Count Vowels in String (recursion)", diff: "easy" }
        ]
      },
      "Key Algorithms": {
        diff: "medium",
        explanation: "Four canonical recursive algorithms every CS student must know: (1) Factorial — O(n) time, O(n) space. Classic linear recursion. (2) Fibonacci — naive O(2^n), memoized O(n). Classic tree recursion. (3) Tower of Hanoi — O(2^n) moves, provably optimal. Teaches thinking recursively. (4) Binary Search — O(log n) time, O(log n) space (recursive), O(1) space (iterative). Divide and conquer. These four demonstrate all recursion types and complexities.",
        intuition: "Tower of Hanoi: to move n disks from A to C using B, move n-1 disks from A to B (recursive), move disk n from A to C (base step), move n-1 disks from B to C (recursive). Two recursive calls with n-1 → T(n) = 2T(n-1) + 1 → T(n) = 2^n - 1. Binary search: eliminate half the array each call → T(n) = T(n/2) + 1 → O(log n).",
        steps: [
          "FACTORIAL: base n==0 return 1. Else return n*fact(n-1). T(n)=T(n-1)+O(1)=O(n).",
          "FIBONACCI: base n<=1 return n. Else fib(n-1)+fib(n-2). T(n)=T(n-1)+T(n-2)+O(1)≈O(2^n). Memoize → O(n).",
          "TOWER OF HANOI: move(n,src,dst,aux): if n==1 print src→dst. Else move(n-1,src,aux,dst) + src→dst + move(n-1,aux,dst,src). T(n)=2T(n-1)+1=2^n-1 moves.",
          "BINARY SEARCH: base lo>hi return -1. mid=(lo+hi)/2. If arr[mid]==target return mid. If arr[mid]<target recurse right half. Else recurse left half. T(n)=T(n/2)+O(1)=O(log n).",
          "SUM OF ARRAY: sum(arr,n) = arr[n-1]+sum(arr,n-1). Base: n==0 return 0. O(n) time, O(n) space.",
          "MERGE SORT: divide into two halves, sort each recursively, merge. T(n)=2T(n/2)+O(n)=O(n log n) by Master Theorem."
        ],
        dryRun: `── TOWER OF HANOI n=3: A→C using B ──────────────────
hanoi(3, A, C, B):
  hanoi(2, A, B, C):     ← move top 2 disks A→B
    hanoi(1, A, C, B): print A→C
    print A→B
    hanoi(1, C, B, A): print C→B
  print A→C              ← move disk 3 directly
  hanoi(2, B, C, A):     ← move top 2 disks B→C
    hanoi(1, B, A, C): print B→A
    print B→C
    hanoi(1, A, C, B): print A→C

Moves: A→C, A→B, C→B, A→C, B→A, B→C, A→C
Total: 7 = 2³-1 ✓

── BINARY SEARCH for 30 in [10,20,30,40,50] ─────────
bSearch(0,4): mid=2 → arr[2]=30 == target → return 2 ✓
(Only 1 call for this case)

bSearch for 40: mid=2→20<40→recurse(3,4)
  bSearch(3,4): mid=3→arr[3]=40==target → return 3 ✓`,
        time: { best: "O(log n) binary search", avg: "O(n) factorial", worst: "O(2^n) Hanoi/naive fib" },
        space: "O(n) most / O(log n) binary search",
        stable: undefined,
        when: "Factorial: simple linear recursion demo. Fibonacci: shows need for memoization. Hanoi: pure recursion thinking. Binary search: O(log n) — prefer iterative for O(1) space.",
        pros: [
          "Binary search: O(log n) — extremely fast on sorted arrays",
          "Hanoi: optimal solution, no iterative equivalent is simpler",
          "Merge Sort via recursion: guaranteed O(n log n)"
        ],
        cons: [
          "Naive Fibonacci: O(2^n) — never use without memoization",
          "Recursive binary search: O(log n) stack space vs O(1) iterative",
          "Hanoi with n=64: 2^64-1 ≈ 10^19 moves — impractical"
        ],
        cpp: `// Key Recursive Algorithms — C++

// 1. Factorial — O(n), O(n) stack
long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}

// 2. Fibonacci with memoization — O(n), O(n)
unordered_map<int,long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];  // cache hit
    return memo[n] = fib(n-1) + fib(n-2);
}

// 3. Tower of Hanoi — O(2^n) moves
void hanoi(int n, char src, char dst, char aux) {
    if (n == 1) {
        cout << src << " → " << dst << "\n";
        return;
    }
    hanoi(n-1, src, aux, dst);  // move n-1 to aux
    cout << src << " → " << dst << "\n"; // move largest
    hanoi(n-1, aux, dst, src);  // move n-1 from aux to dst
}

// 4. Binary Search (recursive) — O(log n), O(log n) stack
int bSearch(vector<int>& arr, int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return bSearch(arr, mid+1, hi, target);
    return bSearch(arr, lo, mid-1, target);
}`,
        python: `# Key Recursive Algorithms — Python

# 1. Factorial — O(n)
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

# 2. Fibonacci with memoization — O(n)
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Without decorator:
def fib_memo(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# 3. Tower of Hanoi — O(2^n) moves
def hanoi(n, src='A', dst='C', aux='B'):
    if n == 1:
        print(f"{src} → {dst}")
        return
    hanoi(n-1, src, aux, dst)   # move n-1 to aux
    print(f"{src} → {dst}")     # move largest
    hanoi(n-1, aux, dst, src)   # move n-1 from aux to dst

# 4. Binary Search (recursive) — O(log n)
def b_search(arr, lo, hi, target):
    if lo > hi: return -1
    mid = (lo + hi) // 2
    if arr[mid] == target: return mid
    if arr[mid] < target: return b_search(arr, mid+1, hi, target)
    return b_search(arr, lo, mid-1, target)`,
        practice: [
          { name: "Climbing Stairs (Fibonacci variant)", diff: "easy" },
          { name: "Fibonacci Number (with memoization)", diff: "easy" },
          { name: "Tower of Hanoi", diff: "medium" },
          { name: "Binary Search (recursive)", diff: "easy" },
          { name: "Merge Sort (recursive)", diff: "medium" }
        ]
      },
      "Backtracking Pattern": {
        diff: "hard",
        explanation: "Backtracking is advanced recursion where you explore all possibilities and undo choices that don't lead to a valid solution. The pattern is always: Try → Recurse → Undo (Choose → Explore → Unchoose). It is essentially a DFS with pruning. Used in: N-Queens, Sudoku, permutations, subsets, combination sum, word search. Key: after a recursive call returns, undo the change (backtrack) so the state is clean for the next possibility.",
        intuition: "Think of solving a maze: at each junction, pick a direction, walk down it, if you hit a wall, backtrack to the junction and try another direction. The 'undo' step restores state. Without undoing, choices from one branch corrupt the next branch. The pruning is what makes it efficient — we don't explore paths that are already invalid.",
        steps: [
          "CHOOSE: make a choice (place a queen, pick a number, add to path).",
          "EXPLORE: recursively solve with this choice (go deeper).",
          "UNCHOOSE: undo the choice before trying the next option (backtrack).",
          "BASE CASE: when a complete valid solution is found, add it to results.",
          "PRUNING: before recursing, check if current choice can possibly lead to a valid solution. Skip if not.",
          "TEMPLATE: for each option: if valid(option): apply(option) → recurse → undo(option)."
        ],
        dryRun: `── PERMUTATIONS of [1,2,3] ──────────────────────────
permute([], [1,2,3]):
  pick 1 → permute([1], [2,3]):
    pick 2 → permute([1,2], [3]):
      pick 3 → permute([1,2,3], []) → ADD [1,2,3] ✓
    undo 2 ← back to [1],[2,3]
    pick 3 → permute([1,3], [2]):
      pick 2 → ADD [1,3,2] ✓
    undo 3 ←
  undo 1 ←
  pick 2 → ... → [2,1,3],[2,3,1]
  pick 3 → ... → [3,1,2],[3,2,1]
Total: 3! = 6 permutations ✓

── SUBSETS of [1,2,3] ───────────────────────────────
subset(idx=0, current=[]):
  skip 1: subset(1, [])
    skip 2: subset(2,[]) → add [] wait, index 0 first...

idx=0: include 1 or skip
  include → [1], idx=1:
    include → [1,2], idx=2:
      include → [1,2,3] ✓  exclude → [1,2] ✓
    exclude → [1], idx=2:
      include → [1,3] ✓    exclude → [1] ✓
  skip → [], idx=1: → [2],[2,3],[3],[] ✓
Total: 2³=8 subsets ✓`,
        time: { best: "O(n!)", avg: "O(n!)", worst: "O(2^n) subsets" },
        space: "O(n) recursion depth",
        stable: undefined,
        when: "Permutations, subsets, combinations, N-Queens, Sudoku, word search, path finding. Any problem where you need to explore all possibilities with pruning.",
        pros: [
          "Explores all valid solutions — guaranteed correct if implemented right",
          "Pruning makes it much faster than brute force",
          "Elegant and concise compared to iterative equivalents"
        ],
        cons: [
          "Exponential worst case — O(n!) or O(2^n)",
          "Not suitable for large n without heavy pruning",
          "Forgetting to undo (backtrack) is the most common bug"
        ],
        cpp: `// Backtracking Patterns — C++

// 1. Generate all subsets — O(2^n)
void subsets(vector<int>& nums, int idx,
             vector<int>& curr, vector<vector<int>>& res) {
    res.push_back(curr);           // add current subset
    for (int i = idx; i < nums.size(); i++) {
        curr.push_back(nums[i]);   // CHOOSE
        subsets(nums, i+1, curr, res); // EXPLORE
        curr.pop_back();           // UNCHOOSE ← backtrack!
    }
}

// 2. Generate all permutations — O(n!)
void permute(vector<int>& nums, int start,
             vector<vector<int>>& res) {
    if (start == nums.size()) { res.push_back(nums); return; }
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]);       // CHOOSE
        permute(nums, start+1, res);      // EXPLORE
        swap(nums[start], nums[i]);       // UNCHOOSE ← backtrack!
    }
}

// 3. N-Queens (check if queen placement is safe)
bool isSafe(vector<string>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++) if (board[i][col]=='Q') return false;
    for (int i=row-1,j=col-1; i>=0&&j>=0; i--,j--) if(board[i][j]=='Q') return false;
    for (int i=row-1,j=col+1; i>=0&&j<n; i--,j++) if(board[i][j]=='Q') return false;
    return true;
}`,
        python: `# Backtracking Patterns — Python

# 1. Generate all subsets — O(2^n)
def subsets(nums):
    result = []
    def backtrack(idx, current):
        result.append(current[:])   # add copy of current subset
        for i in range(idx, len(nums)):
            current.append(nums[i]) # CHOOSE
            backtrack(i+1, current) # EXPLORE
            current.pop()           # UNCHOOSE ← backtrack!
    backtrack(0, [])
    return result

# 2. Generate all permutations — O(n!)
def permutations(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])  # found complete permutation
            return
        for i in range(len(remaining)):
            path.append(remaining[i])              # CHOOSE
            backtrack(path, remaining[:i]+remaining[i+1:]) # EXPLORE
            path.pop()                             # UNCHOOSE
    backtrack([], nums)
    return result

# 3. Combination Sum (pick numbers that sum to target)
def combination_sum(candidates, target):
    result = []
    def backtrack(start, current, remaining):
        if remaining == 0: result.append(current[:]); return
        if remaining < 0: return  # PRUNE ← key optimisation
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining-candidates[i])
            current.pop()  # UNCHOOSE
    backtrack(0, [], target)
    return result`,
        practice: [
          { name: "Subsets", diff: "medium" },
          { name: "Permutations", diff: "medium" },
          { name: "Combination Sum", diff: "medium" },
          { name: "N-Queens", diff: "hard" },
          { name: "Sudoku Solver", diff: "hard" },
          { name: "Word Search", diff: "medium" }
        ]
      },
      "Memoization & Optimization": {
        diff: "medium",
        explanation: "Naive tree recursion recomputes the same subproblems repeatedly. Memoization (top-down DP) stores results in a cache (hashmap or array) so each subproblem is solved only once. This converts O(2^n) tree recursion into O(n). Tabulation (bottom-up DP) is the iterative version — fill a table from base cases up. Key insight: if your recursion tree has overlapping subproblems (same inputs appear multiple times), memoization will help. The two criteria for DP: (1) Overlapping Subproblems, (2) Optimal Substructure.",
        intuition: "Fibonacci(5) without memoization computes Fibonacci(2) three times, Fibonacci(3) twice. With memoization, each is computed once and cached. The recursion tree collapses to a straight line — O(n) from O(2^n). Tabulation avoids the call stack entirely by filling from the bottom up: dp[0]=0, dp[1]=1, dp[i]=dp[i-1]+dp[i-2].",
        steps: [
          "IDENTIFY: does the recursion tree have repeated subproblems? Draw fib(5) tree and spot duplicates.",
          "MEMOIZE: add cache dict. Before computing, check if answer is in cache. After computing, store in cache.",
          "TABULATION: define dp array. Set base cases. Fill dp[i] using previous values. Return dp[n].",
          "SPACE OPTIMISE: for Fibonacci, dp[i] only uses dp[i-1] and dp[i-2] → use two variables instead of array. O(1) space.",
          "@lru_cache in Python: automatic memoization decorator — attaches cache to function.",
          "RULE: if problem = recursion + overlapping subproblems → use memoization or tabulation."
        ],
        dryRun: `── FIBONACCI WITHOUT MEMO: fib(5) ──────────────────
                fib(5)
             /         \
         fib(4)         fib(3) ← computed twice!
        /     \        /    \
    fib(3)  fib(2) fib(2) fib(1)  ← fib(2) computed 3 times!
   ...
Total calls: 15 for n=5, 2^n for general n ✗

── FIBONACCI WITH MEMO: fib(5) ──────────────────────
fib(5) → fib(4) → fib(3) → fib(2) → fib(1) = 1
                                   → fib(0) = 0
                         ← cache[2] = 1
                  ← cache[3] = 2
         ← cache[4] = 3
← cache[5] = 5
Each subproblem computed ONCE ✓ O(n) calls!

── TABULATION: fib up to n=6 ────────────────────────
dp: [0, 1, ?, ?, ?, ?, ?]
dp[2] = dp[1]+dp[0] = 1
dp[3] = dp[2]+dp[1] = 2
dp[4] = dp[3]+dp[2] = 3
dp[5] = dp[4]+dp[3] = 5
dp[6] = dp[5]+dp[4] = 8 ✓  No recursion at all!`,
        time: { best: "O(n) memoized", avg: "O(n) memoized", worst: "O(2^n) naive" },
        space: "O(n) memo / O(1) space-optimised",
        stable: undefined,
        when: "Any time recursion has overlapping subproblems — Fibonacci, climbing stairs, coin change, longest common subsequence, edit distance. Memoization = top-down DP. Tabulation = bottom-up DP.",
        pros: [
          "Converts O(2^n) tree recursion to O(n) with O(n) cache",
          "@lru_cache / functools.cache makes memoization trivial in Python",
          "Space-optimised tabulation achieves O(1) space for many DP problems"
        ],
        cons: [
          "Extra O(n) space for cache or table",
          "Memoization has function call overhead vs pure tabulation",
          "Identifying which recursive calls are subproblems requires practice"
        ],
        cpp: `// Memoization & Optimization — C++

// 1. Memoized Fibonacci — O(n) time, O(n) space
#include <unordered_map>
unordered_map<int,long long> dp;
long long fib(int n) {
    if (n <= 1) return n;
    if (dp.count(n)) return dp[n];  // cache hit!
    return dp[n] = fib(n-1) + fib(n-2);
}

// 2. Tabulation — O(n) time, O(n) space
long long fibTab(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n+1);
    dp[0]=0; dp[1]=1;
    for (int i=2; i<=n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// 3. Space-optimised Fibonacci — O(n) time, O(1) space!
long long fibOpt(int n) {
    if (n <= 1) return n;
    long long prev2=0, prev1=1;
    for (int i=2; i<=n; i++) {
        long long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 4. Memoized climbing stairs (1 or 2 steps)
unordered_map<int,int> stairMemo;
int climbStairs(int n) {
    if (n <= 1) return 1;
    if (stairMemo.count(n)) return stairMemo[n];
    return stairMemo[n] = climbStairs(n-1) + climbStairs(n-2);
}`,
        python: `# Memoization & Optimization — Python

# 1. @lru_cache — automatic memoization
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# 2. Manual memoization with dict
def fib_memo(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]  # cache hit!
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# 3. Tabulation (bottom-up DP) — no recursion!
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# 4. Space-optimised — O(1) space!
def fib_opt(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b

# Memoization comparison:
# fib(40) naive: ~330 million calls
# fib(40) memo:  41 unique calls ✓`,
        practice: [
          { name: "Climbing Stairs (Memoization)", diff: "easy" },
          { name: "House Robber (1D DP)", diff: "medium" },
          { name: "Coin Change (Bottom-up DP)", diff: "medium" },
          { name: "Longest Common Subsequence", diff: "medium" },
          { name: "Word Break (Memoization)", diff: "medium" }
        ]
      }
    }
  },
  Searching: {
    icon: "🔍", diff: "easy",
    desc: "Linear O(n) to Binary O(log n). Sorted arrays, binary search variants, and hashing for O(1) lookup.",
    subtopics: {
      "Basics & Linear Search": {
        diff: "easy",
        explanation: "Searching is the process of finding a specific element (key) in a collection of data. There are two classic techniques: (1) Linear Search — works on any data, sorted or unsorted. Checks each element one by one from the beginning until the desired element is found or the list is exhausted. Time: O(n). If search is successful, returns the index. If unsuccessful, reports not found. From the textbook: 'An ordered or unordered list will be searched one by one from the beginning until the desired element is found. If not found, the search is unsuccessful.' (2) Binary Search — requires sorted data. Divides the search space in half each step. Time: O(log n). Average comparisons for 9 elements: 2.77 (successful), 3.4 (unsuccessful).",
        intuition: "Think of searching like finding a book in a library. Linear search = randomly check books one by one — simple but slow. Binary search = go to sorted catalog and directly narrow down — fast but needs sorted data. The key trade-off: linear is simple and works everywhere; binary is exponentially faster but requires the array to be sorted first.",
        steps: [
          "LINEAR SEARCH: Start at index 0. Compare arr[i] with key. If match → return i (found). If i reaches n → return -1 (not found). O(n) worst case.",
          "LINEAR SEARCH AVERAGE: if element is at position k, needs k comparisons. Average = (1+2+...+n)/n = (n+1)/2. For 12 elements: avg ≈ 3.08 comparisons.",
          "SUCCESSFUL SEARCH: element is found and index is returned.",
          "UNSUCCESSFUL SEARCH: entire array scanned, element not present, return -1.",
          "RECURSIVE LINEAR SEARCH: base case = position >= n (not found) OR arr[position] == key (found). Recursive case: linear_search(arr, key, position+1, n).",
          "BEST CASE: element is at index 0 → O(1). WORST CASE: element at end or not present → O(n)."
        ],
        dryRun: `── LINEAR SEARCH: find 7 in [-15,-6,0,7,9,23,54,82,101] ───
Index:    0   1  2  3  4   5   6   7   8
Elements:-15 -6  0  7  9  23  54  82 101

i=0: -15 == 7? No
i=1:  -6 == 7? No
i=2:   0 == 7? No
i=3:   7 == 7? YES → return 3 ✓  (4 comparisons)

── LINEAR SEARCH: find 42 (not present) ────────────────
i=0..8: check all elements, none match
Return -1 → Unsuccessful (9 comparisons = O(n)) ✗

── UNSORTED ARRAY: [45,39,8,54,77,38,24,16,4,7,9,20] ──
Search for 4  → found after 9 comparisons
Search for 7  → found after 10 comparisons
Search for 99 → not found after 12 comparisons ✗

Key: works on ANY array — sorted or unsorted ✓`,
        time: { best: "O(1)", avg: "O(n)", worst: "O(n)" },
        space: "O(1) iterative / O(n) recursive",
        stable: undefined,
        when: "Use linear search when: array is small (n < 50), array is unsorted and sorting would be expensive, searching only once (sorting overhead not justified), or data structure doesn't support binary search (linked list).",
        pros: [
          "Works on sorted AND unsorted data",
          "No preprocessing needed — just scan",
          "Works on any data structure: array, linked list, string",
          "O(1) space — no extra memory"
        ],
        cons: [
          "O(n) worst case — slow for large n",
          "For large sorted arrays, binary search is exponentially better",
          "Recursive version uses O(n) call stack space"
        ],
        cpp: `// Linear Search — C++ (Iterative)
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;      // found at index i
    }
    return -1;             // not found
}

// Linear Search — C++ (Recursive, from textbook)
int linearSearchRec(int a[], int data, int pos, int n) {
    if (pos >= n) return -1;           // base: not found
    if (a[pos] == data) return pos;    // base: found
    return linearSearchRec(a, data, pos + 1, n); // recurse
}

// Usage
int arr[] = {-15, -6, 0, 7, 9, 23, 54, 82, 101};
int n = 9;
cout << linearSearch(arr, n, 7);    // 3
cout << linearSearch(arr, n, 42);   // -1`,
        python: `# Linear Search — Python (Iterative)
def linear_search(arr, key):
    for i in range(len(arr)):
        if arr[i] == key:
            return i       # found at index i
    return -1              # not found

# Linear Search — Python (Recursive)
def linear_search_rec(arr, key, pos=0):
    if pos >= len(arr): return -1       # not found
    if arr[pos] == key: return pos      # found
    return linear_search_rec(arr, key, pos + 1)

# Test
arr = [-15, -6, 0, 7, 9, 23, 54, 82, 101]
print(linear_search(arr, 7))   # 3
print(linear_search(arr, 42))  # -1

# Python built-ins (linear search under the hood)
if 7 in arr: print(arr.index(7))   # O(n)`,
        practice: [
          { name: "Find Index of First Occurrence", diff: "easy" },
          { name: "Search in a Linked List", diff: "easy" },
          { name: "Find Maximum in Unsorted Array", diff: "easy" }
        ]
      },
      "Binary Search": {
        diff: "easy",
        explanation: "Binary search requires a sorted array. It works by repeatedly halving the search space. Find the middle element: if it matches the key, done. If key < mid, search only the left half. If key > mid, search only the right half. Each comparison eliminates half the remaining elements. From the textbook: 'Every unsuccessful comparison reduces the un-searched portion roughly by half. The array needs to be searched only log₂n times before reaching trivial length, so worst case complexity is O(log n).' Average comparisons for 12 elements: 37/12 ≈ 3.08. For 9 elements: 25/9 ≈ 2.77 successful, 34/10 = 3.4 unsuccessful.",
        intuition: "Instead of checking every element, binary search bets: the middle element divides the sorted array into two halves. The key must be in exactly one of them. Each step throws away half the remaining candidates. Starting with n=1 million: step 1→500K, step 2→250K, ... step 20→1. So binary search finds any element in at most 20 steps! log₂(1,000,000) ≈ 20. Critical: always use mid = lo + (hi-lo)/2 to avoid integer overflow.",
        steps: [
          "PRECONDITION: array MUST be sorted in ascending order.",
          "Initialize low=0, high=n-1.",
          "While low <= high: compute mid = low + (high-low)/2. (NOT (low+high)/2 — avoids overflow!)",
          "If arr[mid] == key → return mid (found).",
          "If key < arr[mid] → high = mid-1 (search left half).",
          "If key > arr[mid] → low = mid+1 (search right half).",
          "If loop ends without return → return -1 (not found).",
          "RECURSIVE VERSION: same logic but call itself with updated low/high."
        ],
        dryRun: `── BINARY SEARCH: x=4 in [4,7,8,9,16,20,24,38,39,45,54,77] ─
low=1, high=12, mid=6 → arr[6]=20 → 4<20 → high=5
low=1, high=5,  mid=3 → arr[3]=8  → 4<8  → high=2
low=1, high=2,  mid=1 → arr[1]=4  → FOUND at 1 ✓ (3 comparisons)

── BINARY SEARCH: x=20 in same array ──────────────────
low=1, high=12, mid=6 → arr[6]=20 → FOUND at 6 ✓ (1 comparison!)

── BINARY SEARCH: x=42 (not present) ──────────────────
low=1, high=12, mid=6  → 20 → 42>20 → low=7
low=7, high=12, mid=9  → 39 → 42>39 → low=10
low=10,high=12, mid=11 → 54 → 42<54 → high=10
low=10,high=10, mid=10 → 45 → 42<45 → high=9
low=10 > high=9 → NOT FOUND ✗ (4 comparisons)

── OVERFLOW SAFE MID calculation ───────────────────────
WRONG: mid = (low + high) / 2  // overflow if low+high > INT_MAX
RIGHT: mid = low + (high - low) / 2  // always safe ✓`,
        time: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" },
        space: "O(1) iterative / O(log n) recursive",
        stable: undefined,
        when: "Use binary search when: array is sorted, searching repeatedly (amortised), or n is large. Binary search is exponentially faster: n=10⁹ needs only ~30 comparisons vs 10⁹ for linear.",
        pros: [
          "O(log n) — extremely fast. 10⁹ elements in ~30 steps",
          "O(1) space for iterative version",
          "Correct for both successful and unsuccessful search",
          "Foundation for many advanced patterns (lower bound, upper bound, binary search on answer)"
        ],
        cons: [
          "REQUIRES sorted array — sorting cost O(n log n) must be justified",
          "Not suitable for linked lists (no O(1) mid access)",
          "Recursive version uses O(log n) stack space",
          "Easy to write infinite loops with wrong mid update"
        ],
        cpp: `// Binary Search — C++ (Iterative, from textbook)
int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2; // overflow-safe!
        if (arr[mid] == key)
            return mid;          // found
        else if (key < arr[mid])
            high = mid - 1;      // search left half
        else
            low = mid + 1;       // search right half
    }
    return -1;                   // not found
}

// Binary Search — C++ (Recursive, from textbook)
int binSearchRec(int a[], int data, int low, int high) {
    if (low > high) return -1;  // base: not found
    int mid = low + (high - low) / 2;
    if (a[mid] == data) return mid;       // found
    if (data < a[mid])
        return binSearchRec(a, data, low, mid - 1);
    return binSearchRec(a, data, mid + 1, high);
}

// STL binary search
#include <algorithm>
vector<int> v = {4,7,8,9,16,20,24,38,39,45,54,77};
bool found = binary_search(v.begin(), v.end(), 20); // true
auto it = lower_bound(v.begin(), v.end(), 20); // iterator to 20`,
        python: `# Binary Search — Python (Iterative)
def binary_search(arr, key):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2   # Python ints don't overflow
        if arr[mid] == key:
            return mid             # found
        elif key < arr[mid]:
            high = mid - 1         # search left
        else:
            low = mid + 1          # search right
    return -1                      # not found

# Binary Search — Python (Recursive)
def bin_search_rec(arr, data, low, high):
    if low > high: return -1       # not found
    mid = (low + high) // 2
    if arr[mid] == data: return mid
    if data < arr[mid]:
        return bin_search_rec(arr, data, low, mid - 1)
    return bin_search_rec(arr, data, mid + 1, high)

# Python bisect module (standard library)
import bisect
arr = [4, 7, 8, 9, 16, 20, 24, 38, 39, 45, 54, 77]
idx = bisect.bisect_left(arr, 20)   # 5 (index of 20)
print(arr[idx] == 20)               # True`,
        practice: [
          { name: "Binary Search (LeetCode 704)", diff: "easy" },
          { name: "Search in Rotated Sorted Array", diff: "medium" },
          { name: "Find First and Last Position in Sorted Array", diff: "medium" },
          { name: "Square Root using Binary Search", diff: "easy" }
        ]
      },
      "Binary Search Variants": {
        diff: "medium",
        explanation: "Beyond basic binary search, there are critical variants: (1) Lower Bound — first index where arr[i] >= key. (2) Upper Bound — first index where arr[i] > key. (3) Count Occurrences — upper_bound - lower_bound. (4) Search in Rotated Sorted Array — one half is always sorted, check which and search accordingly. (5) Peak Element — element greater than both neighbours; binary search on the slope. (6) Binary Search on Answer — don't search in an array, search on the answer space (min/max possible answer). (7) First/Last Occurrence — modified binary search that doesn't stop on first match.",
        intuition: "Lower/upper bound: when arr[mid]==key, don't stop — keep searching left (for lower) or right (for upper). This finds the boundary. Rotated array: at least one half [lo..mid] or [mid..hi] is guaranteed sorted — check which one, then determine if key is in that sorted half. Binary search on answer: the answer lies in a range [min, max]; write an is_possible(mid) function and binary search on it.",
        steps: [
          "LOWER BOUND: when arr[mid]>=key → result=mid, high=mid-1. When arr[mid]<key → low=mid+1. Return result.",
          "UPPER BOUND: when arr[mid]>key → result=mid, high=mid-1. When arr[mid]<=key → low=mid+1. Return result.",
          "FIRST OCCURRENCE: when arr[mid]==key → save mid as answer, high=mid-1 (keep searching left).",
          "LAST OCCURRENCE: when arr[mid]==key → save mid as answer, low=mid+1 (keep searching right).",
          "ROTATED ARRAY: if arr[lo]<=arr[mid] → left half sorted. If key in [arr[lo],arr[mid]] → search left. Else search right. Flip logic for right-sorted half.",
          "PEAK ELEMENT: if arr[mid]>arr[mid+1] → peak is on left (high=mid). Else peak on right (low=mid+1).",
          "BINARY SEARCH ON ANSWER: define lo=min_answer, hi=max_answer. Check is_feasible(mid). Narrow range."
        ],
        dryRun: `── LOWER BOUND of 7 in [1,3,7,7,7,9,11] ──────────────
lo=0,hi=6: mid=3, arr[3]=7 >= 7 → result=3, hi=2
lo=0,hi=2: mid=1, arr[1]=3 < 7  → lo=2
lo=2,hi=2: mid=2, arr[2]=7 >= 7 → result=2, hi=1
lo=2 > hi=1 → return result=2 ✓ (first 7 at index 2)

── UPPER BOUND of 7 in same array ──────────────────────
lo=0,hi=6: mid=3, arr[3]=7 <=7 → lo=4
lo=4,hi=6: mid=5, arr[5]=9 > 7 → result=5, hi=4
lo=4,hi=4: mid=4, arr[4]=7 <=7 → lo=5
lo=5 > hi=4 → return result=5 ✓ (first element > 7 at index 5)
Count of 7s = upper_bound - lower_bound = 5-2 = 3 ✓

── ROTATED ARRAY: find 0 in [4,5,6,7,0,1,2] ───────────
lo=0,hi=6: mid=3, arr[3]=7
  arr[lo=0]=4 <= arr[mid]=7 → LEFT half [4,5,6,7] sorted
  key=0 in [4,7]? NO → search right: lo=4
lo=4,hi=6: mid=5, arr[5]=1
  arr[lo=4]=0 <= arr[mid]=1 → LEFT half [0,1] sorted
  key=0 in [0,1]? YES → search left: hi=4
lo=4,hi=4: mid=4, arr[4]=0 == 0 → FOUND at 4 ✓`,
        time: { best: "O(1)", avg: "O(log n)", worst: "O(log n)" },
        space: "O(1)",
        stable: undefined,
        when: "Lower/upper bound: counting occurrences, range queries. Rotated array: real interview question. Peak element: finding local maxima. Binary search on answer: optimization problems (Koko eating bananas, aggressive cows, allocate books).",
        pros: [
          "All variants run in O(log n) — same as standard binary search",
          "Lower/upper bound enable O(log n) count of occurrences",
          "Binary search on answer solves hard optimization problems elegantly"
        ],
        cons: [
          "Each variant has subtle differences — easy to mix up",
          "Binary search on answer requires defining a good feasibility function",
          "Off-by-one errors in hi=mid vs hi=mid-1 are the most common bugs"
        ],
        cpp: `// Binary Search Variants — C++

// 1. First Occurrence (Lower Bound equivalent)
int firstOccurrence(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1, result=-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) { result=mid; hi=mid-1; } // keep searching left!
        else if (arr[mid] < key) lo = mid+1;
        else hi = mid-1;
    }
    return result;
}

// 2. Last Occurrence
int lastOccurrence(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1, result=-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) { result=mid; lo=mid+1; } // keep searching right!
        else if (arr[mid] < key) lo = mid+1;
        else hi = mid-1;
    }
    return result;
}

// 3. Search in Rotated Sorted Array
int searchRotated(vector<int>& arr, int key) {
    int lo=0, hi=arr.size()-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] == key) return mid;
        if (arr[lo] <= arr[mid]) { // left half sorted
            if (key>=arr[lo] && key<arr[mid]) hi=mid-1;
            else lo=mid+1;
        } else { // right half sorted
            if (key>arr[mid] && key<=arr[hi]) lo=mid+1;
            else hi=mid-1;
        }
    }
    return -1;
}

// 4. Peak Element
int peakElement(vector<int>& arr) {
    int lo=0, hi=arr.size()-1;
    while (lo < hi) {
        int mid = lo + (hi-lo)/2;
        if (arr[mid] > arr[mid+1]) hi=mid;   // peak on left side
        else lo=mid+1;                         // peak on right side
    }
    return lo; // peak index
}`,
        python: `# Binary Search Variants — Python

# 1. First Occurrence
def first_occurrence(arr, key):
    lo, hi, result = 0, len(arr)-1, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == key: result=mid; hi=mid-1  # search left
        elif arr[mid] < key: lo = mid+1
        else: hi = mid-1
    return result

# 2. Last Occurrence
def last_occurrence(arr, key):
    lo, hi, result = 0, len(arr)-1, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == key: result=mid; lo=mid+1  # search right
        elif arr[mid] < key: lo = mid+1
        else: hi = mid-1
    return result

# 3. Count Occurrences using both bounds
def count_occurrences(arr, key):
    first = first_occurrence(arr, key)
    if first == -1: return 0
    return last_occurrence(arr, key) - first + 1

# 4. Square Root using Binary Search — O(log n)
def sqrt_binary(n):
    if n < 2: return n
    lo, hi, ans = 1, n//2, 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid == n: return mid
        if mid * mid < n: ans=mid; lo=mid+1
        else: hi=mid-1
    return ans

# 5. Using Python bisect
import bisect
arr = [1,3,7,7,7,9,11]
lo = bisect.bisect_left(arr, 7)   # 2 — first 7
hi = bisect.bisect_right(arr, 7)  # 5 — after last 7
print(hi - lo)                    # 3 (count of 7s) ✓`,
        practice: [
          { name: "Find First and Last Position (LeetCode 34)", diff: "medium" },
          { name: "Search in Rotated Sorted Array (LeetCode 33)", diff: "medium" },
          { name: "Find Peak Element (LeetCode 162)", diff: "medium" },
          { name: "Sqrt(x) using Binary Search (LeetCode 69)", diff: "easy" },
          { name: "Find Minimum in Rotated Sorted Array", diff: "medium" }
        ]
      },
      "Advanced Search Techniques": {
        diff: "medium",
        explanation: "Beyond linear and binary search, four more techniques: (1) Interpolation Search — for uniformly distributed sorted data, estimates position using formula: pos = lo + ((key - arr[lo]) × (hi-lo)) / (arr[hi]-arr[lo]). O(log log n) average for uniform data, O(n) worst case. (2) Exponential Search — for unbounded/infinite arrays: find range by doubling index until arr[index]>=key, then binary search in [index/2, index]. O(log n). (3) Jump Search — for sorted arrays, skip blocks of size √n then linear search. O(√n). (4) Hashing — use hash table for O(1) average search. No sorting needed. O(n) space.",
        intuition: "Interpolation search is like looking up a name in a dictionary — if searching for 'Smith' you don't open to the middle; you open near the end. It predicts where the key should be based on its value relative to the range. Exponential search solves the 'I don't know the size' problem by doubling the range until the key could be there. Jump search is a middle ground between O(n) and O(log n) — skip √n elements at a time.",
        steps: [
          "INTERPOLATION SEARCH: pos = lo + ((key-arr[lo]) × (hi-lo)) / (arr[hi]-arr[lo]). If arr[pos]==key → found. If key<arr[pos] → hi=pos-1. Else lo=pos+1.",
          "EXPONENTIAL SEARCH: find range: i=1, while i<n && arr[i]<=key: i*=2. Then binary search in [i/2, min(i,n-1)].",
          "JUMP SEARCH: step=√n. While arr[min(step,n)-1]<key: prev=step, step+=√n. Linear search from prev to min(step,n).",
          "HASHING SEARCH: insert all elements into hash map (key→index). Search = O(1) average. Extra O(n) space.",
          "INTERPOLATION PRECONDITION: data must be uniformly distributed AND sorted. Non-uniform data → O(n) worst case.",
          "WHEN TO USE: Interpolation: uniform sorted large data. Exponential: unknown size. Jump: sorted, O(√n) acceptable. Hashing: O(1) search needed."
        ],
        dryRun: `── INTERPOLATION SEARCH: key=77 in [4,7,8,9,16,20,24,38,39,45,54,77] ──
lo=0, hi=11, arr[lo]=4, arr[hi]=77
pos = 0 + ((77-4) × (11-0)) / (77-4)
    = 0 + (73 × 11) / 73
    = 0 + 11 = 11
arr[11]=77 == 77 → FOUND in 1 step! ✓ (better than binary's 4!)

── EXPONENTIAL SEARCH: key=77 in same array ─────────────
i=1: arr[1]=7  < 77 → i=2
i=2: arr[2]=8  < 77 → i=4
i=4: arr[4]=16 < 77 → i=8
i=8: arr[8]=39 < 77 → i=16
i=16 >= n=12 → binary search in [8, 11]
Binary search [8,11]: mid=9→45<77→lo=10; mid=10→54<77→lo=11; mid=11→77 ✓

── JUMP SEARCH: key=54 in [4,7,8,9,16,20,24,38,39,45,54,77], n=12 ─
step=√12≈3
arr[2]=8  < 54 → prev=3, step=6
arr[5]=20 < 54 → prev=6, step=9
arr[8]=39 < 54 → prev=9, step=12
Linear search from 9 to 11: arr[9]=45, arr[10]=54 ✓ (found at 10)`,
        time: { best: "O(1)", avg: "O(log log n) interpolation", worst: "O(n) interpolation" },
        space: "O(1) / O(n) hashing",
        stable: undefined,
        when: "Interpolation: large uniformly distributed sorted data (phone books, timestamps). Exponential: sorted array of unknown size. Jump: sorted array, simpler than binary. Hashing: when O(1) lookup needed and space available.",
        pros: [
          "Interpolation: O(log log n) average — faster than binary for uniform data",
          "Exponential: handles unknown-size arrays elegantly",
          "Hashing: O(1) average — fastest possible lookup"
        ],
        cons: [
          "Interpolation: O(n) worst case on skewed data — dangerous",
          "Hashing: O(n) extra space, collision handling needed",
          "Jump: O(√n) — worse than binary O(log n) for large n"
        ],
        cpp: `// Advanced Search Techniques — C++

// 1. Interpolation Search — O(log log n) uniform data
int interpolationSearch(int arr[], int n, int key) {
    int lo = 0, hi = n - 1;
    while (lo <= hi && key >= arr[lo] && key <= arr[hi]) {
        if (lo == hi) { return arr[lo]==key ? lo : -1; }
        // formula: estimate position based on value
        int pos = lo + ((long long)(key - arr[lo]) *
                        (hi - lo)) / (arr[hi] - arr[lo]);
        if (arr[pos] == key) return pos;
        if (arr[pos] < key) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}

// 2. Exponential Search — O(log n), good for unknown-size arrays
int exponentialSearch(int arr[], int n, int key) {
    if (arr[0] == key) return 0;
    int i = 1;
    while (i < n && arr[i] <= key) i *= 2; // double until past key
    // binary search in [i/2, min(i, n-1)]
    return binarySearch(arr + i/2, min(i, n-1) - i/2 + 1, key);
}

// 3. Hashing Search — O(1) average
#include <unordered_map>
unordered_map<int,int> buildIndex(int arr[], int n) {
    unordered_map<int,int> idx;
    for (int i = 0; i < n; i++) idx[arr[i]] = i;
    return idx;
}
// search: idx.count(key) ? idx[key] : -1`,
        python: `# Advanced Search Techniques — Python

# 1. Interpolation Search
def interpolation_search(arr, key):
    lo, hi = 0, len(arr) - 1
    while lo <= hi and arr[lo] <= key <= arr[hi]:
        if lo == hi:
            return lo if arr[lo] == key else -1
        # estimate position
        pos = lo + ((key - arr[lo]) * (hi - lo)) // (arr[hi] - arr[lo])
        if arr[pos] == key: return pos
        if arr[pos] < key: lo = pos + 1
        else: hi = pos - 1
    return -1

# 2. Exponential Search
def exponential_search(arr, key):
    n = len(arr)
    if arr[0] == key: return 0
    i = 1
    while i < n and arr[i] <= key: i *= 2  # find range
    # binary search in [i//2, min(i, n-1)]
    lo, hi = i // 2, min(i, n - 1)
    return binary_search(arr, key, lo, hi)

# 3. Hashing — O(1) lookup
def build_hash_index(arr):
    return {val: idx for idx, val in enumerate(arr)}

# Usage
arr = [4, 7, 8, 9, 16, 20, 24, 38, 39, 45, 54, 77]
index = build_hash_index(arr)
print(index.get(77, -1))  # 11 — O(1) ✓
print(index.get(42, -1))  # -1 — O(1) ✓`,
        practice: [
          { name: "Search in Infinite Sorted Array", diff: "medium" },
          { name: "Two Sum (Hashing approach)", diff: "easy" },
          { name: "Find Duplicate Number (no extra space)", diff: "medium" },
          { name: "Median of Two Sorted Arrays", diff: "hard" }
        ]
      },
      "Complexity & Comparison": {
        diff: "easy",
        explanation: "Complete complexity reference for all searching techniques. Key insight from the textbook: 'Binary search is exponentially faster than linear search.' For n=10⁹: linear needs up to 10⁹ comparisons; binary needs only 30. Important exam questions: (1) Binary search requires sorted array. (2) Binary search works on arrays, NOT linked lists (no O(1) mid access). (3) Both linear and binary can be done recursively and iteratively. (4) Hashing gives O(1) average but needs extra O(n) space. (5) Overflow bug: always use mid = lo+(hi-lo)/2, not (lo+hi)/2.",
        intuition: "The choice of search algorithm depends on: Is data sorted? How often do you search? How much space can you use? Is n large? For small n or unsorted data, linear search is fine and simpler. For large sorted data, binary search is essential. For very frequent lookups where space is available, build a hash table once and enjoy O(1) forever.",
        steps: [
          "Linear: O(n) worst case. No precondition. Works on all structures.",
          "Binary: O(log n). MUST be sorted. Array only (needs O(1) random access).",
          "Interpolation: O(log log n) average, O(n) worst. Uniform + sorted.",
          "Exponential: O(log n). Sorted. Good for unknown size.",
          "Jump: O(√n). Sorted.",
          "Hashing: O(1) average. No sort needed. O(n) extra space."
        ],
        dryRun: `Search Technique Comparison:
Technique       | Time (avg) | Space | Sorted? | Structure
────────────────┼────────────┼───────┼─────────┼──────────
Linear          | O(n)       | O(1)  | No      | Any
Binary          | O(log n)   | O(1)  | YES     | Array only
Interpolation   | O(log log n)| O(1) | YES+uniform| Array
Exponential     | O(log n)   | O(1)  | YES     | Array
Jump            | O(√n)      | O(1)  | YES     | Array
Hashing         | O(1) avg   | O(n)  | No      | Hash table

n = 1,000,000 comparisons needed:
Linear search:        up to 1,000,000
Binary search:        up to 20
Interpolation (unif): up to ~4
Hashing:              1 (average)

Exam MCQ answers:
  Q: Worst case serial search?         A: Linear / O(n)
  Q: Worst case binary search?         A: Logarithmic / O(log n)
  Q: Binary search requirement?        A: Array must be SORTED
  Q: Which search halves elements?     A: Binary Search
  Q: Stable sort for searching?        A: Bubble Sort (stable)`,
        time: { best: "O(1) hashing", avg: "O(log n) binary", worst: "O(n) linear" },
        space: "O(1) most / O(n) hashing",
        stable: undefined,
        when: "Unsorted/small n → Linear. Sorted large n → Binary. Uniform sorted → Interpolation. Frequent lookups + space available → Hashing. Unknown size → Exponential.",
        pros: [
          "Binary search: O(log n) — handles billion-element arrays in 30 steps",
          "Hashing: O(1) average — fastest possible for repeated queries",
          "Linear: zero preconditions — works on any collection"
        ],
        cons: [
          "Binary search: array must be sorted — O(n log n) sorting cost",
          "Hashing: O(n) extra space + collision handling complexity",
          "Interpolation: O(n) worst case on skewed distributions"
        ],
        cpp: `// Common Searching Mistakes to Avoid — C++

// 1. OVERFLOW in mid calculation
int mid_WRONG = (low + high) / 2;       // BUG: overflow if large!
int mid_RIGHT = low + (high - low) / 2; // CORRECT always ✓

// 2. Wrong condition: should be <= not <
while (low <= high) { /* correct */ }
while (low < high)  { /* misses single element! */ }

// 3. Off-by-one in rotated array
// Always handle arr[lo]<=arr[mid] (not <) for duplicates

// 4. Binary search on unsorted array → WRONG RESULTS
// Always verify sorted before calling binary search!

// 5. Count occurrences correctly
int count = lastOccurrence(arr, n, key) -
            firstOccurrence(arr, n, key) + 1;
// Handle case where key not present: firstOccurrence returns -1

// Use STL for reliability:
#include <algorithm>
auto lo = lower_bound(v.begin(), v.end(), key);
auto hi = upper_bound(v.begin(), v.end(), key);
int cnt = hi - lo;  // count of occurrences`,
        python: `# Quick Reference — Python

import bisect

# Binary search using bisect (standard library)
def bs_find(arr, key):
    i = bisect.bisect_left(arr, key)
    return i if i < len(arr) and arr[i] == key else -1

# First occurrence
def first_occ(arr, key):
    i = bisect.bisect_left(arr, key)
    return i if i < len(arr) and arr[i] == key else -1

# Last occurrence
def last_occ(arr, key):
    i = bisect.bisect_right(arr, key) - 1
    return i if i >= 0 and arr[i] == key else -1

# Count occurrences — O(log n)
def count_occ(arr, key):
    return bisect.bisect_right(arr,key) - bisect.bisect_left(arr,key)

# Common mistakes:
# ✗ binary search on unsorted list → wrong results
# ✗ list.index(x) on large list → O(n) linear scan
# ✓ bisect for O(log n) on sorted list
# ✓ set/dict for O(1) membership test`,
        practice: [
          { name: "Binary Search (LeetCode 704)", diff: "easy" },
          { name: "Aggressive Cows (Binary Search on Answer)", diff: "hard" },
          { name: "Koko Eating Bananas (Binary Search on Answer)", diff: "medium" },
          { name: "Median of Two Sorted Arrays", diff: "hard" },
          { name: "Find Minimum in Rotated Sorted Array", diff: "medium" }
        ]
      }
    }
  },
  Hashing: {
    icon: "#️⃣", diff: "medium",
    desc: "O(1) average insert/search/delete. Hash functions, collision handling, and the backbone of frequency counting.",
    subtopics: {
      "Basics & Hash Functions": {
        diff: "easy",
        explanation: "Hashing is a technique to store and retrieve data efficiently using a hash function. A hash function converts a key into an index in an array. Instead of linear O(n) search or tree O(log n) search, hashing gives average O(1) for insert, search, and delete. Key terms: Hash Function — maps key to index (e.g. h(key) = key % tableSize). Hash Table — array where data is stored at hashed indices. Collision — two different keys map to the same index (h(23)=3 and h(33)=3 both give index 3). Load Factor — (number of elements) / (table size). Measures how full the table is. Rehashing — when load factor exceeds a threshold (~0.7), create a larger table and reinsert all elements.",
        intuition: "Think of hashing like a gym locker system. Each locker has a number (index). You store your item based on a rule (hash function). Instead of checking every locker, you jump directly to the right one. Problem: what if two people get the same locker number? That's a collision — you need a strategy to handle it. Perfect hashing = no collisions, every key gets its own locker.",
        steps: [
          "HASH FUNCTION: h(key) = key % tableSize. Maps any key to an index in [0, tableSize-1].",
          "INSERTION: compute index = h(key). If slot is empty → store. If occupied → collision → resolve.",
          "SEARCH: compute index = h(key). Check element at that index. If match → found. If not → follow collision chain.",
          "DELETION: find element → remove. In open addressing, must mark as 'deleted' (not empty) to not break search chains.",
          "LOAD FACTOR = n/m where n=elements, m=table size. Keep load factor < 0.7 for good performance.",
          "REHASHING: when load factor exceeds threshold, create table of size ~2m, recompute all hashes and reinsert. O(n) but rare."
        ],
        dryRun: `Hash Function: h(key) = key % 10, table size = 10

INSERT 10: h(10)=0  → table[0]=10
INSERT 25: h(25)=5  → table[5]=25
INSERT 37: h(37)=7  → table[7]=37
INSERT 23: h(23)=3  → table[3]=23
INSERT 33: h(33)=3  → table[3] already has 23! → COLLISION

Table after inserts (no collision handling shown):
Index: 0  1  2  3  4  5  6  7  8  9
Data: [10][ ][ ][23][ ][25][ ][37][ ][ ]

SEARCH for 25:
  h(25)=5 → check table[5]=25 → FOUND in O(1) ✓

SEARCH for 99:
  h(99)=9 → check table[9]=empty → NOT FOUND O(1) ✓

Load Factor after 4 inserts in size-10 table:
  LF = 4/10 = 0.4 → acceptable ✓
  LF > 0.7 → trigger rehashing!`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(n) all collide" },
        space: "O(n)",
        stable: undefined,
        when: "Use hashing for: O(1) average lookup (Two Sum, frequency count), detecting duplicates, grouping (anagrams), caches, symbol tables. Avoid when: ordered iteration needed (use map/BST instead).",
        pros: [
          "O(1) average insert, search, delete — fastest possible",
          "Works with any key type (strings, ints, pairs with custom hash)",
          "Backbone of frequency counting — most common interview pattern"
        ],
        cons: [
          "Worst case O(n) when all keys collide (poor hash function)",
          "No ordering — cannot iterate in sorted order",
          "Extra O(n) space for table",
          "Rehashing is O(n) — occasional spike in operation time"
        ],
        cpp: `// Hash Basics — C++

// Simple hash function
int hashFunction(int key, int tableSize) {
    return key % tableSize;  // division method
}

// STL unordered_map — automatic hashing, O(1) avg
#include <unordered_map>
unordered_map<int, int> mp;
mp[1] = 10;           // insert — O(1)
mp[2] = 20;
cout << mp[1];        // access — O(1)
mp.erase(1);          // delete — O(1)
bool found = mp.find(2) != mp.end(); // search — O(1)

// STL unordered_set — unique keys only
#include <unordered_set>
unordered_set<int> st;
st.insert(5);
bool has5 = st.count(5);  // O(1)

// ordered map (BST-based, O(log n))
#include <map>
map<int,int> ordered;  // keys always sorted, O(log n) ops`,
        python: `# Hash Basics — Python

# Python dict is a hash map — O(1) average
mp = {}
mp[1] = 10      # insert
mp[2] = 20
print(mp[1])    # access — O(1)
del mp[1]       # delete — O(1)
if 2 in mp:     # search — O(1)
    print("Found")

# Python set is a hash set
st = set()
st.add(5)
st.add(5)       # duplicates ignored
print(5 in st)  # O(1)

# Build simple hash table manually
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # chaining

    def _hash(self, key):
        return key % self.size

    def insert(self, key):
        self.table[self._hash(key)].append(key)

    def search(self, key):
        return key in self.table[self._hash(key)]`,
        practice: [
          { name: "Design HashMap (LeetCode 706)", diff: "easy" },
          { name: "Design HashSet (LeetCode 705)", diff: "easy" },
          { name: "Find Frequency of Array Elements", diff: "easy" }
        ]
      },
      "Collision Handling": {
        diff: "medium",
        explanation: "Collisions are inevitable — two keys hash to the same index. Two families of solutions: (1) Separate Chaining — each index stores a linked list (or vector). All keys that hash to the same index are chained together. O(1) average insert, O(n/m) search where m=table size. Simple and handles high load factors well. (2) Open Addressing — all elements stored inside the array itself. On collision, probe for next empty slot. Three probing strategies: (a) Linear Probing: index = (h(key)+i)%size. Simple but causes primary clustering. (b) Quadratic Probing: index = (h(key)+i²)%size. Reduces clustering. (c) Double Hashing: index = (h1(key)+i×h2(key))%size. Best distribution, no clustering.",
        intuition: "Separate chaining: each bucket is a list — overflow vertically. Open addressing: no extra structure — overflow horizontally (probe other slots). Linear probing is cache-friendly but clusters. Quadratic spreads out. Double hashing is most uniform. Deletion in open addressing is tricky — you must mark deleted slots as 'tombstone' not 'empty', or subsequent searches will stop too early.",
        steps: [
          "SEPARATE CHAINING INSERT: h(key)=idx. table[idx].push_back(key). Always O(1).",
          "SEPARATE CHAINING SEARCH: h(key)=idx. Scan linked list at table[idx]. O(1) avg, O(n) worst.",
          "LINEAR PROBING INSERT: idx=(h(key)+i)%size for i=0,1,2... until empty slot found.",
          "LINEAR PROBING SEARCH: probe same sequence until key found or empty slot (not tombstone).",
          "QUADRATIC PROBING: idx=(h(key)+i²)%size. Better spread than linear.",
          "DOUBLE HASHING: h2(key) = prime - (key % prime). idx=(h1(key)+i×h2(key))%size. Most uniform.",
          "DELETION in open addressing: mark slot as DELETED (tombstone), not EMPTY — or searches break."
        ],
        dryRun: `── SEPARATE CHAINING: insert 10,20,30 in size-10 table ──
h(10)=0: table[0]→[10]
h(20)=0: table[0]→[10→20]   (chained, both at index 0)
h(30)=0: table[0]→[10→20→30]

Search 20: h(20)=0 → scan list [10→20] → found ✓ O(2)

── LINEAR PROBING: insert 10,20,30 in size-10 table ────
h(10)=0: table[0]=10 ✓
h(20)=0: table[0] taken! → try table[1]=20 ✓
h(30)=0: table[0] taken! → try table[1] taken! → table[2]=30 ✓

Table: [10,20,30,_,_,_,_,_,_,_]

Search 30: h(30)=0 → table[0]=10≠30 → table[1]=20≠30 → table[2]=30 ✓

DELETE 20 (linear probing):
  Set table[1] = TOMBSTONE (not EMPTY!)
  Search 30 later: probe 0→10, 1→TOMBSTONE(continue!), 2→30 ✓
  If we set EMPTY: search 30 would stop at 1 → WRONG ✗

── DOUBLE HASHING: h1(key)=key%7, h2(key)=5-(key%5) ───
Insert 3:  h1(3)=3 → table[3]=3
Insert 10: h1(10)=3 → collision!
  i=1: (3 + 1×h2(10))%7 = (3+1×5)%7 = 8%7=1 → table[1]=10 ✓`,
        time: { best: "O(1)", avg: "O(1)", worst: "O(n)" },
        space: "O(n) chaining + chain overhead / O(m) open addressing",
        stable: undefined,
        when: "Separate chaining: when load factor can exceed 1, simpler deletion. Open addressing: when memory locality matters, no extra pointers. Double hashing: when uniform distribution critical.",
        pros: [
          "Chaining: handles load factor > 1, simple deletion, no primary clustering",
          "Linear probing: cache-friendly, all data in one array",
          "Double hashing: best distribution, minimises collision chains"
        ],
        cons: [
          "Chaining: extra memory for pointers/list nodes",
          "Linear probing: primary clustering — long runs of filled slots",
          "Open addressing: deletion needs tombstones — complicates logic",
          "Quadratic probing: may not probe all slots (not always finds empty slot)"
        ],
        cpp: `// Collision Handling — C++

// 1. Separate Chaining
#include <list>
class HashTableChaining {
    int size;
    vector<list<int>> table;
public:
    HashTableChaining(int s): size(s), table(s) {}

    int hashFn(int key) { return key % size; }

    void insert(int key) {
        table[hashFn(key)].push_back(key);  // O(1)
    }
    bool search(int key) {
        for (int x : table[hashFn(key)])
            if (x == key) return true;
        return false;
    }
    void remove(int key) {
        table[hashFn(key)].remove(key);     // O(chain length)
    }
};

// 2. Linear Probing
class HashTableLinear {
    int size;
    vector<int> table;
    vector<bool> deleted;
    const int EMPTY = -1;
public:
    HashTableLinear(int s): size(s), table(s,EMPTY), deleted(s,false) {}

    void insert(int key) {
        int idx = key % size;
        while (table[idx] != EMPTY && !deleted[idx])
            idx = (idx + 1) % size;  // linear probe
        table[idx] = key; deleted[idx] = false;
    }
    bool search(int key) {
        int idx = key % size, start = idx;
        while (table[idx] != EMPTY || deleted[idx]) {
            if (!deleted[idx] && table[idx] == key) return true;
            idx = (idx + 1) % size;
            if (idx == start) break;
        }
        return false;
    }
};`,
        python: `# Collision Handling — Python

# 1. Separate Chaining
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key): return key % self.size

    def insert(self, key):
        self.table[self._hash(key)].append(key)    # O(1)

    def search(self, key):
        return key in self.table[self._hash(key)]  # O(chain len)

    def remove(self, key):
        bucket = self.table[self._hash(key)]
        if key in bucket: bucket.remove(key)

# 2. Linear Probing
class HashTableLinear:
    EMPTY, DELETED = None, "DELETED"

    def __init__(self, size=10):
        self.size = size
        self.table = [self.EMPTY] * size

    def _hash(self, key): return key % self.size

    def insert(self, key):
        idx = self._hash(key)
        while self.table[idx] not in (self.EMPTY, self.DELETED):
            idx = (idx + 1) % self.size
        self.table[idx] = key

    def search(self, key):
        idx = self._hash(key)
        while self.table[idx] is not self.EMPTY:
            if self.table[idx] == key: return True
            idx = (idx + 1) % self.size
        return False

    def delete(self, key):
        idx = self._hash(key)
        while self.table[idx] is not self.EMPTY:
            if self.table[idx] == key:
                self.table[idx] = self.DELETED  # tombstone!
                return
            idx = (idx + 1) % self.size`,
        practice: [
          { name: "Design HashMap (Chaining implementation)", diff: "easy" },
          { name: "Find if Array has Duplicates (O(n) hashing)", diff: "easy" },
          { name: "Check if Two Strings are Anagrams", diff: "easy" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Five hashing patterns solve the majority of interview problems: (1) Frequency Counting — count occurrences of elements using a hash map in O(n). (2) Two Sum Pattern — for each element x, store it; check if (target-x) already in map. O(n). (3) Prefix Sum + Hashing — find subarrays with sum=k by storing prefix sums; count[prefixSum-k] gives number of valid subarrays. (4) Hash Set for Uniqueness — detect duplicates or find unique elements in O(n). (5) Sliding Window + HashMap — track character frequencies in window; shrink/expand based on map.",
        intuition: "Two Sum key insight: instead of checking all pairs O(n²), for each element ask 'have I seen the complement?' — O(1) lookup makes the whole thing O(n). Prefix sum + hashing: if prefixSum[j]-prefixSum[i]=k, then subarray [i+1..j] has sum k. Store prefix sums as keys, count how many times each has appeared. This converts O(n²) to O(n).",
        steps: [
          "FREQUENCY COUNT: for x in arr: freq[x]++. Query freq[x] in O(1). Find most frequent, first unique, etc.",
          "TWO SUM: for each x: if (target-x) in seen → return pair. Else add x to seen. O(n).",
          "SUBARRAY SUM K: maintain running prefix sum. At each index: if (prefix-k) in count → add count[prefix-k] to answer. count[prefix]++.",
          "DETECT DUPLICATE: add elements to set. If element already in set → duplicate found. O(n) time, O(n) space.",
          "GROUP ANAGRAMS: sort each string → use as hash key. All anagrams share same sorted key.",
          "LONGEST NO-REPEAT: sliding window + map of last seen index. If char seen and index >= left: move left. Update right = max of stored index+1."
        ],
        dryRun: `── TWO SUM: [2,7,11,15], target=9 ──────────────────────
seen = {}
x=2: target-x=7, 7 in seen? No → seen={2:0}
x=7: target-x=2, 2 in seen? YES → return [seen[2],1]=[0,1] ✓
O(n) total, O(n) space

── SUBARRAY SUM K=3: [1,1,1] ───────────────────────────
count={0:1}, prefix=0, ans=0
i=0: prefix=1, prefix-k=1-3=-2, -2 in count? No → count={0:1,1:1}
i=1: prefix=2, prefix-k=2-3=-1, -1 in count? No → count={0:1,1:1,2:1}
i=2: prefix=3, prefix-k=3-3=0, 0 in count? YES! ans+=count[0]=1
                                                  count={0:1,1:1,2:1,3:1}
Answer: 2... wait, prefix=3 again checks prefix=3 vs 3:
Recalculate: subarrays [1,1,1],[1,1],[1,1] → ans=2 ✓

── FREQUENCY COUNT: [4,4,1,2,4,2] ─────────────────────
freq={4:3, 1:1, 2:2}
First non-repeating? scan in order: 1 (freq=1) ✓
Most frequent? 4 (freq=3) ✓
Has duplicate? freq[4]=3>1 → YES ✓`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n²) collisions" },
        space: "O(n)",
        stable: undefined,
        when: "Frequency count: any counting problem. Two Sum: pair/triplet problems. Prefix+hash: subarray sum problems. Set: duplicate detection. Anagram grouping: sorting+hash key.",
        pros: [
          "Converts O(n²) brute force to O(n) for most problems",
          "Frequency count is the single most used pattern in interviews",
          "Prefix sum + hashing handles all subarray sum variants"
        ],
        cons: [
          "Extra O(n) space for hash map",
          "Worst case O(n) per operation with poor hash/many collisions",
          "Prefix sum hashing can be tricky to get right (initialize count[0]=1)"
        ],
        cpp: `// Important Hashing Patterns — C++

// 1. Frequency Count
unordered_map<int,int> freq;
for (int x : arr) freq[x]++;
// Query: freq[x] → count of x

// 2. Two Sum — O(n)
vector<int> twoSum(vector<int>& arr, int target) {
    unordered_map<int,int> seen; // val → index
    for (int i = 0; i < arr.size(); i++) {
        int comp = target - arr[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[arr[i]] = i;
    }
    return {};
}

// 3. Subarray Sum Equals K — O(n)
int subarraySum(vector<int>& arr, int k) {
    unordered_map<int,int> count = {{0, 1}}; // prefix=0 seen once
    int prefix = 0, ans = 0;
    for (int x : arr) {
        prefix += x;
        ans += count[prefix - k]; // how many prev prefixes match
        count[prefix]++;
    }
    return ans;
}

// 4. Group Anagrams — O(nm log m)
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> mp;
    for (string& s : strs) {
        string key = s; sort(key.begin(), key.end());
        mp[key].push_back(s);
    }
    vector<vector<string>> res;
    for (auto& [k,v] : mp) res.push_back(v);
    return res;
}

// 5. First Non-Repeating Character
char firstUnique(string s) {
    unordered_map<char,int> freq;
    for (char c : s) freq[c]++;
    for (char c : s) if (freq[c]==1) return c;
    return '#';
}`,
        python: `# Important Hashing Patterns — Python
from collections import defaultdict, Counter

# 1. Frequency Count — O(n)
arr = [4,4,1,2,4,2]
freq = Counter(arr)   # {4:3, 1:1, 2:2}
# or: freq = defaultdict(int); for x in arr: freq[x]+=1

# 2. Two Sum — O(n)
def two_sum(arr, target):
    seen = {}   # val → index
    for i, x in enumerate(arr):
        comp = target - x
        if comp in seen: return [seen[comp], i]
        seen[x] = i
    return []

# 3. Subarray Sum Equals K — O(n)
def subarray_sum_k(arr, k):
    count = {0: 1}   # IMPORTANT: initialize with 0:1
    prefix = ans = 0
    for x in arr:
        prefix += x
        ans += count.get(prefix - k, 0)
        count[prefix] = count.get(prefix, 0) + 1
    return ans

# 4. Detect Duplicates — O(n)
def has_duplicate(arr):
    return len(arr) != len(set(arr))

# 5. Top K Frequent Elements
def top_k(arr, k):
    freq = Counter(arr)
    return [x for x, _ in freq.most_common(k)]

# 6. Longest Substring Without Repeating Characters
def longest_no_repeat(s):
    last = {}; l = res = 0
    for r, c in enumerate(s):
        if c in last and last[c] >= l: l = last[c] + 1
        last[c] = r; res = max(res, r - l + 1)
    return res`,
        practice: [
          { name: "Two Sum", diff: "easy" },
          { name: "Subarray Sum Equals K", diff: "medium" },
          { name: "Group Anagrams", diff: "medium" },
          { name: "Top K Frequent Elements", diff: "medium" },
          { name: "Longest Substring Without Repeating Characters", diff: "medium" },
          { name: "First Non-Repeating Character", diff: "easy" }
        ]
      },
      "Complexity & Applications": {
        diff: "easy",
        explanation: "All hash table operations are O(1) average, O(n) worst case. Worst case happens when all keys collide (same hash index) — the hash table degenerates to a linked list. Good hash functions and load factor control keep average case O(1). Space is O(n). Key comparisons: Hashing vs Array — array is index-based O(1), hashing is key-based O(1) average but with collision risk. Hashing vs Tree (BST/map) — hashing O(1) average but unordered; tree O(log n) but maintains sorted order. In C++: unordered_map uses hashing (O(1) avg), map uses red-black tree (O(log n), ordered).",
        intuition: "The worst case O(n) for hashing sounds scary but is extremely rare with a good hash function. In practice, unordered_map is faster than map for most workloads. Use map only when you need sorted iteration or range queries. Rolling hash (Rabin-Karp) extends hashing to substrings — enables O(1) substring comparison, used in plagiarism detection and pattern matching.",
        steps: [
          "Insert: O(1) average. Compute hash, store at index (or chain).",
          "Search: O(1) average. Compute hash, check index (or scan chain).",
          "Delete: O(1) average. Find and remove from chain or mark tombstone.",
          "Worst case O(n): all n elements hash to same index — chain of length n.",
          "Load factor > 0.7 → rehash to table of size 2m → O(n) but rare. Amortised O(1).",
          "Python dict and C++ unordered_map: well-tuned hash tables with O(1) average for all ops."
        ],
        dryRun: `Operation Complexity:
Operation | Average | Worst  | Notes
──────────┼─────────┼────────┼───────────────────────
Insert    | O(1)    | O(n)   | All keys collide → chain
Search    | O(1)    | O(n)   | Must scan full chain
Delete    | O(1)    | O(n)   | Chaining or tombstone
Space     | O(n)    | O(n)   | Table + chains

Hashing vs Other Structures:
Structure    | Insert   | Search   | Delete   | Ordered?
─────────────┼──────────┼──────────┼──────────┼─────────
Hash Table   | O(1) avg | O(1) avg | O(1) avg | No
BST/map      | O(log n) | O(log n) | O(log n) | YES
Array        | O(1)*    | O(n)     | O(n)     | No
Sorted Array | O(n)     | O(log n) | O(n)     | YES

C++ map vs unordered_map:
unordered_map: hashing → O(1) avg, keys unordered
map:           red-black tree → O(log n), keys sorted

Python dict vs sorted:
dict:   O(1) avg all ops, Python 3.7+ preserves insertion order
sorted: O(n log n) to build, O(log n) search with bisect

Real-world uses:
  ✓ Password hashing (bcrypt, SHA)
  ✓ Database indexing (hash indexes)
  ✓ Caches (Redis, Memcached)
  ✓ Compilers (symbol tables)
  ✓ URL shorteners (hash → short code)
  ✓ Blockchain (cryptographic hashing)`,
        time: { best: "O(1) all ops", avg: "O(1) all ops", worst: "O(n) all collide" },
        space: "O(n)",
        stable: undefined,
        when: "Use hashing when O(1) lookup is needed and order doesn't matter. Use ordered map when sorted iteration or range queries required. Build frequency tables, deduplication sets, and complement lookups with hashing.",
        pros: [
          "O(1) average — fastest possible for insert/search/delete",
          "Python dict and C++ unordered_map are production-ready, well-tuned",
          "Extremely versatile — from frequency counting to LRU cache"
        ],
        cons: [
          "O(n) worst case — poor hash function or adversarial input",
          "No ordering — can't do range queries or sorted traversal",
          "Extra O(n) space — sometimes not acceptable"
        ],
        cpp: `// Hashing Applications — C++
#include <unordered_map>
#include <unordered_set>

// 1. Check if array has duplicates — O(n)
bool hasDuplicate(vector<int>& arr) {
    unordered_set<int> seen;
    for (int x : arr) {
        if (seen.count(x)) return true;
        seen.insert(x);
    }
    return false;
}

// 2. Intersection of two arrays — O(n+m)
vector<int> intersection(vector<int>& a, vector<int>& b) {
    unordered_set<int> setA(a.begin(), a.end());
    vector<int> res;
    for (int x : b)
        if (setA.count(x)) { res.push_back(x); setA.erase(x); }
    return res;
}

// 3. Custom hash for pairs (needed in C++)
struct PairHash {
    size_t operator()(const pair<int,int>& p) const {
        return hash<int>()(p.first) ^ (hash<int>()(p.second) << 16);
    }
};
unordered_map<pair<int,int>, int, PairHash> pairMap;

// 4. Rolling Hash (Rabin-Karp style)
long long rollingHash(string& s, int l, int r, long long base=31, long long mod=1e9+7) {
    long long h = 0, pw = 1;
    for (int i = l; i <= r; i++) {
        h = (h + (s[i]-'a'+1) * pw) % mod;
        pw = pw * base % mod;
    }
    return h;
}`,
        python: `# Hashing Applications — Python
from collections import defaultdict, Counter

# 1. Find all duplicates — O(n)
def find_duplicates(arr):
    freq = Counter(arr)
    return [x for x, c in freq.items() if c > 1]

# 2. Intersection of two arrays — O(n+m)
def intersection(a, b):
    set_a = set(a)
    return list(set(x for x in b if x in set_a))

# 3. LRU Cache (using OrderedDict) — O(1) all ops
from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)  # mark as recently used
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)  # remove LRU

# 4. Frequency count pattern
arr = [3,1,4,1,5,9,2,6,5,3,5]
freq = Counter(arr)
print(freq.most_common(2))  # [(5,3),(1,2)] — top 2 frequent`,
        practice: [
          { name: "Contains Duplicate", diff: "easy" },
          { name: "Intersection of Two Arrays", diff: "easy" },
          { name: "LRU Cache (LeetCode 146)", diff: "medium" },
          { name: "Find All Anagrams in a String", diff: "medium" },
          { name: "Longest Consecutive Sequence", diff: "medium" }
        ]
      }
    }
  },
  Trees: {
    icon: "🌳", diff: "medium",
    desc: "Hierarchical non-linear structure. Traversals, height, diameter, LCA — top 3 interview topic.",
    subtopics: {
      "Basics & Terminology": {
        diff: "easy",
        explanation: "A tree is a non-linear data structure used to represent hierarchical relationships. Unlike arrays or linked lists (linear), trees branch out like an inverted tree. A tree consists of nodes connected by edges. Key terms: Root — topmost node, no parent. Edge — connection between two nodes. Parent — node that has children. Child — node derived from a parent. Leaf — node with no children (degree 0). Subtree — tree formed from any node and all its descendants. Depth — number of edges from root to a node. Height — longest path from a node down to a leaf. Degree — number of children of a node. Binary Tree — each node has at most 2 children (left and right).",
        intuition: "Think of trees like an organization hierarchy (CEO → Managers → Employees), a family tree, or a folder structure (folders inside folders). You move top-down from root to leaves (searching) or bottom-up from leaves to root (computing heights, sizes). The key advantage over linear structures: O(log n) operations on balanced trees vs O(n) for arrays/linked lists.",
        steps: [
          "ROOT: single topmost node. Depth=0. Has no parent.",
          "LEAF: node with no children. Depth can be any value. Height=0.",
          "HEIGHT of node: max(height(left), height(right)) + 1. Height of leaf=0. Height of null=-1.",
          "DEPTH of node: distance from root. Root has depth 0.",
          "DEGREE: number of children. In binary tree: 0 (leaf), 1, or 2.",
          "SIZE: total number of nodes. size(node) = 1 + size(left) + size(right).",
          "For a binary tree with n nodes: height is between log₂n (balanced) and n-1 (skewed)."
        ],
        dryRun: `        1          ← root (depth=0, height=3)
       / \\
      2   3        ← depth=1
     / \\
    4   5          ← depth=2
   /
  8               ← leaf (depth=3, height=0)

Node 1: degree=2, height=3, depth=0
Node 2: degree=2, height=2, depth=1
Node 3: degree=0 (LEAF), height=0, depth=1
Node 4: degree=1, height=1, depth=2
Node 5: degree=0 (LEAF), height=0, depth=2
Node 8: degree=0 (LEAF), height=0, depth=3

Height of tree = height of root = 3
Total nodes = 6
Leaves = {3, 5, 8}

Height formula (recursive):
  h(8)=0, h(null)=-1
  h(4)=max(-1,0)+1=1
  h(5)=0
  h(2)=max(1,0)+1=2
  h(3)=0
  h(1)=max(2,0)+1=3 ✓`,
        time: { best: "O(1) root access", avg: "O(n) traversal", worst: "O(n) traversal" },
        space: "O(n) nodes / O(h) stack",
        stable: undefined,
        when: "Use trees for hierarchical data: file systems, org charts, expression parsing, network routing. Binary trees for sorted data (BST), priority access (heap), and string problems (trie).",
        pros: [
          "O(log n) operations on balanced trees",
          "Natural representation for hierarchical data",
          "Foundation for heaps, tries, segment trees, AVL trees"
        ],
        cons: [
          "O(n) on unbalanced/skewed trees (degenerates to linked list)",
          "No O(1) random access by index",
          "More complex to implement than arrays or linked lists"
        ],
        cpp: `// Binary Tree Node — C++
struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Build a simple tree
Node* root = new Node(1);
root->left  = new Node(2);
root->right = new Node(3);
root->left->left  = new Node(4);
root->left->right = new Node(5);

// Height of tree — O(n)
int height(Node* root) {
    if (!root) return -1;  // null has height -1
    return 1 + max(height(root->left), height(root->right));
}

// Size (count nodes) — O(n)
int size(Node* root) {
    if (!root) return 0;
    return 1 + size(root->left) + size(root->right);
}

// Count leaves — O(n)
int countLeaves(Node* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1; // leaf
    return countLeaves(root->left) + countLeaves(root->right);
}`,
        python: `# Binary Tree Node — Python
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

# Build a simple tree
root = Node(1)
root.left  = Node(2)
root.right = Node(3)
root.left.left  = Node(4)
root.left.right = Node(5)

# Height — O(n)
def height(root):
    if not root: return -1  # null = -1
    return 1 + max(height(root.left), height(root.right))

# Size — O(n)
def size(root):
    if not root: return 0
    return 1 + size(root.left) + size(root.right)

# Count leaves — O(n)
def count_leaves(root):
    if not root: return 0
    if not root.left and not root.right: return 1
    return count_leaves(root.left) + count_leaves(root.right)`,
        practice: [
          { name: "Maximum Depth of Binary Tree", diff: "easy" },
          { name: "Count Nodes in Complete Binary Tree", diff: "medium" },
          { name: "Symmetric Tree", diff: "easy" }
        ]
      },
      "Types of Trees": {
        diff: "easy",
        explanation: "Seven key tree types: (1) Full Binary Tree — every node has 0 or 2 children (never 1). (2) Complete Binary Tree — all levels filled except possibly the last, which is filled left to right. Heaps use this. (3) Perfect Binary Tree — all internal nodes have 2 children, all leaves at same level. n = 2^(h+1)-1 nodes. (4) Balanced Binary Tree — height is O(log n). AVL, Red-Black trees are balanced. (5) Binary Search Tree (BST) — left subtree < node < right subtree. O(log n) average search. (6) Degenerate/Skewed Tree — every node has only one child. Degenerates to linked list. O(n) operations. (7) N-ary Tree — nodes can have more than 2 children (e.g. file system folders).",
        intuition: "Complete binary tree is what a heap looks like — filled level by level left to right, so it can be stored in an array (parent at i, children at 2i+1 and 2i+2). Perfect binary tree is the ideal — all nodes used. Balanced = guarantee of O(log n). Skewed = worst case = O(n). Most interview problems assume balanced unless stated otherwise.",
        steps: [
          "FULL: leaf nodes=internal nodes+1. n nodes → (n+1)/2 leaves.",
          "COMPLETE: n nodes → height = floor(log₂n). Can be stored in array of size n.",
          "PERFECT: h levels → 2^h-1 internal nodes + 2^h leaves = 2^(h+1)-1 total nodes.",
          "BALANCED: |height(left)-height(right)| ≤ 1 for every node. Self-check recursively.",
          "BST: inorder traversal gives sorted sequence. Left < root < right at every node.",
          "SKEWED: all nodes on one side. Height=n-1. BST on sorted input → skewed!",
          "AVL/Red-Black: self-balancing BSTs that maintain O(log n) after every insert/delete."
        ],
        dryRun: `FULL binary tree:
    1
   / \\
  2   3
 / \\
4   5
Every node has 0 or 2 children ✓ (node 3 has 0, others have 2)

COMPLETE binary tree (can store in array):
    1         index 0
   / \\
  2   3       index 1,2
 / \\ /
4  5 6        index 3,4,5
parent(i)=(i-1)/2, left=2i+1, right=2i+2

PERFECT binary tree (h=2):
    1
   / \\
  2   3
 /\\ /\\
4 5 6 7
n=7=2³-1 ✓, leaves=4=2²

SKEWED (worst BST on sorted input [1,2,3,4]):
1
 \\
  2
   \\
    3
     \\
      4   ← height=3, O(n) search ✗`,
        time: { best: "O(log n) balanced", avg: "O(log n) balanced", worst: "O(n) skewed" },
        space: "O(n)",
        stable: undefined,
        when: "Complete binary tree → heaps. BST → sorted data lookups. Balanced BST (AVL/RB) → when ordered and guaranteed O(log n). Trie → string prefix problems.",
        pros: [
          "Complete/balanced: O(log n) guaranteed",
          "BST: inorder traversal gives sorted output free",
          "Perfect: maximum space efficiency"
        ],
        cons: [
          "Skewed BST: degrades to O(n) — always balance or use AVL/RB",
          "AVL/Red-Black: complex rotation logic",
          "N-ary trees: traversal more complex than binary"
        ],
        cpp: `// Tree Type Checks — C++

// Check if balanced — O(n)
int checkBalanced(Node* root) {
    if (!root) return 0;
    int lh = checkBalanced(root->left);
    if (lh == -1) return -1;
    int rh = checkBalanced(root->right);
    if (rh == -1) return -1;
    if (abs(lh - rh) > 1) return -1;  // unbalanced!
    return 1 + max(lh, rh);
}
bool isBalanced(Node* root) { return checkBalanced(root) != -1; }

// Check if Full Binary Tree
bool isFull(Node* root) {
    if (!root) return true;
    if (!root->left && !root->right) return true;  // leaf
    if (root->left && root->right)   // both children
        return isFull(root->left) && isFull(root->right);
    return false;  // exactly one child → not full
}

// Complete binary tree — can store in array
// parent at i → children at 2i+1, 2i+2
// child at i → parent at (i-1)/2`,
        python: `# Tree Type Checks — Python

# Check balanced — O(n)
def is_balanced(root):
    def check(node):
        if not node: return 0
        lh = check(node.left)
        if lh == -1: return -1
        rh = check(node.right)
        if rh == -1: return -1
        if abs(lh - rh) > 1: return -1
        return 1 + max(lh, rh)
    return check(root) != -1

# Check full binary tree
def is_full(root):
    if not root: return True
    if not root.left and not root.right: return True
    if root.left and root.right:
        return is_full(root.left) and is_full(root.right)
    return False  # one child → not full

# Check perfect — nodes = 2^(h+1) - 1
def is_perfect(root):
    h = height(root)
    n = size(root)
    return n == (2 ** (h+1)) - 1`,
        practice: [
          { name: "Check if Tree is Balanced", diff: "easy" },
          { name: "Check Completeness of Binary Tree", diff: "medium" },
          { name: "Check if Two Trees are Identical", diff: "easy" }
        ]
      },
      "Tree Traversals": {
        diff: "easy",
        explanation: "Four fundamental tree traversal methods: (1) Inorder (Left→Root→Right) — on a BST gives sorted ascending order. (2) Preorder (Root→Left→Right) — used to copy a tree or serialize it. (3) Postorder (Left→Right→Root) — used to delete a tree (children before parent) or evaluate expression trees. (4) Level Order (BFS) — traverse level by level using a queue. Used for level-based problems, finding minimum depth, zigzag traversal. All traversals are O(n) time and O(h) space for recursive (h=height), O(n) for level order.",
        intuition: "Mnemonic: In-Pre-Post refers to when the ROOT is visited relative to children. INorder: root IN the middle. PREorder: root FIRST. POSTorder: root LAST. Level order uses a queue — natural BFS. For a BST, inorder always gives sorted output — this is the most useful property of BSTs.",
        steps: [
          "INORDER (L→Root→R): recurse left, print root, recurse right. BST → sorted output.",
          "PREORDER (Root→L→R): print root, recurse left, recurse right. Serialization order.",
          "POSTORDER (L→R→Root): recurse left, recurse right, print root. Delete/evaluate order.",
          "LEVEL ORDER: enqueue root. While queue not empty: dequeue, process, enqueue left and right children.",
          "ITERATIVE INORDER: use explicit stack. Push nodes left while going down. Pop, process, go right.",
          "BASE CASE for all: if root==NULL, return immediately."
        ],
        dryRun: `Tree:      1
          / \\
         2   3
        / \\
       4   5

INORDER  (L,Root,R): 4 → 2 → 5 → 1 → 3
  Left(2)→Left(4)→[4]→back→[2]→Right(5)→[5]→back→Root[1]→Right(3)→[3]
  Result: 4 2 5 1 3

PREORDER (Root,L,R): 1 → 2 → 4 → 5 → 3
  Root[1]→Left→Root[2]→Left→[4]→Right→[5]→back→Right→[3]
  Result: 1 2 4 5 3

POSTORDER(L,R,Root): 4 → 5 → 2 → 3 → 1
  Left→Left→[4]→Right→[5]→Root[2]→Right→[3]→Root[1]
  Result: 4 5 2 3 1

LEVEL ORDER (BFS):
  Queue=[1]
  Dequeue 1 → print 1, enqueue 2,3 → Queue=[2,3]
  Dequeue 2 → print 2, enqueue 4,5 → Queue=[3,4,5]
  Dequeue 3 → print 3, no children → Queue=[4,5]
  Dequeue 4 → print 4 → Queue=[5]
  Dequeue 5 → print 5 → Queue=[]
  Result: 1 2 3 4 5`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(h) recursive / O(n) level order",
        stable: undefined,
        when: "Inorder: BST sorted output, validate BST. Preorder: serialize/copy tree. Postorder: delete tree, evaluate expression. Level order: find minimum depth, connect level nodes, zigzag traversal.",
        pros: [
          "All traversals O(n) — visit every node exactly once",
          "Inorder on BST gives sorted order for free",
          "Level order finds shortest path to any node from root"
        ],
        cons: [
          "Recursive traversals use O(h) stack — O(n) for skewed trees",
          "Iterative versions require explicit stack or queue — more code",
          "Morris traversal gives O(1) space but modifies tree temporarily"
        ],
        cpp: `// Tree Traversals — C++ (from notes)
#include <queue>

void inorder(Node* root) {     // L → Root → R
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void preorder(Node* root) {    // Root → L → R
    if (!root) return;
    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root) {   // L → R → Root
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

void levelOrder(Node* root) {  // BFS — level by level
    if (!root) return;
    queue<Node*> q;
    q.push(root);
    while (!q.empty()) {
        Node* node = q.front(); q.pop();
        cout << node->data << " ";
        if (node->left)  q.push(node->left);
        if (node->right) q.push(node->right);
    }
}

// Level order returning 2D vector (by level)
vector<vector<int>> levelOrderLevels(Node* root) {
    if (!root) return {};
    queue<Node*> q; q.push(root);
    vector<vector<int>> res;
    while (!q.empty()) {
        int sz = q.size(); vector<int> level;
        for (int i=0;i<sz;i++) {
            auto n=q.front();q.pop();
            level.push_back(n->data);
            if(n->left) q.push(n->left);
            if(n->right) q.push(n->right);
        }
        res.push_back(level);
    }
    return res;
}`,
        python: `# Tree Traversals — Python (from notes)
from collections import deque

def inorder(root):      # L → Root → R
    if not root: return
    inorder(root.left)
    print(root.data, end=" ")
    inorder(root.right)

def preorder(root):     # Root → L → R
    if not root: return
    print(root.data, end=" ")
    preorder(root.left)
    preorder(root.right)

def postorder(root):    # L → R → Root
    if not root: return
    postorder(root.left)
    postorder(root.right)
    print(root.data, end=" ")

def level_order(root):  # BFS
    if not root: return
    q = deque([root])
    while q:
        node = q.popleft()
        print(node.data, end=" ")
        if node.left:  q.append(node.left)
        if node.right: q.append(node.right)

# Level order returning list of levels
def level_order_levels(root):
    if not root: return []
    q, res = deque([root]), []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.data)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
        practice: [
          { name: "Binary Tree Inorder Traversal", diff: "easy" },
          { name: "Binary Tree Level Order Traversal", diff: "medium" },
          { name: "Binary Tree Zigzag Level Order", diff: "medium" },
          { name: "Binary Tree Right Side View", diff: "medium" }
        ]
      },
      "Important Problems": {
        diff: "medium",
        explanation: "Seven canonical tree problems every CS student must master: (1) Height/Diameter — diameter = max path through any node = left_height + right_height + 2. (2) Lowest Common Ancestor (LCA) — deepest node that is an ancestor of both given nodes. (3) Path Sum — does any root-to-leaf path sum equal target? (4) Invert Binary Tree — mirror the tree (swap left and right at every node). (5) Validate BST — check BST property using min/max bounds, not just local comparison. (6) Serialize/Deserialize — convert tree to string and back. (7) Kth Smallest in BST — inorder traversal gives sorted order; return kth element.",
        intuition: "Diameter trick: instead of computing max(leftDiameter, rightDiameter, leftH+rightH+2) separately, maintain a global max during height computation — single O(n) pass. LCA trick: if root equals p or q, root IS the LCA. If p and q are in different subtrees, root IS the LCA. Validate BST: passing min/max bounds down catches cases like [5,4,6,null,null,3,7] — the 3 passes local check (3<6) but violates global BST property.",
        steps: [
          "HEIGHT: h(null)=-1, h(node)=1+max(h(left),h(right)). O(n) recursive.",
          "DIAMETER: at each node, candidate=h(left)+h(right)+2. Track global max while computing heights. O(n).",
          "LCA: if root==null or root==p or root==q return root. Recurse left and right. If both non-null → root is LCA.",
          "INVERT: swap root.left and root.right. Recurse on both. O(n).",
          "VALIDATE BST: inorder(root,min=-∞,max=+∞). At each node: if node.val <= min or >= max → false. Recurse with updated bounds.",
          "PATH SUM: if leaf and sum==target → true. Else recurse left(target-val) or right(target-val).",
          "KTH SMALLEST: do inorder traversal, decrement k each visit. Return when k==0."
        ],
        dryRun: `── DIAMETER of tree ────────────────────────────────
Tree:     1
         / \\
        2   3
       / \\
      4   5

At node 4: h_left=-1, h_right=-1 → candidate=0
At node 5: h_left=-1, h_right=-1 → candidate=0
At node 2: h_left=0, h_right=0   → candidate=0+0+2=2, global_max=2
At node 3: h_left=-1,h_right=-1  → candidate=0
At node 1: h_left=1, h_right=0   → candidate=1+0+2=3, global_max=3 ✓
Diameter = 3 (path: 4→2→5 has length 2, but 4→2→1→3 has length 3)

── LCA of nodes 4 and 5 ────────────────────────────
lca(1,4,5): recurse left(2,4,5), recurse right(3,4,5)
  lca(2,4,5): recurse left(4,4,5)→return 4, recurse right(5,4,5)→return 5
    both non-null → return node 2 ← LCA ✓
  lca(3,4,5): left=null, right=null → return null
left=node2, right=null → return node2 ✓

── VALIDATE BST: [5,4,6,null,null,3,7] ─────────────
validate(5, -∞, +∞): 5 in range ✓
  validate(4, -∞, 5): 4 in range ✓
    left=null, right=null → true ✓
  validate(6, 5, +∞): 6 in range ✓
    validate(3, 5, +∞): 3 <= min(5) → FALSE ✗ ← caught!`,
        time: { best: "O(n)", avg: "O(n)", worst: "O(n)" },
        space: "O(h) recursive stack",
        stable: undefined,
        when: "These 7 problems are the core of tree interviews. Master them in order — height → diameter → LCA → path sum → invert → validate BST → serialize.",
        pros: [
          "Most problems are elegant O(n) recursive solutions",
          "Global variable trick converts O(n²) diameter to O(n)",
          "LCA has O(log n) solution for BST, O(n) for general binary tree"
        ],
        cons: [
          "Validate BST with local comparison is a classic bug — must use bounds",
          "Serialize/Deserialize has multiple approaches (preorder, level order)",
          "Diameter and height must be tracked simultaneously for O(n)"
        ],
        cpp: `// Important Tree Problems — C++

// 1. Diameter — O(n) with global max trick
int diamGlobal = 0;
int diamHelper(Node* root) {
    if (!root) return -1;
    int lh = diamHelper(root->left);
    int rh = diamHelper(root->right);
    diamGlobal = max(diamGlobal, lh + rh + 2); // update diameter
    return 1 + max(lh, rh);                    // return height
}

// 2. Lowest Common Ancestor — O(n)
Node* lca(Node* root, Node* p, Node* q) {
    if (!root || root==p || root==q) return root;
    Node* left  = lca(root->left, p, q);
    Node* right = lca(root->right, p, q);
    if (left && right) return root; // p and q in diff subtrees
    return left ? left : right;
}

// 3. Validate BST — O(n) with bounds
bool isValidBST(Node* root, long mn=LLONG_MIN, long mx=LLONG_MAX) {
    if (!root) return true;
    if (root->data <= mn || root->data >= mx) return false;
    return isValidBST(root->left, mn, root->data) &&
           isValidBST(root->right, root->data, mx);
}

// 4. Invert Binary Tree — O(n)
Node* invert(Node* root) {
    if (!root) return nullptr;
    swap(root->left, root->right);
    invert(root->left);
    invert(root->right);
    return root;
}

// 5. Path Sum — O(n)
bool hasPathSum(Node* root, int target) {
    if (!root) return false;
    if (!root->left && !root->right) return root->data == target;
    return hasPathSum(root->left,  target - root->data) ||
           hasPathSum(root->right, target - root->data);
}`,
        python: `# Important Tree Problems — Python

# 1. Diameter — O(n)
def diameter(root):
    max_d = [0]
    def height(node):
        if not node: return -1
        lh = height(node.left)
        rh = height(node.right)
        max_d[0] = max(max_d[0], lh + rh + 2)
        return 1 + max(lh, rh)
    height(root)
    return max_d[0]

# 2. LCA — O(n)
def lca(root, p, q):
    if not root or root == p or root == q: return root
    left  = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right: return root  # p,q in diff subtrees
    return left or right

# 3. Validate BST — O(n) with bounds
def is_valid_bst(root, mn=float('-inf'), mx=float('inf')):
    if not root: return True
    if root.data <= mn or root.data >= mx: return False
    return (is_valid_bst(root.left, mn, root.data) and
            is_valid_bst(root.right, root.data, mx))

# 4. Invert Binary Tree — O(n)
def invert(root):
    if not root: return None
    root.left, root.right = root.right, root.left
    invert(root.left); invert(root.right)
    return root

# 5. Kth Smallest in BST — O(n)
def kth_smallest(root, k):
    stack, node = [], root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop(); k -= 1
        if k == 0: return node.data
        node = node.right`,
        practice: [
          { name: "Diameter of Binary Tree", diff: "easy" },
          { name: "Lowest Common Ancestor", diff: "medium" },
          { name: "Validate Binary Search Tree", diff: "medium" },
          { name: "Path Sum", diff: "easy" },
          { name: "Invert Binary Tree", diff: "easy" },
          { name: "Serialize and Deserialize Binary Tree", diff: "hard" }
        ]
      },
      "Complexity & Patterns": {
        diff: "easy",
        explanation: "Tree operation complexities depend on the height h. For a balanced tree h=O(log n); for a skewed tree h=O(n). Key patterns: (1) DFS recursion — most tree problems solved with recursive post-order (compute children first, then combine at root). (2) BFS with queue — level-order problems, shortest path from root. (3) Tree DP — compute some value at each node using left and right subtree results. (4) Path sum problems — track running sum from root. (5) Height-based problems — return both height and answer from same recursive call (diameter trick). (6) Divide and conquer — split problem at root, solve subtrees independently, combine.",
        intuition: "The divide-and-conquer pattern is the most powerful tree technique. For almost any tree problem: solve for left subtree, solve for right subtree, combine results at the current node. This naturally gives O(n) for most problems. The 'return multiple values' trick (return height AND answer together) avoids O(n²) repeated computations.",
        steps: [
          "TRAVERSAL: O(n) time, O(h) space. DFS uses call stack, BFS uses queue.",
          "BST operations (balanced): O(log n). BST operations (skewed): O(n).",
          "Always check: is root==NULL before accessing root->left or root->data.",
          "DFS PATTERN: base case → recurse left → recurse right → combine.",
          "BFS PATTERN: enqueue root → while queue: dequeue, process, enqueue children.",
          "TREE DP: solve subproblem at each node using subtree results. Return value upward."
        ],
        dryRun: `Complexity by tree type:
Operation  | Balanced BST | Skewed BST | General BT
───────────┼──────────────┼────────────┼───────────
Search     | O(log n)     | O(n)       | O(n)
Insert     | O(log n)     | O(n)       | O(n)
Delete     | O(log n)     | O(n)       | O(n)
Traversal  | O(n)         | O(n)       | O(n)
Height     | O(log n)     | O(n)       | O(n)
Space      | O(log n)     | O(n)       | O(n) stack

Pattern → Problem mapping:
  DFS post-order    → height, diameter, path sum
  DFS pre-order     → path problems, serialize
  DFS inorder       → BST sorted output, kth smallest
  BFS level order   → level-wise, min depth, right view
  Tree DP           → max path sum, rob houses on tree
  Divide & Conquer  → LCA, count nodes, validate BST

Common bug: validating BST only locally
  [5,4,6,null,null,3,7] — node 3 passes local check (3<6)
  but violates global BST property (3 < root=5) → INVALID
  Fix: pass min/max bounds down the tree ✓`,
        time: { best: "O(log n) balanced", avg: "O(n) general", worst: "O(n) skewed" },
        space: "O(h) stack / O(n) level order",
        stable: undefined,
        when: "DFS for most tree problems. BFS when level matters. Tree DP when combining subtree results. Always ensure tree is balanced for O(log n) — use AVL or Red-Black in practice.",
        pros: [
          "O(n) traversals cover most interview problems",
          "Recursive solutions are concise and elegant",
          "Tree DP extends dynamic programming to hierarchical structures"
        ],
        cons: [
          "Recursion stack overflow for very deep trees (use iterative for safety)",
          "Skewed trees destroy O(log n) guarantees — balance in production",
          "Tree problems require strong base case intuition"
        ],
        cpp: `// Tree Patterns — C++

// DFS post-order template (most common pattern)
int dfsPostorder(Node* root) {
    if (!root) return BASE_VALUE;    // base case
    int left  = dfsPostorder(root->left);   // solve left
    int right = dfsPostorder(root->right);  // solve right
    return combine(left, right, root->data); // combine
}

// Maximum Path Sum (classic Tree DP)
int maxPathGlobal = INT_MIN;
int maxPathHelper(Node* root) {
    if (!root) return 0;
    int l = max(0, maxPathHelper(root->left));   // ignore negatives
    int r = max(0, maxPathHelper(root->right));
    maxPathGlobal = max(maxPathGlobal, l + r + root->data);
    return root->data + max(l, r);  // return max single branch
}

// Serialize (preorder) — O(n)
string serialize(Node* root) {
    if (!root) return "#,";
    return to_string(root->data)+","+serialize(root->left)+serialize(root->right);
}

// BFS right side view
vector<int> rightSideView(Node* root) {
    if (!root) return {};
    queue<Node*> q; q.push(root);
    vector<int> res;
    while (!q.empty()) {
        int sz=q.size();
        for(int i=0;i<sz;i++){
            auto n=q.front();q.pop();
            if(i==sz-1) res.push_back(n->data); // rightmost
            if(n->left) q.push(n->left);
            if(n->right) q.push(n->right);
        }
    }
    return res;
}`,
        python: `# Tree Patterns — Python

# DFS post-order template
def dfs_postorder(root):
    if not root: return BASE_VALUE
    left  = dfs_postorder(root.left)
    right = dfs_postorder(root.right)
    return combine(left, right, root.data)

# Maximum Path Sum (Tree DP)
def max_path_sum(root):
    res = [float('-inf')]
    def helper(node):
        if not node: return 0
        l = max(0, helper(node.left))   # ignore negatives
        r = max(0, helper(node.right))
        res[0] = max(res[0], l + r + node.data)
        return node.data + max(l, r)
    helper(root)
    return res[0]

# Iterative inorder (no recursion) — O(n), O(h)
def inorder_iterative(root):
    stack, result, node = [], [], root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop()
        result.append(node.data)
        node = node.right
    return result`,
        practice: [
          { name: "Binary Tree Maximum Path Sum", diff: "hard" },
          { name: "Serialize and Deserialize Binary Tree", diff: "hard" },
          { name: "Binary Tree Right Side View", diff: "medium" },
          { name: "Maximum Depth of Binary Tree", diff: "easy" },
          { name: "Construct Binary Tree from Preorder and Inorder", diff: "medium" }
        ]
      }
    }
  },
  "Binary Search Trees": {
    icon: "🌲", diff: "medium",
    desc: "Ordered binary tree: left < root < right. O(log n) average search, insert, delete. Inorder gives sorted output.",
    subtopics: {
      "BST Basics & Property": {
        diff: "easy",
        explanation: "A Binary Search Tree is a binary tree where every node satisfies: all values in the left subtree are less than the node's value, and all values in the right subtree are greater. Both subtrees are also valid BSTs recursively. This ordering property enables binary search — at each node, we eliminate half the remaining candidates. Average case: O(log n) for search, insert, delete. Worst case: O(n) when tree is skewed (e.g. inserting sorted data 1,2,3,4,5 creates a right-skewed tree). Inorder traversal of a BST always produces sorted ascending output — this is the most useful BST property.",
        intuition: "Think of BST like a dictionary — words before the current word go left, words after go right. Or like a decision tree: compare value, go left if smaller, go right if larger. Each comparison eliminates half the remaining nodes (if balanced), exactly like binary search on a sorted array. The key difference from a sorted array: BST supports O(log n) insert/delete — arrays need O(n) shifting.",
        steps: [
          "BST PROPERTY: for every node N: all nodes in N.left < N.val AND all nodes in N.right > N.val. (Recursively true at every node, not just root!)",
          "SEARCH: compare key with root. Equal → found. Less → go left. Greater → go right. Return null if not found. O(h) time.",
          "INSERT: traverse like search until a null spot is found. Create new node there. O(h) time.",
          "INORDER traversal (Left→Root→Right) always gives sorted ascending output. Use this to verify BST.",
          "HEIGHT h: balanced BST h=O(log n), skewed BST h=O(n-1).",
          "COMMON MISTAKE: checking only root->left < root < root->right is NOT sufficient. Must check global bounds (see Validate BST)."
        ],
        dryRun: `INSERT 5,3,7,2,4 into empty BST:

Insert 5: root=5
Insert 3: 3<5 → go left → root.left=3
Insert 7: 7>5 → go right → root.right=7
Insert 2: 2<5→left(3), 2<3→left → node(3).left=2
Insert 4: 4<5→left(3), 4>3→right → node(3).right=4

Final BST:
        5
       / \\
      3   7
     / \\
    2   4

INORDER traversal: 2 3 4 5 7 ← sorted ✓

SEARCH for 4:
  4<5 → go left (3)
  4>3 → go right (4)
  4==4 → FOUND ✓  (2 comparisons, not 5)

SEARCH for 6:
  6>5 → go right (7)
  6<7 → go left → NULL → NOT FOUND ✗`,
        time: { best: "O(1) root", avg: "O(log n)", worst: "O(n) skewed" },
        space: "O(h) recursive stack",
        stable: undefined,
        when: "Use BST when you need ordered data with O(log n) search+insert+delete. Use balanced BST (AVL/Red-Black) when input order is unpredictable. Use hashing when order doesn't matter and O(1) is critical.",
        pros: [
          "O(log n) average search, insert, delete",
          "Inorder traversal gives sorted output — free sorting",
          "Supports range queries, predecessor/successor in O(log n)",
          "Foundation for AVL, Red-Black, B-Trees, Segment Trees"
        ],
        cons: [
          "O(n) worst case on skewed tree (sorted/reverse input)",
          "No O(1) operations unlike hash tables",
          "Requires balancing (AVL/RB) for guaranteed O(log n)"
        ],
        cpp: `// BST Node and basic search — C++
struct Node {
    int data;
    Node* left, *right;
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Search — O(h)
bool search(Node* root, int key) {
    if (!root) return false;
    if (root->data == key) return true;
    if (key < root->data) return search(root->left, key);
    return search(root->right, key);
}

// Iterative search — O(h), O(1) space
bool searchIter(Node* root, int key) {
    while (root) {
        if (root->data == key) return true;
        root = (key < root->data) ? root->left : root->right;
    }
    return false;
}

// Inorder traversal → sorted output
void inorder(Node* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}`,
        python: `# BST Node and basic operations — Python
class Node:
    def __init__(self, val):
        self.data = val
        self.left = None
        self.right = None

# Search — O(h)
def search(root, key):
    if not root: return False
    if root.data == key: return True
    if key < root.data: return search(root.left, key)
    return search(root.right, key)

# Iterative search — O(h), O(1) space
def search_iter(root, key):
    while root:
        if root.data == key: return True
        root = root.left if key < root.data else root.right
    return False

# Inorder → sorted output
def inorder(root):
    if not root: return []
    return inorder(root.left) + [root.data] + inorder(root.right)

# Verify BST property
result = inorder(root)
is_sorted = all(result[i] < result[i+1] for i in range(len(result)-1))`,
        practice: [
          { name: "Search in a Binary Search Tree", diff: "easy" },
          { name: "Validate Binary Search Tree", diff: "medium" },
          { name: "Kth Smallest Element in BST", diff: "medium" }
        ]
      },
      "Insert & Delete": {
        diff: "medium",
        explanation: "Insertion: traverse like a search until reaching a null child — that null position is where the new node belongs. Recursive: if root is null return new node, else recurse left or right, return root. O(h). Deletion has 3 cases: (1) Leaf node — delete directly, return null. (2) One child — replace the node with its only child. (3) Two children — find the inorder successor (smallest node in right subtree using findMin), copy its value into the current node, delete the inorder successor from the right subtree. All cases O(h).",
        intuition: "Deletion case 3 is the tricky one. You can't just remove the node because it has two children pulling on it. Instead, find the inorder successor — the smallest value larger than current node — copy its value up, and delete it from the right subtree (where it's guaranteed to be a leaf or have only a right child, making deletion easy). Alternatively use inorder predecessor (largest in left subtree).",
        steps: [
          "INSERT: if root==null → return new Node(val). If val < root.data → root.left=insert(root.left,val). Else root.right=insert(root.right,val). Return root.",
          "DELETE CASE 1 (leaf): root.left==null && root.right==null → return null.",
          "DELETE CASE 2 (one child): root.left==null → return root.right. root.right==null → return root.left.",
          "DELETE CASE 3 (two children): find inorder successor = findMin(root.right). root.data = successor.data. root.right = delete(root.right, successor.data). Return root.",
          "FINDMIN: go left as far as possible. Return leftmost node.",
          "FINDMAX: go right as far as possible. Return rightmost node."
        ],
        dryRun: `BST:     5
        / \\
       3   7
      / \\
     2   4

DELETE 3 (two children):
  Find inorder successor of 3 = findMin(3.right) = 4
  Copy 4 into node: node becomes 4
  Delete 4 from right subtree of node(4)
    delete(node(4), 4): node(4)==4, leaf → return null
  Result:
        5
       / \\
      4   7
     /
    2    ✓

DELETE 7 (leaf):
  node(7).left==null && node(7).right==null → return null
  Result: 5.right = null ✓

INSERT 6 into original BST:
  6>5 → go right (7)
  6<7 → go left → null → insert here
  Result:
        5
       / \\
      3   7
     / \\ /
    2  4 6  ✓`,
        time: { best: "O(log n) balanced", avg: "O(log n)", worst: "O(n) skewed" },
        space: "O(h) recursive",
        stable: undefined,
        when: "BST insert/delete when ordered dynamic data needed. For guaranteed O(log n): use self-balancing BST (AVL/Red-Black).",
        pros: [
          "O(log n) average — no element shifting unlike sorted arrays",
          "Deletion case 3 elegantly reuses BST structure",
          "Recursive implementation is clean and concise"
        ],
        cons: [
          "O(n) worst case on sorted input without balancing",
          "Deletion case 3 is the most error-prone in interviews",
          "Recursive stack O(h) — use iterative for deep trees"
        ],
        cpp: `// BST Insert and Delete — C++ (from notes)

// Insert — O(h)
Node* insert(Node* root, int val) {
    if (!root) return new Node(val);   // base case: insert here
    if (val < root->data)
        root->left = insert(root->left, val);
    else
        root->right = insert(root->right, val);
    return root;
}

// Find minimum node (inorder successor helper)
Node* findMin(Node* root) {
    while (root->left)   // go as far left as possible
        root = root->left;
    return root;
}

// Delete — O(h), all 3 cases
Node* deleteNode(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Case 1: leaf
        if (!root->left && !root->right) return nullptr;
        // Case 2: one child
        if (!root->left) return root->right;
        if (!root->right) return root->left;
        // Case 3: two children — use inorder successor
        Node* successor = findMin(root->right);
        root->data = successor->data;           // copy value up
        root->right = deleteNode(root->right, successor->data); // delete successor
    }
    return root;
}`,
        python: `# BST Insert and Delete — Python (from notes)

# Insert — O(h)
def insert(root, val):
    if not root: return Node(val)   # base: insert here
    if val < root.data:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

# Find minimum node
def find_min(root):
    while root.left:   # go as far left as possible
        root = root.left
    return root

# Delete — O(h), all 3 cases
def delete_node(root, key):
    if not root: return None
    if key < root.data:
        root.left = delete_node(root.left, key)
    elif key > root.data:
        root.right = delete_node(root.right, key)
    else:
        # Case 1 & 2: 0 or 1 child
        if not root.left: return root.right
        if not root.right: return root.left
        # Case 3: two children — inorder successor
        successor = find_min(root.right)
        root.data = successor.data          # copy value up
        root.right = delete_node(root.right, successor.data)
    return root`,
        practice: [
          { name: "Insert into a Binary Search Tree", diff: "medium" },
          { name: "Delete Node in a BST", diff: "medium" },
          { name: "Merge Two BSTs", diff: "hard" }
        ]
      },
      "Important BST Problems": {
        diff: "medium",
        explanation: "Six canonical BST problems: (1) Validate BST — use min/max bounds (not local comparison). (2) LCA in BST — exploit ordering: if both p,q < root → go left; if both > root → go right; else root IS the LCA. O(h). (3) Kth Smallest — inorder traversal gives sorted order; decrement k each visit, return when k==0. (4) Convert Sorted Array to BST — use middle element as root, recurse on halves. Gives balanced BST. (5) Range Sum — traverse selectively: if node < lo skip right subtree; if node > hi skip left subtree. O(n) worst, better in practice. (6) Floor/Ceil — largest value ≤ key (floor) and smallest value ≥ key (ceil) using BST property.",
        intuition: "LCA in BST is O(h) vs O(n) for general binary tree because BST ordering tells you exactly which subtree to search — no need to explore both. Sorted array to BST: always pick the middle as root to guarantee a balanced tree (height = log n). Kth smallest: inorder is sorted, so just count to k. Range sum: prune subtrees outside [lo, hi] using BST property — much faster than full traversal.",
        steps: [
          "VALIDATE BST: isValid(node, min=-∞, max=+∞). At each node: if node.val ≤ min or ≥ max → false. Recurse left(max=node.val), right(min=node.val).",
          "LCA IN BST: if p.val < root.val AND q.val < root.val → recurse left. If both > root → recurse right. Else → root is LCA.",
          "KTH SMALLEST: inorder traversal with counter. When k reaches 0 → return current node value.",
          "SORTED ARRAY TO BST: mid=(lo+hi)/2. root=arr[mid]. root.left=build(lo,mid-1). root.right=build(mid+1,hi).",
          "RANGE SUM [lo,hi]: if node.val < lo → only check right (left subtree all smaller). If node.val > hi → only check left. Else: add node.val + rangeSum(left) + rangeSum(right).",
          "FLOOR: largest value ≤ key. If node.val==key return node. If key < node.val → floor in left subtree. Else: candidate=node.val, check right for closer value."
        ],
        dryRun: `── LCA in BST: p=2, q=4, root at 5 ──────────────────
        5
       / \\
      3   7
     / \\
    2   4

Step 1: 2<5 AND 4<5 → both in left subtree → go left (3)
Step 2: 2<3 AND 4>3 → p and q in DIFFERENT subtrees → LCA = node(3) ✓
O(h) = O(2) vs O(n) for general BT!

── SORTED ARRAY TO BALANCED BST: [1,2,3,4,5,6,7] ───
mid=3 → root=arr[3]=4
  left:  [1,2,3] mid=1 → root=2, left=1, right=3
  right: [5,6,7] mid=1 → root=6, left=5, right=7
Result:
        4
       / \\
      2   6
     / \\ / \\
    1  3 5  7  ← perfectly balanced ✓

── KTH SMALLEST (k=3) in BST ─────────────────────────
Inorder: 2 → 3 → 4 → 5 → 7
  Visit 2: k=3→2 (not 0)
  Visit 3: k=2→1 (not 0)
  Visit 4: k=1→0 → RETURN 4 ✓ (3rd smallest)`,
        time: { best: "O(log n) LCA/BST ops", avg: "O(log n)", worst: "O(n) skewed" },
        space: "O(h)",
        stable: undefined,
        when: "LCA in BST → O(h) using ordering (vs O(n) general tree). Kth smallest → O(n) inorder or O(k+log n) with augmented BST. Sorted array to BST → always for balanced construction.",
        pros: [
          "BST ordering enables O(h) LCA — much faster than general tree O(n)",
          "Range queries prune subtrees — better than full O(n) traversal",
          "Sorted array to BST always gives balanced result — O(log n) height"
        ],
        cons: [
          "Validate BST: local comparison is wrong — must use bounds",
          "Kth smallest: O(n) unless augmented with subtree sizes",
          "Skewed BST degrades all operations to O(n)"
        ],
        cpp: `// Important BST Problems — C++

// 1. Validate BST — O(n) with bounds
bool isValidBST(Node* root, long mn=LLONG_MIN, long mx=LLONG_MAX) {
    if (!root) return true;
    if (root->data <= mn || root->data >= mx) return false;
    return isValidBST(root->left,  mn, root->data) &&
           isValidBST(root->right, root->data, mx);
}

// 2. LCA in BST — O(h), exploits ordering
Node* lcaBST(Node* root, Node* p, Node* q) {
    if (!root) return nullptr;
    if (p->data < root->data && q->data < root->data)
        return lcaBST(root->left, p, q);   // both in left
    if (p->data > root->data && q->data > root->data)
        return lcaBST(root->right, p, q);  // both in right
    return root;  // they diverge here → root is LCA
}

// 3. Kth Smallest — O(n)
int kthSmallest(Node* root, int& k) {
    if (!root) return -1;
    int left = kthSmallest(root->left, k);
    if (k == 0) return left;
    if (--k == 0) return root->data;       // k-th visited
    return kthSmallest(root->right, k);
}

// 4. Sorted Array to Balanced BST — O(n)
Node* sortedToBST(vector<int>& arr, int lo, int hi) {
    if (lo > hi) return nullptr;
    int mid = lo + (hi - lo) / 2;
    Node* root = new Node(arr[mid]);
    root->left  = sortedToBST(arr, lo, mid-1);
    root->right = sortedToBST(arr, mid+1, hi);
    return root;
}

// 5. Range Sum [lo, hi] — O(n) worst, prunes in practice
int rangeSum(Node* root, int lo, int hi) {
    if (!root) return 0;
    if (root->data < lo) return rangeSum(root->right, lo, hi);
    if (root->data > hi) return rangeSum(root->left, lo, hi);
    return root->data + rangeSum(root->left, lo, hi)
                      + rangeSum(root->right, lo, hi);
}`,
        python: `# Important BST Problems — Python

# 1. Validate BST — O(n)
def is_valid_bst(root, mn=float('-inf'), mx=float('inf')):
    if not root: return True
    if root.data <= mn or root.data >= mx: return False
    return (is_valid_bst(root.left,  mn, root.data) and
            is_valid_bst(root.right, root.data, mx))

# 2. LCA in BST — O(h)
def lca_bst(root, p, q):
    if not root: return None
    if p.data < root.data and q.data < root.data:
        return lca_bst(root.left, p, q)   # both in left
    if p.data > root.data and q.data > root.data:
        return lca_bst(root.right, p, q)  # both in right
    return root  # diverge here → LCA

# 3. Kth Smallest — O(n) inorder
def kth_smallest(root, k):
    stack, node = [], root
    while stack or node:
        while node: stack.append(node); node = node.left
        node = stack.pop(); k -= 1
        if k == 0: return node.data
        node = node.right

# 4. Sorted Array to Balanced BST — O(n)
def sorted_to_bst(arr, lo=None, hi=None):
    if lo is None: lo, hi = 0, len(arr)-1
    if lo > hi: return None
    mid = (lo + hi) // 2
    root = Node(arr[mid])
    root.left  = sorted_to_bst(arr, lo, mid-1)
    root.right = sorted_to_bst(arr, mid+1, hi)
    return root

# 5. Range Sum — prunes using BST property
def range_sum(root, lo, hi):
    if not root: return 0
    if root.data < lo: return range_sum(root.right, lo, hi)
    if root.data > hi: return range_sum(root.left, lo, hi)
    return root.data + range_sum(root.left, lo, hi) + range_sum(root.right, lo, hi)`,
        practice: [
          { name: "Validate Binary Search Tree", diff: "medium" },
          { name: "Lowest Common Ancestor of BST", diff: "medium" },
          { name: "Kth Smallest Element in BST", diff: "medium" },
          { name: "Convert Sorted Array to BST", diff: "easy" },
          { name: "Range Sum of BST", diff: "easy" }
        ]
      },
      "BST vs Other Structures": {
        diff: "easy",
        explanation: "BST compared to four alternatives: (1) BST vs Binary Tree — BST is ordered (left<root<right), binary tree has no ordering constraint. BST supports O(log n) search; binary tree needs O(n) traversal. (2) BST vs Heap — BST supports ordered search (find any element). Heap only gives O(1) access to max/min, not arbitrary elements. (3) BST vs Hashing — hash table O(1) average, unordered. BST O(log n), fully ordered — supports range queries, predecessor, successor. (4) Balanced BST (AVL/Red-Black) vs plain BST — self-balancing trees guarantee O(log n) worst case by performing rotations on insert/delete. Plain BST degrades to O(n) on sorted input.",
        intuition: "Use BST when you need ORDER: sorting, range queries, predecessor/successor. Use hashing when you only need existence/lookup and order doesn't matter. Use heap when you only need the maximum or minimum. The key BST advantage over hashing: range queries like 'find all elements between 10 and 50' are O(log n + k) on a BST but O(n) with a hash table.",
        steps: [
          "BST vs Sorted Array: both O(log n) search. BST O(log n) insert/delete vs O(n) for array. Array better for cache, BST better for dynamic data.",
          "BST vs Heap: BST = ordered, arbitrary search O(log n). Heap = shape-based, only max/min O(1).",
          "BST vs Hash: BST ordered + range queries. Hash faster O(1) but unordered.",
          "AVL Tree: |h(left)-h(right)| ≤ 1 at every node. Rotations on insert/delete maintain balance. O(log n) guaranteed.",
          "Red-Black Tree: colour-based balancing rules. Fewer rotations than AVL on insert/delete. Used in C++ map/set and Java TreeMap.",
          "When to use which: interviews → plain BST. Production ordered data → Red-Black (std::map). Indexed arrays → Fenwick/Segment Tree."
        ],
        dryRun: `Structure Comparison:
Structure    | Search   | Insert   | Delete   | Ordered? | Range Query
─────────────┼──────────┼──────────┼──────────┼──────────┼────────────
BST (plain)  | O(h)     | O(h)     | O(h)     | YES      | O(log n+k)
AVL Tree     | O(log n) | O(log n) | O(log n) | YES      | O(log n+k)
Red-Black    | O(log n) | O(log n) | O(log n) | YES      | O(log n+k)
Hash Table   | O(1) avg | O(1) avg | O(1) avg | NO       | O(n)
Heap         | O(n)     | O(log n) | O(log n) | Partial  | N/A
Sorted Array | O(log n) | O(n)     | O(n)     | YES      | O(log n+k)

C++ map (Red-Black) vs unordered_map (Hash):
  map: ordered, O(log n) all ops, supports lower_bound/upper_bound
  unordered_map: O(1) avg, no ordering, faster for pure lookups

Python sortedcontainers.SortedList:
  Maintains sorted order, O(log n) insert/delete, O(log n) search
  Use when hashing not enough and you need sorted iteration`,
        time: { best: "O(log n) balanced", avg: "O(log n)", worst: "O(n) skewed" },
        space: "O(n)",
        stable: undefined,
        when: "BST when: ordered iteration needed, range queries, predecessor/successor. Hash when: pure O(1) lookup, no ordering. AVL/RB when: BST with guaranteed O(log n).",
        pros: [
          "Range queries O(log n + k) — unmatched by hash tables",
          "Inorder traversal = free sorting",
          "Predecessor/Successor queries O(log n)"
        ],
        cons: [
          "O(n) worst case without balancing",
          "Slower than hash for simple existence queries",
          "AVL/Red-Black rotation logic is complex to implement"
        ],
        cpp: `// BST Comparisons — C++

// C++ map = Red-Black Tree (ordered, O(log n))
#include <map>
map<int,int> ordered_map;
ordered_map[5] = 1;
ordered_map[3] = 2;
// iterate in sorted order:
for (auto& [k,v] : ordered_map) cout << k << " "; // 3 5
// range query:
auto lo = ordered_map.lower_bound(3);
auto hi = ordered_map.upper_bound(5);

// C++ set = Red-Black Tree (ordered unique keys)
#include <set>
set<int> s = {5, 3, 7, 2, 4};
auto it = s.lower_bound(4); // O(log n)
cout << *s.begin();  // min = 2
cout << *s.rbegin(); // max = 7

// C++ unordered_map = Hash (O(1) avg, unordered)
#include <unordered_map>
unordered_map<int,int> hash_map;
hash_map[5] = 1; // O(1) avg, no ordering

// Choose:
// Need sorted iteration or range → map/set (Red-Black)
// Just need fast lookup → unordered_map/set (Hash)`,
        python: `# BST Comparisons — Python

# Python dict = hash map (O(1) avg, unordered in concept)
d = {5: 1, 3: 2, 7: 3}
# iterate sorted:
for k in sorted(d): print(k)  # O(n log n)

# sortedcontainers.SortedList — BST-like O(log n)
# pip install sortedcontainers
from sortedcontainers import SortedList, SortedDict
sl = SortedList([5, 3, 7, 2, 4])
sl.add(6)              # O(log n)
sl.irange(3, 6)        # range query O(log n + k)
print(sl[0], sl[-1])   # min, max — O(log n)

# SortedDict = ordered dict with O(log n) ops
sd = SortedDict({5:1, 3:2, 7:3})
print(sd.keys())       # [3, 5, 7] — always sorted
print(sd.irange(3, 6)) # range iteration

# Choose in Python:
# Need O(1) lookup only → dict (hash)
# Need sorted order + O(log n) → SortedList/SortedDict
# Simple BST for interview → implement from scratch`,
        practice: [
          { name: "Recover Binary Search Tree", diff: "hard" },
          { name: "Balance a Binary Search Tree", diff: "medium" },
          { name: "Closest Binary Search Tree Value", diff: "easy" },
          { name: "Two Sum IV — Input is a BST", diff: "easy" }
        ]
      }
    }
  },
  Heaps: {
    icon: "🏔️", diff: "medium",
    desc: "Complete binary tree with heap property. O(1) peek, O(log n) insert/delete. Powers priority queues, top-K, Dijkstra.",
    subtopics: {
      "Basics & Heap Property": {
        diff: "easy",
        explanation: "A heap is a special complete binary tree satisfying the heap property. Two types: Max Heap — every parent >= its children (largest element at root). Min Heap — every parent <= its children (smallest element at root). Complete binary tree: all levels are completely filled except possibly the last, which is filled from left to right. Key advantage: the root always holds the max (or min) — O(1) access. Heaps are implemented using arrays — no pointer overhead. For element at index i: left child = 2i+1, right child = 2i+2, parent = (i-1)/2. This index formula is exact because the complete binary tree fills left to right, giving a bijection between tree positions and array indices.",
        intuition: "Think of a heap like a leaderboard: the top scorer always stays at position 0 (root). When a new score arrives, it bubbles up if it's better. When the top scorer leaves, the next best takes the position through heapify-down. Critical insight: a heap is NOT fully sorted — siblings have no ordering guarantee. Only the parent-child relationship matters. This is weaker than BST ordering but sufficient for 'give me the max/min repeatedly'.",
        steps: [
          "ARRAY REPRESENTATION: heap stored as arr[0..n-1]. Root at index 0.",
          "For node at index i: left child = 2i+1, right child = 2i+2, parent = (i-1)/2.",
          "MAX HEAP property: arr[parent] >= arr[child] for every parent-child pair.",
          "MIN HEAP property: arr[parent] <= arr[child] for every parent-child pair.",
          "PEEK (get max/min): return arr[0]. O(1) — root is always max/min.",
          "The heap is NOT sorted — siblings can be in any order. Only parent > children guaranteed."
        ],
        dryRun: `Max Heap — array [50, 30, 40, 10, 20, 35]:

Tree view:
          50          ← index 0 (root, max)
         /  \\
        30   40       ← index 1, 2
       / \\  /
      10 20 35        ← index 3,4,5

Index formula check:
  i=1 (node 30): left=2*1+1=3 (10) ✓, right=2*1+2=4 (20) ✓
  i=2 (node 40): left=2*2+1=5 (35) ✓, right=2*2+2=6 (out of bounds)
  i=3 (node 10): parent=(3-1)/2=1 (30) ✓

Heap property check (Max):
  50 >= 30 ✓, 50 >= 40 ✓
  30 >= 10 ✓, 30 >= 20 ✓
  40 >= 35 ✓
All good → valid Max Heap ✓

Compare: [10, 30, 40, 50, 20, 35] is NOT a valid max heap
  10 >= 30? NO ✗`,
        time: { best: "O(1) peek", avg: "O(log n) insert/delete", worst: "O(log n)" },
        space: "O(n)",
        stable: undefined,
        when: "Use heap when you need repeated access to max or min. Priority queue = heap. Dijkstra's shortest path uses min-heap. Top-K elements use min-heap of size k. Median of stream uses two heaps.",
        pros: [
          "O(1) peek (max or min always at root)",
          "O(log n) insert and delete",
          "O(n) build from array — better than O(n log n) naive",
          "Array implementation — no pointer overhead, cache-friendly"
        ],
        cons: [
          "Not fully sorted — only root is guaranteed max/min",
          "No O(log n) search for arbitrary element (not a BST)",
          "Duplicates allowed — no BST-style uniqueness"
        ],
        cpp: `// Heap array representation — C++
// Max heap: [50, 30, 40, 10, 20, 35]
// index i: left=2i+1, right=2i+2, parent=(i-1)/2

// STL priority_queue — max heap by default
#include <queue>
priority_queue<int> maxHeap;
maxHeap.push(30); maxHeap.push(50); maxHeap.push(40);
cout << maxHeap.top();  // 50 — O(1)
maxHeap.pop();          // removes 50 — O(log n)

// Min heap using STL
priority_queue<int, vector<int>, greater<int>> minHeap;
minHeap.push(30); minHeap.push(10); minHeap.push(40);
cout << minHeap.top();  // 10 — O(1)

// Heap from array — O(n) using make_heap
vector<int> v = {50, 30, 40, 10, 20, 35};
make_heap(v.begin(), v.end()); // max heap in O(n)
cout << v.front(); // 50 (max)`,
        python: `# Heap basics — Python
import heapq  # Python heapq = MIN heap by default

# Min heap
heap = []
heapq.heappush(heap, 30)
heapq.heappush(heap, 10)
heapq.heappush(heap, 40)
print(heap[0])              # 10 — O(1) peek
print(heapq.heappop(heap))  # 10 — O(log n) remove min

# Max heap (negate values)
max_heap = []
for x in [30, 10, 40]:
    heapq.heappush(max_heap, -x)
print(-max_heap[0])              # 40 — max
print(-heapq.heappop(max_heap))  # 40 — O(log n)

# Build heap from list in O(n)
arr = [50, 30, 40, 10, 20, 35]
heapq.heapify(arr)  # converts in-place to min heap, O(n)
print(arr[0])  # 10 (min)

# Array index formula (0-based):
# left child of i  = 2*i + 1
# right child of i = 2*i + 2
# parent of i      = (i-1) // 2`,
        practice: [
          { name: "Kth Largest Element in Array", diff: "medium" },
          { name: "Last Stone Weight", diff: "easy" },
          { name: "Check if Array is a Max Heap", diff: "easy" }
        ]
      },
      "Insert & Heapify": {
        diff: "medium",
        explanation: "Two core operations: INSERT (bubble up) and DELETE/HEAPIFY (bubble down). Insert: add element at end of array (next available complete tree position), then compare with parent and swap upward until heap property is restored. Called 'bubble up' or 'sift up'. O(log n) because tree height = log n. Delete root: replace root with last element (maintain completeness), remove last element, then compare with children and swap downward until heap property restored. Called 'heapify down' or 'sift down'. Build Heap from array: start from last non-leaf node (index n/2 - 1) and heapify down each node to index 0. O(n) total — better than inserting one by one which is O(n log n).",
        intuition: "Bubble up maintains completeness by adding at the end, then correctness by swapping up. Bubble down maintains correctness by swapping with the larger child (max heap) or smaller child (min heap). Build heap is O(n) not O(n log n) because most nodes are near the bottom of the tree and heapify down takes O(1) for leaves, O(log n) only for root. The sum telescopes to O(n).",
        steps: [
          "INSERT: arr.push_back(val). i = n-1. While i>0 AND arr[parent(i)] < arr[i]: swap(arr[i], arr[parent(i)]). i = parent(i).",
          "DELETE ROOT: arr[0] = arr[n-1]. arr.pop_back(). heapifyDown(0).",
          "HEAPIFY DOWN from index i: largest=i. If left child exists and arr[left]>arr[largest]: largest=left. If right child exists and arr[right]>arr[largest]: largest=right. If largest≠i: swap(arr[i],arr[largest]). Recurse heapifyDown(largest).",
          "BUILD HEAP: for i from n/2-1 down to 0: heapifyDown(i). O(n) total.",
          "LAST NON-LEAF: index = n/2 - 1. All nodes from n/2 to n-1 are leaves.",
          "HEAP SORT: buildHeap O(n), then n times: swap root with last, reduce size, heapifyDown. Total O(n log n), space O(1)."
        ],
        dryRun: `── INSERT 60 into max heap [50,30,40,10,20,35] ─────────
Add 60 at end: [50,30,40,10,20,35,60]  idx=6
parent(6)=(6-1)/2=2  arr[2]=40 < 60 → SWAP
  → [50,30,60,10,20,35,40]  idx=2
parent(2)=(2-1)/2=0  arr[0]=50 < 60 → SWAP
  → [60,30,50,10,20,35,40]  idx=0
idx=0 → stop (at root)
Result: [60,30,50,10,20,35,40] ✓

── DELETE ROOT from [60,30,50,10,20,35,40] ──────────────
Replace root with last: arr[0]=40, pop last
  → [40,30,50,10,20,35]
heapifyDown(0):
  largest=0(40), left=1(30), right=2(50)
  50>40 → largest=2
  Swap arr[0] and arr[2]: [50,30,40,10,20,35]
heapifyDown(2):
  largest=2(40), left=5(35), right=6(OOB)
  35<40 → largest stays 2 → STOP
Result: [50,30,40,10,20,35] ✓

── BUILD HEAP: [3,1,6,5,2,4] → max heap ────────────────
n=6, start from i=n/2-1=2
i=2: arr[2]=6, children: arr[5]=4 → 6>4 → no swap
i=1: arr[1]=1, children: arr[3]=5,arr[4]=2 → largest=5 at idx3
  swap(1,5): [3,5,6,1,2,4]  heapifyDown(3) → leaf, stop
i=0: arr[0]=3, children: arr[1]=5,arr[2]=6 → largest=6 at idx2
  swap(3,6): [6,5,3,1,2,4]  heapifyDown(2): arr[2]=3>arr[5]=4? No
Result: [6,5,3,1,2,4] → valid max heap ✓  O(n) time`,
        time: { best: "O(1) insert best", avg: "O(log n)", worst: "O(log n)" },
        space: "O(1) extra for heapify / O(n) heap storage",
        stable: undefined,
        when: "Insert/delete for priority queue. Build heap from array in O(n) before heap sort or repeated deletions. Heapify down after every deletion.",
        pros: [
          "Build heap O(n) — faster than n × insert which is O(n log n)",
          "Bubble up/down uses only swaps — in-place, cache-friendly",
          "Heap sort is O(n log n) in-place with O(1) extra space"
        ],
        cons: [
          "Not stable — equal elements may reorder during heapify",
          "No O(log n) arbitrary search — must scan O(n)",
          "Heapify recursion can stack overflow for huge n — use iterative"
        ],
        cpp: `// Insert and Heapify — C++
class MaxHeap {
    vector<int> heap;
public:
    // Insert — O(log n): add at end, bubble up
    void insert(int val) {
        heap.push_back(val);
        int i = heap.size() - 1;
        while (i > 0 && heap[(i-1)/2] < heap[i]) {
            swap(heap[i], heap[(i-1)/2]);
            i = (i-1)/2;  // move to parent
        }
    }

    // Heapify down from index i — O(log n)
    void heapifyDown(int i) {
        int n = heap.size(), largest = i;
        int l = 2*i+1, r = 2*i+2;
        if (l < n && heap[l] > heap[largest]) largest = l;
        if (r < n && heap[r] > heap[largest]) largest = r;
        if (largest != i) {
            swap(heap[i], heap[largest]);
            heapifyDown(largest);  // recurse
        }
    }

    // Delete root — O(log n)
    void deleteRoot() {
        heap[0] = heap.back(); heap.pop_back();
        heapifyDown(0);
    }

    int peek() { return heap[0]; }  // O(1)
};

// Build heap in O(n)
void buildHeap(vector<int>& arr) {
    int n = arr.size();
    for (int i = n/2 - 1; i >= 0; i--)  // start from last non-leaf
        heapifyDown(arr, n, i);           // heapify each node
}`,
        python: `# Insert and Heapify — Python

class MaxHeap:
    def __init__(self): self.heap = []

    # Insert — O(log n): bubble up
    def insert(self, val):
        self.heap.append(val)
        i = len(self.heap) - 1
        while i > 0 and self.heap[(i-1)//2] < self.heap[i]:
            self.heap[i], self.heap[(i-1)//2] = self.heap[(i-1)//2], self.heap[i]
            i = (i-1)//2

    # Heapify down from index i — O(log n)
    def heapify_down(self, i):
        n, largest = len(self.heap), i
        l, r = 2*i+1, 2*i+2
        if l < n and self.heap[l] > self.heap[largest]: largest = l
        if r < n and self.heap[r] > self.heap[largest]: largest = r
        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self.heapify_down(largest)

    # Delete root — O(log n)
    def delete_root(self):
        self.heap[0] = self.heap[-1]; self.heap.pop()
        self.heapify_down(0)

    def peek(self): return self.heap[0]  # O(1)

# Build heap in O(n) using heapq
import heapq
arr = [3, 1, 6, 5, 2, 4]
heapq.heapify(arr)  # min heap in-place, O(n)`,
        practice: [
          { name: "Heap Sort", diff: "medium" },
          { name: "Minimum Cost to Connect Ropes", diff: "medium" },
          { name: "K Closest Points to Origin", diff: "medium" }
        ]
      },
      "Important Patterns": {
        diff: "medium",
        explanation: "Five critical heap patterns: (1) Top-K Elements — maintain a min-heap of size k; if new element > heap.top(), pop and push. Final heap contains top-k largest. O(n log k). (2) Kth Largest/Smallest — same as top-k; heap.top() is kth largest after processing all elements. (3) Merge K Sorted Arrays — use min-heap of (value, array_index, element_index); always pop minimum and push next from same array. O(n log k). (4) Median of Stream — maintain max-heap (left half) and min-heap (right half). Balance sizes. Median = maxHeap.top() or average of both tops. (5) Task Scheduler / Reorganize String — use max-heap of frequencies; greedily pick most frequent task that doesn't violate cooldown.",
        intuition: "Top-K insight: you don't need to sort all n elements to find the top k. A min-heap of size k keeps exactly the k largest seen so far — any new element only enters if it's bigger than the current minimum in the heap. Median of stream: two heaps act like two halves of a sorted array. Max-heap stores the lower half (its top is the median candidate), min-heap stores the upper half.",
        steps: [
          "TOP-K LARGEST: minHeap of size k. For each element x: push x. If heap.size()>k: pop (removes smallest). Final: heap.top() = kth largest.",
          "MERGE K SORTED: push (arr[i][0], i, 0) for all arrays into minHeap. While heap not empty: pop min, push to result, push next element from same array.",
          "MEDIAN OF STREAM: maxHeap (left), minHeap (right). On add x: if x <= maxHeap.top() push to max, else push to min. Balance: if sizes differ by >1, move top of larger to smaller. Median = larger heap's top or average.",
          "HEAP SORT: buildMaxHeap O(n). For i from n-1 to 1: swap arr[0] and arr[i], heapifyDown(0,i). Total O(n log n), space O(1).",
          "SLIDING WINDOW MAXIMUM: use max-heap of (value, index). On window slide: remove elements outside window (lazy deletion using index check). Heap top = window maximum.",
          "REORGANIZE STRING: count char frequencies. Max-heap of (-freq, char). Each step: pop two most frequent, append to result, push back with decremented freq."
        ],
        dryRun: `── TOP-K LARGEST (k=3): [3,2,1,5,6,4] ──────────────────
Process 3: heap=[3]   size=1
Process 2: heap=[2,3] size=2
Process 1: heap=[1,2,3] size=3
Process 5: push→heap=[1,2,3,5], size>3 → pop 1
  heap=[2,3,5]
Process 6: push→heap=[2,3,5,6], pop 2
  heap=[3,5,6]
Process 4: push→heap=[3,4,5,6], pop 3
  heap=[4,5,6]
Kth largest = heap.top() = 4 ✓ (3rd largest in [3,2,1,5,6,4])

── MEDIAN OF STREAM: add 1,2,3,4,5 ─────────────────────
add 1: max=[1], min=[] → median=1
add 2: 2>1→min=[2], max=[1], balance ok → median=(1+2)/2=1.5
add 3: 3>1→min=[2,3], size diff>1→move 2 to max
  max=[1,2], min=[3] → median=max.top()=2
add 4: 4>2→min=[3,4], balance ok → median=(2+3)/2=2.5
add 5: 5>2→min=[3,4,5], size diff>1→move 3 to max
  max=[1,2,3], min=[4,5] → median=max.top()=3 ✓`,
        time: { best: "O(n log k) top-k", avg: "O(n log k)", worst: "O(n log n) merge k" },
        space: "O(k) top-k / O(n) median",
        stable: undefined,
        when: "Top-K: any 'k largest/smallest' problem. Merge k sorted: combine sorted streams. Median of stream: real-time median. Task scheduler: greedy frequency problems. Pattern trigger: 'top k', 'priority-based', 'smallest/largest repeatedly' → heap.",
        pros: [
          "Top-K in O(n log k) vs O(n log n) sorting — k << n is huge saving",
          "Median in O(log n) per insertion vs O(n) naive",
          "Merge k sorted in O(n log k) vs O(nk) naive"
        ],
        cons: [
          "Lazy deletion (sliding window) adds code complexity",
          "Median of stream needs careful balancing logic",
          "Max heap in Python requires negating values — error-prone"
        ],
        cpp: `// Important Heap Patterns — C++

// 1. Kth Largest — O(n log k)
int kthLargest(vector<int>& nums, int k) {
    priority_queue<int,vector<int>,greater<int>> minH; // min heap
    for (int x : nums) {
        minH.push(x);
        if ((int)minH.size() > k) minH.pop(); // keep only k largest
    }
    return minH.top(); // kth largest
}

// 2. Merge K Sorted Arrays — O(n log k)
vector<int> mergeK(vector<vector<int>>& arrs) {
    using T = tuple<int,int,int>; // (val, arr_idx, elem_idx)
    priority_queue<T,vector<T>,greater<T>> minH;
    for (int i=0;i<arrs.size();i++)
        if(!arrs[i].empty()) minH.push({arrs[i][0],i,0});
    vector<int> res;
    while (!minH.empty()) {
        auto [val,i,j] = minH.top(); minH.pop();
        res.push_back(val);
        if (j+1 < arrs[i].size()) minH.push({arrs[i][j+1],i,j+1});
    }
    return res;
}

// 3. Median of Stream
class MedianFinder {
    priority_queue<int> maxH;                        // left half
    priority_queue<int,vector<int>,greater<int>> minH; // right half
public:
    void addNum(int x) {
        if (maxH.empty() || x <= maxH.top()) maxH.push(x);
        else minH.push(x);
        // balance sizes (differ by at most 1)
        if (maxH.size() > minH.size()+1) { minH.push(maxH.top()); maxH.pop(); }
        else if (minH.size() > maxH.size()) { maxH.push(minH.top()); minH.pop(); }
    }
    double findMedian() {
        if (maxH.size() > minH.size()) return maxH.top();
        return (maxH.top() + minH.top()) / 2.0;
    }
};`,
        python: `# Important Heap Patterns — Python
import heapq

# 1. Kth Largest — O(n log k)
def kth_largest(nums, k):
    min_h = []  # min heap of size k
    for x in nums:
        heapq.heappush(min_h, x)
        if len(min_h) > k: heapq.heappop(min_h)
    return min_h[0]  # kth largest

# 2. Merge K Sorted Arrays — O(n log k)
def merge_k_sorted(arrays):
    heap = []
    for i, arr in enumerate(arrays):
        if arr: heapq.heappush(heap, (arr[0], i, 0))
    result = []
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j+1 < len(arrays[i]):
            heapq.heappush(heap, (arrays[i][j+1], i, j+1))
    return result

# 3. Median of Stream — O(log n) per insert
class MedianFinder:
    def __init__(self):
        self.max_h = []  # left half (max heap via negation)
        self.min_h = []  # right half (min heap)

    def add_num(self, x):
        if not self.max_h or x <= -self.max_h[0]:
            heapq.heappush(self.max_h, -x)
        else:
            heapq.heappush(self.min_h, x)
        # balance
        if len(self.max_h) > len(self.min_h)+1:
            heapq.heappush(self.min_h, -heapq.heappop(self.max_h))
        elif len(self.min_h) > len(self.max_h):
            heapq.heappush(self.max_h, -heapq.heappop(self.min_h))

    def find_median(self):
        if len(self.max_h) > len(self.min_h): return -self.max_h[0]
        return (-self.max_h[0] + self.min_h[0]) / 2.0`,
        practice: [
          { name: "Kth Largest Element in Array", diff: "medium" },
          { name: "Top K Frequent Elements", diff: "medium" },
          { name: "Find Median from Data Stream", diff: "hard" },
          { name: "Merge K Sorted Lists", diff: "hard" },
          { name: "Task Scheduler", diff: "medium" }
        ]
      },
      "Heap Sort & Complexity": {
        diff: "medium",
        explanation: "Heap Sort: (1) Build max-heap from array in O(n). (2) Repeat n-1 times: swap root (max) with last element, reduce heap size by 1, heapify-down from root. This places elements in sorted order from right to left. Time O(n log n), Space O(1) — in-place. While not as fast as quick sort in practice (poor cache performance), heap sort is the only O(n log n) comparison sort with guaranteed worst-case O(n log n) AND O(1) extra space. Comparison: Heap vs BST — heap gives O(1) max/min but no ordered search. BST gives O(log n) search for any element but O(log n) for max/min (balanced). Heap vs array — array needs O(n) to find max each time; heap always O(1).",
        intuition: "Heap sort builds on two observations: a max-heap's root is always the maximum. After swapping root to the end, we have one more sorted element. Restoring heap property on the remaining n-1 elements takes O(log n). Repeat n times → O(n log n). The 'aha': we're using the heap as a sorted output buffer, filling from right to left.",
        steps: [
          "BUILD MAX HEAP: heapify all non-leaf nodes from index n/2-1 down to 0. O(n).",
          "SORT PHASE: for i from n-1 down to 1: swap(arr[0], arr[i]) — puts max at end. heapifyDown(arr, 0, i) — restore heap on arr[0..i-1]. O(n log n).",
          "HEAP SORT TOTAL: O(n) + O(n log n) = O(n log n). Space O(1) — in-place.",
          "WHY BUILD HEAP IS O(n): heapify cost at level l = O(l). Number of nodes at level l from bottom = n/2^l. Sum = n × sum(l/2^l) = O(n).",
          "HEAP SORT IS NOT STABLE — equal elements may reorder.",
          "PRIORITY QUEUE: max/min-heap directly implements priority queue. push=insert O(log n), pop=deleteRoot O(log n), top=peek O(1)."
        ],
        dryRun: `── HEAP SORT on [4,10,3,5,1] ────────────────────────────
Step 1: Build max heap
  Start i=n/2-1=1: heapify(1): arr[1]=10>arr[2]=3,arr[3]=5 → no swap
  i=0: heapify(0): arr[0]=4 < arr[1]=10 → swap → [10,4,3,5,1]
        heapify(1): arr[1]=4 < arr[3]=5 → swap → [10,5,3,4,1]
  Max heap: [10,5,3,4,1] ✓

Step 2: Sort
  i=4: swap arr[0]↔arr[4] → [1,5,3,4,10], heapify(0,4): 1→5→4→...
    [5,4,3,1,10]
  i=3: swap arr[0]↔arr[3] → [1,4,3,5,10], heapify(0,3):
    [4,1,3,5,10]
  i=2: swap arr[0]↔arr[2] → [3,1,4,5,10], heapify(0,2): 3>1 ok
    [3,1,4,5,10]
  i=1: swap arr[0]↔arr[1] → [1,3,4,5,10]
Result: [1,3,4,5,10] ✓  sorted ascending`,
        time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(1) heap sort / O(n) heap storage",
        stable: undefined,
        when: "Heap sort when O(n log n) guaranteed AND O(1) space required (rare in practice — quick sort is faster avg). Heap as priority queue for scheduling, Dijkstra, Prim's MST.",
        pros: [
          "Heap sort: O(n log n) worst case AND O(1) space — unique combination",
          "O(1) peek always — no need to scan for max/min",
          "Build heap O(n) — best way to initialise if doing repeated extractions"
        ],
        cons: [
          "Heap sort: poor cache locality — jumps around array randomly",
          "Not stable — quick sort or merge sort preferred if stability needed",
          "No O(log n) search for arbitrary elements"
        ],
        cpp: `// Heap Sort — C++ (O(n log n), O(1) space)
void heapifyDown(vector<int>& arr, int n, int i) {
    int largest = i, l=2*i+1, r=2*i+2;
    if (l<n && arr[l]>arr[largest]) largest=l;
    if (r<n && arr[r]>arr[largest]) largest=r;
    if (largest!=i) { swap(arr[i],arr[largest]); heapifyDown(arr,n,largest); }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    // 1. Build max heap — O(n)
    for (int i=n/2-1; i>=0; i--) heapifyDown(arr,n,i);
    // 2. Extract max repeatedly — O(n log n)
    for (int i=n-1; i>0; i--) {
        swap(arr[0], arr[i]);   // move max to end
        heapifyDown(arr, i, 0); // restore heap on arr[0..i-1]
    }
}

// Complexity summary table:
// Operation    | Time       | Space | Notes
// ─────────────┼────────────┼───────┼──────────────
// Insert       | O(log n)   | O(1)  | bubble up
// Delete root  | O(log n)   | O(1)  | heapify down
// Peek         | O(1)       | O(1)  | arr[0]
// Build heap   | O(n)       | O(1)  | bottom-up
// Heap sort    | O(n log n) | O(1)  | in-place`,
        python: `# Heap Sort — Python
def heapify_down(arr, n, i):
    largest, l, r = i, 2*i+1, 2*i+2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify_down(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    # Build max heap — O(n)
    for i in range(n//2-1, -1, -1):
        heapify_down(arr, n, i)
    # Extract max repeatedly — O(n log n)
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # move max to end
        heapify_down(arr, i, 0)           # restore heap
    return arr

# Quick recap of all heap operations:
# heapq.heappush(h, x)      O(log n) — insert
# heapq.heappop(h)          O(log n) — delete min
# h[0]                      O(1)     — peek min
# heapq.heapify(arr)        O(n)     — build heap
# heapq.nlargest(k, arr)    O(n log k) — top k largest
# heapq.nsmallest(k, arr)   O(n log k) — top k smallest`,
        practice: [
          { name: "Sort an Array (Heap Sort)", diff: "medium" },
          { name: "Reorganize String", diff: "medium" },
          { name: "Minimum Cost to Connect Ropes", diff: "medium" },
          { name: "K Closest Points to Origin", diff: "medium" },
          { name: "Find Median from Data Stream", diff: "hard" }
        ]
      }
    }
  },
  Graphs: {
    icon: "🕸️", diff: "hard",
    desc: "Vertices + edges. BFS, DFS, Dijkstra, Topological Sort, Union-Find — master graphs to unlock competitive programming.",
    subtopics: {
      "Basics & Representation": {
        diff: "easy",
        explanation: "A graph G = (V, E) consists of a set of vertices V (nodes) and edges E (connections). Key terms: Vertex/Node — a point in the graph. Edge — connection between two vertices. Undirected — edge A—B means both A→B and B→A. Directed (Digraph) — edge A→B is one-way only. Degree — number of edges at a vertex. Indegree — incoming edges (directed). Outdegree — outgoing edges (directed). Path — sequence of vertices connected by edges. Cycle — path that starts and ends at same vertex. Connected graph — every vertex reachable from every other. Weighted graph — edges have values (cost, distance). Two representations: Adjacency Matrix — V×V array, O(V²) space, O(1) edge check. Adjacency List — array of lists, O(V+E) space, used in most problems.",
        intuition: "Think of a graph as cities connected by roads: nodes=cities, edges=roads. Questions become: shortest path (Google Maps), connectivity (can I reach B from A?), cycles (is there a loop?). Social network: nodes=people, edges=friendships. The adjacency list is almost always preferred in practice — sparse graphs (few edges) waste O(V²) space with a matrix but only O(V+E) with a list.",
        steps: [
          "ADJACENCY MATRIX: matrix[u][v]=1 if edge u→v exists, 0 otherwise. For weighted: matrix[u][v]=weight. Space O(V²). Edge check O(1). Neighbour scan O(V).",
          "ADJACENCY LIST: adj[u] = list of neighbours of u. Space O(V+E). Neighbour scan O(degree(u)). Used in 99% of interview problems.",
          "UNDIRECTED GRAPH: add edge (u,v) → push v to adj[u] AND push u to adj[v].",
          "DIRECTED GRAPH: add edge (u,v) → push only v to adj[u].",
          "WEIGHTED: store (neighbour, weight) pairs. adj[u] = [(v1,w1), (v2,w2), ...].",
          "CONNECTED vs DISCONNECTED: run BFS/DFS from node 0. If all V nodes visited → connected. Else → disconnected, run again from unvisited nodes for each component."
        ],
        dryRun: `Graph: V={0,1,2,3}, Edges={(0,1),(0,2),(1,3),(2,3)} undirected

Adjacency Matrix (4×4):
     0  1  2  3
  0 [0, 1, 1, 0]
  1 [1, 0, 0, 1]
  2 [1, 0, 0, 1]
  3 [0, 1, 1, 0]
Space: O(4²)=O(16). Edge(0,2)? matrix[0][2]=1 ✓ O(1)

Adjacency List:
  0 → [1, 2]
  1 → [0, 3]
  2 → [0, 3]
  3 → [1, 2]
Space: O(V+E)=O(4+8)=O(12). Better for sparse graphs!

Directed example: 0→1, 1→2, 2→0 (cycle)
  adj[0]=[1], adj[1]=[2], adj[2]=[0]
  indegree: 0→1, 1→1, 2→1
  outdegree: 0→1, 1→1, 2→1

Weighted: 0--(5)-->1, 0--(3)-->2
  adj[0]=[(1,5),(2,3)], adj[1]=[], adj[2]=[]`,
        time: { best: "O(1) matrix edge check", avg: "O(V+E) list traversal", worst: "O(V²) matrix" },
        space: "O(V²) matrix / O(V+E) list",
        stable: undefined,
        when: "Adjacency list for almost everything. Adjacency matrix only when: graph is dense (E ≈ V²), or O(1) edge existence check is critical (e.g. Floyd-Warshall).",
        pros: [
          "Adjacency list: O(V+E) space — efficient for sparse graphs",
          "Adjacency matrix: O(1) edge check — fast for dense graphs",
          "Graphs model any relationship — extremely versatile"
        ],
        cons: [
          "Adjacency matrix: O(V²) space — wasteful for sparse graphs",
          "Adjacency list: O(degree) edge check — not O(1)",
          "Graph problems are harder to visualise and debug than linear structures"
        ],
        cpp: `// Graph Representation — C++
#include <vector>

// Adjacency List (undirected, unweighted)
int V = 4;
vector<vector<int>> adj(V);

void addEdge(int u, int v) {
    adj[u].push_back(v);
    adj[v].push_back(u);  // undirected
}

// Adjacency List (weighted)
vector<vector<pair<int,int>>> wadj(V); // (neighbour, weight)
void addWeightedEdge(int u, int v, int w) {
    wadj[u].push_back({v, w});
    wadj[v].push_back({u, w});
}

// Adjacency Matrix
vector<vector<int>> matrix(V, vector<int>(V, 0));
void addEdgeMatrix(int u, int v) {
    matrix[u][v] = 1;
    matrix[v][u] = 1; // undirected
}
bool hasEdge(int u, int v) { return matrix[u][v] == 1; } // O(1)`,
        python: `# Graph Representation — Python
from collections import defaultdict

# Adjacency List (undirected, unweighted)
adj = defaultdict(list)
def add_edge(u, v):
    adj[u].append(v)
    adj[v].append(u)  # undirected

# Adjacency List (weighted)
wadj = defaultdict(list)
def add_weighted_edge(u, v, w):
    wadj[u].append((v, w))
    wadj[v].append((u, w))

# Build graph from edge list
edges = [(0,1),(0,2),(1,3),(2,3)]
for u, v in edges: add_edge(u, v)

# Adjacency Matrix
V = 4
matrix = [[0]*V for _ in range(V)]
def add_edge_matrix(u, v):
    matrix[u][v] = 1; matrix[v][u] = 1
def has_edge(u, v): return matrix[u][v] == 1  # O(1)`,
        practice: [
          { name: "Find the Town Judge", diff: "easy" },
          { name: "Number of Provinces (components)", diff: "medium" },
          { name: "Clone Graph", diff: "medium" }
        ]
      },
      "BFS & DFS": {
        diff: "medium",
        explanation: "Two fundamental graph traversal algorithms: BFS (Breadth First Search) — uses a queue, explores all neighbours at current level before going deeper. Gives shortest path in unweighted graphs. O(V+E) time, O(V) space. DFS (Depth First Search) — uses recursion or explicit stack, explores as deep as possible before backtracking. Good for cycle detection, connected components, topological sort. O(V+E) time, O(V) space. Critical: always maintain a visited array to avoid infinite loops in cyclic graphs. For disconnected graphs, run BFS/DFS from every unvisited node to reach all components.",
        intuition: "BFS = ripple in water — expands outward layer by layer. All nodes at distance 1 visited before distance 2, etc. This guarantees shortest path in unweighted graphs. DFS = exploring a maze — go as deep as possible, backtrack when stuck. BFS uses a queue (FIFO), DFS uses a stack (LIFO — recursion uses the call stack implicitly).",
        steps: [
          "BFS: enqueue start, mark visited. While queue not empty: dequeue u, process u. For each unvisited neighbour v: mark visited, enqueue v.",
          "DFS (recursive): mark node visited, process. For each unvisited neighbour: recurse.",
          "DFS (iterative): push start to stack. While stack not empty: pop u, if visited skip, else mark and process. Push all neighbours.",
          "DISCONNECTED GRAPH: for each vertex i from 0 to V-1: if not visited: run BFS/DFS(i). Each run = one connected component.",
          "SHORTEST PATH (BFS): track distance array dist[v] = dist[u] + 1 when enqueuing v from u.",
          "VISITED ARRAY: must be size V, initialised false. Never revisit — prevents infinite loops in cyclic graphs."
        ],
        dryRun: `Graph: 0→[1,2], 1→[0,3], 2→[0,3], 3→[1,2]

── BFS from 0 ───────────────────────────────────────
Queue=[0], visited={0}
Dequeue 0: print 0, neighbours 1,2 → enqueue both
  Queue=[1,2], visited={0,1,2}
Dequeue 1: print 1, neighbours 0(visited),3 → enqueue 3
  Queue=[2,3], visited={0,1,2,3}
Dequeue 2: print 2, neighbours 0(v),3(v) → nothing
  Queue=[3]
Dequeue 3: print 3, neighbours 1(v),2(v) → nothing
BFS order: 0 1 2 3 ✓ (level-by-level)
Shortest path 0→3: 0→1→3 or 0→2→3, distance=2 ✓

── DFS from 0 ───────────────────────────────────────
visit(0): print 0, go to 1
  visit(1): print 1, go to 3 (0 visited)
    visit(3): print 3, go to 2 (1 visited)
      visit(2): print 2, (0,3 visited) → backtrack
    backtrack ← 3 ← 1 ← 0
DFS order: 0 1 3 2 ✓ (deep first)`,
        time: { best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" },
        space: "O(V) visited + queue/stack",
        stable: undefined,
        when: "BFS: shortest path in unweighted graph, level-order traversal, multi-source spread (rotten oranges). DFS: cycle detection, connected components, topological sort, backtracking, flood fill.",
        pros: [
          "Both O(V+E) — visit every vertex and edge exactly once",
          "BFS guarantees shortest path in unweighted graphs",
          "DFS is naturally recursive — elegant for tree-like problems"
        ],
        cons: [
          "DFS can stack overflow on deep graphs — use iterative version",
          "BFS uses O(V) queue space — can be large for wide graphs",
          "Must always track visited — forgetting causes infinite loops"
        ],
        cpp: `// BFS and DFS — C++ (from notes)
#include <queue>

// BFS — O(V+E), O(V) space
void bfs(int start, vector<vector<int>>& adj) {
    int V = adj.size();
    vector<bool> visited(V, false);
    queue<int> q;
    q.push(start); visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int nei : adj[node])
            if (!visited[nei]) { visited[nei]=true; q.push(nei); }
    }
}

// DFS recursive — O(V+E), O(V) stack
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int nei : adj[node])
        if (!visited[nei]) dfs(nei, adj, visited);
}

// Handle disconnected graph — run from every unvisited node
void traverseAll(vector<vector<int>>& adj) {
    int V = adj.size();
    vector<bool> visited(V, false);
    for (int i = 0; i < V; i++)
        if (!visited[i]) bfs(i, adj); // or dfs(i, adj, visited)
}

// BFS shortest path
vector<int> bfsShortestPath(int src, vector<vector<int>>& adj) {
    int V = adj.size();
    vector<int> dist(V, -1);
    queue<int> q; q.push(src); dist[src]=0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) if (dist[v]==-1) { dist[v]=dist[u]+1; q.push(v); }
    }
    return dist; // dist[v] = shortest path from src to v
}`,
        python: `# BFS and DFS — Python (from notes)
from collections import deque

# BFS — O(V+E)
def bfs(start, adj):
    visited = [False] * len(adj)
    q = deque([start]); visited[start] = True
    order = []
    while q:
        node = q.popleft(); order.append(node)
        for nei in adj[node]:
            if not visited[nei]:
                visited[nei] = True; q.append(nei)
    return order

# DFS recursive — O(V+E)
def dfs(node, adj, visited):
    visited[node] = True
    result = [node]
    for nei in adj[node]:
        if not visited[nei]:
            result += dfs(nei, adj, visited)
    return result

# Handle disconnected graph
def traverse_all(adj):
    V = len(adj); visited = [False]*V; components = []
    for i in range(V):
        if not visited[i]:
            components.append(bfs(i, adj))
    return components  # list of connected components

# BFS shortest path distances
def bfs_distances(src, adj):
    dist = [-1]*len(adj); dist[src]=0
    q = deque([src])
    while q:
        u = q.popleft()
        for v in adj[u]:
            if dist[v]==-1: dist[v]=dist[u]+1; q.append(v)
    return dist`,
        practice: [
          { name: "Number of Islands (Grid DFS)", diff: "medium" },
          { name: "Shortest Path in Binary Matrix (BFS)", diff: "medium" },
          { name: "Flood Fill (DFS)", diff: "easy" },
          { name: "Word Ladder (BFS)", diff: "hard" }
        ]
      },
      "Shortest Path Algorithms": {
        diff: "hard",
        explanation: "Three shortest path algorithms: (1) BFS — unweighted graphs only. O(V+E). Guarantees shortest path by level-order expansion. (2) Dijkstra's — weighted graph, NO negative edges. Uses a min-heap (priority queue). Always processes the node with smallest current distance. O((V+E) log V). (3) Bellman-Ford — handles negative weights. Relaxes all edges V-1 times. O(VE). Can detect negative cycles (if distance still decreases after V-1 iterations). Floyd-Warshall — all-pairs shortest path. O(V³). DP on intermediate nodes.",
        intuition: "Dijkstra's insight: once a node is popped from the priority queue with distance d, that distance is final — no shorter path exists (because all edge weights are non-negative). This greedy property fails with negative edges (hence Bellman-Ford is needed). Bellman-Ford insight: any shortest path has at most V-1 edges (no cycles in shortest path). So relaxing all edges V-1 times guarantees shortest paths.",
        steps: [
          "DIJKSTRA: dist[src]=0, all others=∞. Push (0,src) to min-heap. While heap not empty: pop (d,u). If d>dist[u] skip. For each (v,w) in adj[u]: if dist[u]+w < dist[v]: update dist[v], push (dist[v],v).",
          "BELLMAN-FORD: dist[src]=0, all others=∞. Repeat V-1 times: for each edge (u,v,w): if dist[u]+w < dist[v]: dist[v]=dist[u]+w. Check: if any edge still relaxes → negative cycle.",
          "FLOYD-WARSHALL: dist[i][j]=weight(i,j) or ∞. For k=0..V-1: for i: for j: dist[i][j]=min(dist[i][j], dist[i][k]+dist[k][j]).",
          "DIJKSTRA COMPLEXITY: O((V+E) log V) with binary heap. Each vertex popped once. Each edge relaxed once. Each heap operation O(log V).",
          "WHY DIJKSTRA FAILS WITH NEGATIVE EDGES: once a node is popped as 'finalised', a later negative edge could make a shorter path — but we don't revisit.",
          "MULTI-SOURCE DIJKSTRA: push all sources with distance 0. Works for 'distance from any source' problems (0-1 BFS for 0/1 weights)."
        ],
        dryRun: `── DIJKSTRA: 0→1(4), 0→2(1), 2→1(2), 1→3(1) ────────
dist=[0,∞,∞,∞], heap=[(0,0)]

Pop (0,0): neighbours 1(4),2(1)
  dist[1]=4 push (4,1), dist[2]=1 push (1,2)
  heap=[(1,2),(4,1)]

Pop (1,2): neighbours 1(via 2: 1+2=3 < 4!)
  dist[1]=3 push (3,1)
  heap=[(3,1),(4,1)]

Pop (3,1): neighbours 3(3+1=4)
  dist[3]=4 push (4,3)
  heap=[(4,1),(4,3)]

Pop (4,1): d=4 == dist[1]=3? No, 4>3 → SKIP (stale)

Pop (4,3): no neighbours → done

Final: dist=[0,3,1,4] ✓
Shortest 0→1=3 (0→2→1, not 0→1=4) ✓

── BELLMAN-FORD: detect negative cycle ──────────────
After V-1=3 iterations, dist=[0,3,1,4]
V-th iteration: if any dist[u]+w < dist[v] → NEGATIVE CYCLE ✗`,
        time: { best: "O(V+E) BFS", avg: "O((V+E)log V) Dijkstra", worst: "O(VE) Bellman-Ford" },
        space: "O(V) dist array + O(V) heap",
        stable: undefined,
        when: "Unweighted → BFS. Weighted, no negatives → Dijkstra. Negative weights → Bellman-Ford. All-pairs → Floyd-Warshall. 0/1 weights → 0-1 BFS (deque).",
        pros: [
          "Dijkstra O((V+E)log V) — efficient for most real-world weighted graphs",
          "Bellman-Ford handles negative weights AND detects negative cycles",
          "BFS gives exact shortest path in unweighted graphs in O(V+E)"
        ],
        cons: [
          "Dijkstra fails on negative edges — must use Bellman-Ford",
          "Bellman-Ford O(VE) — too slow for large sparse graphs",
          "Floyd-Warshall O(V³) — only for small graphs (V ≤ 500)"
        ],
        cpp: `// Dijkstra's Algorithm — C++
#include <queue>
vector<int> dijkstra(int src, vector<vector<pair<int,int>>>& adj) {
    int V = adj.size();
    vector<int> dist(V, INT_MAX);
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue; // stale entry — skip
        for (auto [v, w] : adj[u])
            if (dist[u]+w < dist[v]) { dist[v]=dist[u]+w; pq.push({dist[v],v}); }
    }
    return dist;
}

// Bellman-Ford — O(VE), handles negative weights
vector<int> bellmanFord(int src, int V, vector<tuple<int,int,int>>& edges) {
    vector<int> dist(V, INT_MAX); dist[src]=0;
    for (int i=0; i<V-1; i++)  // relax V-1 times
        for (auto [u,v,w] : edges)
            if (dist[u]!=INT_MAX && dist[u]+w < dist[v]) dist[v]=dist[u]+w;
    // V-th pass: negative cycle check
    for (auto [u,v,w] : edges)
        if (dist[u]!=INT_MAX && dist[u]+w < dist[v]) return {}; // neg cycle!
    return dist;
}`,
        python: `# Dijkstra's Algorithm — Python
import heapq
def dijkstra(src, adj, V):
    dist = [float('inf')] * V; dist[src] = 0
    pq = [(0, src)]  # (distance, node) — min heap
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue  # stale — skip
        for v, w in adj[u]:
            if dist[u]+w < dist[v]:
                dist[v] = dist[u]+w
                heapq.heappush(pq, (dist[v], v))
    return dist

# Bellman-Ford — O(VE)
def bellman_ford(src, V, edges):
    dist = [float('inf')] * V; dist[src] = 0
    for _ in range(V-1):       # relax V-1 times
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u]+w < dist[v]:
                dist[v] = dist[u]+w
    # negative cycle check
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u]+w < dist[v]:
            return None  # negative cycle detected!
    return dist`,
        practice: [
          { name: "Network Delay Time (Dijkstra)", diff: "medium" },
          { name: "Cheapest Flights Within K Stops", diff: "medium" },
          { name: "Path With Minimum Effort", diff: "medium" },
          { name: "Shortest Path in Weighted Graph", diff: "medium" }
        ]
      },
      "Topological Sort & Union-Find": {
        diff: "hard",
        explanation: "Topological Sort: orders vertices of a DAG (Directed Acyclic Graph) such that for every directed edge u→v, u comes before v. Two algorithms: (1) Kahn's Algorithm (BFS) — compute indegree of all vertices, enqueue all with indegree 0, process queue and reduce indegree of neighbours, enqueue when indegree hits 0. Result is a valid topological order. (2) DFS-based — run DFS, on post-order add node to stack, reverse stack. Union-Find (Disjoint Set Union): tracks connected components efficiently. find(x) — finds the root/representative of x's component with path compression O(α(n)). union(x,y) — merges components of x and y using union by rank. Used for: cycle detection in undirected graphs, Kruskal's MST, checking if adding edge creates a cycle.",
        intuition: "Topological sort models task dependencies: if task A must complete before task B, then A→B. Kahn's processes tasks with no remaining prerequisites first — exactly like a build system resolving dependencies. If the topological order doesn't include all V vertices, the graph has a cycle (not a DAG). Union-Find's path compression makes find() nearly O(1) — after the first call, nodes point directly to their root.",
        steps: [
          "KAHN'S (BFS topo sort): compute indegree[]. Enqueue all indegree==0 nodes. While queue: pop u, add to result, for each v in adj[u]: indegree[v]--, if indegree[v]==0 enqueue v. If |result|<V → cycle exists.",
          "DFS TOPO SORT: run DFS. After all neighbours of u are visited: push u to stack. Reverse stack = topological order.",
          "UNION-FIND INIT: parent[i]=i, rank[i]=0 for all i.",
          "FIND with path compression: if parent[x]!=x: parent[x]=find(parent[x]). Return parent[x].",
          "UNION by rank: find roots rx=find(x), ry=find(y). If rx==ry → already same component (cycle!). Else: attach lower rank root under higher rank root.",
          "CYCLE DETECTION (undirected): for each edge (u,v): if find(u)==find(v) → cycle! Else: union(u,v)."
        ],
        dryRun: `── KAHN'S TOPO SORT: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1 ─
indegree: 0→2, 1→2, 2→1, 3→1, 4→0, 5→0
Queue=[4,5] (indegree=0)

Pop 4: result=[4], reduce: 0→1, 1→1 → none hit 0
Pop 5: result=[4,5], reduce: 2→0,0→0 → enqueue 2,0
Queue=[2,0]

Pop 2: result=[4,5,2], reduce: 3→0 → enqueue 3
Pop 0: result=[4,5,2,0], no neighbours

Pop 3: result=[4,5,2,0,3], reduce: 1→0 → enqueue 1
Pop 1: result=[4,5,2,0,3,1]

|result|=6=V → no cycle, valid topo sort ✓

── UNION-FIND: edges (0,1),(1,2),(2,0) cycle detection ─
parent=[0,1,2,3]
Edge(0,1): find(0)=0, find(1)=1 → different → union(0,1)
  parent=[0,0,2,3] (1's parent = 0)
Edge(1,2): find(1)=0, find(2)=2 → different → union(0,2)
  parent=[0,0,0,3]
Edge(2,0): find(2)=0, find(0)=0 → SAME! → CYCLE ✓`,
        time: { best: "O(V+E) topo sort", avg: "O(V+E)", worst: "O(α(n)) union-find" },
        space: "O(V) indegree / parent arrays",
        stable: undefined,
        when: "Topo sort: course scheduling, build systems, dependency resolution — any DAG ordering problem. Union-Find: cycle detection, Kruskal's MST, connected components, network connectivity.",
        pros: [
          "Kahn's simultaneously detects cycles (result size < V → cycle)",
          "Union-Find with compression+rank is nearly O(1) per operation",
          "Both are essential for graph competitions and system design"
        ],
        cons: [
          "Topo sort only works on DAGs — fails on cyclic graphs",
          "DFS topo sort harder to implement correctly than Kahn's",
          "Union-Find doesn't support edge deletion"
        ],
        cpp: `// Topological Sort (Kahn's BFS) — C++
vector<int> topoSort(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0), result;
    for (int u=0;u<V;u++) for (int v:adj[u]) indegree[v]++;
    queue<int> q;
    for (int i=0;i<V;i++) if (indegree[i]==0) q.push(i);
    while (!q.empty()) {
        int u=q.front(); q.pop(); result.push_back(u);
        for (int v:adj[u]) if (--indegree[v]==0) q.push(v);
    }
    return result.size()==V ? result : {}; // empty = cycle!
}

// Union-Find with path compression + rank
class UnionFind {
    vector<int> parent, rank_;
public:
    UnionFind(int n): parent(n), rank_(n,0) { iota(parent.begin(),parent.end(),0); }

    int find(int x) {                          // path compression
        if (parent[x]!=x) parent[x]=find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {                 // false = already same = cycle
        int rx=find(x), ry=find(y);
        if (rx==ry) return false;
        if (rank_[rx]<rank_[ry]) swap(rx,ry);
        parent[ry]=rx;
        if (rank_[rx]==rank_[ry]) rank_[rx]++;
        return true;
    }
};`,
        python: `# Topological Sort (Kahn's) + Union-Find — Python
from collections import deque

def topo_sort(V, adj):
    indegree = [0]*V
    for u in range(V):
        for v in adj[u]: indegree[v]+=1
    q = deque(i for i in range(V) if indegree[i]==0)
    result = []
    while q:
        u = q.popleft(); result.append(u)
        for v in adj[u]:
            indegree[v]-=1
            if indegree[v]==0: q.append(v)
    return result if len(result)==V else []  # empty = cycle

# Union-Find with path compression + union by rank
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0]*n

    def find(self, x):                    # path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def unite(self, x, y):               # returns False if cycle
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False         # same component = cycle!
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx]+=1
        return True`,
        practice: [
          { name: "Course Schedule (Topo Sort + Cycle)", diff: "medium" },
          { name: "Course Schedule II (ordering)", diff: "medium" },
          { name: "Number of Connected Components (Union-Find)", diff: "medium" },
          { name: "Redundant Connection (Cycle Union-Find)", diff: "medium" }
        ]
      },
      "Important Patterns & Problems": {
        diff: "medium",
        explanation: "Five critical graph patterns: (1) Grid as Graph — treat each cell as a node, edges to 4 (or 8) neighbours. Number of Islands, Rotten Oranges, Flood Fill. (2) Multi-source BFS — enqueue ALL starting nodes simultaneously. Rotten Oranges, 01 Matrix, Pacific Atlantic. (3) Cycle Detection — undirected: DFS with parent tracking or Union-Find. Directed: DFS with color/state (white=unvisited, grey=in-stack, black=done). (4) Bipartite Check — 2-color graph with BFS/DFS. If neighbour has same color → not bipartite. (5) Connected Components — run DFS/BFS from each unvisited node, count runs.",
        intuition: "Grid problems are just graph problems in disguise — every cell is a vertex, every adjacency is an edge. Multi-source BFS is the key insight for problems like 'distance from any rotten orange' — start all sources at level 0 simultaneously. Bipartite check: try to 2-colour the graph. If you can't (a neighbour gets the same colour) → odd cycle → not bipartite.",
        steps: [
          "GRID TRAVERSAL: dx=[-1,0,1,0], dy=[0,1,0,-1]. For each direction: nx=x+dx[i], ny=y+dy[i]. Check bounds: 0<=nx<rows and 0<=ny<cols.",
          "NUMBER OF ISLANDS: for each unvisited land cell: DFS/BFS to mark entire island as visited, count++.",
          "ROTTEN ORANGES: multi-source BFS. Push all initially rotten cells (level 0). BFS spreads rot. Answer = max levels if all fresh oranges reached.",
          "CYCLE UNDIRECTED: DFS with parent. If neighbour is visited and not parent → cycle.",
          "CYCLE DIRECTED: DFS with 3 states. State 0=unvisited, 1=in-stack (grey), 2=done (black). If DFS reaches grey node → back edge → cycle.",
          "BIPARTITE: BFS/DFS with 2-coloring. color[src]=0. For each neighbour v: if not colored: color[v]=1-color[u]. If color[v]==color[u] → not bipartite."
        ],
        dryRun: `── NUMBER OF ISLANDS ─────────────────────────────────
Grid:
  1 1 0 0
  1 0 0 1
  0 0 1 1
  0 0 0 0

(0,0)=1, unvisited → DFS: mark (0,0),(0,1),(1,0) → island 1
(1,3)=1, unvisited → DFS: mark (1,3) → island 2
(2,2)=1, unvisited → DFS: mark (2,2),(2,3) → island 3
Answer: 3 islands ✓

── BIPARTITE CHECK: 0-1-2-3-0 (4-cycle) ─────────────
color: [-1,-1,-1,-1]
BFS from 0: color[0]=0
  neighbor 1: color[1]=1
    neighbor 2: color[2]=0
      neighbor 3: color[3]=1
        neighbor 0: color[0]=0 ≠ color[3]=1 → OK
All colored without conflict → BIPARTITE ✓

── DIRECTED CYCLE: 0→1→2→0 ─────────────────────────
DFS(0): state[0]=1 (grey)
  DFS(1): state[1]=1
    DFS(2): state[2]=1
      neighbor 0: state[0]=1 (grey) → BACK EDGE → CYCLE ✗`,
        time: { best: "O(V+E) or O(rows×cols)", avg: "O(V+E)", worst: "O(V+E)" },
        space: "O(V) visited/color arrays",
        stable: undefined,
        when: "Grid problems → grid-as-graph with BFS/DFS. Multiple starting points → multi-source BFS. Detecting cycles → undirected=parent-DFS/UnionFind, directed=3-color DFS. Graph coloring → bipartite check.",
        pros: [
          "Grid-as-graph unifies all 2D traversal problems under one framework",
          "Multi-source BFS solves 'spread from all sources' in one pass",
          "3-color DFS reliably detects directed cycles"
        ],
        cons: [
          "Grid bounds checking is error-prone — always validate before accessing",
          "Multi-source BFS initialization (all sources at once) is non-obvious",
          "Directed vs undirected cycle detection use different approaches — easy to mix up"
        ],
        cpp: `// Important Graph Patterns — C++

// 1. Grid DFS — Number of Islands
int numIslands(vector<vector<char>>& grid) {
    int rows=grid.size(), cols=grid[0].size(), count=0;
    int dx[]={-1,0,1,0}, dy[]={0,1,0,-1};
    function<void(int,int)> dfs=[&](int x, int y){
        if(x<0||x>=rows||y<0||y>=cols||grid[x][y]!='1') return;
        grid[x][y]='0'; // mark visited
        for(int i=0;i<4;i++) dfs(x+dx[i],y+dy[i]);
    };
    for(int i=0;i<rows;i++) for(int j=0;j<cols;j++)
        if(grid[i][j]=='1') { dfs(i,j); count++; }
    return count;
}

// 2. Bipartite Check — BFS
bool isBipartite(vector<vector<int>>& adj) {
    int V=adj.size(); vector<int> color(V,-1);
    for(int s=0;s<V;s++) {
        if(color[s]!=-1) continue;
        queue<int> q; q.push(s); color[s]=0;
        while(!q.empty()) {
            int u=q.front(); q.pop();
            for(int v:adj[u]) {
                if(color[v]==-1){color[v]=1-color[u];q.push(v);}
                else if(color[v]==color[u]) return false; // conflict!
            }
        }
    }
    return true;
}

// 3. Directed Cycle Detection — DFS 3-color
bool hasCycleDir(int u, vector<vector<int>>& adj, vector<int>& state) {
    state[u]=1; // grey = in stack
    for(int v:adj[u]) {
        if(state[v]==1) return true;  // back edge!
        if(state[v]==0 && hasCycleDir(v,adj,state)) return true;
    }
    state[u]=2; return false;         // black = done
}`,
        python: `# Important Graph Patterns — Python

# 1. Number of Islands — Grid DFS
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    def dfs(x, y):
        if x<0 or x>=rows or y<0 or y>=cols or grid[x][y]!='1': return
        grid[x][y]='0'  # mark visited
        for dx,dy in [(-1,0),(1,0),(0,-1),(0,1)]: dfs(x+dx,y+dy)
    count=0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j]=='1': dfs(i,j); count+=1
    return count

# 2. Bipartite Check — BFS
from collections import deque
def is_bipartite(adj):
    V=len(adj); color=[-1]*V
    for s in range(V):
        if color[s]!=-1: continue
        q=deque([s]); color[s]=0
        while q:
            u=q.popleft()
            for v in adj[u]:
                if color[v]==-1: color[v]=1-color[u]; q.append(v)
                elif color[v]==color[u]: return False
    return True

# 3. Rotten Oranges — Multi-source BFS
def oranges_rotting(grid):
    rows,cols=len(grid),len(grid[0])
    q=deque(); fresh=0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j]==2: q.append((i,j,0))  # all sources at once!
            elif grid[i][j]==1: fresh+=1
    minutes=0
    while q:
        x,y,t=q.popleft()
        for dx,dy in [(-1,0),(1,0),(0,-1),(0,1)]:
            nx,ny=x+dx,y+dy
            if 0<=nx<rows and 0<=ny<cols and grid[nx][ny]==1:
                grid[nx][ny]=2; fresh-=1; minutes=t+1; q.append((nx,ny,t+1))
    return minutes if fresh==0 else -1`,
        practice: [
          { name: "Number of Islands", diff: "medium" },
          { name: "Rotten Oranges (Multi-source BFS)", diff: "medium" },
          { name: "Is Graph Bipartite?", diff: "medium" },
          { name: "Detect Cycle in Directed Graph", diff: "medium" },
          { name: "Pacific Atlantic Water Flow", diff: "medium" },
          { name: "Surrounded Regions", diff: "medium" }
        ]
      }
    }
  },
  "Dynamic Programming": {
    icon: "💡", diff: "hard",
    desc: "Break + store + reuse. Overlapping subproblems + optimal substructure. The crown jewel of FAANG interviews.",
    subtopics: {
      "Basics & Two Properties": {
        diff: "medium",
        explanation: "Dynamic Programming (DP) solves complex problems by breaking them into smaller overlapping subproblems and storing their results to avoid recomputation. DP works ONLY when two properties hold: (1) Overlapping Subproblems — the same subproblems are solved multiple times. Example: fib(5)=fib(4)+fib(3), and fib(4) again calls fib(3) — repetition. (2) Optimal Substructure — the optimal solution can be built from optimal solutions of its subproblems. Example: shortest path from A to C through B = shortest(A,B) + shortest(B,C). Key terms: State — what a subproblem represents (e.g. dp[i] = answer for first i elements). Transition — how states relate (e.g. dp[i]=dp[i-1]+dp[i-2]). Base Case — smallest known subproblem. Memoization — top-down DP (recursion + cache). Tabulation — bottom-up DP (iterative table).",
        intuition: "Think of DP as: 'Store results so you don't recompute.' Climbing stairs analogy: to reach stair n, you came from stair n-1 or n-2. Instead of recalculating all paths every time, store how many ways to reach each stair. DP thinking process: (1) Identify repeating work (draw the recursion tree). (2) Store results. (3) Build solution from smaller answers. The key difference from divide-and-conquer: in D&C, subproblems are independent. In DP, subproblems OVERLAP — hence storing is beneficial.",
        steps: [
          "STEP 1 — DEFINE STATE: What does dp[i] (or dp[i][j]) represent? Be precise. Example: dp[i] = number of ways to climb to stair i.",
          "STEP 2 — DEFINE TRANSITION: How does dp[i] relate to smaller subproblems? Example: dp[i] = dp[i-1] + dp[i-2] (came from 1 or 2 steps back).",
          "STEP 3 — BASE CASES: What are the smallest known values? Example: dp[0]=1 (one way to stay at ground), dp[1]=1.",
          "STEP 4 — COMPUTE ORDER: Tabulation: iterate i=0..n. Memoization: recurse top-down, cache results.",
          "CHECK OVERLAPPING SUBPROBLEMS: draw recursion tree. If same (n,args) appears twice → DP applicable.",
          "CHECK OPTIMAL SUBSTRUCTURE: can you express optimal(problem) in terms of optimal(subproblems)? If yes → DP works."
        ],
        dryRun: `── FIBONACCI — Why DP? ──────────────────────────────
Naive recursion tree for fib(5):
            fib(5)
          /        \\
       fib(4)    fib(3) ← computed TWICE
      /    \\    /    \\
  fib(3) fib(2) fib(2) fib(1) ← fib(2) THRICE
  ...
Total calls: O(2^n) ✗

With Memoization (cache fib(3)=2 on first call):
fib(5) → fib(4) → fib(3) → fib(2) → fib(1)=1
                             ↓ cache
                          fib(0)=0
              ↑ cache[2]=1, cache[3]=2, cache[4]=3
fib(5) = cache[4]+cache[3] = 3+2 = 5 ✓
Total calls: O(n) ✓

TWO PROPERTIES CHECK:
  Overlapping subproblems? fib(3) called multiple times → YES ✓
  Optimal substructure?    fib(n) = fib(n-1)+fib(n-2) → YES ✓
  → DP applicable ✓`,
        time: { best: "O(n) with DP", avg: "O(n)", worst: "O(2^n) naive" },
        space: "O(n) memo/tab / O(1) optimised",
        stable: undefined,
        when: "Use DP when: problem asks for min/max/count/feasibility, has overlapping subproblems and optimal substructure. If greedy gives optimal → use greedy (simpler). If only one solution path → use recursion without memoization.",
        pros: [
          "Reduces exponential to polynomial time (O(2^n) → O(n) or O(n²))",
          "Guarantees optimal solution — unlike greedy",
          "Two approaches (memo/tabulation) — use whichever is cleaner"
        ],
        cons: [
          "State definition is the hard part — gets complex for 2D/3D DP",
          "O(n²) or O(n×W) space can be prohibitive for large inputs",
          "Not applicable when subproblems are independent (use D&C instead)"
        ],
        cpp: `// DP Basics — C++

// Fibonacci — Memoization (top-down)
#include <unordered_map>
unordered_map<int,long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];  // cache hit!
    return memo[n] = fib(n-1) + fib(n-2);
}

// Fibonacci — Tabulation (bottom-up)
long long fibTab(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n+1);
    dp[0]=0; dp[1]=1;
    for (int i=2; i<=n; i++)
        dp[i] = dp[i-1] + dp[i-2];  // transition
    return dp[n];
}

// Fibonacci — Space Optimised O(1)
long long fibOpt(int n) {
    if (n<=1) return n;
    long long a=0, b=1;
    for (int i=2; i<=n; i++) { long long c=a+b; a=b; b=c; }
    return b;
}

// Climbing Stairs (same as Fibonacci)
int climbStairs(int n) {
    if (n<=1) return 1;
    int a=1, b=1;
    for (int i=2; i<=n; i++) { int c=a+b; a=b; b=c; }
    return b;
}`,
        python: `# DP Basics — Python

# Fibonacci — Memoization with @cache
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Fibonacci — Tabulation (bottom-up)
def fib_tab(n):
    if n <= 1: return n
    dp = [0]*(n+1); dp[1]=1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]  # transition
    return dp[n]

# Fibonacci — Space Optimised O(1)
def fib_opt(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n+1): a, b = b, a+b
    return b

# Climbing Stairs (1 or 2 steps at a time)
def climb_stairs(n):
    if n <= 1: return 1
    a, b = 1, 1
    for _ in range(2, n+1): a, b = b, a+b
    return b

print(climb_stairs(5))  # 8 ways`,
        practice: [
          { name: "Climbing Stairs", diff: "easy" },
          { name: "Fibonacci Number", diff: "easy" },
          { name: "Min Cost Climbing Stairs", diff: "easy" }
        ]
      },
      "1D DP Patterns": {
        diff: "medium",
        explanation: "Three essential 1D DP patterns: (1) Prefix DP — dp[i] depends on dp[i-1] or a few previous states. Climbing stairs, house robber, min cost climbing. (2) Coin Change — dp[amount] = min coins to make that amount. For each coin, update dp[i] = min(dp[i], dp[i-coin]+1). (3) Longest Increasing Subsequence (LIS) — dp[i] = length of LIS ending at index i. O(n²) DP: dp[i] = max(dp[j]+1) for all j<i where arr[j]<arr[i]. O(n log n) with patience sorting + binary search. All 1D DP problems share the pattern: define what dp[i] means precisely, write the recurrence, identify base cases, fill bottom-up.",
        intuition: "House Robber: at each house, you either rob it (can't rob previous) or skip it. dp[i] = max(dp[i-2]+arr[i], dp[i-1]). LIS: for each element, find the longest increasing subsequence ending at that element by checking all previous elements smaller than it. The O(n log n) version maintains a 'patience pile' — always replace the first pile top greater than current element using binary search.",
        steps: [
          "COIN CHANGE (min coins): dp[0]=0, dp[i]=∞ for i>0. For i=1..amount: for each coin c: if i>=c: dp[i]=min(dp[i], dp[i-c]+1). Answer: dp[amount] (∞ means impossible).",
          "COIN CHANGE (number of ways): dp[0]=1. For each coin c: for i=c..amount: dp[i]+=dp[i-c]. (Order matters for permutations vs combinations.)",
          "HOUSE ROBBER: dp[0]=arr[0], dp[1]=max(arr[0],arr[1]). dp[i]=max(dp[i-1], dp[i-2]+arr[i]).",
          "LIS O(n²): dp[i]=1 for all. For i=1..n-1: for j=0..i-1: if arr[j]<arr[i]: dp[i]=max(dp[i],dp[j]+1). Answer: max(dp).",
          "LIS O(n log n): maintain tails[] array. For each x: binary search for first tail >= x, replace it. tails length = LIS length.",
          "WORD BREAK: dp[i] = can first i chars be segmented. dp[0]=true. For i=1..n: for each word w: if dp[i-len(w)] and s[i-len(w):i]==w: dp[i]=true."
        ],
        dryRun: `── COIN CHANGE [1,5,6,9], amount=11 (min coins) ────────
dp = [0,∞,∞,∞,∞,∞,∞,∞,∞,∞,∞,∞]

coin=1: dp[1]=1,dp[2]=2,...dp[11]=11
coin=5: dp[5]=min(5,0+1)=1, dp[6]=min(6,dp[1]+1)=2,...
coin=6: dp[6]=min(2,dp[0]+1)=1!, dp[11]=min(6,dp[5]+1)=2
coin=9: dp[9]=min(4,dp[0]+1)=1!, dp[11]=min(2,dp[2]+1)=2
Final dp[11]=2 (e.g. 5+6=11, or 2+9=11) ✓

── LIS: [10,9,2,5,3,7,101,18] ───────────────────────
i=0: dp=[1]           tails=[10]
i=1: 9<10 → replace   tails=[9]
i=2: 2<9  → replace   tails=[2]
i=3: 5>2  → append    tails=[2,5]
i=4: 3>2,<5→ replace  tails=[2,3]
i=5: 7>3  → append    tails=[2,3,7]
i=6: 101>7→ append    tails=[2,3,7,101]
i=7: 18>7,<101→replace tails=[2,3,7,18]
LIS length = len(tails) = 4 ✓ ([2,3,7,101] or [2,5,7,18])

── HOUSE ROBBER: [2,7,9,3,1] ────────────────────────
dp[0]=2, dp[1]=max(2,7)=7
dp[2]=max(dp[1], dp[0]+9)=max(7,11)=11
dp[3]=max(dp[2], dp[1]+3)=max(11,10)=11
dp[4]=max(dp[3], dp[2]+1)=max(11,12)=12 ✓`,
        time: { best: "O(n)", avg: "O(n) or O(n²)", worst: "O(n×amount) coin change" },
        space: "O(n) / O(amount)",
        stable: undefined,
        when: "Linear sequence optimization (climbing stairs, robber) → 1D DP. Min coins → bottom-up coin change. LIS → O(n²) for small n, O(n log n) for large. Word segmentation → 1D DP with string matching.",
        pros: [
          "1D DP is cleanest — usually O(n) time and space",
          "Space often reducible to O(1) by keeping only last 1-2 values",
          "LIS O(n log n) is elegant binary search optimisation"
        ],
        cons: [
          "Coin change O(n×amount) — large amounts → slow",
          "LIS O(n log n) harder to implement correctly",
          "Order matters: unbounded knapsack (coins with repetition) vs 0/1"
        ],
        cpp: `// 1D DP Patterns — C++

// 1. Coin Change — min coins, O(n×amount)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0] = 0;
    for (int i=1; i<=amount; i++)
        for (int c : coins)
            if (i>=c && dp[i-c]!=INT_MAX)
                dp[i] = min(dp[i], dp[i-c]+1);
    return dp[amount]==INT_MAX ? -1 : dp[amount];
}

// 2. House Robber — O(n), O(1) space
int rob(vector<int>& arr) {
    int a=0, b=0;
    for (int x : arr) { int c=max(b, a+x); a=b; b=c; }
    return b;
}

// 3. LIS — O(n²)
int lis(vector<int>& arr) {
    int n=arr.size(); vector<int> dp(n,1);
    for (int i=1;i<n;i++) for (int j=0;j<i;j++)
        if (arr[j]<arr[i]) dp[i]=max(dp[i],dp[j]+1);
    return *max_element(dp.begin(),dp.end());
}

// 4. LIS — O(n log n) with binary search
int lisOpt(vector<int>& arr) {
    vector<int> tails;
    for (int x : arr) {
        auto it = lower_bound(tails.begin(),tails.end(),x);
        if (it==tails.end()) tails.push_back(x);
        else *it = x; // replace
    }
    return tails.size();
}`,
        python: `# 1D DP Patterns — Python

# 1. Coin Change — min coins
def coin_change(coins, amount):
    dp = [float('inf')]*(amount+1); dp[0]=0
    for i in range(1, amount+1):
        for c in coins:
            if i>=c and dp[i-c]!=float('inf'):
                dp[i] = min(dp[i], dp[i-c]+1)
    return dp[amount] if dp[amount]!=float('inf') else -1

# 2. House Robber — O(n), O(1) space
def rob(arr):
    a = b = 0
    for x in arr: a, b = b, max(b, a+x)
    return b

# 3. LIS — O(n²)
def lis_n2(arr):
    n = len(arr); dp=[1]*n
    for i in range(1,n):
        for j in range(i):
            if arr[j]<arr[i]: dp[i]=max(dp[i],dp[j]+1)
    return max(dp)

# 4. LIS — O(n log n) with bisect
import bisect
def lis_opt(arr):
    tails = []
    for x in arr:
        i = bisect.bisect_left(tails, x)
        if i==len(tails): tails.append(x)
        else: tails[i]=x
    return len(tails)`,
        practice: [
          { name: "Coin Change", diff: "medium" },
          { name: "House Robber", diff: "medium" },
          { name: "Longest Increasing Subsequence", diff: "medium" },
          { name: "Word Break", diff: "medium" },
          { name: "Jump Game II", diff: "medium" }
        ]
      },
      "2D DP Patterns": {
        diff: "hard",
        explanation: "Three classic 2D DP patterns: (1) 0/1 Knapsack — dp[i][w] = max value using first i items with weight capacity w. Either include item i (value[i]+dp[i-1][w-weight[i]]) or exclude it (dp[i-1][w]). O(n×W) time and space. (2) Longest Common Subsequence (LCS) — dp[i][j] = LCS length of s1[0..i-1] and s2[0..j-1]. If chars match: dp[i][j]=dp[i-1][j-1]+1. Else: max(dp[i-1][j], dp[i][j-1]). (3) Grid DP — dp[i][j] = answer at cell (i,j). Usually dp[i][j] = f(dp[i-1][j], dp[i][j-1]). Unique paths, minimum path sum, dungeon game.",
        intuition: "Knapsack think: for each item, make a binary decision — take it or leave it. The 2D table captures all (items-used, capacity-remaining) combinations. LCS: if the last characters match, they MUST be in the LCS — extend by 1. If they don't match, the LCS comes from skipping one character from either string — take the max. Grid DP: each cell's answer depends only on cells above it and to its left.",
        steps: [
          "0/1 KNAPSACK: dp[0][w]=0 for all w. For i=1..n: for w=0..W: dp[i][w]=dp[i-1][w] (skip). If w>=wt[i-1]: dp[i][w]=max(dp[i][w], val[i-1]+dp[i-1][w-wt[i-1]]).",
          "LCS: dp[0][j]=dp[i][0]=0. For i=1..m, j=1..n: if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1. Else dp[i][j]=max(dp[i-1][j],dp[i][j-1]).",
          "EDIT DISTANCE: dp[i][j]=min edits to convert s1[0..i-1] to s2[0..j-1]. If chars match: dp[i][j]=dp[i-1][j-1]. Else: 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
          "UNIQUE PATHS: dp[i][j]=dp[i-1][j]+dp[i][j-1]. Base: dp[0][j]=1, dp[i][0]=1 (only one way along edges).",
          "SPACE OPTIMISE KNAPSACK: use 1D dp[w], iterate w from W down to wt[i]. This prevents using same item twice.",
          "SPACE OPTIMISE LCS: use two rows (prev, curr). Or one row with careful update."
        ],
        dryRun: `── 0/1 KNAPSACK: items=[(wt=1,val=6),(wt=2,val=10),(wt=3,val=12)], W=5 ─
     w=0  1   2   3   4   5
i=0 [ 0,  0,  0,  0,  0,  0]
i=1 [ 0,  6,  6,  6,  6,  6]  (item1: wt=1,val=6)
i=2 [ 0,  6, 10, 16, 16, 16]  (item2: wt=2,val=10)
i=3 [ 0,  6, 10, 16, 18, 22]  (item3: wt=3,val=12)
Max value = dp[3][5] = 22 (item1+item2+item3=1+2+3=6≤5? No)
Actually: item2+item3=2+3=5, val=10+12=22 ✓

── LCS: "ABCBDAB" and "BDCAB" ──────────────────────
     ""  B  D  C  A  B
""  [0,  0, 0, 0, 0, 0]
A   [0,  0, 0, 0, 1, 1]
B   [0,  1, 1, 1, 1, 2]
C   [0,  1, 1, 2, 2, 2]
B   [0,  1, 1, 2, 2, 3]
D   [0,  1, 2, 2, 2, 3]
A   [0,  1, 2, 2, 3, 3]
B   [0,  1, 2, 2, 3, 4]
LCS length = 4 ("BCAB" or "BDAB") ✓`,
        time: { best: "O(n×W) knapsack", avg: "O(n×m) LCS", worst: "O(n×m)" },
        space: "O(n×W) / O(W) space-optimised",
        stable: undefined,
        when: "0/1 Knapsack: take-or-leave item selection. LCS: common subsequence of two sequences. Edit distance: string transformation. Grid DP: pathfinding on grids. Whenever you see two sequences or a grid → think 2D DP.",
        pros: [
          "2D DP systematically handles all combinations of two parameters",
          "Space reducible to O(min(n,m)) for LCS, O(W) for knapsack",
          "LCS is the foundation for diff tools, bioinformatics"
        ],
        cons: [
          "O(n×m) or O(n×W) space — large inputs require optimisation",
          "Printing the actual solution requires backtracking through the table",
          "Multiple 2D DP variations — LCS vs LCS-substring vs edit distance easy to confuse"
        ],
        cpp: `// 2D DP Patterns — C++

// 1. 0/1 Knapsack — O(n×W) time, O(W) space (optimised)
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n=wt.size(); vector<int> dp(W+1,0);
    for (int i=0; i<n; i++)
        for (int w=W; w>=wt[i]; w--)  // MUST go backwards for 0/1!
            dp[w] = max(dp[w], val[i]+dp[w-wt[i]]);
    return dp[W];
}

// 2. LCS — O(n×m)
int lcs(string& s1, string& s2) {
    int m=s1.size(), n=s2.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1,0));
    for (int i=1;i<=m;i++) for (int j=1;j<=n;j++) {
        if (s1[i-1]==s2[j-1]) dp[i][j]=dp[i-1][j-1]+1;
        else dp[i][j]=max(dp[i-1][j],dp[i][j-1]);
    }
    return dp[m][n];
}

// 3. Edit Distance — O(n×m)
int editDist(string& s1, string& s2) {
    int m=s1.size(), n=s2.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1));
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
        dp[i][j]=s1[i-1]==s2[j-1]?dp[i-1][j-1]:1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
    return dp[m][n];
}`,
        python: `# 2D DP Patterns — Python

# 1. 0/1 Knapsack — O(W) space (iterate backwards!)
def knapsack(wt, val, W):
    dp = [0]*(W+1)
    for i in range(len(wt)):
        for w in range(W, wt[i]-1, -1):  # BACKWARDS for 0/1!
            dp[w] = max(dp[w], val[i]+dp[w-wt[i]])
    return dp[W]

# 2. LCS — O(n×m)
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1
            else: dp[i][j]=max(dp[i-1][j],dp[i][j-1])
    return dp[m][n]

# 3. Edit Distance — O(n×m)
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0]=i
    for j in range(n+1): dp[0][j]=j
    for i in range(1,m+1):
        for j in range(1,n+1):
            if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]
            else: dp[i][j]=1+min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])
    return dp[m][n]

# 4. Unique Paths — O(m×n) → O(n) space
def unique_paths(m, n):
    dp = [1]*n
    for _ in range(1, m):
        for j in range(1, n): dp[j]+=dp[j-1]
    return dp[n-1]`,
        practice: [
          { name: "0/1 Knapsack", diff: "medium" },
          { name: "Longest Common Subsequence", diff: "medium" },
          { name: "Edit Distance", diff: "hard" },
          { name: "Unique Paths", diff: "medium" },
          { name: "Minimum Path Sum", diff: "medium" }
        ]
      },
      "Classic Problems": {
        diff: "hard",
        explanation: "Five canonical DP problems every interview candidate must master: (1) Subset Sum — can we partition array to reach target? dp[i][s]=true if first i elements can sum to s. (2) Palindromic Substrings — dp[i][j]=true if s[i..j] is a palindrome. Expand from base cases. (3) Matrix Chain Multiplication — dp[i][j]=min cost to multiply matrices i..j. O(n³). (4) Longest Palindromic Subsequence — LCS(s, reverse(s)). (5) Maximum Rectangle in Histogram — use stack or DP on heights. These problems demonstrate DP's power across different domains: decision, counting, interval, string, and geometric DP.",
        intuition: "Subset Sum is the gateway to knapsack. Palindrome problems often reduce to 2D interval DP. Matrix chain is the classic interval DP — you decide where to split i..j. The order of multiplication matters for cost but not result, and you try all split points. Maximum subarray is the classic Kadane's 1D DP.",
        steps: [
          "SUBSET SUM: dp[s]=true if sum s is achievable. dp[0]=true. For each num: for s=target..num: dp[s] |= dp[s-num]. O(n×target).",
          "PALINDROME CHECK 2D: dp[i][i]=true. dp[i][i+1]=s[i]==s[i+1]. For len=3..n: dp[i][j]=s[i]==s[j] AND dp[i+1][j-1].",
          "LPS (Longest Palindromic Subsequence): lps(s) = lcs(s, reverse(s)). Or dp[i][j] = dp[i+1][j-1]+2 if s[i]==s[j], else max(dp[i+1][j],dp[i][j-1]).",
          "MAX SUBARRAY (Kadane's 1D DP): dp[i]=max(arr[i], dp[i-1]+arr[i]). dp[i] = max subarray ending at i. Answer=max(dp).",
          "MATRIX CHAIN: dp[i][j]=min cost to multiply A[i..j]. For k=i..j-1: dp[i][j]=min(dp[i][k]+dp[k+1][j]+dim[i]*dim[k+1]*dim[j+1]).",
          "PARTITION EQUAL SUBSET SUM: knapsack target=sum/2. If sum is odd → impossible."
        ],
        dryRun: `── SUBSET SUM: arr=[3,1,1], target=5 ──────────────────
dp=[T,F,F,F,F,F] (index = sum)
num=3: dp[3]=dp[0]=T → dp=[T,F,F,T,F,F]
num=1: dp[1]=dp[0]=T,dp[4]=dp[3]=T → dp=[T,T,F,T,T,F]
num=1: dp[2]=dp[1]=T,dp[5]=dp[4]=T → dp=[T,T,T,T,T,T]
dp[5]=True ✓ (3+1+1=5)

── KADANE'S (Max Subarray): [-2,1,-3,4,-1,2,1,-5,4] ─
i=0: cur=-2, max=-2
i=1: cur=max(1,-2+1)=1,    max=1
i=2: cur=max(-3,1-3)=-2,   max=1
i=3: cur=max(4,-2+4)=4,    max=4
i=4: cur=max(-1,4-1)=3,    max=4
i=5: cur=max(2,3+2)=5,     max=5
i=6: cur=max(1,5+1)=6,     max=6 ← answer!
i=7: cur=max(-5,6-5)=1,    max=6
i=8: cur=max(4,1+4)=5,     max=6
Answer: 6 (subarray [4,-1,2,1]) ✓`,
        time: { best: "O(n×target) subset sum", avg: "O(n²) palindrome", worst: "O(n³) matrix chain" },
        space: "O(target) / O(n²)",
        stable: undefined,
        when: "Subset sum/knapsack: can we pick elements to hit target. Palindrome problems: 2D interval DP. Matrix chain/burst balloons: interval DP. Kadane's: max subarray in linear time.",
        pros: [
          "Kadane's: O(n) linear — elegant 1D DP",
          "Subset sum: foundation for all knapsack variants",
          "LPS = LCS of string and reverse — elegant reduction"
        ],
        cons: [
          "Matrix chain O(n³) — only for small n",
          "2D palindrome DP O(n²) — memory can be large",
          "Interval DP order matters: must fill by increasing length"
        ],
        cpp: `// Classic DP Problems — C++

// 1. Maximum Subarray (Kadane's) — O(n)
int maxSubarray(vector<int>& arr) {
    int cur=arr[0], mx=arr[0];
    for(int i=1;i<arr.size();i++){
        cur=max(arr[i], cur+arr[i]);
        mx=max(mx, cur);
    }
    return mx;
}

// 2. Partition Equal Subset Sum — O(n×sum)
bool canPartition(vector<int>& nums) {
    int sum=accumulate(nums.begin(),nums.end(),0);
    if(sum%2) return false;
    int target=sum/2;
    vector<bool> dp(target+1,false); dp[0]=true;
    for(int x:nums) for(int s=target;s>=x;s--) dp[s]|=dp[s-x];
    return dp[target];
}

// 3. Longest Palindromic Subsequence — O(n²)
int lps(string& s) {
    int n=s.size(); string r(s.rbegin(),s.rend());
    return lcs(s,r);  // LCS with reverse!
}

// 4. Palindromic Substrings Count — O(n²)
int countPalindromes(string s) {
    int n=s.size(), count=0;
    auto expand=[&](int l, int r){
        while(l>=0&&r<n&&s[l]==s[r]){count++;l--;r++;}
    };
    for(int i=0;i<n;i++){expand(i,i);expand(i,i+1);}
    return count;
}`,
        python: `# Classic DP Problems — Python

# 1. Kadane's Maximum Subarray — O(n)
def max_subarray(arr):
    cur = mx = arr[0]
    for x in arr[1:]:
        cur = max(x, cur+x)
        mx = max(mx, cur)
    return mx

# 2. Partition Equal Subset Sum — O(n×sum)
def can_partition(nums):
    total = sum(nums)
    if total%2: return False
    target = total//2
    dp = {0}  # achievable sums (using a set)
    for x in nums:
        dp = dp | {s+x for s in dp if s+x<=target}
    return target in dp

# 3. Longest Palindromic Subsequence — O(n²)
def lps(s):
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for i in range(n): dp[i][i]=1
    for length in range(2, n+1):
        for i in range(n-length+1):
            j = i+length-1
            if s[i]==s[j]: dp[i][j]=dp[i+1][j-1]+2
            else: dp[i][j]=max(dp[i+1][j],dp[i][j-1])
    return dp[0][n-1]

# 4. DP on Grid — Minimum Path Sum
def min_path_sum(grid):
    m,n=len(grid),len(grid[0])
    dp=[row[:] for row in grid]
    for i in range(1,m): dp[i][0]+=dp[i-1][0]
    for j in range(1,n): dp[0][j]+=dp[0][j-1]
    for i in range(1,m):
        for j in range(1,n):
            dp[i][j]+=min(dp[i-1][j],dp[i][j-1])
    return dp[m-1][n-1]`,
        practice: [
          { name: "Maximum Subarray (Kadane's)", diff: "medium" },
          { name: "Partition Equal Subset Sum", diff: "medium" },
          { name: "Longest Palindromic Subsequence", diff: "medium" },
          { name: "Burst Balloons (Interval DP)", diff: "hard" },
          { name: "Palindromic Substrings", diff: "medium" }
        ]
      }
    }
  },
  "Greedy Algorithms": {
    icon: "🏆", diff: "medium",
    desc: "Pick locally optimal choice at each step. Activity selection, fractional knapsack, MST, Huffman coding.",
    subtopics: {
      "Basics & Greedy Choice Property": {
        diff: "easy",
        explanation: "A Greedy algorithm builds a solution step by step, always choosing the option that looks best at the current moment (locally optimal choice), hoping this leads to a globally optimal solution. Two properties a problem must have for greedy to work: (1) Greedy Choice Property — making a locally optimal choice at each step leads to a globally optimal solution. (2) Optimal Substructure — an optimal solution can be built from optimal solutions of subproblems (same as DP). Key difference from DP: Greedy commits early decisions and NEVER revisits them. DP tries all options and picks the best. Key difference from Backtracking: Backtracking explores all possibilities. Greedy only explores one path.",
        intuition: "Think like this: 'At every step, what is the best decision I can take right now?' Real-life: filling a bag with maximum value items but limited weight — pick highest value-per-weight item first. Greedy doesn't try all possibilities — it commits immediately. This makes it fast (often O(n log n)) but risky — it can fail if the greedy choice property doesn't hold. Always ask: 'Can a locally bad choice now lead to a globally better solution?' If YES → greedy fails, use DP.",
        steps: [
          "STEP 1: Define the problem — what are you optimising (max/min)?",
          "STEP 2: Identify the greedy choice — what looks best at each step?",
          "STEP 3: Prove it — does local optimal always lead to global optimal? (exchange argument or cut property)",
          "STEP 4: Implement — usually involves sorting first, then a greedy scan.",
          "CHECK: If same denominations of coins, greedy coin change works. For arbitrary coin values it may not — use DP.",
          "GREEDY FAILS: 0/1 Knapsack (can't take fraction), arbitrary coin change, matrix chain multiplication → these need DP."
        ],
        dryRun: `── COIN CHANGE (greedy — works for 1,2,5,10): make 18 ─
Available: [10, 5, 2, 1]
Pick largest ≤ 18: 10 → remaining=8
Pick largest ≤ 8:   5 → remaining=3
Pick largest ≤ 3:   2 → remaining=1
Pick largest ≤ 1:   1 → remaining=0
Coins used: [10,5,2,1] → 4 coins ✓

── COIN CHANGE (greedy FAILS): [1,3,4], target=6 ────
Greedy: 4+1+1=3 coins
Optimal: 3+3=2 coins ✗
Greedy chose 4 first (locally best), missing 3+3
→ Need DP for arbitrary denominations!

── GREEDY VS DP DECISION ─────────────────────────────
Problem                | Greedy? | Why
───────────────────────┼─────────┼────────────────────
Activity selection     | YES ✓   | Earliest end = optimal
Fractional knapsack    | YES ✓   | Take best ratio first
0/1 Knapsack           | NO ✗    | Can't take fractions
Coin change (std)      | YES ✓   | Standard denominations
Coin change (arb)      | NO ✗    | Local≠global optimal
Huffman coding         | YES ✓   | Always merge smallest`,
        time: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(1) or O(n)",
        stable: undefined,
        when: "Use greedy when: problem asks for max/min and choices are independent, greedy choice property provably holds. Always try greedy first — it's simpler and faster. If you can construct a counterexample → use DP.",
        pros: [
          "Extremely fast — O(n log n) or O(n) for most problems",
          "Simple to implement — usually sort + scan",
          "Optimal when greedy choice property holds"
        ],
        cons: [
          "Doesn't always give optimal solution — must prove correctness",
          "No way to backtrack if a choice was wrong",
          "Easy to apply to wrong problems (0/1 knapsack, arbitrary coin change)"
        ],
        cpp: `// Greedy Basics — C++

// Coin change with standard denominations (greedy works)
int minCoins(int amount, vector<int>& coins) {
    sort(coins.rbegin(), coins.rend()); // largest first
    int count = 0;
    for (int c : coins) {
        count += amount / c;   // take as many as possible
        amount %= c;           // remaining
    }
    return amount == 0 ? count : -1;
}

// General framework:
// 1. Identify what to sort by
// 2. Greedy scan with a decision condition
// 3. Never look back

// Greedy choice: always take the "best" item
// What "best" means depends on the problem:
//   Activity selection  → earliest end time
//   Fractional knapsack → highest value/weight ratio
//   Kruskal's MST       → smallest edge weight
//   Huffman coding      → smallest frequency first`,
        python: `# Greedy Basics — Python

# Coin change with standard denominations
def min_coins_greedy(amount, coins):
    coins.sort(reverse=True)  # largest first
    count = 0
    for c in coins:
        count += amount // c   # take as many as possible
        amount %= c
    return count if amount == 0 else -1

# General greedy template:
def greedy_template(items, criteria_key):
    items.sort(key=criteria_key)  # 1. sort by greedy criterion
    result = []
    for item in items:
        if satisfies_condition(item, result):  # 2. check condition
            result.append(item)               # 3. take it
    return result

# Key insight for proving greedy:
# Exchange argument: assume greedy solution G and optimal O differ.
# Show that swapping O's choice for G's choice doesn't worsen O.
# Conclude G is also optimal.`,
        practice: [
          { name: "Assign Cookies", diff: "easy" },
          { name: "Lemonade Change", diff: "easy" },
          { name: "Jump Game", diff: "medium" }
        ]
      },
      "Interval Problems": {
        diff: "medium",
        explanation: "Interval problems are the most common greedy category in interviews: (1) Activity Selection (max non-overlapping intervals) — sort by END time, greedily pick activities with start >= last selected end. Choosing earliest finish leaves maximum room for future activities. (2) Merge Intervals — sort by start time, merge overlapping intervals by extending end. (3) Minimum Platforms — find max overlapping intervals at any point. Sort arrivals and departures separately, sweep. (4) Non-overlapping Intervals (min removals) — same as activity selection: count max non-overlapping, answer = total - max_non_overlapping. (5) Meeting Rooms — can one person attend all? Sort by start, check no overlap.",
        intuition: "Why sort by END time for activity selection? The activity that ends earliest leaves the most room for future activities. If we chose the one with the latest end, we'd block out more of the future. This is the core exchange argument. For merging: after sorting by start, an overlap is simply current.start <= prev.end — just extend prev.end to max(prev.end, current.end).",
        steps: [
          "ACTIVITY SELECTION: sort by end time. Pick first. For each next: if start >= lastEnd → pick, update lastEnd. O(n log n).",
          "MERGE INTERVALS: sort by start. For each interval: if curr.start <= prev.end → merge (extend prev.end). Else → add to result. O(n log n).",
          "MIN PLATFORMS: sort arrivals and departures. Two pointers: if next arrival < next departure → platform++, max_platforms. Else → departure pointer++. O(n log n).",
          "NON-OVERLAPPING REMOVALS: count = n - activitySelection(intervals). O(n log n).",
          "MEETING ROOMS (one person): sort by start. If intervals[i].start < intervals[i-1].end → overlap → return false.",
          "INSERT INTERVAL: find insertion position, merge all overlapping intervals. O(n)."
        ],
        dryRun: `── ACTIVITY SELECTION: [(1,3),(2,4),(3,5),(0,6)] ──────
Sort by end: [(1,3),(2,4),(3,5),(0,6)]
Pick (1,3): lastEnd=3, count=1
(2,4): start=2 < lastEnd=3 → SKIP
(3,5): start=3 >= lastEnd=3 → PICK, lastEnd=5, count=2
(0,6): start=0 < lastEnd=5 → SKIP
Max activities = 2 ✓

── MERGE INTERVALS: [[1,3],[2,6],[8,10],[15,18]] ──────
Sort: [[1,3],[2,6],[8,10],[15,18]] (already sorted)
Start: result=[[1,3]]
[2,6]: 2<=3 → merge → result=[[1,6]]
[8,10]: 8>6 → new → result=[[1,6],[8,10]]
[15,18]: 15>10 → new → result=[[1,6],[8,10],[15,18]] ✓

── MIN PLATFORMS: arrivals=[900,940,950,1100,1500,1800]
                 departs=[910,1200,1120,1130,1900,2000]
Sort both. Two pointers:
  900<910→plat=1,max=1  940<1200→plat=2,max=2
  950<1200→plat=3,max=3 1100<1200→plat=4,max=4... 
  Wait: 1100<1120→plat=4,max=4
  dep=910 processed: 1100>910→plat--=3...
  (process correctly) → max=4 ✓`,
        time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(n) for result",
        stable: undefined,
        when: "Activity selection → max non-overlapping events. Merge intervals → combining overlapping ranges. Min platforms → peak resource usage. Non-overlapping removals → minimum deletions for disjoint intervals.",
        pros: [
          "All interval problems solvable in O(n log n) with greedy",
          "Activity selection is provably optimal by exchange argument",
          "Same sorting (by end time) works for multiple problems"
        ],
        cons: [
          "Wrong sort criterion is the most common bug (start vs end)",
          "Edge cases: touching intervals (start == prev.end) — define clearly",
          "Min platforms: two separate sorts needed (not one combined sort)"
        ],
        cpp: `// Interval Greedy Problems — C++

// 1. Activity Selection — O(n log n)
int maxActivities(vector<pair<int,int>>& acts) {
    sort(acts.begin(), acts.end(), [](auto& a, auto& b){
        return a.second < b.second; // sort by END time!
    });
    int count=1, lastEnd=acts[0].second;
    for (int i=1; i<acts.size(); i++)
        if (acts[i].first >= lastEnd) { count++; lastEnd=acts[i].second; }
    return count;
}

// 2. Merge Intervals — O(n log n)
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res = {intervals[0]};
    for (int i=1; i<intervals.size(); i++) {
        if (intervals[i][0] <= res.back()[1])
            res.back()[1] = max(res.back()[1], intervals[i][1]);
        else res.push_back(intervals[i]);
    }
    return res;
}

// 3. Non-overlapping Intervals (min removals)
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b){
        return a[1] < b[1]; // sort by end!
    });
    int keep=1, lastEnd=intervals[0][1];
    for (int i=1; i<intervals.size(); i++)
        if (intervals[i][0] >= lastEnd) { keep++; lastEnd=intervals[i][1]; }
    return intervals.size() - keep; // removals = total - kept
}`,
        python: `# Interval Greedy Problems — Python

# 1. Activity Selection — max non-overlapping
def max_activities(activities):
    activities.sort(key=lambda x: x[1])  # sort by END!
    count, last_end = 1, activities[0][1]
    for start, end in activities[1:]:
        if start >= last_end: count+=1; last_end=end
    return count

# 2. Merge Intervals — O(n log n)
def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])  # sort by start
    result = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= result[-1][1]:  # overlap
            result[-1][1] = max(result[-1][1], end)
        else:
            result.append([start, end])
    return result

# 3. Non-overlapping Intervals (min removals)
def erase_overlap(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by end!
    keep, last_end = 1, intervals[0][1]
    for start, end in intervals[1:]:
        if start >= last_end: keep+=1; last_end=end
    return len(intervals)-keep  # removals = total - kept

# 4. Min Platforms (Meeting Rooms II)
def min_platforms(arrivals, departures):
    arrivals.sort(); departures.sort()
    platforms=0; max_p=0; j=0
    for arr in arrivals:
        if arr < departures[j]: platforms+=1; max_p=max(max_p,platforms)
        else: j+=1
    return max_p`,
        practice: [
          { name: "Activity Selection / Non-overlapping Intervals", diff: "medium" },
          { name: "Merge Intervals", diff: "medium" },
          { name: "Meeting Rooms II (Min Platforms)", diff: "medium" },
          { name: "Insert Interval", diff: "medium" }
        ]
      },
      "Fractional Knapsack & Scheduling": {
        diff: "medium",
        explanation: "Two classic greedy algorithms: (1) Fractional Knapsack — unlike 0/1 knapsack, you CAN take fractions of items. Sort by value/weight ratio descending. Take full items while capacity allows; take a fraction of the last item. O(n log n). (2) Job Sequencing with Deadlines — each job has a deadline and profit. Schedule jobs to maximise total profit. Sort by profit descending. Assign each job to its latest available slot before deadline. Use a greedy slot allocation. O(n² naive, O(n log n) with DSU). (3) Minimum Cost to Connect Ropes — always merge the two shortest ropes first (min-heap). O(n log n). (4) Huffman Coding — always merge two nodes with smallest frequency. Build prefix-free encoding tree. O(n log n).",
        intuition: "Fractional knapsack: value/weight ratio is the key metric. An item worth 60 with weight 10 (ratio=6) is better than one worth 100 with weight 30 (ratio=3.33) — take it first. Connecting ropes: merging long ropes early means paying their cost repeatedly — always merge shortest first to minimise total cost. Huffman: frequent characters get shorter codes; rare characters get longer codes — always build from the bottom up using two smallest frequency nodes.",
        steps: [
          "FRACTIONAL KNAPSACK: compute ratio=value/weight for each item. Sort descending by ratio. Take full items while W allows. Take fraction: value × (remaining_W / weight). O(n log n).",
          "JOB SEQUENCING: sort by profit descending. Create slots[1..maxDeadline]. For each job: find latest free slot ≤ deadline, assign there. O(n²) or O(n log n) with Union-Find.",
          "CONNECT ROPES: min-heap. While heap.size>1: pop two smallest a,b. cost+=a+b. push(a+b). Return total cost. O(n log n).",
          "HUFFMAN: count frequencies. Min-heap of (freq, node). While size>1: pop two (f1,n1),(f2,n2). Create parent (f1+f2). Push parent. Root = final node.",
          "HUFFMAN CODES: traverse tree. Left=0, right=1. Leaf = code string. Frequent chars → shorter codes.",
          "GAS STATION: total_gas >= total_cost → solution exists. Find starting station: if tank<0 at station i, reset start=i+1."
        ],
        dryRun: `── FRACTIONAL KNAPSACK: W=50 ─────────────────────────
Items: [(val=60,wt=10),(val=100,wt=20),(val=120,wt=30)]
Ratios: 6.0, 5.0, 4.0

Sort by ratio: [(60,10),(100,20),(120,30)]
Take (60,10):  W=40, total=60
Take (100,20): W=20, total=160
Take fraction of (120,30): take 20/30 of it
  total += 120×(20/30) = 80
Total value = 240 ✓

── CONNECT ROPES: [4,3,2,6] ─────────────────────────
heap=[2,3,4,6]
Merge 2+3=5: cost=5,  heap=[4,5,6]
Merge 4+5=9: cost=14, heap=[6,9]
Merge 6+9=15:cost=29, heap=[15]
Total cost = 29 ✓
(greedy always merges two shortest → minimises repeated work)

── HUFFMAN: freq {a:5,b:9,c:12,d:13,e:16,f:45} ─────
heap=[(5,a),(9,b),(12,c),(13,d),(16,e),(45,f)]
Merge a(5)+b(9)=14: heap has (12,c),(13,d),(14,ab),(16,e),(45,f)
Merge c(12)+d(13)=25: heap=(14,ab),(16,e),(25,cd),(45,f)
...continue...
Final: a=1100 (4 bits), b=1101 (4 bits), f=0 (1 bit)
Frequent f gets 1-bit code ✓`,
        time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(n) heap",
        stable: undefined,
        when: "Fractional knapsack → greedy (not 0/1). Connect ropes/merge stones → min-heap greedy. Job scheduling → sort by profit + slot allocation. Huffman → data compression. Gas station → linear scan with greedy restart.",
        pros: [
          "All O(n log n) — much faster than O(n²) or O(2^n) alternatives",
          "Fractional knapsack gives exact optimum (unlike 0/1 which needs DP)",
          "Huffman produces optimal prefix-free codes — provably optimal"
        ],
        cons: [
          "Fractional knapsack: items must be divisible — fails for 0/1",
          "Job sequencing O(n²) naive — needs Union-Find for O(n log n)",
          "Huffman tree construction is complex to implement from scratch"
        ],
        cpp: `// Greedy Scheduling Problems — C++

// 1. Fractional Knapsack — O(n log n)
double fractionalKnapsack(int W, vector<pair<int,int>>& items) {
    // items = {value, weight}
    sort(items.begin(), items.end(), [](auto& a, auto& b){
        return (double)a.first/a.second > (double)b.first/b.second;
    });
    double total = 0;
    for (auto& [v, w] : items) {
        if (W >= w) { total += v; W -= w; }
        else { total += (double)v * W / w; break; }
    }
    return total;
}

// 2. Minimum Cost to Connect Ropes — O(n log n)
int connectRopes(vector<int>& ropes) {
    priority_queue<int,vector<int>,greater<int>> minH(ropes.begin(),ropes.end());
    int cost = 0;
    while (minH.size() > 1) {
        int a=minH.top(); minH.pop();
        int b=minH.top(); minH.pop();
        cost += a+b;
        minH.push(a+b);
    }
    return cost;
}

// 3. Gas Station — O(n), O(1) space
int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total=0, tank=0, start=0;
    for (int i=0; i<gas.size(); i++) {
        total += gas[i]-cost[i];
        tank  += gas[i]-cost[i];
        if (tank < 0) { start=i+1; tank=0; } // reset start
    }
    return total>=0 ? start : -1;
}`,
        python: `# Greedy Scheduling Problems — Python
import heapq

# 1. Fractional Knapsack — O(n log n)
def fractional_knapsack(W, items):
    # items = [(value, weight)]
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    total = 0
    for value, weight in items:
        if W >= weight: total+=value; W-=weight
        else: total += value*(W/weight); break
    return total

# 2. Minimum Cost to Connect Ropes — O(n log n)
def connect_ropes(ropes):
    heapq.heapify(ropes)
    cost = 0
    while len(ropes) > 1:
        a = heapq.heappop(ropes)
        b = heapq.heappop(ropes)
        cost += a+b
        heapq.heappush(ropes, a+b)
    return cost

# 3. Gas Station — O(n), O(1)
def can_complete_circuit(gas, cost):
    total=tank=start=0
    for i,(g,c) in enumerate(zip(gas,cost)):
        total+=g-c; tank+=g-c
        if tank<0: start=i+1; tank=0  # greedy restart
    return start if total>=0 else -1

# 4. Candy (greedy two-pass)
def candy(ratings):
    n=len(ratings); candy=[1]*n
    for i in range(1,n):
        if ratings[i]>ratings[i-1]: candy[i]=candy[i-1]+1
    for i in range(n-2,-1,-1):
        if ratings[i]>ratings[i+1]: candy[i]=max(candy[i],candy[i+1]+1)
    return sum(candy)`,
        practice: [
          { name: "Fractional Knapsack", diff: "medium" },
          { name: "Minimum Cost to Connect Ropes", diff: "medium" },
          { name: "Gas Station", diff: "medium" },
          { name: "Candy", diff: "hard" },
          { name: "Task Scheduler", diff: "medium" }
        ]
      },
      "Greedy vs DP & Complexity": {
        diff: "easy",
        explanation: "When to use Greedy vs DP: Greedy — fast O(n log n), simple, never revisits choices. Works when greedy choice property holds. DP — slower O(n²) or O(n×W), always correct for problems with overlapping subproblems. Key test: construct a counterexample. If greedy can fail (local optimal ≠ global optimal) → use DP. Classic rule: Fractional Knapsack → Greedy works (can take fractions). 0/1 Knapsack → Greedy fails (can't take fractions, must use DP). Coin change with standard denominations → Greedy. Coin change arbitrary → DP. Common greedy patterns: Sort + Select (most problems), Earliest Finish Time (intervals), Highest Profit First (knapsack-like), Minimum Cost First (MST), Greedy + Heap (scheduling).",
        intuition: "The exchange argument is how you prove greedy: assume there's a better solution that doesn't follow the greedy choice. Show you can swap the greedy choice in without worsening the solution. This contradicts the assumption. Therefore, greedy is optimal. If you can't construct this argument → greedy likely fails → use DP.",
        steps: [
          "IS GREEDY APPLICABLE? Try to construct a counterexample. If you can → use DP.",
          "SORTING: most greedy problems start with sorting. Choose sort key carefully.",
          "SCAN: one linear pass after sorting with a greedy decision at each step.",
          "HEAP: some problems need a priority queue to always pick the current best.",
          "PROVE: use exchange argument — show swapping greedy's choice for any other choice doesn't improve the solution.",
          "COMPLEXITY: sorting O(n log n) + linear scan O(n) = O(n log n) total for most greedy."
        ],
        dryRun: `Greedy vs DP — Decision Table:
Problem                  | Greedy | DP     | Reason
─────────────────────────┼────────┼────────┼──────────────────────
Activity selection       | O(n logn)| O(n²) | Greedy provably optimal
Fractional knapsack      | O(n logn)| N/A   | Items divisible
0/1 Knapsack             | FAILS  | O(nW)  | Can't take fractions
Coin change (standard)   | O(n)   | O(nA)  | Greedy works here
Coin change (arbitrary)  | FAILS  | O(nA)  | Counterexample exists
Huffman coding           | O(n logn)| N/A   | Min-heap greedy optimal
LCS / Edit distance      | FAILS  | O(n²)  | No greedy choice exists
Shortest path (unweighted)| O(V+E) | N/A   | BFS is greedy
Shortest path (weighted) | O((V+E)logV)| O(VE)| Dijkstra vs Bellman

Pattern → Algorithm mapping:
  Sort by end time          → Activity selection / intervals
  Sort by value/weight      → Fractional knapsack
  Sort by profit desc       → Job sequencing
  Min-heap of frequencies   → Huffman, connect ropes
  Always pick min/max       → Dijkstra, Prim's MST`,
        time: { best: "O(n)", avg: "O(n log n)", worst: "O(n log n)" },
        space: "O(1) most / O(n) with heap",
        stable: undefined,
        when: "Greedy when: problem is an optimization, greedy property provably holds, exchange argument works. DP when: overlapping subproblems, can't prove greedy, counterexample exists.",
        pros: [
          "O(n log n) vs O(n²) or O(2^n) — massive speed advantage",
          "Simple code — usually sort + one pass",
          "Memory efficient — O(1) extra space for many problems"
        ],
        cons: [
          "Requires proof — can't just assume greedy works",
          "Fails silently on wrong problems — gives wrong answer, not error",
          "Harder to debug when counterexample is non-obvious"
        ],
        cpp: `// Greedy Complexity Reference — C++

// Pattern 1: Sort + Select
// sort(arr, comparator)  → O(n log n)
// single scan            → O(n)
// TOTAL: O(n log n)

// Pattern 2: Greedy + Min Heap
// heapify(arr)   → O(n)
// n × pop/push   → O(n log n)
// TOTAL: O(n log n)

// Common greedy problems and their complexities:
// Activity selection:    O(n log n) — sort by end
// Fractional knapsack:   O(n log n) — sort by ratio
// Job sequencing:        O(n log n) — sort by profit + Union-Find
// Connect ropes:         O(n log n) — min-heap
// Huffman coding:        O(n log n) — min-heap
// Gas station:           O(n) — one pass linear
// Candy:                 O(n) — two passes

// Proving greedy (exchange argument template):
// 1. Let G = greedy solution, O = any optimal solution
// 2. Find first position where G and O differ
// 3. Show swapping O's choice for G's choice doesn't increase cost
// 4. Conclude G is at least as good as O → G is optimal`,
        python: `# Greedy Patterns Summary — Python

# Most greedy problems follow this template:
def greedy_solve(items):
    # Step 1: Define sort key (the "greedy criterion")
    items.sort(key=lambda x: greedy_criterion(x))

    result = initial_state
    for item in items:
        if can_include(item, result):   # greedy decision
            include(item, result)        # commit — never revisit
    return result

# Pattern examples:
# Activity: key=end_time,  condition: start>=last_end
# Fractional: key=-ratio,  condition: always (take fraction if needed)
# Kruskal: key=weight,     condition: doesn't form cycle (Union-Find)

# Quick test if greedy works:
# 1. Write greedy solution
# 2. Try small counterexamples (n=2,3,4)
# 3. If counterexample found → use DP
# 4. If not found after trying → likely greedy works`,
        practice: [
          { name: "Jump Game (Greedy)", diff: "medium" },
          { name: "Jump Game II (Min Jumps)", diff: "medium" },
          { name: "Minimum Number of Arrows to Burst Balloons", diff: "medium" },
          { name: "Partition Labels", diff: "medium" },
          { name: "Minimum Platforms (Scheduling)", diff: "medium" }
        ]
      }
    }
  },
  Backtracking: {
    icon: "↩️", diff: "hard",
    desc: "Try → Explore → Undo. Smarter brute-force with pruning. Subsets, permutations, N-Queens, Sudoku.",
    subtopics: {
      "Basics & Template": {
        diff: "medium",
        explanation: "Backtracking is a problem-solving technique where we build a solution step by step and undo (backtrack) choices that don't lead to a valid solution. It is a smarter brute-force: instead of checking all possibilities blindly, we stop exploring a path as soon as we realize it cannot lead to a solution (pruning). Core pattern: Choose → Explore → Unchoose. Every backtracking problem can be visualized as a decision tree of choices. Key terms: Decision Tree — every node is a choice, every leaf is a complete solution (valid or invalid). Constraint — condition that must be satisfied. Backtrack (Undo) — after exploring one choice, remove it and try the next. Pruning — stop early when current path cannot possibly lead to a valid solution.",
        intuition: "Think of solving a maze: move forward, if you hit a dead end → go back and try another path. Or trying passwords: try one, if wrong try next, if partial match fails → stop early. Key mindset: 'Explore all possibilities, but stop early when invalid.' The undo step is mandatory — without it, choices from one branch contaminate the next branch.",
        steps: [
          "IDENTIFY CHOICES: at each step, what options are available?",
          "IDENTIFY CONSTRAINTS: what conditions must the current path satisfy?",
          "IDENTIFY BASE CASE: when is the solution complete?",
          "TEMPLATE: if base_case: save result. For each choice: if valid(choice): make_choice → recurse → undo_choice.",
          "UNDO STEP: pop_back(), visited[i]=false, etc. Without this, choices leak between branches.",
          "PRUNING: add if(!valid) return early before recursing. Reduces time without changing correctness."
        ],
        dryRun: `── SUBSETS of [1,2]: decision tree ──────────────────────
                    start=[]
                  /           \\
          include 1=[1]      skip to 2
            /       \\              \\
     include 2=[1,2]  skip → [1]  include 2=[2]  skip=[]

Results: [], [1], [1,2], [2]  (2^2=4 subsets) ✓

── TEMPLATE TRACE for subsets([1,2]) ────────────────────
backtrack(idx=0, current=[]):
  save [] ← add to result
  i=0: push(1) → current=[1]
    backtrack(idx=1, current=[1]):
      save [1]
      i=1: push(2) → current=[1,2]
        backtrack(idx=2, current=[1,2]):
          save [1,2]  (no more choices, return)
        pop(2) ← UNDO → current=[1]
      (no more i) return
    pop(1) ← UNDO → current=[]
  i=1: push(2) → current=[2]
    backtrack(idx=2, current=[2]):
      save [2]  (return)
    pop(2) ← UNDO → current=[]
Final: [[],[1],[1,2],[2]] ✓`,
        time: { best: "O(2^n) subsets", avg: "O(n!)", worst: "O(n!)" },
        space: "O(n) recursion depth",
        stable: undefined,
        when: "Use backtracking when: need to enumerate all valid solutions, problem has constraints that prune the search, brute force is too slow but DP doesn't apply (choices depend on path). Pattern triggers: 'all subsets', 'all permutations', 'all combinations', 'is there a valid arrangement'.",
        pros: [
          "Finds ALL valid solutions — complete exploration",
          "Pruning can dramatically reduce actual work (vs pure brute force)",
          "Elegant recursive code — matches problem structure naturally"
        ],
        cons: [
          "Exponential worst case — O(2^n) or O(n!) unavoidable for enumeration",
          "Forgetting the undo step is the most common bug",
          "Stack overflow for very deep recursion"
        ],
        cpp: `// Backtracking Universal Template — C++

void backtrack(State& current, Choices& remaining, Results& result) {
    // Base case: solution is complete
    if (isComplete(current)) {
        result.push_back(current);  // save solution
        return;
    }

    for (each choice in remaining) {
        if (isValid(choice, current)) {  // pruning check
            makeChoice(choice, current);  // CHOOSE
            backtrack(current, remaining, result);  // EXPLORE
            undoChoice(choice, current);  // UNCHOOSE ← mandatory!
        }
    }
}

// Generate all subsets — O(2^n)
void backtrack(int idx, vector<int>& nums,
               vector<int>& cur, vector<vector<int>>& res) {
    res.push_back(cur);  // every state is a valid subset
    for (int i = idx; i < nums.size(); i++) {
        cur.push_back(nums[i]);       // CHOOSE
        backtrack(i+1, nums, cur, res); // EXPLORE
        cur.pop_back();               // UNCHOOSE ← critical!
    }
}`,
        python: `# Backtracking Universal Template — Python
def backtrack(current, choices, result):
    # Base case: solution complete
    if is_complete(current):
        result.append(current[:])  # save a COPY
        return

    for choice in choices:
        if is_valid(choice, current):   # pruning
            make_choice(choice, current)  # CHOOSE
            backtrack(current, choices, result)  # EXPLORE
            undo_choice(choice, current)  # UNCHOOSE ← mandatory!

# Generate all subsets — O(2^n)
def backtrack_subsets(idx, nums, current, result):
    result.append(current[:])    # every state = valid subset
    for i in range(idx, len(nums)):
        current.append(nums[i])            # CHOOSE
        backtrack_subsets(i+1, nums, current, result)  # EXPLORE
        current.pop()                      # UNCHOOSE!

nums = [1, 2, 3]
result = []
backtrack_subsets(0, nums, [], result)
print(result)  # all 2^3=8 subsets`,
        practice: [
          { name: "Subsets (LeetCode 78)", diff: "medium" },
          { name: "Subsets II (with duplicates)", diff: "medium" },
          { name: "Letter Combinations of Phone Number", diff: "medium" }
        ]
      },
      "Permutations & Combinations": {
        diff: "medium",
        explanation: "Three core enumeration problems: (1) Permutations — all orderings of n elements. O(n!). Use a visited/used array to track which elements are in the current permutation. At each level, try all unused elements. (2) Combination Sum — find all combinations from candidates that sum to target. Allow repetition (unbounded). Sort first, start from current index (not 0) to avoid duplicate combinations. Prune when sum exceeds target. (3) Combinations C(n,k) — choose k elements from n without repetition. Start next recursion from i+1. Total solutions = C(n,k).",
        intuition: "Permutations: at each position, try every unused element. A used[] array tracks what's in the current path. Combination sum: since repetition is allowed, recurse with same index i (not i+1). Pruning: if remaining < 0, return. Sorting candidates enables pruning: if candidates[i] > remaining, all further candidates are too large. For C(n,k): pass start index to avoid reusing elements or reversing order.",
        steps: [
          "PERMUTATIONS: used[i]=true → push nums[i] → recurse → pop → used[i]=false. Base: current.size()==nums.size().",
          "PERMUTATIONS WITH DUPS: sort first. Skip if used[i] or (i>0 && nums[i]==nums[i-1] && !used[i-1]).",
          "COMBINATION SUM: sort candidates. For i=start..n: if candidates[i]>remaining break (pruning!). Push → recurse(i, remaining-candidates[i]) → pop.",
          "COMBINATIONS C(n,k): for i=start..n: push(i) → recurse(i+1, k-1) → pop. Base: k==0.",
          "DUPLICATE SUBSETS: sort first. In loop: if i>start && nums[i]==nums[i-1] → skip (avoid duplicates at same level).",
          "PHONE LETTER COMBINATIONS: map digits to letters. For each digit: for each letter: push → recurse(next digit) → pop."
        ],
        dryRun: `── PERMUTATIONS of [1,2,3] ──────────────────────────────
Level 0: try 1,2,3
  Pick 1, used=[T,F,F]:
    Level 1: try 2,3
      Pick 2, used=[T,T,F]:
        Level 2: try 3 → [1,2,3] ✓ save
      Undo 2
      Pick 3 → [1,3,2] ✓ save
    Undo 1
  Pick 2, used=[F,T,F]:
    ... → [2,1,3],[2,3,1]
  Pick 3 → [3,1,2],[3,2,1]
Total: 3!=6 permutations ✓

── COMBINATION SUM: candidates=[2,3,6,7], target=7 ───
Sorted: [2,3,6,7]
backtrack(start=0, remaining=7):
  i=0(2): push2, remaining=5
    i=0(2): push2, remaining=3
      i=0(2): push2, remaining=1
        i=0(2): 2>1 break ← PRUNING
      pop2; i=1(3): 3>1 break
    pop2; i=1(3): push3, remaining=0 → SAVE [2,2,3] ✓
    pop3; i=2(6): 6>2 break
  pop2; i=1(3): push3, remaining=4
    i=1(3): push3, remaining=1 → prune
    pop3; i=2(6): 6>1 break
  ... i=3(7): push7, remaining=0 → SAVE [7] ✓
Results: [[2,2,3],[7]] ✓`,
        time: { best: "O(n!)", avg: "O(n!) perms", worst: "O(2^t/min) combo sum" },
        space: "O(n) depth",
        stable: undefined,
        when: "Permutations: all orderings needed. Combination sum: combinations with repetition that sum to target. C(n,k): choose k from n. Always sort first when duplicates exist.",
        pros: [
          "Pruning (break when sum > target) drastically reduces search space",
          "Sorting enables early termination — all remaining candidates too large",
          "Duplicate handling by sorting + skip condition is clean and reusable"
        ],
        cons: [
          "O(n!) for permutations — unavoidable",
          "Duplicate handling requires careful index logic",
          "Combination sum: without pruning, exponential blow-up"
        ],
        cpp: `// Permutations & Combinations — C++

// 1. Permutations — O(n!)
void permute(vector<int>& nums, vector<int>& cur,
             vector<bool>& used, vector<vector<int>>& res) {
    if (cur.size()==nums.size()) { res.push_back(cur); return; }
    for (int i=0; i<nums.size(); i++) {
        if (used[i]) continue;
        used[i]=true; cur.push_back(nums[i]);    // CHOOSE
        permute(nums, cur, used, res);            // EXPLORE
        cur.pop_back(); used[i]=false;            // UNCHOOSE
    }
}

// 2. Combination Sum (repetition allowed) — prune with sort
void combinationSum(vector<int>& cands, int start, int rem,
                    vector<int>& cur, vector<vector<int>>& res) {
    if (rem==0) { res.push_back(cur); return; }
    for (int i=start; i<cands.size(); i++) {
        if (cands[i]>rem) break;  // PRUNING: sorted, all larger too
        cur.push_back(cands[i]);
        combinationSum(cands, i, rem-cands[i], cur, res); // i not i+1!
        cur.pop_back();
    }
}

// 3. Subsets with duplicates — sort + skip
void subsetsWithDup(int idx, vector<int>& nums,
                    vector<int>& cur, vector<vector<int>>& res) {
    res.push_back(cur);
    for (int i=idx; i<nums.size(); i++) {
        if (i>idx && nums[i]==nums[i-1]) continue; // skip duplicates
        cur.push_back(nums[i]);
        subsetsWithDup(i+1, nums, cur, res);
        cur.pop_back();
    }
}`,
        python: `# Permutations & Combinations — Python

# 1. Permutations — O(n!)
def permutations(nums):
    res, used = [], [False]*len(nums)
    def bt(cur):
        if len(cur)==len(nums): res.append(cur[:]); return
        for i in range(len(nums)):
            if used[i]: continue
            used[i]=True; cur.append(nums[i])   # CHOOSE
            bt(cur)                              # EXPLORE
            cur.pop(); used[i]=False             # UNCHOOSE
    bt([]); return res

# 2. Combination Sum (repetition OK) — O(t^(t/min))
def combination_sum(candidates, target):
    candidates.sort(); res=[]
    def bt(start, cur, rem):
        if rem==0: res.append(cur[:]); return
        for i in range(start, len(candidates)):
            if candidates[i]>rem: break   # PRUNING!
            cur.append(candidates[i])
            bt(i, cur, rem-candidates[i]) # i not i+1 (repetition)
            cur.pop()
    bt(0, [], target); return res

# 3. Subsets II (with duplicates) — sort + skip
def subsets_with_dup(nums):
    nums.sort(); res=[]
    def bt(start, cur):
        res.append(cur[:])
        for i in range(start, len(nums)):
            if i>start and nums[i]==nums[i-1]: continue  # skip dup
            cur.append(nums[i]); bt(i+1, cur); cur.pop()
    bt(0, []); return res`,
        practice: [
          { name: "Permutations", diff: "medium" },
          { name: "Permutations II (with duplicates)", diff: "medium" },
          { name: "Combination Sum", diff: "medium" },
          { name: "Combination Sum II (no repetition)", diff: "medium" },
          { name: "Combinations (C(n,k))", diff: "medium" }
        ]
      },
      "Constraint Problems": {
        diff: "hard",
        explanation: "Constraint-based backtracking problems have strict validity conditions: (1) N-Queens — place N queens on N×N board so no two attack each other (same row, column, or diagonal). Check is_safe before placing. O(N!). (2) Sudoku Solver — fill 9×9 grid with digits 1-9 so each row, column, and 3×3 box has all digits exactly once. For each empty cell, try 1-9, check validity, recurse. Backtrack on failure. (3) Word Search — search for a word in a grid of characters. DFS from each cell, mark as visited, backtrack by unvisiting. (4) Palindrome Partitioning — partition string into all palindromic substrings. Try all possible first palindromes, recurse on remainder.",
        intuition: "N-Queens: at each row, try placing a queen in each column. Check three constraints: column not used, left diagonal (row-col) not used, right diagonal (row+col) not used. Use three hash sets for O(1) constraint checking. Sudoku: find next empty cell, try 1-9, check row+col+box validity. If all cells filled → done. Word Search: DFS with path tracking — mark cell as '#' while exploring (prevents revisit), restore on backtrack.",
        steps: [
          "N-QUEENS: place queens row by row. For each col in row: if not (cols∪diag1∪diag2): place, recurse(row+1), remove. Add to result when row==N.",
          "N-QUEENS VALIDITY O(1): cols set, diag1 set (row-col), diag2 set (row+col). No 2D board scanning.",
          "SUDOKU: find next empty cell. Try digits 1-9. if isValid(r,c,d): board[r][c]=d, recurse, board[r][c]='.' (restore).",
          "SUDOKU VALIDITY: digit not in row r, not in col c, not in 3×3 box (r//3*3+c//3).",
          "WORD SEARCH: for each cell: if grid[r][c]==word[0]: DFS(r,c,0). In DFS: if idx==len(word): return true. Mark cell, try 4 directions, unmark.",
          "PALINDROME PARTITION: for end=start..n: if isPalindrome(s[start:end+1]): push → recurse(end+1) → pop. Base: start==n."
        ],
        dryRun: `── N-QUEENS (N=4) ──────────────────────────────────────
Row 0: try col 0,1,2,3
  col=1: place Q at (0,1). cols={1}, d1={-1}, d2={1}
  Row 1: col=0: d2(0+1=1)∈d2 ✗. col=2: d1(1-2=-1)∈d1 ✗
          col=3: cols,d1,d2 OK → place Q at (1,3)
  Row 2: col=0: OK. Place at (2,0). cols={1,3,0}, d1={-1,2,-2}, d2={1,4,2}
  Row 3: col=2: check col=2 OK, d1(3-2=1)∉d1 OK, d2(3+2=5)∉d2 OK
    → Place at (3,2) → ALL 4 ROWS DONE → SAVE solution ✓
  One solution: .Q.. / ...Q / Q... / ..Q.

── WORD SEARCH: grid, word="ABCCED" ────────────────────
A B C E
S F C S
A D E E

Start DFS at (0,0)='A'=word[0]:
  (0,0)→mark '#', try (0,1)='B'=word[1]
    (0,1)→mark '#', try (0,2)='C'=word[2]
      (0,2)→mark '#', try (1,2)='C'=word[3]
        ... (1,2)→E(2,2)→D(2,1) = "ABCCED" ✓ return True`,
        time: { best: "O(N!)", avg: "O(N!)", worst: "O(9^81) Sudoku" },
        space: "O(N) depth / O(N²) board",
        stable: undefined,
        when: "Constraint satisfaction problems: N-Queens, Sudoku, word search, crossword. Any 'place elements with conditions' problem. Palindrome partitioning for all valid splits of a string.",
        pros: [
          "Constraint checking with sets is O(1) — much better than O(N) board scanning",
          "Pruning makes constraint problems tractable despite exponential search space",
          "Elegant recursive structure matches the problem's natural structure"
        ],
        cons: [
          "Sudoku worst case O(9^81) — but heavily pruned in practice",
          "N-Queens: O(N!) without constraint sets, faster with sets",
          "Complex to debug — use small examples to trace decision tree"
        ],
        cpp: `// Constraint Backtracking — C++

// 1. N-Queens — O(N!)
class NQueens {
    int n; vector<vector<string>> res;
    unordered_set<int> cols, diag1, diag2; // O(1) checks
public:
    vector<vector<string>> solve(int n) {
        this->n=n; vector<string> board(n,string(n,'.'));
        bt(board, 0); return res;
    }
    void bt(vector<string>& board, int row) {
        if (row==n) { res.push_back(board); return; }
        for (int col=0; col<n; col++) {
            if (cols.count(col)||diag1.count(row-col)||diag2.count(row+col)) continue;
            board[row][col]='Q';
            cols.insert(col); diag1.insert(row-col); diag2.insert(row+col);
            bt(board, row+1);
            board[row][col]='.';
            cols.erase(col); diag1.erase(row-col); diag2.erase(row+col);
        }
    }
};

// 2. Sudoku Solver
bool isValid(vector<vector<char>>& b, int r, int c, char d) {
    for (int i=0;i<9;i++) {
        if (b[r][i]==d || b[i][c]==d) return false;
        if (b[r/3*3+i/3][c/3*3+i%3]==d) return false;
    }
    return true;
}
bool solveSudoku(vector<vector<char>>& b) {
    for (int r=0;r<9;r++) for (int c=0;c<9;c++) {
        if (b[r][c]!='.') continue;
        for (char d='1';d<='9';d++) {
            if (!isValid(b,r,c,d)) continue;
            b[r][c]=d;
            if (solveSudoku(b)) return true;
            b[r][c]='.';  // BACKTRACK
        }
        return false; // no digit worked → backtrack higher
    }
    return true; // all cells filled!
}`,
        python: `# Constraint Backtracking — Python

# 1. N-Queens — O(N!) with O(1) constraint check
def solve_n_queens(n):
    res=[]; cols=set(); d1=set(); d2=set()
    board=[['.']*n for _ in range(n)]
    def bt(row):
        if row==n: res.append([''.join(r) for r in board]); return
        for col in range(n):
            if col in cols or row-col in d1 or row+col in d2: continue
            board[row][col]='Q'
            cols.add(col); d1.add(row-col); d2.add(row+col)
            bt(row+1)
            board[row][col]='.'
            cols.discard(col); d1.discard(row-col); d2.discard(row+col)
    bt(0); return res

# 2. Word Search
def exist(grid, word):
    rows,cols=len(grid),len(grid[0])
    def dfs(r,c,idx):
        if idx==len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols or grid[r][c]!=word[idx]: return False
        tmp=grid[r][c]; grid[r][c]='#'  # mark visited
        found=any(dfs(r+dr,c+dc,idx+1) for dr,dc in [(-1,0),(1,0),(0,-1),(0,1)])
        grid[r][c]=tmp  # RESTORE (undo)
        return found
    return any(dfs(r,c,0) for r in range(rows) for c in range(cols))

# 3. Palindrome Partitioning
def partition(s):
    res=[]
    def bt(start, cur):
        if start==len(s): res.append(cur[:]); return
        for end in range(start+1,len(s)+1):
            sub=s[start:end]
            if sub==sub[::-1]:   # isPalindrome check
                cur.append(sub); bt(end,cur); cur.pop()
    bt(0,[]); return res`,
        practice: [
          { name: "N-Queens", diff: "hard" },
          { name: "N-Queens II (count solutions)", diff: "hard" },
          { name: "Sudoku Solver", diff: "hard" },
          { name: "Word Search", diff: "medium" },
          { name: "Palindrome Partitioning", diff: "medium" }
        ]
      },
      "Pruning & Optimisation": {
        diff: "medium",
        explanation: "Pruning is what separates backtracking from pure brute force — it cuts branches of the decision tree that cannot possibly lead to valid solutions. Common pruning strategies: (1) Bound pruning — if current sum > target: return. (2) Constraint propagation — before placing, verify all constraints are satisfiable. (3) Ordering — process most constrained variable first (MRV heuristic in Sudoku: fill cell with fewest valid digits first). (4) Duplicate elimination — sort + skip when nums[i]==nums[i-1] at same level. (5) Visited set — avoid revisiting in path-based problems. Backtracking complexity without pruning = brute force. With good pruning, practical runtime can be orders of magnitude better.",
        intuition: "Pruning works because the decision tree has many invalid branches that can be detected early. In combination sum sorted with [2,3,6,7] for target=7: once we see 6>remaining=5, we break — no need to try 7. In N-Queens: checking a diagonal conflict at row 3 prunes ALL placements in that column for rows 4..N. The earlier you prune, the more branches you eliminate.",
        steps: [
          "SUM PRUNING: if current+candidates[i] > target: break (when sorted).",
          "DUPLICATE SKIP: sort array. In loop: if i>start && nums[i]==nums[i-1]: continue.",
          "VISITED: in grid/path problems, mark cells. Use 2D boolean or temporary char change (grid[r][c]='#').",
          "EARLY TERMINATION: in search problems (word search, N-Queens), return true immediately when found — don't continue exploring.",
          "SORT FOR PRUNING: always sort candidates before combination sum / subset problems. Enables break instead of continue.",
          "STATE VALIDATION: check constraints BEFORE recursing, not after."
        ],
        dryRun: `WITHOUT PRUNING vs WITH PRUNING for combo sum target=7, candidates=[2,3,6,7]:

Without pruning: explore all paths until sum > 7
  Try [2,2,2,2,2] = 10 > 7 → discard (discovered late)
  Try [2,2,2,2,3] = 11 > 7 → discard (discovered late)
  Many unnecessary paths explored...

With pruning (sort + break):
  [2,2,...]: remaining=3 → candidates[2]=6>3 → BREAK
    [2,2,3]: remaining=0 → SAVE ✓ (stopped here)
  [2,3,...]: remaining=2 → candidates[0]=2=2, remaining=0→SAVE [2,2,3]
  Actually [2,3] tried, remaining=2, 2≤2 → [2,3,2] remaining=0→but
  Wait, for combo sum with index tracking this prunes many branches.

DUPLICATE SUBSETS: [1,1,2]
Without skip: [1,2],[1,2] appear twice ✗
With sort + skip at same level: i>start && nums[i]==nums[i-1] → skip
  At level 0: try idx=0(1), then idx=1 but nums[1]==nums[0] → SKIP
  → [1,2] appears exactly once ✓`,
        time: { best: "O(1) with perfect pruning", avg: "Much less than O(n!)", worst: "O(n!) no pruning" },
        space: "O(n) depth",
        stable: undefined,
        when: "Always add pruning to backtracking — it's the difference between TLE and AC. Prune: sum > target, length > limit, constraint violated, duplicate at same level.",
        pros: [
          "Pruning reduces actual runtime from hours to milliseconds on many inputs",
          "Sort + break is the most powerful simple optimisation",
          "Constraint checks O(1) with hash sets instead of O(N) scanning"
        ],
        cons: [
          "Worst case unchanged — pruning doesn't change big-O complexity",
          "Over-pruning (wrong condition) causes missing valid solutions",
          "Complex pruning logic can introduce bugs — test carefully"
        ],
        cpp: `// Pruning Strategies — C++

// 1. Sum pruning — sort candidates first!
void combinationSum(vector<int>& cands, int start, int rem,
                    vector<int>& cur, vector<vector<int>>& res) {
    if (rem==0) { res.push_back(cur); return; }
    for (int i=start; i<cands.size(); i++) {
        if (cands[i]>rem) break;  // PRUNING: sorted → all larger too
        cur.push_back(cands[i]);
        combinationSum(cands, i, rem-cands[i], cur, res);
        cur.pop_back();
    }
}

// 2. Duplicate skipping — sort first!
void subsetsNoDup(int idx, vector<int>& nums,
                  vector<int>& cur, vector<vector<int>>& res) {
    res.push_back(cur);
    for (int i=idx; i<nums.size(); i++) {
        if (i>idx && nums[i]==nums[i-1]) continue;  // SKIP DUPS
        cur.push_back(nums[i]);
        subsetsNoDup(i+1, nums, cur, res);
        cur.pop_back();
    }
}

// 3. Early return on found solution
bool wordSearch(vector<vector<char>>& g, string word, int r, int c, int idx) {
    if (idx==word.size()) return true;  // FOUND → stop immediately
    if (r<0||r>=g.size()||c<0||c>=g[0].size()||g[r][c]!=word[idx]) return false;
    char tmp=g[r][c]; g[r][c]='#';
    bool found = wordSearch(g,word,r+1,c,idx+1) ||  // try all 4
                 wordSearch(g,word,r-1,c,idx+1) ||
                 wordSearch(g,word,r,c+1,idx+1) ||
                 wordSearch(g,word,r,c-1,idx+1);
    g[r][c]=tmp;  // restore
    return found;
}`,
        python: `# Pruning Strategies — Python

# Common pruning patterns:

# 1. Sum pruning (always sort first)
def combo_sum_pruned(cands, target):
    cands.sort()  # MUST sort for break to work
    res=[]
    def bt(start, cur, rem):
        if rem==0: res.append(cur[:]); return
        for i in range(start, len(cands)):
            if cands[i]>rem: break   # PRUNE: sorted, rest are larger
            cur.append(cands[i]); bt(i, cur, rem-cands[i]); cur.pop()
    bt(0,[],target); return res

# 2. Duplicate skipping
def subsets_no_dup(nums):
    nums.sort()  # MUST sort for duplicate check
    res=[]
    def bt(start, cur):
        res.append(cur[:])
        for i in range(start, len(nums)):
            if i>start and nums[i]==nums[i-1]: continue  # SKIP DUPS
            cur.append(nums[i]); bt(i+1, cur); cur.pop()
    bt(0,[]); return res

# 3. Length limit pruning (k-combinations)
def combinations(n, k):
    res=[]
    def bt(start, cur):
        if len(cur)==k: res.append(cur[:]); return
        # PRUNING: not enough elements left
        if n-start+1 < k-len(cur): return
        for i in range(start, n+1):
            cur.append(i); bt(i+1, cur); cur.pop()
    bt(1,[]); return res`,
        practice: [
          { name: "Combination Sum II (no repetition)", diff: "medium" },
          { name: "Subsets II (with duplicates)", diff: "medium" },
          { name: "Rat in a Maze", diff: "medium" },
          { name: "M-Coloring Problem", diff: "medium" },
          { name: "Generate Parentheses (pruned)", diff: "medium" }
        ]
      }
    }
  },
  Tries: {
    icon: "📖", diff: "hard",
    desc: "Prefix trees for autocomplete, spell-check, XOR problems. O(L) insert/search/prefix — faster than hashing for prefix queries.",
    subtopics: {
      "Basics & Structure": {
        diff: "medium",
        explanation: "A Trie (Prefix Tree) stores strings in a hierarchical character-by-character structure. Each node has: (1) children — links to child nodes (26 for lowercase, or a hash map for general alphabets). (2) isEnd — boolean flag marking if a complete word ends here. Each path from root to a node represents a prefix or full word. Key property: words sharing common prefixes share nodes — this saves space and enables fast prefix queries. Unlike a hash map that stores each word independently, a Trie stores 'cat' and 'car' sharing the 'c'→'a' path and only diverging at 't' vs 'r'. All operations — insert, search, startsWith — run in O(L) where L = word length, independent of how many words are stored.",
        intuition: "Think of a Trie like a phone contacts autocomplete: when you type 'ca', the system instantly suggests car, cat, camera because it already grouped all words starting with 'ca'. Instead of checking all words, the Trie narrows search step by step. Key insight: 'If the problem mentions prefix → think Trie immediately.' Hash maps give O(1) lookup but can't answer 'does any word start with this prefix?' efficiently. Tries answer that in O(prefix_length).",
        steps: [
          "INSERT: start at root. For each char c in word: index=c-'a'. If children[index]==null: create new node. Move to children[index]. At last char: set isEnd=true. O(L).",
          "SEARCH: start at root. For each char: if child missing → return false. Move to child. Return node.isEnd (true only if full word exists). O(L).",
          "STARTSWITH: same as search but return true at end (don't check isEnd). O(L).",
          "DIFFERENCE: search('ca') returns false (not a word). startsWith('ca') returns true (prefix exists). isEnd flag is the key distinction.",
          "Array children[26] vs HashMap: array is O(1) access, wastes memory for sparse alphabets. HashMap is memory efficient but slightly slower.",
          "DELETE: find word, unset isEnd. Optionally prune nodes with no children and isEnd=false (bottom-up cleanup)."
        ],
        dryRun: `Words inserted: "cat", "car", "dog"

Trie structure:
root
├── c [isEnd=F]
│   └── a [isEnd=F]
│       ├── t [isEnd=T] ← "cat"
│       └── r [isEnd=T] ← "car"
└── d [isEnd=F]
    └── o [isEnd=F]
        └── g [isEnd=T] ← "dog"

SEARCH "cat": root→c→a→t → isEnd=T → TRUE ✓
SEARCH "ca":  root→c→a   → isEnd=F → FALSE ✓ (not a word)
STARTSWITH "ca": root→c→a → traversal OK → TRUE ✓ (it's a prefix)
STARTSWITH "do": root→d→o → traversal OK → TRUE ✓
SEARCH "dog":  root→d→o→g → isEnd=T → TRUE ✓
SEARCH "dot":  root→d→o→? t not child → FALSE ✓

Space sharing: "cat" and "car" share 3 nodes (root,c,a)
Without Trie: 6 chars stored separately
With Trie: 5 nodes total (c,a,t,r + root) ✓`,
        time: { best: "O(L)", avg: "O(L)", worst: "O(L)" },
        space: "O(N×L) worst / much less with sharing",
        stable: undefined,
        when: "Use Trie when: prefix queries needed (autocomplete, startsWith), many strings share common prefixes, dictionary lookups, word search in grid (Word Search II). Use HashMap when: only exact lookups needed and prefix queries not required.",
        pros: [
          "O(L) all operations — independent of number of stored words",
          "Prefix queries impossible with hash maps — Trie's killer feature",
          "Common prefixes share nodes — space efficient for large vocabularies"
        ],
        cons: [
          "O(N×alphabet_size) space in worst case — can exceed hash map",
          "Pointer-heavy structure — poor cache performance",
          "More complex to implement than hash map"
        ],
        cpp: `// Trie Implementation — C++ (from notes)
class TrieNode {
public:
    TrieNode* children[26];
    bool isEnd;
    TrieNode() {
        fill(children, children+26, nullptr);
        isEnd = false;
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    // Insert — O(L)
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int i = c-'a';
            if (!node->children[i])
                node->children[i] = new TrieNode();
            node = node->children[i];
        }
        node->isEnd = true;
    }

    // Search full word — O(L)
    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int i = c-'a';
            if (!node->children[i]) return false;
            node = node->children[i];
        }
        return node->isEnd; // must be end of word!
    }

    // Prefix check — O(L)
    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int i = c-'a';
            if (!node->children[i]) return false;
            node = node->children[i];
        }
        return true; // just reachable — don't check isEnd
    }
};`,
        python: `# Trie Implementation — Python (from notes)
class TrieNode:
    def __init__(self):
        self.children = {}   # char → TrieNode
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    # Insert — O(L)
    def insert(self, word: str):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    # Search full word — O(L)
    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end  # must be end of word!

    # Prefix check — O(L)
    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True  # don't check is_end`,
        practice: [
          { name: "Implement Trie (Prefix Tree) LeetCode 208", diff: "medium" },
          { name: "Design Add and Search Words (Wildcards)", diff: "medium" },
          { name: "Longest Common Prefix", diff: "easy" }
        ]
      },
      "Important Trie Problems": {
        diff: "hard",
        explanation: "Five canonical Trie problems: (1) Word Search II — find all words from a dictionary in a grid. Build Trie from dictionary, then DFS on each grid cell matching Trie paths. O(M×N×4^L). (2) Search Suggestions System — for each prefix of search query, return 3 lexicographically smallest matching words. Insert all products into Trie, DFS to collect words. (3) Replace Words — replace words in sentence with their shortest root from dictionary. For each word, traverse Trie to find shortest matching prefix. (4) Maximum XOR of Two Numbers — use Binary Trie (bits 0/1). For each number, traverse opposite bits greedily to maximise XOR. O(32n). (5) Count Words with Prefix — add a count field to each node, increment on insert. Query by traversing prefix.",
        intuition: "Word Search II: instead of searching the grid for each word separately (O(words × M×N × 4^L)), build one Trie and search the grid once — the Trie prunes branches where no dictionary word can match. Binary Trie for XOR: store all numbers bit by bit (MSB first). For each query number, greedily go to opposite bit at each level (1→try 0 branch, 0→try 1 branch) to maximise XOR result.",
        steps: [
          "WORD SEARCH II: build Trie from word list. DFS each cell, follow Trie simultaneously. When node.isEnd: add word to results. Prune when Trie node is null. Mark cell '#' during DFS, restore after. Remove found words from Trie to avoid duplicates.",
          "SEARCH SUGGESTIONS: insert all products. For each prefix length 1..n of query: traverse to prefix node, DFS/BFS to collect up to 3 words lexicographically (left-most first). O(total_chars + q×L).",
          "REPLACE WORDS: build Trie from roots. For each word in sentence: traverse Trie char by char. If node.isEnd → replace word with current prefix. If word ends without hitting root → keep original.",
          "MAX XOR (Binary Trie): insert all numbers bit by bit (bit 31 down to 0). For each number x: query by going opposite bit at each step. ans XOR = set bit where opposite exists. O(32n).",
          "COUNT PREFIX: add cnt field to TrieNode, increment on every insert pass-through. Query: traverse prefix, return node.cnt.",
          "AUTOCOMPLETE: DFS from prefix node, collect all words ending at isEnd=true nodes."
        ],
        dryRun: `── REPLACE WORDS: roots=["cat","bat","rat"], sentence="the cattle was rattled by the battery" ──
Trie contains: "cat", "bat", "rat"

Process each word:
"the": c→t: not in trie root → keep "the"
"cattle": c→a→t → isEnd=T at "cat" → replace with "cat"
"was": w not in trie → keep "was"
"rattled": r→a→t → isEnd=T at "rat" → replace with "rat"
"by": b→y: y? No → keep "by"... wait b→a→t isEnd at "bat"
"the": keep
"battery": b→a→t → isEnd=T at "bat" → replace with "bat"
Result: "the cat was rat by the bat" ✓

── BINARY TRIE MAX XOR: [3,10,5,25,2,8] ──────────────
Numbers in binary (5-bit for simplicity):
3=00011, 10=01010, 5=00101, 25=11001, 2=00010, 8=01000

Query for max XOR with 25(11001):
  bit4: want 0 → 0 exists (3,10,5,2,8 all have 0) → take 0 branch, XOR bit=1
  bit3: want 0 → 0 branch (3,5,2) → XOR bit=1
  bit2: want 1 → 1 exists (5=101) → XOR bit=1
  bit1: want 0 → 0 exists (5=101 has 0) → XOR bit=1
  bit0: want 0 → 0 (2=010,10=010) → XOR bit=1
Max XOR = 11111 = 31-ish... (25 XOR 5 = 28, 25 XOR 2=27)
Greedy picks optimal path ✓`,
        time: { best: "O(L) per op", avg: "O(M×N×4^L) word search II", worst: "O(32n) XOR" },
        space: "O(N×L) trie / O(M×N) grid visited",
        stable: undefined,
        when: "Word Search II: find multiple words in grid efficiently. Replace Words: shortest prefix replacement. Max XOR: binary trie greedy. Search suggestions: prefix autocomplete. Whenever the problem has 'many strings' + 'prefix queries' → Trie.",
        pros: [
          "Word Search II: one DFS pass vs searching grid for each word separately",
          "Binary Trie for XOR: O(32n) vs O(n²) brute force",
          "Prefix deletion (replacing found words) prevents duplicate results"
        ],
        cons: [
          "Complex implementation — easy to introduce pointer bugs",
          "Memory-intensive for large vocabularies",
          "Word Search II can still be slow for large grids with long words"
        ],
        cpp: `// Important Trie Problems — C++

// 1. Replace Words
string replaceWords(vector<string>& dict, string sentence) {
    Trie trie;
    for (auto& w : dict) trie.insert(w);

    istringstream iss(sentence); string word, res="";
    while (iss >> word) {
        if (!res.empty()) res += " ";
        // find shortest prefix
        TrieNode* node = trie.root;
        string prefix = "";
        bool found = false;
        for (char c : word) {
            int i=c-'a';
            if (!node->children[i]) break;
            node = node->children[i];
            prefix += c;
            if (node->isEnd) { res+=prefix; found=true; break; }
        }
        if (!found) res += word;
    }
    return res;
}

// 2. Maximum XOR — Binary Trie, O(32n)
struct BitTrie {
    BitTrie* ch[2] = {};
    void insert(int num) {
        BitTrie* node = this;
        for (int i=31; i>=0; i--) {
            int b = (num>>i)&1;
            if (!node->ch[b]) node->ch[b] = new BitTrie();
            node = node->ch[b];
        }
    }
    int maxXOR(int num) {
        BitTrie* node = this; int ans=0;
        for (int i=31; i>=0; i--) {
            int b = (num>>i)&1, want = 1-b; // try opposite bit
            if (node->ch[want]) { ans|=(1<<i); node=node->ch[want]; }
            else if (node->ch[b]) node=node->ch[b];
            else break;
        }
        return ans;
    }
};

int findMaximumXOR(vector<int>& nums) {
    BitTrie* trie = new BitTrie();
    for (int x : nums) trie->insert(x);
    int ans=0;
    for (int x : nums) ans=max(ans, trie->maxXOR(x));
    return ans;
}`,
        python: `# Important Trie Problems — Python

# 1. Replace Words
def replace_words(dictionary, sentence):
    trie = Trie()
    for root in dictionary: trie.insert(root)

    def shortest_root(word):
        node = trie.root
        prefix = ""
        for ch in word:
            if ch not in node.children: return word
            node = node.children[ch]; prefix += ch
            if node.is_end: return prefix  # shortest root found
        return word

    return ' '.join(shortest_root(w) for w in sentence.split())

# 2. Maximum XOR — Binary Trie O(32n)
class BitTrieNode:
    def __init__(self): self.ch = [None, None]

class BitTrie:
    def __init__(self): self.root = BitTrieNode()

    def insert(self, num):
        node = self.root
        for i in range(31, -1, -1):
            b = (num >> i) & 1
            if not node.ch[b]: node.ch[b] = BitTrieNode()
            node = node.ch[b]

    def max_xor(self, num):
        node = self.root; ans = 0
        for i in range(31, -1, -1):
            b = (num >> i) & 1; want = 1-b  # try opposite
            if node.ch[want]: ans |= (1<<i); node = node.ch[want]
            elif node.ch[b]: node = node.ch[b]
        return ans

def find_max_xor(nums):
    bt = BitTrie()
    for x in nums: bt.insert(x)
    return max(bt.max_xor(x) for x in nums)

# 3. Count words with prefix
class CountTrie:
    def __init__(self): self.root = {'cnt':0}

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node: node[ch]={'cnt':0}
            node = node[ch]; node['cnt']+=1  # count words passing through

    def count_prefix(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node: return 0
            node = node[ch]
        return node['cnt']`,
        practice: [
          { name: "Word Search II (Trie + Backtracking)", diff: "hard" },
          { name: "Search Suggestions System", diff: "medium" },
          { name: "Replace Words", diff: "medium" },
          { name: "Maximum XOR of Two Numbers", diff: "medium" },
          { name: "Count Words Beginning with Prefix", diff: "easy" }
        ]
      },
      "Trie vs HashMap & Complexity": {
        diff: "easy",
        explanation: "Trie vs HashMap trade-offs: Trie gives O(L) for all ops + prefix queries. HashMap gives O(1) average for exact lookup but cannot answer 'does any word start with this prefix?' without scanning all keys. For pure exact lookups → HashMap wins. For prefix-heavy workloads → Trie wins. Space: Trie O(N×alphabet) worst case, but shared prefixes reduce this significantly. HashMap O(N×L) stores full strings. Types: Standard Trie (26 children array — fast, memory-heavy). HashMap-based Trie (dict children — memory-efficient, slightly slower). Binary Trie (bits 0/1 — for XOR/bitmask problems). Compressed Trie (merge single-child chains — space efficient). Trie with count (prefix frequency counting).",
        intuition: "The fundamental question: do you need prefix queries? If yes → Trie. If no → HashMap. Real interview tip: when you see 'autocomplete', 'spell check', 'startsWith', 'longest word with all prefixes' → Trie is the answer. When you see 'XOR', 'maximum XOR' → Binary Trie. The Aho-Corasick algorithm extends Trie with failure links to do multi-pattern string matching in O(n+m+k) — used in real grep/search tools.",
        steps: [
          "COMPLEXITY: Insert O(L), Search O(L), StartsWith O(L). All independent of n (number of stored words).",
          "SPACE: O(N×alphabet_size) worst case. Standard: 26 children per node. HashMap Trie: only children that exist.",
          "TRIE VS HASHMAP: Trie → prefix queries, common prefix space sharing. HashMap → O(1) exact lookup, simpler code.",
          "BINARY TRIE: children[0] and children[1]. Bits stored MSB first. Max XOR: greedy pick opposite bit each level.",
          "TRIE WITH COUNT: cnt field incremented on every insert pass-through. Prefix count query = cnt at prefix's last node.",
          "AHO-CORASICK: Trie + failure links (like KMP failure function). Multi-pattern matching O(n + sum|patterns| + matches)."
        ],
        dryRun: `Trie vs HashMap comparison:
Feature          | Trie           | HashMap
─────────────────┼────────────────┼──────────────────
Insert           | O(L)           | O(L) to hash
Search           | O(L)           | O(1) average
Prefix search    | O(L) ✓         | O(n×L) ✗
Space            | O(N×26) worst  | O(N×L)
Common prefixes  | Shared ✓       | Not shared ✗
Implementation   | Complex        | Simple

When to use TRIE:
  ✓ "Does any word start with this prefix?"
  ✓ Autocomplete (return all words with prefix)
  ✓ Longest word where all prefixes exist
  ✓ Replace words with shortest root
  ✓ Maximum XOR (Binary Trie)

When to use HASHMAP:
  ✓ Exact word lookup only
  ✓ No prefix queries needed
  ✓ Simpler implementation preferred

Trie types quick ref:
  Standard Trie    → lowercase strings, 26 children
  Binary Trie      → integers/XOR, 2 children (0,1)
  Compressed Trie  → memory-efficient, merged nodes
  Count Trie       → prefix frequency counting`,
        time: { best: "O(L)", avg: "O(L)", worst: "O(L)" },
        space: "O(N×26) standard / O(N×L) words",
        stable: undefined,
        when: "Prefix query → Trie. Exact lookup only → HashMap. XOR problems → Binary Trie. Multiple pattern search → Aho-Corasick. Autocomplete → Trie + DFS collection.",
        pros: [
          "O(L) prefix search — not possible with hash maps",
          "Space sharing via common prefixes",
          "Binary Trie enables O(32n) max XOR vs O(n²) brute force"
        ],
        cons: [
          "O(N×26) space can exceed HashMap for large alphabets",
          "More complex to implement correctly",
          "Cache-unfriendly pointer chasing"
        ],
        cpp: `// Trie vs HashMap & Types — C++

// Standard Trie (26 children array)
struct TrieNode { TrieNode* ch[26]={}; bool end=false; };

// HashMap Trie (memory-efficient, handles any alphabet)
struct FlexNode {
    unordered_map<char,FlexNode*> ch;
    bool end=false;
};

// Trie with prefix count
struct CountNode {
    CountNode* ch[26]={};
    bool end=false;
    int cnt=0;  // words passing through this node
};
void insertCount(CountNode* root, string& w) {
    CountNode* node=root;
    for (char c:w) {
        int i=c-'a';
        if(!node->ch[i]) node->ch[i]=new CountNode();
        node=node->ch[i];
        node->cnt++;  // increment count
    }
    node->end=true;
}
int countPrefix(CountNode* root, string& p) {
    CountNode* node=root;
    for (char c:p) {
        int i=c-'a';
        if(!node->ch[i]) return 0;
        node=node->ch[i];
    }
    return node->cnt;
}

// Autocomplete — DFS to collect all words under prefix node
vector<string> autocomplete(TrieNode* node, string prefix) {
    vector<string> res;
    function<void(TrieNode*,string)> dfs=[&](TrieNode* n, string cur){
        if (n->end) res.push_back(cur);
        for (int i=0;i<26;i++)
            if (n->ch[i]) dfs(n->ch[i], cur+char('a'+i));
    };
    dfs(node, prefix);
    return res;
}`,
        python: `# Trie Types & Comparison — Python

# 1. HashMap-based Trie (flexible alphabet)
class FlexTrie:
    def __init__(self):
        self.root = {}  # nested dicts, '#' = end marker

    def insert(self, word):
        node = self.root
        for ch in word: node = node.setdefault(ch, {})
        node['#'] = True  # end marker

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node: return False
            node = node[ch]
        return '#' in node

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node: return False
            node = node[ch]
        return True

# 2. Count Trie (prefix frequency)
class CountTrieNode:
    def __init__(self): self.ch={}; self.end=False; self.cnt=0

class CountTrie:
    def __init__(self): self.root=CountTrieNode()

    def insert(self, word):
        node=self.root
        for ch in word:
            if ch not in node.ch: node.ch[ch]=CountTrieNode()
            node=node.ch[ch]; node.cnt+=1
        node.end=True

    def count_prefix(self, prefix):
        node=self.root
        for ch in prefix:
            if ch not in node.ch: return 0
            node=node.ch[ch]
        return node.cnt

# 3. Autocomplete — collect all words under prefix
def autocomplete(trie, prefix):
    node=trie.root
    for ch in prefix:
        if ch not in node.ch: return []
        node=node.ch[ch]
    # DFS to collect all words
    res=[]
    def dfs(n, path):
        if n.end: res.append(path)
        for c,child in n.ch.items(): dfs(child,path+c)
    dfs(node, prefix)
    return res`,
        practice: [
          { name: "Implement Trie", diff: "medium" },
          { name: "Longest Word in Dictionary", diff: "medium" },
          { name: "Index Pairs of a String", diff: "easy" },
          { name: "Design Search Autocomplete System", diff: "hard" },
          { name: "Maximum XOR of Two Numbers in Array", diff: "medium" }
        ]
      }
    }
  }
};

// ─── SYNTAX HIGHLIGHTER ───────────────────────────────────────────
function highlight(code, lang) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let h = esc(code);
  if (lang === "cpp") {
    h = h.replace(/(\/\/.*)/g, '<span class="cm">$1</span>');
    h = h.replace(/\b(void|int|bool|auto|return|if|else|while|for|vector|swap|break|true|false|size_t)\b/g, '<span class="kw">$1</span>');
    h = h.replace(/\b([A-Za-z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');
    h = h.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  } else {
    h = h.replace(/(#.*)/g, '<span class="cm">$1</span>');
    h = h.replace(/\b(def|return|if|else|elif|while|for|import|in|range|len|not|and|or|True|False|None)\b/g, '<span class="kw">$1</span>');
    h = h.replace(/\b([a-z_]\w*)\s*(?=\()/g, '<span class="fn">$1</span>');
    h = h.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  }
  return h;
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────
function Tag({ diff }) {
  const cls = diff === "easy" ? "tag te" : diff === "medium" ? "tag tm" : "tag th";
  return <span className={cls}>{diff}</span>;
}

function CodeBlock({ cpp, python }) {
  const [lang, setLang] = useState("cpp");
  const [copied, setCopied] = useState(false);

  function copyCode() {
    const code = lang === "cpp" ? cpp : python;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div>
      <div className="code-tabs">
        <button className={`ctab${lang === "cpp" ? " active" : ""}`} onClick={() => setLang("cpp")}>C++</button>
        <button className={`ctab${lang === "python" ? " active" : ""}`} onClick={() => setLang("python")}>Python</button>
      </div>
      <div className="cblock cblock-wrap">
        <button className={"copy-btn"+(copied?" copied":"")} onClick={copyCode}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
        <pre dangerouslySetInnerHTML={{ __html: highlight(lang === "cpp" ? cpp : python, lang) }} />
      </div>
    </div>
  );
}

// ─── MEMORY VISUALIZER ──────────────────────────────────────────
function MemViz({ arr, base = 1000, size = 4 }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div className="mem-viz">
        {arr.map((v, i) => (
          <div className="mem-cell" key={i}>
            <div className="mc-val" style={{ borderRight: i === arr.length - 1 ? "1px solid var(--accent)" : "none" }}>{v}</div>
            <div className="mc-idx">[{i}]</div>
            <div className="mc-addr">{base + i * size}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: ".68rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 2 }}>
        index ↑ &nbsp;&nbsp; address ↑ &nbsp;(base={base}, size={size}B)
      </div>
    </div>
  );
}

// ─── NODE VISUALIZER ─────────────────────────────────────────────
function NodeViz({ nodes, showHead = true, hl = {} }) {
  return (
    <div className="ll-viz">
      {nodes.map((n, i) => (
        <div className="ll-node" key={i}>
          <div className="ll-wrap">
            {showHead && i === 0 ? <div className="ll-head-lbl">head</div> : <div style={{ height: 18 }} />}
            <div className="ll-box" style={hl[i] ? { borderColor: hl[i] } : {}}>
              <div className="ll-data" style={hl[i] ? { color: hl[i] } : {}}>{n.val}</div>
              <div className="ll-next">{i < nodes.length - 1 ? "next →" : "next"}</div>
            </div>
            {n.label && <div className="ll-lbl">{n.label}</div>}
          </div>
          {i < nodes.length - 1 && <div className="ll-arrow">→</div>}
          {i === nodes.length - 1 && <div className="ll-null">→ NULL</div>}
        </div>
      ))}
    </div>
  );
}

// ─── SUBTOPIC VIEW ───────────────────────────────────────────────
function SubtopicView({ data, name }) {
  if (!data || Object.keys(data).length === 0)
    return (
      <div className="empty">
        <div className="eicon">🚧</div>
        <div className="etitle">Coming Soon</div>
        <div className="esub">This subtopic is being prepared. Check back soon!</div>
      </div>
    );

  const dryRunHtml = (data.dryRun || "")
    .replace(/✓/g, '<span class="hl">✓</span>')
    .replace(/→/g, '<span style="color:var(--accent2)">→</span>')
    .replace(/⚠/g, '<span style="color:var(--yellow)">⚠</span>');

  const is = (n) => name === n;

  return (
    <div key={name} style={{ animation: "fadeIn .28s ease" }}>
      <div className="ctitle">{name}</div>
      <div className="drow">
        <Tag diff={data.diff} />
        {data.stable !== undefined && (
          <span style={{ fontSize: ".72rem", color: "var(--text3)", background: "var(--bg3)", padding: "2px 10px", borderRadius: 20 }}>
            {data.stable ? "✓ Stable" : "✗ Unstable"}
          </span>
        )}
        <span className="lang-badge lb-cpp">C++</span>
        <span className="lang-badge lb-py">Python</span>
      </div>

      {/* Arrays: memory diagram */}
      {is("Introduction & Memory") && (
        <div className="sec">
          <div className="stitle">Memory Layout</div>
          <div className="prose" style={{ marginBottom: 8 }}>How <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4, fontFamily: "'Space Mono',monospace", fontSize: ".82rem" }}>arr = [10, 20, 30, 40]</code> looks in memory:</div>
          <MemViz arr={[10, 20, 30, 40]} />
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Why O(1) access?</strong> The CPU doesn't iterate — it computes the address directly: <code style={{ fontFamily: "'Space Mono',monospace" }}>1000 + (2 × 4) = 1008</code>. No loops, no traversal.</div>
          </div>
        </div>
      )}

      {/* Key Patterns: pill overview */}
      {is("Key Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Prefix Sum", "Sliding Window", "Two Pointers", "Kadane's Algorithm", "Dutch National Flag", "Binary Search"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 12 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Interview tip:</strong> ~80% of array problems use one of these 6 patterns. Identifying the pattern in the first 2 minutes is the key skill.</div>
          </div>
        </div>
      )}

      {/* Complexity: quick-ref table */}
      {is("Complexity & Edge Cases") && (
        <div className="sec">
          <div className="stitle">Quick Reference Table</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Access arr[i]", "O(1)", "O(1)", "O(1)", "O(1)", "g", "g", "g", "g"],
                ["Search (linear)", "O(1)", "O(n)", "O(n)", "O(1)", "g", "y", "y", "g"],
                ["Insert (middle)", "O(n)", "O(n)", "O(n)", "O(1)", "y", "y", "y", "g"],
                ["Delete (middle)", "O(n)", "O(n)", "O(n)", "O(1)", "y", "y", "y", "g"],
                ["Append (dynamic)", "O(1)", "O(1)*", "O(n)", "O(1)", "g", "g", "y", "g"],
                ["Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)", "g", "g", "g", "g"],
              ].map(([op, b, avg, w, sp, cb, ca, cw, cs]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={`cx-${cb}`}>{b}</td>
                  <td className={`cx-${ca}`}>{avg}</td>
                  <td className={`cx-${cw}`}>{w}</td>
                  <td className={`cx-${cs}`}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: ".68rem", color: "var(--text3)", marginTop: 6, fontFamily: "'Space Mono',monospace" }}>* amortised — occasional O(n) resize</div>
        </div>
      )}

      {/* Strings: representation comparison */}
      {is("Basics & Representations") && (
        <div className="sec">
          <div className="stitle">Representation Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Null-Terminated</th><th>Pointer / Length</th></tr></thead>
            <tbody>
              {[
                ["Get length", "O(n) scan to $", "O(1) already stored"],
                ["Get char at i", "O(1)", "O(1)"],
                ["Extract substring", "O(k) copy", "O(1) new (p+i, m) pair"],
                ["Used in", "C, C++ char*", "Tries, Patricia, Suffix Trees"],
              ].map(([op, nt, pl], idx) => (
                <tr key={idx}>
                  <td className="op">{op}</td>
                  <td style={{ color: "var(--yellow)", fontFamily: "Space Mono,monospace", fontSize: ".76rem" }}>{nt}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".76rem" }}>{pl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Key insight:</strong> Pointer/length substring is pure arithmetic — no copying. Patricia Trees and Suffix Trees store all substrings in O(n) total space using this trick.</div>
          </div>
        </div>
      )}

      {/* Strings: pattern quick map */}
      {is("Core Techniques") && (
        <div className="sec">
          <div className="stitle">Pattern Quick Map</div>
          <table className="fn-table">
            <thead><tr><th>Problem Type</th><th>Pattern</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Palindrome check", "Two Pointers", "O(n)"],
                ["Anagram / frequency", "Freq Count[26]", "O(n)"],
                ["Longest no-repeat substr", "Sliding Window + Map", "O(n)"],
                ["Pattern in text", "KMP / Z-algo", "O(n+m)"],
                ["Prefix / autocomplete", "Trie", "O(|s|)"],
                ["Subsequences / edit ops", "DP 2D table", "O(n*m)"],
              ].map(([prob, pat, t], idx) => (
                <tr key={idx}>
                  <td style={{ color: "var(--text)" }}>{prob}</td>
                  <td className="op">{pat}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Strings: algorithm comparison */}
      {is("Pattern Matching") && (
        <div className="sec">
          <div className="stitle">Algorithm Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Preprocess</th><th>Search</th><th>Worst</th><th>Best for</th></tr></thead>
            <tbody>
              {[
                ["Naive", "O(1)", "O(n)", "O(nm)", "r", "tiny n,m"],
                ["KMP", "O(m)", "O(n)", "O(n+m)", "g", "single pattern"],
                ["Z-Algorithm", "O(n+m)", "O(n+m)", "O(n+m)", "g", "single pattern"],
                ["Rabin-Karp", "O(m)", "O(n)", "O(nm) collision", "y", "multiple patterns"],
                ["Aho-Corasick", "O(sum|p|)", "O(n+k)", "O(n+k)", "g", "many patterns"],
              ].map(([algo, pre, srch, worst, c, use], idx) => (
                <tr key={idx}>
                  <td className="op">{algo}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{pre}</td>
                  <td style={{ color: "var(--green)", fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{srch}</td>
                  <td className={`cx-${c}`} style={{ fontFamily: "Space Mono,monospace", fontSize: ".74rem" }}>{worst}</td>
                  <td style={{ color: "var(--text3)", fontSize: ".74rem" }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Linked List: node visualizer */}
      {is("Basics & Node Structure") && (
        <div className="sec">
          <div className="stitle">What a Linked List Looks Like</div>
          <div className="prose" style={{ marginBottom: 8 }}>Each node: <code style={{ background: "var(--bg3)", padding: "1px 6px", borderRadius: 4, fontFamily: "'Space Mono',monospace", fontSize: ".82rem" }}>[ data | next→ ]</code> pointing to the next node.</div>
          <NodeViz nodes={[{ val: 10 }, { val: 20 }, { val: 30 }, { val: 40 }]} />
          <div className="callout callout-tip" style={{ marginTop: 12 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>vs Array:</strong> Nodes are NOT contiguous in memory. No address formula. Access = O(n). Insert at head = O(1) — just update two pointers.</div>
          </div>
        </div>
      )}

      {/* Linked List: types visual */}
      {is("Types of Linked Lists") && (
        <div className="sec">
          <div className="stitle">Visual Comparison</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--accent3)", fontFamily: "'Space Mono',monospace", marginBottom: 6 }}>SINGLY — forward only</div>
              <NodeViz nodes={[{ val: "A" }, { val: "B" }, { val: "C" }, { val: "D" }]} />
            </div>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>DOUBLY — bidirectional, O(1) delete with node pointer</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: "var(--text2)", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px" }}>
                NULL ← <span style={{ color: "var(--accent2)" }}>A</span> ⇄ <span style={{ color: "var(--accent2)" }}>B</span> ⇄ <span style={{ color: "var(--accent2)" }}>C</span> ⇄ <span style={{ color: "var(--accent2)" }}>D</span> → NULL
              </div>
            </div>
            <div>
              <div style={{ fontSize: ".72rem", color: "var(--yellow)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>CIRCULAR — last node points back to head ↺</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: "var(--text2)", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px" }}>
                <span style={{ color: "var(--yellow)" }}>A</span> → <span style={{ color: "var(--yellow)" }}>B</span> → <span style={{ color: "var(--yellow)" }}>C</span> → <span style={{ color: "var(--yellow)" }}>D</span> → (back to A)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked List: core ops badges */}
      {is("Core Operations") && (
        <div className="sec">
          <div className="stitle">Operation Complexities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Insert Head — O(1)</span>
            <span className="op-badge ob-on">Insert End — O(n)</span>
            <span className="op-badge ob-on">Insert at k — O(n)</span>
            <span className="op-badge ob-o1">Delete Head — O(1)</span>
            <span className="op-badge ob-on">Delete End — O(n)</span>
            <span className="op-badge ob-on">Search — O(n)</span>
            <span className="op-badge ob-on">Access — O(n)</span>
          </div>
          <div className="callout callout-warn">
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>vs Array:</strong> Array = O(1) access, O(n) insert (shifting). Linked List = O(1) head insert/delete, O(n) access. Choose based on your dominant operation.</div>
          </div>
        </div>
      )}

      {/* Linked List: slow-fast visualizer */}
      {is("Slow-Fast Pointer") && (
        <div className="sec">
          <div className="stitle">Finding Middle — After 2 Steps</div>
          <NodeViz
            nodes={[{ val: 1, label: "slow/fast" }, { val: 2 }, { val: 3, label: "slow" }, { val: 4 }, { val: 5, label: "fast" }]}
            hl={{ 0: "var(--green)", 2: "var(--green)", 4: "var(--accent2)" }}
          />
          <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 4 }}>
            🟢 slow = node[2] (middle) &nbsp;&nbsp; 🟣 fast = node[4] (end) ✓
          </div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Cycle detection (Floyd's):</strong> If slow == fast → cycle. Then move slow to head, advance both 1-step → meeting point = cycle start node.</div>
          </div>
        </div>
      )}

      {/* Linked List: reverse & classics must-know table */}
      {is("Reverse & Classic Algorithms") && (
        <div className="sec">
          <div className="stitle">Must-Know Problems Cheatsheet</div>
          <table className="fn-table">
            <thead><tr><th>Problem</th><th>Key Technique</th><th>Time</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Reverse LL", "3-pointer (prev,curr,next)", "O(n)", "O(1)"],
                ["Detect Cycle", "Floyd's slow-fast", "O(n)", "O(1)"],
                ["Find Cycle Start", "Move ptr to head + 1-step", "O(n)", "O(1)"],
                ["Find Middle", "Slow-fast pointer", "O(n)", "O(1)"],
                ["Palindrome LL", "Find mid + reverse 2nd half", "O(n)", "O(1)"],
                ["Merge Two Sorted", "Dummy node + two ptrs", "O(n+m)", "O(1)"],
                ["Remove Nth from End", "Two ptrs gap of n", "O(n)", "O(1)"],
                ["Intersection of Two", "Switch lists on null", "O(n+m)", "O(1)"],
                ["Reverse K-Groups", "Recurse + reverse chunk", "O(n)", "O(k)"],
              ].map(([p, t, ti, sp]) => (
                <tr key={p}>
                  <td style={{ color: "var(--text2)", fontSize: ".78rem" }}>{p}</td>
                  <td className="op" style={{ fontSize: ".74rem" }}>{t}</td>
                  <td style={{ color: "var(--green)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{ti}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Linked List: complexity guide */}
      {is("Complexity & Interview Guide") && (
        <div className="sec">
          <div className="stitle">Full Operation Reference</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Access (index)", "O(n)", "O(1)", "Traverse from head"],
                ["Search", "O(n)", "O(1)", "Scan each node"],
                ["Insert (head)", "O(1)", "O(1)", "Signature advantage over array"],
                ["Insert (end/mid)", "O(n)", "O(1)", "Traverse to position first"],
                ["Delete (head)", "O(1)", "O(1)", "Just update head pointer"],
                ["Delete (end/mid)", "O(n)", "O(1)", "Traverse to prev node"],
                ["Reverse", "O(n)", "O(1)", "3-pointer iterative"],
                ["Detect cycle", "O(n)", "O(1)", "Floyd's algorithm"],
              ].map(([op, t, sp, note]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{ color: t === "O(1)" ? "var(--green)" : "var(--yellow)", fontFamily: "'Space Mono',monospace", fontSize: ".74rem" }}>{t}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".74rem" }}>{sp}</td>
                  <td style={{ color: "var(--text3)", fontSize: ".74rem" }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stack: LIFO visualizer */}
      {is("Basics & LIFO") && (
        <div className="sec">
          <div className="stitle">LIFO Visualized</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: ".68rem", color: "var(--accent)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>← top</div>
              {[30, 20, 10].map((v, i) => (
                <div key={i} style={{ background: i === 0 ? "var(--accent)" : "var(--bg3)", border: "1px solid var(--accent2)", borderRadius: 6, padding: "8px 24px", fontFamily: "'Space Mono',monospace", fontSize: ".85rem", fontWeight: 700, color: i === 0 ? "#fff" : "var(--text2)", width: 120, textAlign: "center" }}>{v}</div>
              ))}
              <div style={{ fontSize: ".6rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 4 }}>stack bottom</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="callout callout-tip" style={{ marginTop: 0, minWidth: 200 }}>
                <span className="callout-icon">💡</span>
                <div className="callout-text"><strong>Push(40)</strong> → goes on top. <strong>Pop()</strong> removes 30 (top). Stack is LIFO — Last In, First Out.</div>
              </div>
              <div className="callout callout-warn" style={{ marginTop: 0 }}>
                <span className="callout-icon">⚠️</span>
                <div className="callout-text">Push when full → <strong>OVERFLOW</strong>. Pop when empty → <strong>UNDERFLOW</strong>.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stack: operations complexity table */}
      {is("Applications & Complexity") && (
        <div className="sec">
          <div className="stitle">Operations at a Glance</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Push — O(1)</span>
            <span className="op-badge ob-o1">Pop — O(1)</span>
            <span className="op-badge ob-o1">Peek — O(1)</span>
            <span className="op-badge ob-o1">isEmpty — O(1)</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Feature</th><th>Array Stack</th><th>LL Stack</th></tr></thead>
            <tbody>
              {[
                ["Size","Fixed (MAXSIZE)","Dynamic"],
                ["Speed","Faster (cache)","Slightly slower"],
                ["Overflow","Yes (at MAXSIZE)","Only if out of memory"],
                ["Extra memory","None","Pointer per node"],
                ["Best for","Known max size","Unknown/variable size"],
              ].map(([f,a,l]) => (
                <tr key={f}>
                  <td className="op">{f}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{a}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"Space Mono,monospace",fontSize:".74rem"}}>{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stack: notation conversion quick ref */}
      {is("Polish Notations") && (
        <div className="sec">
          <div className="stitle">Notation Quick Reference</div>
          <table className="fn-table">
            <thead><tr><th>Notation</th><th>Operator Position</th><th>Example A+B</th><th>Parentheses?</th></tr></thead>
            <tbody>
              {[
                ["Infix","Between operands","A + B","Required"],
                ["Prefix","Before operands","+ A B","Not needed"],
                ["Postfix","After operands","A B +","Not needed"],
              ].map(([n,p,e,par]) => (
                <tr key={n}>
                  <td className="op">{n}</td>
                  <td style={{color:"var(--text2)",fontSize:".78rem"}}>{p}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".76rem"}}>{e}</td>
                  <td style={{color:par==="Not needed"?"var(--green)":"var(--yellow)",fontSize:".76rem"}}>{par}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:12}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Operator precedence:</strong> ^ (highest) &gt; *, / &gt; +, - (lowest). Right-to-left for ^ (right-associative). This determines parenthesization order in infix→postfix conversion.</div>
          </div>
        </div>
      )}

      {/* Stack: patterns pill overview */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Balanced Parentheses","Next Greater Element","Previous Smaller Element","Monotonic Stack","Min Stack","Largest Rectangle","Stock Span","Trapping Rain Water"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Monotonic stack key insight:</strong> Each element is pushed and popped at most once → O(n) total, even with the inner while loop. This amortised analysis is what makes it efficient.</div>
          </div>
        </div>
      )}

      {/* Queue: FIFO visualizer */}
      {is("Basics & FIFO") && (
        <div className="sec">
          <div className="stitle">FIFO Visualized</div>
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 20px", overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 8 }}>
              <div style={{ fontSize: ".68rem", color: "var(--accent3)", fontFamily: "'Space Mono',monospace", marginRight: 8, flexShrink: 0 }}>FRONT →</div>
              {[10, 20, 30, 40].map((v, i) => (
                <div key={i} style={{ background: i === 0 ? "var(--accent3)" : "var(--bg3)", border: "1px solid var(--accent2)", padding: "10px 16px", fontFamily: "'Space Mono',monospace", fontSize: ".85rem", fontWeight: 700, color: i === 0 ? "#000" : "var(--text2)", borderRight: i < 3 ? "none" : "1px solid var(--accent2)", minWidth: 50, textAlign: "center" }}>{v}</div>
              ))}
              <div style={{ fontSize: ".68rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginLeft: 8, flexShrink: 0 }}>← REAR</div>
            </div>
            <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace" }}>
              Dequeue() removes 10 (front) ✓ &nbsp;|&nbsp; Enqueue(50) adds at rear ✓
            </div>
          </div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Queue vs Stack:</strong> Stack removes from the SAME end you insert (LIFO). Queue removes from the OPPOSITE end (FIFO). Queue = fair. Stack = last-in priority.</div>
          </div>
        </div>
      )}

      {/* Queue: types overview */}
      {is("Types of Queues") && (
        <div className="sec">
          <div className="stitle">Types at a Glance</div>
          <div className="constraint-row">
            {[
              ["Simple Queue", "FIFO. Insert rear, remove front. Array wastes space after dequeues."],
              ["Circular Queue", "rear=(rear+1)%size. Reuses freed slots. Fixes wasted space."],
              ["Priority Queue", "Backed by heap. O(log n) ops. Used in Dijkstra, Prim's."],
              ["Deque", "Both ends. appendleft/popleft + append/pop. Most flexible."],
            ].map(([n, d]) => (
              <div className="cr-card" key={n} style={{ minWidth: 140 }}>
                <div className="cr-n" style={{ fontSize: ".75rem" }}>{n}</div>
                <div className="cr-algo">{d}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Circular Queue:</strong> The modulo trick <code style={{ fontFamily: "'Space Mono',monospace" }}>rear = (rear+1) % size</code> wraps the index back to 0 when it hits the end — eliminating wasted space without moving elements.</div>
          </div>
        </div>
      )}

      {/* Queue: two stacks op-badge */}
      {is("Queue using Two Stacks") && (
        <div className="sec">
          <div className="stitle">Amortised Analysis</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Enqueue — O(1)</span>
            <span className="op-badge ob-on">Dequeue — O(n) worst</span>
            <span className="op-badge ob-o1">Dequeue — O(1) amortised</span>
          </div>
          <div className="theorem-box">
            <div className="theorem-label">Why O(1) amortised?</div>
            <div className="theorem-text">Each element: pushed to S1 once (O(1)) → moved to S2 once (O(1)) → popped from S2 once (O(1)). Total = O(3) per element = O(1) amortised, even though a single pour costs O(n).</div>
          </div>
        </div>
      )}

      {/* Queue: patterns pills */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["BFS","Level Order Traversal","Sliding Window Max (Deque)","Rotten Oranges","First Non-Repeating","Generate Binary Numbers","Producer-Consumer","Multi-source BFS"].map(p => (
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>BFS = Queue. DFS = Stack.</strong> This mapping is fundamental. Level-order traversal uses BFS level-by-level: process all nodes at distance d before distance d+1.</div>
          </div>
        </div>
      )}

      {/* Queue: complexity comparison table */}
      {is("Complexity & Applications") && (
        <div className="sec">
          <div className="stitle">Operation Complexity</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span className="op-badge ob-o1">Enqueue — O(1)</span>
            <span className="op-badge ob-o1">Dequeue — O(1)</span>
            <span className="op-badge ob-o1">Peek — O(1)</span>
            <span className="op-badge ob-on">Python list.pop(0) — O(n) ⚠</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Array/LL</th><th>Python list</th><th>Python deque</th></tr></thead>
            <tbody>
              {[
                ["Enqueue","O(1)","O(1) append","O(1) append"],
                ["Dequeue","O(1)","O(n) pop(0) ⚠","O(1) popleft ✓"],
                ["Peek","O(1)","O(1)","O(1)"],
                ["Space","O(n)","O(n)","O(n)"],
              ].map(([op,a,pl,pd]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{a}</td>
                  <td style={{color:pl.includes("⚠")?"var(--red)":"var(--text2)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{pl}</td>
                  <td style={{color:pd.includes("✓")?"var(--green)":"var(--text2)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{pd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recursion: call stack visualizer */}
      {is("Basics & Call Stack") && (
        <div className="sec">
          <div className="stitle">Call Stack Visualization — factorial(3)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 320 }}>
            {[
              { label: "factorial(0)", phase: "base", color: "var(--accent3)" },
              { label: "factorial(1)", phase: "waiting", color: "var(--accent2)" },
              { label: "factorial(2)", phase: "waiting", color: "var(--accent2)" },
              { label: "factorial(3)", phase: "first", color: "var(--accent)" },
            ].map((f, i) => (
              <div key={i} style={{ background: i === 0 ? "rgba(6,255,165,.12)" : "var(--bg3)", border: `1px solid ${f.color}`, borderBottom: i < 3 ? "none" : `1px solid ${f.color}`, padding: "8px 16px", fontFamily: "'Space Mono',monospace", fontSize: ".78rem", color: f.color, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{f.label}</span>
                <span style={{ fontSize: ".65rem", color: "var(--text3)" }}>{i === 0 ? "← BASE (top of stack)" : i === 3 ? "← first call" : "← waiting"}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: ".68rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 6 }}>Frames push on call, pop on return. Bottom = first call, top = deepest call.</div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚠️</span>
            <div className="callout-text"><strong>Stack Overflow:</strong> If the base case is missing or never reached, frames push indefinitely until the OS kills the process. Always verify the base case is reachable.</div>
          </div>
        </div>
      )}

      {/* Recursion: types comparison */}
      {is("Types of Recursion") && (
        <div className="sec">
          <div className="stitle">Types at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Type</th><th>Description</th><th>Example</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Tail","Last op = recursive call","fact_tail(n-1, n*acc)","O(1) with TCO"],
                ["Non-Tail","Work after recursive call","n * fact(n-1)","O(n) stack"],
                ["Linear","One call per function","factorial, binary search","O(n)"],
                ["Tree","Multiple calls per function","fib(n-1)+fib(n-2)","O(n) depth"],
                ["Mutual","A calls B, B calls A","isEven↔isOdd","O(n)"],
              ].map(([t,d,e,s]) => (
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--text2)",fontSize:".76rem"}}>{d}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{e}</td>
                  <td style={{color:s.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Tree recursion warning:</strong> fib(n) without memoization makes O(2^n) calls. fib(50) = ~10^15 calls. Always memoize tree recursion!</div>
          </div>
        </div>
      )}

      {/* Recursion: key algorithms complexity cards */}
      {is("Key Algorithms") && (
        <div className="sec">
          <div className="stitle">Algorithm Complexity</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Time</th><th>Space</th><th>Type</th></tr></thead>
            <tbody>
              {[
                ["Factorial","O(n)","O(n) stack","Linear","g"],
                ["Fibonacci (naive)","O(2^n)","O(n)","Tree","r"],
                ["Fibonacci (memo)","O(n)","O(n)","Linear","g"],
                ["Tower of Hanoi","O(2^n)","O(n)","Tree","y"],
                ["Binary Search","O(log n)","O(log n)","Linear","g"],
                ["Merge Sort","O(n log n)","O(n)","Tree","g"],
              ].map(([a,t,s,type,c]) => (
                <tr key={a}>
                  <td className="op">{a}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{t}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{s}</td>
                  <td style={{color:"var(--text3)",fontSize:".73rem"}}>{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recursion: backtracking pattern template */}
      {is("Backtracking Pattern") && (
        <div className="sec">
          <div className="stitle">Backtracking Template</div>
          <div className="theorem-box">
            <div className="theorem-label">Universal Pattern</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".78rem",lineHeight:2}}>
              {"for each option in choices:"}<br/>
              {"  if is_valid(option):       // PRUNE"}<br/>
              {"    apply(option)            // CHOOSE"}<br/>
              {"    backtrack(next_state)    // EXPLORE"}<br/>
              {"    undo(option)             // UNCHOOSE ← crucial!"}
            </div>
          </div>
          <div className="pattern-pills" style={{marginTop:10}}>
            {["Subsets O(2^n)","Permutations O(n!)","Combination Sum","N-Queens","Sudoku Solver","Word Search"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Most common bug:</strong> Forgetting the <code style={{fontFamily:"'Space Mono',monospace"}}>undo</code> step. Without it, choices from one branch corrupt the next — results will be wrong or duplicated.</div>
          </div>
        </div>
      )}

      {/* Recursion: memo vs naive comparison */}
      {is("Memoization & Optimization") && (
        <div className="sec">
          <div className="stitle">Naive vs Memoized</div>
          <table className="fn-table">
            <thead><tr><th>Approach</th><th>fib(10)</th><th>fib(40)</th><th>fib(100)</th><th>Space</th></tr></thead>
            <tbody>
              {[
                ["Naive recursion","177 calls","~330M calls","TIMEOUT","O(n) stack","r"],
                ["Memoization","11 calls","41 calls","101 calls","O(n)","g"],
                ["Tabulation (DP)","O(n) ops","O(n) ops","O(n) ops","O(n)","g"],
                ["Space-optimised","O(n) ops","O(n) ops","O(n) ops","O(1)","g"],
              ].map(([a,t10,t40,t100,sp,c]) => (
                <tr key={a}>
                  <td className="op" style={{fontSize:".75rem"}}>{a}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t10}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t40}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{t100}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".7rem"}}>{sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Two DP criteria:</strong> (1) Overlapping Subproblems — same inputs recomputed. (2) Optimal Substructure — optimal solution built from optimal subsolutions. If both hold → DP applies.</div>
          </div>
        </div>
      )}

      {/* Searching: linear search step visualizer */}
      {is("Basics & Linear Search") && (
        <div className="sec">
          <div className="stitle">Linear Search — Step by Step</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", marginBottom: 8 }}>
            {[-15,-6,0,7,9,23].map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 48 }}>
                <div style={{ background: i === 3 ? "var(--accent3)" : i < 3 ? "rgba(255,92,92,.15)" : "var(--bg3)", border: `1px solid ${i===3?"var(--accent3)":i<3?"var(--red)":"var(--border)"}`, borderRight: i < 5 ? "none" : `1px solid ${i===3?"var(--accent3)":"var(--border)"}`, padding: "9px 4px", fontFamily: "'Space Mono',monospace", fontSize: ".8rem", fontWeight: 700, color: i===3?"#000":i<3?"var(--red)":"var(--text2)", width: "100%", textAlign: "center" }}>{v}</div>
                <div style={{ fontSize: ".62rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace", marginTop: 3 }}>[{i}]</div>
                <div style={{ fontSize: ".6rem", color: i===3?"var(--accent3)":i<3?"var(--red)":"var(--text3)", marginTop: 2 }}>{i===3?"✓":i<3?"✗":""}</div>
              </div>
            ))}
            <div style={{ padding: "0 12px", color: "var(--text3)", fontSize: ".75rem" }}>...</div>
          </div>
          <div style={{ fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace" }}>Searching for 7 — found at index 3 after 4 comparisons. Red = no match, Green = found.</div>
          <div className="callout callout-tip" style={{ marginTop: 10 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>When linear beats binary:</strong> Unsorted data (can't binary search), linked lists (no O(1) mid), small n&lt;50 (overhead not worth it), one-time search (sorting cost not justified).</div>
          </div>
        </div>
      )}

      {/* Searching: binary search visual */}
      {is("Binary Search") && (
        <div className="sec">
          <div className="stitle">Binary Search — Halving the Space</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { arr: [4,7,8,9,16,"→20←",24,38,39,45,54,77], label: "Step 1: mid=20, key=4 < 20 → search LEFT", hi: 5 },
              { arr: [4,7,"→8←",9,16], label: "Step 2: mid=8, key=4 < 8 → search LEFT", hi: 2 },
              { arr: ["→4←",7], label: "Step 3: mid=4, FOUND ✓", hi: 0 },
            ].map((row, i) => (
              <div key={i} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: ".68rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginBottom: 4 }}>{row.label}</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {row.arr.map((v, j) => (
                    <span key={j} style={{ padding: "3px 8px", borderRadius: 4, background: String(v).includes("→") ? "var(--accent)" : "var(--bg3)", color: String(v).includes("→") ? "#fff" : "var(--text2)", fontFamily: "'Space Mono',monospace", fontSize: ".75rem", fontWeight: String(v).includes("→") ? 700 : 400 }}>{String(v).replace(/→|←/g, "")}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{ marginTop: 10 }}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Overflow bug:</strong> <code style={{ fontFamily: "'Space Mono',monospace" }}>mid = (lo+hi)/2</code> overflows when lo+hi &gt; INT_MAX. Always use <code style={{ fontFamily: "'Space Mono',monospace" }}>mid = lo + (hi-lo)/2</code> ✓</div>
          </div>
        </div>
      )}

      {/* Searching: variants pattern pills */}
      {is("Binary Search Variants") && (
        <div className="sec">
          <div className="stitle">Variant Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Lower Bound","Upper Bound","First Occurrence","Last Occurrence","Count Occurrences","Rotated Sorted Array","Peak Element","Binary Search on Answer"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{ marginTop: 12 }}>
            <div className="theorem-label">Key insight — First vs Last Occurrence</div>
            <div className="theorem-text" style={{ fontFamily: "'Space Mono',monospace", fontSize: ".76rem", lineHeight: 2 }}>
              {"First: when arr[mid]==key → result=mid, hi=mid-1  (keep left)"}<br/>
              {"Last:  when arr[mid]==key → result=mid, lo=mid+1  (keep right)"}<br/>
              {"Count: last_occurrence - first_occurrence + 1"}
            </div>
          </div>
        </div>
      )}

      {/* Searching: technique comparison table */}
      {is("Complexity & Comparison") && (
        <div className="sec">
          <div className="stitle">All Techniques at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Technique</th><th>Time</th><th>Space</th><th>Sorted?</th><th>Structure</th></tr></thead>
            <tbody>
              {[
                ["Linear","O(n)","O(1)","No","Any","y"],
                ["Binary","O(log n)","O(1)","YES","Array only","g"],
                ["Interpolation","O(log log n)*","O(1)","YES+uniform","Array","g"],
                ["Exponential","O(log n)","O(1)","YES","Array/unknown","g"],
                ["Jump","O(√n)","O(1)","YES","Array","y"],
                ["Hashing","O(1) avg","O(n)","No","Hash table","g"],
              ].map(([t,time,sp,sort,str,c])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{time}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{sp}</td>
                  <td style={{color:sort==="No"?"var(--green)":"var(--yellow)",fontSize:".73rem"}}>{sort}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{str}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{fontSize:".66rem",color:"var(--text3)",fontFamily:"'Space Mono',monospace",marginTop:4}}>* interpolation average for uniformly distributed data</div>
        </div>
      )}

      {/* Searching: advanced techniques overview */}
      {is("Advanced Search Techniques") && (
        <div className="sec">
          <div className="stitle">Technique Selection Guide</div>
          <div className="constraint-row">
            {[
              ["Interpolation","Uniform + sorted large data. O(log log n) avg."],
              ["Exponential","Sorted array of unknown/infinite size."],
              ["Jump","Simple sorted array when O(√n) acceptable."],
              ["Hashing","Frequent O(1) lookups, O(n) space available."],
            ].map(([n,d])=>(
              <div className="cr-card" key={n} style={{minWidth:130}}>
                <div className="cr-n" style={{fontSize:".75rem"}}>{n}</div>
                <div className="cr-algo">{d}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Interpolation pitfall:</strong> O(n) worst case on skewed data (e.g. [1,2,3,...,100,1000000]). Always verify uniform distribution before using it.</div>
          </div>
        </div>
      )}

      {/* Hashing: hash function visualizer */}
      {is("Basics & Hash Functions") && (
        <div className="sec">
          <div className="stitle">Hash Function in Action</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 18px",overflowX:"auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",fontFamily:"'Space Mono',monospace",fontSize:".78rem"}}>
              {[[10,0],[25,5],[37,7],[23,3],[33,3]].map(([k,idx],i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{color:"var(--accent2)",fontWeight:700}}>{k}</span>
                  <span style={{color:"var(--text3)"}}>%10=</span>
                  <span style={{background:k===33?"rgba(255,92,92,.2)":"rgba(6,255,165,.12)",border:`1px solid ${k===33?"var(--red)":"var(--accent3)"}`,borderRadius:6,padding:"3px 10px",color:k===33?"var(--red)":"var(--accent3)",fontWeight:700}}>{idx}</span>
                  {k===33&&<span style={{color:"var(--red)",fontSize:".68rem"}}>← collision!</span>}
                  {i<4&&<span style={{color:"var(--text3)"}}>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Load Factor:</strong> keep it below 0.7. If n/m &gt; 0.7, rehash to a table of ~2× size. This keeps average chain length short and operations O(1).</div>
          </div>
        </div>
      )}

      {/* Hashing: collision strategies comparison */}
      {is("Collision Handling") && (
        <div className="sec">
          <div className="stitle">Collision Strategies</div>
          <table className="fn-table">
            <thead><tr><th>Strategy</th><th>Probe Formula</th><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              {[
                ["Chaining","N/A (linked list)","Simple, LF>1 OK","Extra pointer memory"],
                ["Linear Probing","(h+i)%size","Cache-friendly","Primary clustering"],
                ["Quadratic","(h+i²)%size","Less clustering","May miss slots"],
                ["Double Hash","(h1+i×h2)%size","Best distribution","Two hash fns needed"],
              ].map(([s,f,p,c])=>(
                <tr key={s}>
                  <td className="op">{s}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{f}</td>
                  <td style={{color:"var(--green)",fontSize:".73rem"}}>{p}</td>
                  <td style={{color:"var(--red)",fontSize:".73rem"}}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Deletion in open addressing:</strong> Never mark as EMPTY. Use a TOMBSTONE marker — otherwise searches for keys that probed past this slot will incorrectly stop and report "not found".</div>
          </div>
        </div>
      )}

      {/* Hashing: patterns toolkit */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Frequency Count","Two Sum","Prefix Sum + HashMap","Hash Set (Duplicates)","Sliding Window + Map","Group Anagrams","Rolling Hash","Complement Lookup"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Subarray Sum = K — Key Insight</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"Initialize: count = {0: 1}  ← crucial! prefix 0 seen once"}<br/>
              {"For each element: prefix += x"}<br/>
              {"  ans += count.get(prefix - k, 0)"}<br/>
              {"  count[prefix]++"}
            </div>
          </div>
        </div>
      )}

      {/* Hashing: complexity table */}
      {is("Complexity & Applications") && (
        <div className="sec">
          <div className="stitle">Operations at a Glance</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <span className="op-badge ob-o1">Insert — O(1) avg</span>
            <span className="op-badge ob-o1">Search — O(1) avg</span>
            <span className="op-badge ob-o1">Delete — O(1) avg</span>
            <span className="op-badge ob-on">All — O(n) worst</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Structure</th><th>Insert</th><th>Search</th><th>Ordered?</th><th>Use when</th></tr></thead>
            <tbody>
              {[
                ["Hash Table","O(1) avg","O(1) avg","No","Fast lookup needed"],
                ["BST / map","O(log n)","O(log n)","YES","Sorted order needed"],
                ["Array","O(1) end","O(n)","No","Index-based access"],
                ["Sorted Array","O(n)","O(log n)","YES","Static + binary search"],
              ].map(([s,ins,srch,ord,use])=>(
                <tr key={s}>
                  <td className="op">{s}</td>
                  <td style={{color:ins.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{ins}</td>
                  <td style={{color:srch.includes("1)")?"var(--green)":"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{srch}</td>
                  <td style={{color:ord==="YES"?"var(--green)":"var(--red)",fontSize:".73rem"}}>{ord}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Trees: node/tree visualizer */}
      {is("Basics & Terminology") && (
        <div className="sec">
          <div className="stitle">Tree Anatomy</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 20px",fontFamily:"'Space Mono',monospace",fontSize:".78rem",color:"var(--text2)",lineHeight:2.2}}>
            <div style={{textAlign:"center"}}>
              <span style={{background:"var(--accent)",color:"#fff",padding:"4px 14px",borderRadius:6,fontWeight:700}}>1</span>
              <span style={{color:"var(--text3)",fontSize:".65rem",marginLeft:8}}>← root (depth=0, height=2)</span>
            </div>
            <div style={{textAlign:"center",marginTop:2}}>
              <span style={{color:"var(--text3)"}}>/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</span>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:48}}>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent2)",color:"var(--accent2)",padding:"4px 12px",borderRadius:6,fontWeight:700}}>2</span>
                <div style={{fontSize:".62rem",color:"var(--text3)"}}>depth=1, height=1</div>
                <div style={{color:"var(--text3)"}}>/ &nbsp; \</div>
                <div style={{display:"flex",gap:12,justifyContent:"center"}}>
                  {[4,5].map(v=>(
                    <div key={v} style={{textAlign:"center"}}>
                      <span style={{background:"var(--bg3)",border:"1px solid var(--accent3)",color:"var(--accent3)",padding:"4px 10px",borderRadius:6,fontWeight:700}}>{v}</span>
                      <div style={{fontSize:".6rem",color:"var(--accent3)"}}>leaf</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent3)",color:"var(--accent3)",padding:"4px 12px",borderRadius:6,fontWeight:700}}>3</span>
                <div style={{fontSize:".62rem",color:"var(--accent3)"}}>leaf (depth=1)</div>
              </div>
            </div>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:10}}>
            {[["Root","1 — no parent"],["Leaves","3,4,5 — no children"],["Height","2 (longest root→leaf)"],["Depth(2)","1 (edges from root)"],["Degree(2)","2 (two children)"]].map(([k,v])=>(
              <div key={k} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:8,padding:"6px 12px",fontSize:".72rem"}}>
                <span style={{color:"var(--accent2)",fontFamily:"'Space Mono',monospace",fontWeight:700}}>{k}: </span>
                <span style={{color:"var(--text2)"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trees: types comparison */}
      {is("Types of Trees") && (
        <div className="sec">
          <div className="stitle">Tree Types at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Type</th><th>Property</th><th>Height</th><th>Use case</th></tr></thead>
            <tbody>
              {[
                ["Full BT","Every node has 0 or 2 children","O(n)","Expression trees"],
                ["Complete BT","All levels full except last (left→right)","O(log n)","Heaps"],
                ["Perfect BT","All levels completely full","O(log n)","Ideal binary tree"],
                ["Balanced BT","|h(L)-h(R)| ≤ 1 at every node","O(log n)","AVL, Red-Black"],
                ["BST","left < root < right","O(log n) avg","Ordered search"],
                ["Skewed","All nodes on one side","O(n)","Worst case BST"],
              ].map(([t,p,h,u])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--text2)",fontSize:".74rem"}}>{p}</td>
                  <td style={{color:h.includes("log")?"var(--green)":"var(--red)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{h}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Skewed BST danger:</strong> inserting sorted data [1,2,3,4,5] into a BST without balancing creates a skewed tree — height=n-1, all operations degrade to O(n). Always use AVL or Red-Black in production.</div>
          </div>
        </div>
      )}

      {/* Trees: traversal order visual */}
      {is("Tree Traversals") && (
        <div className="sec">
          <div className="stitle">Traversal Orders — Quick Reference</div>
          <table className="fn-table">
            <thead><tr><th>Traversal</th><th>Order</th><th>Result on example</th><th>Use for</th></tr></thead>
            <tbody>
              {[
                ["Inorder","L → Root → R","4 2 5 1 3","BST sorted output"],
                ["Preorder","Root → L → R","1 2 4 5 3","Serialize / copy tree"],
                ["Postorder","L → R → Root","4 5 2 3 1","Delete / eval expression"],
                ["Level Order","BFS level by level","1 2 3 4 5","Min depth, right view"],
              ].map(([t,o,r,u])=>(
                <tr key={t}>
                  <td className="op">{t}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{o}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{r}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Mnemonic:</strong> In/Pre/Post = when the ROOT is visited. <strong>In</strong>order = root <strong>in</strong> middle. <strong>Pre</strong>order = root <strong>first</strong>. <strong>Post</strong>order = root <strong>last</strong>.</div>
          </div>
        </div>
      )}

      {/* Trees: important problems pattern pills */}
      {is("Important Problems") && (
        <div className="sec">
          <div className="stitle">Must-Know Problems</div>
          <div className="pattern-pills">
            {["Height","Diameter (global max trick)","LCA","Invert Tree","Validate BST (bounds!)","Path Sum","Kth Smallest BST","Serialize / Deserialize","Max Path Sum","Right Side View"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Validate BST — Classic Bug</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"WRONG: only check left.val < root < right.val (local)"}<br/>
              {"RIGHT: pass min/max bounds: isValid(node, min, max)"}<br/>
              {"  if node.val <= min or node.val >= max → False"}<br/>
              {"  recurse left with max=node.val, right with min=node.val"}
            </div>
          </div>
        </div>
      )}

      {/* Trees: complexity table */}
      {is("Complexity & Patterns") && (
        <div className="sec">
          <div className="stitle">Complexity by Tree Type</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Balanced BST</th><th>Skewed BST</th><th>General BT</th></tr></thead>
            <tbody>
              {[
                ["Search","O(log n)","O(n)","O(n)"],
                ["Insert","O(log n)","O(n)","O(n)"],
                ["Delete","O(log n)","O(n)","O(n)"],
                ["Traversal","O(n)","O(n)","O(n)"],
                ["Stack space","O(log n)","O(n)","O(h)"],
              ].map(([op,b,s,g])=>(
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{color:"var(--green)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{b}</td>
                  <td style={{color:"var(--red)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{s}</td>
                  <td style={{color:"var(--yellow)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pattern-pills" style={{marginTop:12}}>
            {["DFS Post-order","BFS Level-order","Tree DP","Divide & Conquer","Inorder for BST","Height + Global Max"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
        </div>
      )}

      {/* BST: property visualizer */}
      {is("BST Basics & Property") && (
        <div className="sec">
          <div className="stitle">BST Property Visualized</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"16px 20px",fontFamily:"'Space Mono',monospace",fontSize:".78rem",color:"var(--text2)",lineHeight:2.4}}>
            <div style={{textAlign:"center"}}>
              <span style={{background:"var(--accent)",color:"#fff",padding:"5px 16px",borderRadius:6,fontWeight:700}}>5</span>
              <span style={{color:"var(--text3)",fontSize:".65rem",marginLeft:10}}>← root</span>
            </div>
            <div style={{textAlign:"center",color:"var(--text3)"}}>/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</div>
            <div style={{display:"flex",justifyContent:"center",gap:60}}>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent2)",color:"var(--accent2)",padding:"5px 14px",borderRadius:6,fontWeight:700}}>3</span>
                <div style={{fontSize:".62rem",color:"var(--accent3)",marginTop:2}}>all &lt; 5 ✓</div>
                <div style={{color:"var(--text3)"}}>/ &nbsp; \</div>
                <div style={{display:"flex",gap:16,justifyContent:"center"}}>
                  {[[2,"< 3 ✓"],[4,"> 3 ✓"]].map(([v,lbl])=>(
                    <div key={v} style={{textAlign:"center"}}>
                      <span style={{background:"var(--bg3)",border:"1px solid var(--accent3)",color:"var(--accent3)",padding:"4px 10px",borderRadius:6,fontWeight:700}}>{v}</span>
                      <div style={{fontSize:".58rem",color:"var(--accent3)"}}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{textAlign:"center"}}>
                <span style={{background:"var(--bg3)",border:"1px solid var(--accent2)",color:"var(--accent2)",padding:"5px 14px",borderRadius:6,fontWeight:700}}>7</span>
                <div style={{fontSize:".62rem",color:"var(--accent3)",marginTop:2}}>all &gt; 5 ✓</div>
              </div>
            </div>
          </div>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Inorder → Sorted:</strong> Traversing this BST inorder gives 2 3 4 5 7 — always sorted ascending. This is the #1 BST property used in interviews.</div>
          </div>
        </div>
      )}

      {/* BST: deletion 3 cases visual */}
      {is("Insert & Delete") && (
        <div className="sec">
          <div className="stitle">Deletion — 3 Cases</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {[
              ["Case 1: Leaf","Node has no children. Simply remove it. Return null.","var(--green)"],
              ["Case 2: One child","Node has one child. Replace node with its child.","var(--yellow)"],
              ["Case 3: Two children","Find inorder successor (findMin of right subtree). Copy value up. Delete successor from right subtree.","var(--accent2)"],
            ].map(([title,desc,color])=>(
              <div key={title} style={{background:"var(--bg2)",border:`1px solid ${color}`,borderLeft:`3px solid ${color}`,borderRadius:8,padding:"10px 14px"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color,fontWeight:700,marginBottom:4}}>{title}</div>
                <div style={{fontSize:".78rem",color:"var(--text2)"}}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Inorder Successor</strong> = smallest node in right subtree = go right once, then left as far as possible (findMin). It's guaranteed to have at most one child (right), making its deletion easy.</div>
          </div>
        </div>
      )}

      {/* BST: important problems pills */}
      {is("Important BST Problems") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Validate BST (bounds)","LCA in BST (O(h))","Kth Smallest (inorder)","Sorted Array → BST","Range Sum (prune)","Floor / Ceil","Inorder Successor","Two Sum in BST"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">LCA in BST vs General Binary Tree</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"General BT LCA: O(n) — must explore both subtrees"}<br/>
              {"BST LCA:        O(h) — ordering tells which subtree"}<br/>
              {"  if p,q < root → LCA in left subtree"}<br/>
              {"  if p,q > root → LCA in right subtree"}<br/>
              {"  else         → root IS the LCA ✓"}
            </div>
          </div>
        </div>
      )}

      {/* BST: comparison table */}
      {is("BST vs Other Structures") && (
        <div className="sec">
          <div className="stitle">Structure Comparison</div>
          <table className="fn-table">
            <thead><tr><th>Structure</th><th>Search</th><th>Insert</th><th>Ordered?</th><th>Range Query</th></tr></thead>
            <tbody>
              {[
                ["BST (balanced)","O(log n)","O(log n)","YES","O(log n+k)","g"],
                ["BST (skewed)","O(n)","O(n)","YES","O(n)","r"],
                ["Hash Table","O(1) avg","O(1) avg","NO","O(n)","y"],
                ["Heap","O(n)","O(log n)","Partial","N/A","y"],
                ["Sorted Array","O(log n)","O(n)","YES","O(log n+k)","g"],
              ].map(([s,srch,ins,ord,rq,c])=>(
                <tr key={s}>
                  <td className="op">{s}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{srch}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{ins}</td>
                  <td style={{color:ord==="YES"?"var(--green)":ord==="NO"?"var(--red)":"var(--yellow)",fontSize:".73rem"}}>{ord}</td>
                  <td style={{color:"var(--text3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{rq}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Rule of thumb:</strong> Need ordered iteration or range queries → BST (map/set). Need O(1) lookup only → Hash (unordered_map/dict). Need max/min only → Heap (priority_queue).</div>
          </div>
        </div>
      )}

      {/* Heap: array + tree visualizer */}
      {is("Basics & Heap Property") && (
        <div className="sec">
          <div className="stitle">Max Heap — Array & Tree View</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:10,padding:"14px 18px"}}>
            <div style={{display:"flex",gap:0,marginBottom:10,overflowX:"auto"}}>
              {[{v:50,i:0},{v:30,i:1},{v:40,i:2},{v:10,i:3},{v:20,i:4},{v:35,i:5}].map(({v,i})=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",minWidth:52}}>
                  <div style={{background:i===0?"var(--accent)":"var(--bg3)",border:`1px solid ${i===0?"var(--accent)":"var(--border)"}`,borderRight:i<5?"none":"1px solid var(--border)",padding:"9px 4px",fontFamily:"'Space Mono',monospace",fontSize:".82rem",fontWeight:700,color:i===0?"#fff":"var(--text2)",width:"100%",textAlign:"center"}}>{v}</div>
                  <div style={{fontSize:".62rem",color:"var(--text3)",fontFamily:"'Space Mono',monospace",marginTop:3}}>[{i}]</div>
                </div>
              ))}
            </div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color:"var(--text3)",lineHeight:1.8}}>
              parent(i)=(i-1)/2 &nbsp;|&nbsp; left(i)=2i+1 &nbsp;|&nbsp; right(i)=2i+2<br/>
              parent(3)=(3-1)/2=1 → arr[1]=30 ✓ &nbsp;&nbsp; left(1)=3 → arr[3]=10 ✓
            </div>
          </div>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Heap ≠ BST:</strong> Siblings have NO ordering guarantee. arr[1]=30 and arr[2]=40 — no relation between them. Only parent ≥ children (max heap). Last non-leaf = index n/2-1 = 2 (node 40).</div>
          </div>
        </div>
      )}

      {/* Heap: bubble up/down visual */}
      {is("Insert & Heapify") && (
        <div className="sec">
          <div className="stitle">Insert vs Delete Operation Flow</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {title:"INSERT → Bubble UP",steps:["Add at end (maintain completeness)","Compare with parent","Swap if parent < new (max heap)","Repeat until heap property OK"],color:"var(--accent3)"},
              {title:"DELETE → Heapify DOWN",steps:["Replace root with last element","Remove last element","Compare with children","Swap with larger child (max heap)","Repeat until heap property OK"],color:"var(--accent2)"},
            ].map(({title,steps,color})=>(
              <div key={title} style={{flex:1,minWidth:200,background:"var(--bg2)",border:`1px solid ${color}`,borderLeft:`3px solid ${color}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color,fontWeight:700,marginBottom:8}}>{title}</div>
                {steps.map((s,i)=>(
                  <div key={i} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}>
                    <span style={{color,fontFamily:"'Space Mono',monospace",fontSize:".68rem",flexShrink:0,fontWeight:700}}>{i+1}.</span>
                    <span style={{fontSize:".74rem",color:"var(--text2)"}}>{s}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Why Build Heap is O(n), not O(n log n)</div>
            <div className="theorem-text">Nodes near the bottom do very little work (leaves = O(1)). Only the root does O(log n) work. The sum of all heapify costs = n×Σ(l/2^l) = O(n). This telescoping sum is why bottom-up build is better than n × insert.</div>
          </div>
        </div>
      )}

      {/* Heap: patterns pills */}
      {is("Important Patterns") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Top-K Largest (min-heap size k)","Kth Largest/Smallest","Merge K Sorted Arrays","Median of Stream (two heaps)","Task Scheduler","Sliding Window Max","Reorganize String","Dijkstra's Algorithm"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Interview trigger words → heap:</strong> "top k", "kth largest/smallest", "priority-based", "smallest/largest repeatedly", "median of stream", "merge k sorted". See any of these → think heap immediately.</div>
          </div>
        </div>
      )}

      {/* Heap: complexity table */}
      {is("Heap Sort & Complexity") && (
        <div className="sec">
          <div className="stitle">All Operations at a Glance</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            <span className="op-badge ob-o1">Peek — O(1)</span>
            <span className="op-badge ob-on">Insert — O(log n)</span>
            <span className="op-badge ob-on">Delete — O(log n)</span>
            <span className="op-badge ob-o1">Build Heap — O(n)</span>
          </div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th>Time</th><th>Space</th><th>Notes</th></tr></thead>
            <tbody>
              {[
                ["Peek (max/min)","O(1)","O(1)","Root = always max/min","g"],
                ["Insert","O(log n)","O(1)","Bubble up","y"],
                ["Delete root","O(log n)","O(1)","Heapify down","y"],
                ["Build heap","O(n)","O(1)","Bottom-up — better than O(n log n)","g"],
                ["Heap sort","O(n log n)","O(1)","In-place — unique advantage","g"],
                ["Search arbitrary","O(n)","O(1)","No ordering between siblings","r"],
              ].map(([op,t,sp,note,c])=>(
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{t}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{sp}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Graphs: adjacency list vs matrix */}
      {is("Basics & Representation") && (
        <div className="sec">
          <div className="stitle">Adjacency List vs Matrix</div>
          <table className="fn-table">
            <thead><tr><th>Property</th><th>Adjacency List</th><th>Adjacency Matrix</th></tr></thead>
            <tbody>
              {[
                ["Space","O(V+E) ✓","O(V²) ✗"],
                ["Edge check","O(degree)","O(1) ✓"],
                ["Neighbour scan","O(degree) ✓","O(V) ✗"],
                ["Best for","Sparse graphs (most)","Dense graphs (E≈V²)"],
                ["Interview use","Almost always","Floyd-Warshall only"],
              ].map(([p,l,m])=>(
                <tr key={p}>
                  <td className="op">{p}</td>
                  <td style={{color:l.includes("✓")?"var(--green)":l.includes("✗")?"var(--red)":"var(--text2)",fontSize:".76rem"}}>{l}</td>
                  <td style={{color:m.includes("✓")?"var(--green)":m.includes("✗")?"var(--red)":"var(--text2)",fontSize:".76rem"}}>{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Default choice:</strong> Always use adjacency list unless told graph is dense or you need O(1) edge check. For undirected edge (u,v): add v to adj[u] AND u to adj[v].</div>
          </div>
        </div>
      )}

      {/* Graphs: BFS vs DFS */}
      {is("BFS & DFS") && (
        <div className="sec">
          <div className="stitle">BFS vs DFS at a Glance</div>
          <table className="fn-table">
            <thead><tr><th>Property</th><th>BFS</th><th>DFS</th></tr></thead>
            <tbody>
              {[
                ["Data structure","Queue (FIFO)","Stack / Recursion"],
                ["Traversal order","Level by level","Deep first"],
                ["Shortest path","YES (unweighted) ✓","NO ✗"],
                ["Cycle detection","YES","YES (better)"],
                ["Memory","O(V) — wide graphs costly","O(h) — deep graphs costly"],
                ["Use for","Shortest path, levels, BFS spread","DFS, topo sort, backtracking"],
              ].map(([p,b,d])=>(
                <tr key={p}>
                  <td className="op">{p}</td>
                  <td style={{color:b.includes("✓")?"var(--green)":b.includes("NO")?"var(--red)":"var(--text2)",fontSize:".76rem"}}>{b}</td>
                  <td style={{color:d.includes("✓")?"var(--green)":d.includes("NO ✗")?"var(--red)":"var(--text2)",fontSize:".76rem"}}>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Common mistake:</strong> Using DFS for shortest path — WRONG. DFS doesn't guarantee shortest path. Always use BFS for unweighted shortest path. Always maintain a visited array to avoid infinite loops.</div>
          </div>
        </div>
      )}

      {/* Graphs: shortest path algo comparison */}
      {is("Shortest Path Algorithms") && (
        <div className="sec">
          <div className="stitle">Algorithm Selection Guide</div>
          <table className="fn-table">
            <thead><tr><th>Algorithm</th><th>Time</th><th>Weights</th><th>Negative?</th><th>Use when</th></tr></thead>
            <tbody>
              {[
                ["BFS","O(V+E)","Unweighted","N/A","Unweighted graphs","g"],
                ["Dijkstra","O((V+E)log V)","Weighted","No","Most weighted problems","g"],
                ["Bellman-Ford","O(VE)","Weighted","YES ✓","Negative edges exist","y"],
                ["Floyd-Warshall","O(V³)","Weighted","YES","All-pairs, V ≤ 500","r"],
              ].map(([a,t,w,n,u,c])=>(
                <tr key={a}>
                  <td className="op">{a}</td>
                  <td className={`cx-${c}`} style={{fontFamily:"Space Mono,monospace",fontSize:".73rem"}}>{t}</td>
                  <td style={{color:"var(--text2)",fontSize:".73rem"}}>{w}</td>
                  <td style={{color:n.includes("✓")?"var(--green)":"var(--text3)",fontSize:".73rem"}}>{n}</td>
                  <td style={{color:"var(--text3)",fontSize:".72rem"}}>{u}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Dijkstra stale entry trick:</strong> When popping (d, u), if d &gt; dist[u] → skip (it's an outdated entry). This is the key optimisation that makes Dijkstra work correctly with a lazy deletion heap.</div>
          </div>
        </div>
      )}

      {/* Graphs: topo + union-find pills */}
      {is("Topological Sort & Union-Find") && (
        <div className="sec">
          <div className="stitle">When to Use Each</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {title:"Topological Sort",items:["Course scheduling","Build system dependencies","Task ordering with prerequisites","Any DAG ordering problem"],color:"var(--accent2)"},
              {title:"Union-Find",items:["Cycle detection (undirected)","Kruskal's MST","Number of connected components","Network connectivity queries"],color:"var(--accent3)"},
            ].map(({title,items,color})=>(
              <div key={title} style={{flex:1,minWidth:200,background:"var(--bg2)",border:`1px solid ${color}`,borderLeft:`3px solid ${color}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color,fontWeight:700,marginBottom:8}}>{title}</div>
                {items.map((s,i)=><div key={i} style={{fontSize:".75rem",color:"var(--text2)",marginBottom:4}}>• {s}</div>)}
              </div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Kahn's Cycle Detection (free with Topo Sort)</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:1.8}}>
              {"After Kahn's algorithm: if len(result) < V → cycle exists!"}<br/>
              {"No extra code needed — cycle detection comes for free ✓"}
            </div>
          </div>
        </div>
      )}

      {/* Graphs: patterns pills */}
      {is("Important Patterns & Problems") && (
        <div className="sec">
          <div className="stitle">Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Grid as Graph","Multi-source BFS","Cycle Detection (undirected)","Directed Cycle (3-color DFS)","Bipartite Check (2-coloring)","Connected Components","Flood Fill","Island Counting"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Grid traversal template:</strong> dx=[-1,0,1,0], dy=[0,1,0,-1] (4-directional). Always check 0≤nx&lt;rows AND 0≤ny&lt;cols before accessing grid[nx][ny]. Multi-source BFS = enqueue ALL sources at level 0 simultaneously.</div>
          </div>
        </div>
      )}

      {/* DP: two properties visual */}
      {is("Basics & Two Properties") && (
        <div className="sec">
          <div className="stitle">DP Decision Checklist</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {title:"Overlapping Subproblems","desc":"Same subproblem appears multiple times in the recursion tree. Drawing fib(5) reveals fib(3) computed twice, fib(2) three times.","color":"var(--accent)"},
              {title:"Optimal Substructure","desc":"Optimal solution built from optimal subsolutions. Shortest path A→C via B = shortest(A,B) + shortest(B,C).","color":"var(--accent3)"},
            ].map(({title,desc,color})=>(
              <div key={title} style={{flex:1,minWidth:200,background:"var(--bg2)",border:`1px solid ${color}`,borderLeft:`3px solid ${color}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color,fontWeight:700,marginBottom:6}}>{title}</div>
                <div style={{fontSize:".77rem",color:"var(--text2)"}}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">4-Step DP Framework</div>
            <div className="theorem-text" style={{fontFamily:"'Space Mono',monospace",fontSize:".76rem",lineHeight:2}}>
              {"1. Define STATE:      dp[i] = ?"}<br/>
              {"2. Write TRANSITION:  dp[i] = f(dp[i-1], dp[i-2]...)"}<br/>
              {"3. Base CASES:        dp[0]=?, dp[1]=?"}<br/>
              {"4. Compute ORDER:     bottom-up or top-down"}
            </div>
          </div>
        </div>
      )}

      {/* DP: 1D patterns pills */}
      {is("1D DP Patterns") && (
        <div className="sec">
          <div className="stitle">1D DP Pattern Toolkit</div>
          <div className="pattern-pills">
            {["Fibonacci / Climbing Stairs","House Robber (skip adjacent)","Coin Change (min coins)","Coin Change (ways count)","LIS O(n²)","LIS O(n log n)","Word Break","Jump Game"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Coin Change direction matters:</strong> Min coins (unbounded) → iterate i forwards. 0/1 knapsack → iterate w BACKWARDS. Forgetting this turns 0/1 into unbounded knapsack — classic bug.</div>
          </div>
        </div>
      )}

      {/* DP: 2D patterns table */}
      {is("2D DP Patterns") && (
        <div className="sec">
          <div className="stitle">2D DP Problem Map</div>
          <table className="fn-table">
            <thead><tr><th>Problem</th><th>State</th><th>Transition</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["0/1 Knapsack","dp[i][w]=max val","take or skip item","O(n×W)"],
                ["LCS","dp[i][j]=LCS len","match→+1, else max","O(n×m)"],
                ["Edit Distance","dp[i][j]=min edits","match→copy, else 1+min","O(n×m)"],
                ["Unique Paths","dp[i][j]=paths","dp[i-1][j]+dp[i][j-1]","O(n×m)"],
                ["Min Path Sum","dp[i][j]=min cost","min(top,left)+grid[i][j]","O(n×m)"],
              ].map(([p,s,t,c])=>(
                <tr key={p}>
                  <td className="op" style={{fontSize:".75rem"}}>{p}</td>
                  <td style={{color:"var(--accent2)",fontFamily:"Space Mono,monospace",fontSize:".71rem"}}>{s}</td>
                  <td style={{color:"var(--text2)",fontSize:".71rem"}}>{t}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".71rem"}}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Space optimisation:</strong> Most 2D DP only needs the previous row → reduce to O(n) space. Knapsack iterate w backwards. LCS keep prev/curr rows. Unique paths: single 1D array.</div>
          </div>
        </div>
      )}

      {/* DP: classic problems pills */}
      {is("Classic Problems") && (
        <div className="sec">
          <div className="stitle">Must-Know DP Problems</div>
          <div className="pattern-pills">
            {["Kadane's Max Subarray","Subset Sum / Partition","Longest Palindromic Subsequence","Count Palindromic Substrings","Matrix Chain Multiplication","Rod Cutting","Egg Drop","Burst Balloons"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>DP vs Greedy:</strong> Greedy makes locally optimal choice → not always globally optimal. DP tries all options and picks best. If greedy gives correct answer → use it (simpler). Otherwise → DP guarantees optimality.</div>
          </div>
        </div>
      )}

      {/* Greedy: property check */}
      {is("Basics & Greedy Choice Property") && (
        <div className="sec">
          <div className="stitle">Greedy vs DP Decision</div>
          <table className="fn-table">
            <thead><tr><th>Problem</th><th>Greedy?</th><th>Reason</th></tr></thead>
            <tbody>
              {[
                ["Activity selection","YES ✓","Earliest end → provably optimal"],
                ["Fractional knapsack","YES ✓","Items divisible → take best ratio"],
                ["0/1 Knapsack","NO ✗","Can't take fractions → use DP"],
                ["Coin change (standard)","YES ✓","Standard denominations work"],
                ["Coin change (arbitrary)","NO ✗","Counterexample exists → DP"],
                ["Huffman coding","YES ✓","Min-heap merge → optimal codes"],
              ].map(([p,g,r])=>(
                <tr key={p}>
                  <td style={{color:"var(--text2)",fontSize:".76rem"}}>{p}</td>
                  <td style={{color:g.includes("✓")?"var(--green)":"var(--red)",fontFamily:"Space Mono,monospace",fontSize:".73rem",fontWeight:700}}>{g}</td>
                  <td style={{color:"var(--text3)",fontSize:".73rem"}}>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="callout callout-warn" style={{marginTop:10}}>
            <span className="callout-icon">⚡</span>
            <div className="callout-text"><strong>Quick test:</strong> Try to construct a counterexample for your greedy approach with n=3 or n=4. If you find one → greedy fails, use DP. If not → likely safe to proceed with greedy.</div>
          </div>
        </div>
      )}

      {/* Greedy: interval patterns */}
      {is("Interval Problems") && (
        <div className="sec">
          <div className="stitle">Interval Problem Patterns</div>
          <div className="pattern-pills">
            {["Activity Selection (sort by END)","Merge Intervals (sort by START)","Non-overlapping Removals","Min Platforms / Meeting Rooms II","Insert Interval","Minimum Arrows to Burst Balloons"].map(p=>(
              <div className="ppill" key={p}>{p}</div>
            ))}
          </div>
          <div className="theorem-box" style={{marginTop:12}}>
            <div className="theorem-label">Why sort by END time (not start)?</div>
            <div className="theorem-text">The activity finishing earliest leaves maximum room for future activities. Sorting by start instead is the #1 interval greedy bug. Exchange argument: if we swap any chosen activity for a later-ending one, we can never do better.</div>
          </div>
        </div>
      )}

      {/* Greedy: scheduling patterns */}
      {is("Fractional Knapsack & Scheduling") && (
        <div className="sec">
          <div className="stitle">Greedy Pattern → Algorithm</div>
          <table className="fn-table">
            <thead><tr><th>Pattern</th><th>Algorithm</th><th>Sort by</th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Sort + Select","Activity selection","End time","O(n log n)"],
                ["Sort by ratio","Fractional knapsack","value/weight ↓","O(n log n)"],
                ["Sort by profit","Job sequencing","Profit ↓","O(n log n)"],
                ["Min-heap merge","Connect ropes / Huffman","Frequency/size ↑","O(n log n)"],
                ["Linear scan","Gas station","N/A","O(n)"],
                ["Two-pass","Candy distribution","N/A","O(n)"],
              ].map(([p,a,s,t])=>(
                <tr key={p}>
                  <td className="op">{p}</td>
                  <td style={{color:"var(--text2)",fontSize:".74rem"}}>{a}</td>
                  <td style={{color:"var(--accent3)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{s}</td>
                  <td style={{color:"var(--green)",fontFamily:"Space Mono,monospace",fontSize:".72rem"}}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Greedy: complexity comparison */}
      {is("Greedy vs DP & Complexity") && (
        <div className="sec">
          <div className="stitle">Greedy vs DP</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {title:"Greedy ✓",items:["O(n log n) fast","Simple — sort + scan","Commits early, never backtracks","Requires proof (exchange argument)","Fails: 0/1 knapsack, arbitrary coins"],color:"var(--green)"},
              {title:"Dynamic Programming ✓",items:["O(n²) or O(n×W) — slower","Always correct if formulated right","Tries all subproblems, picks best","No proof needed — exhaustive","Works: knapsack, edit distance, LCS"],color:"var(--accent2)"},
            ].map(({title,items,color})=>(
              <div key={title} style={{flex:1,minWidth:190,background:"var(--bg2)",border:`1px solid ${color}`,borderLeft:`3px solid ${color}`,borderRadius:8,padding:"12px 14px"}}>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:".72rem",color,fontWeight:700,marginBottom:8}}>{title}</div>
                {items.map((s,i)=><div key={i} style={{fontSize:".74rem",color:"var(--text2)",marginBottom:4}}>• {s}</div>)}
              </div>
            ))}
          </div>
          <div className="callout callout-tip" style={{marginTop:10}}>
            <span className="callout-icon">💡</span>
            <div className="callout-text"><strong>Rule:</strong> Always try greedy first — it's simpler and faster. Construct a counterexample to check. If greedy fails → fall back to DP.</div>
          </div>
        </div>
      )}

      {/* ── STANDARD SECTIONS ── */}
      <div className="sec">
        <div className="stitle">Concept Explanation</div>
        <div className="prose">{data.explanation}</div>
      </div>

      <div className="sec">
        <div className="stitle">Intuition — Why Does It Work?</div>
        <div className="intuition-box">{data.intuition}</div>
      </div>

      <div className="sec">
        <div className="stitle">Step-by-Step Breakdown</div>
        <div className="steps">
          {(data.steps || []).map((s, i) => (
            <div className="step" key={i}>
              <div className="snum">{i + 1}</div>
              <div className="stext">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {data.dryRun && (
        <div className="sec">
          <div className="stitle">Dry Run Example</div>
          <div className="dry-run" dangerouslySetInnerHTML={{ __html: dryRunHtml }} />
        </div>
      )}

      {data.time && (
        <div className="sec">
          <div className="stitle">Time & Space Complexity</div>
          <div className="cxgrid">
            <div className="cxcard"><div className="cxl">Best Case</div><div className="cxv" style={{ color: "var(--green)" }}>{data.time.best}</div></div>
            <div className="cxcard"><div className="cxl">Average Case</div><div className="cxv">{data.time.avg}</div></div>
            <div className="cxcard"><div className="cxl">Worst Case</div><div className="cxv" style={{ color: "var(--red)" }}>{data.time.worst}</div></div>
            <div className="cxcard"><div className="cxl">Space</div><div className="cxv" style={{ color: "var(--accent3)" }}>{data.space}</div></div>
          </div>
        </div>
      )}

      {data.cpp && data.python && (
        <div className="sec">
          <div className="stitle">Code Implementation</div>
          <CodeBlock cpp={data.cpp} python={data.python} />
        </div>
      )}

      {data.when && (
        <div className="sec">
          <div className="stitle">When to Use</div>
          <div className="when-box">{data.when}</div>
        </div>
      )}

      {(data.pros || data.cons) && (
        <div className="sec">
          <div className="stitle">Pros & Cons</div>
          <div className="pcgrid">
            <div className="pcbox">
              <div className="pct" style={{ color: "var(--green)" }}>✓ Pros</div>
              <ul className="pcl">{(data.pros || []).map((p, i) => <li key={i}><span style={{ color: "var(--green)", flexShrink: 0 }}>+</span>{p}</li>)}</ul>
            </div>
            <div className="pcbox">
              <div className="pct" style={{ color: "var(--red)" }}>✗ Cons</div>
              <ul className="pcl">{(data.cons || []).map((c, i) => <li key={i}><span style={{ color: "var(--red)", flexShrink: 0 }}>−</span>{c}</li>)}</ul>
            </div>
          </div>
        </div>
      )}

      {data.practice?.length > 0 && (
        <div className="sec">
          <div className="stitle">Practice Questions</div>
          <div className="pqlist">
            {data.practice.map((q, i) => (
              <div className="pq" key={i}>
                <div className="pqn">{q.name}</div>
                <Tag diff={q.diff} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Arrays: language functions cheatsheet */}
      {(name === "Core Operations" || name === "Types of Arrays") && (
        <div className="sec">
          <div className="stitle">Language Functions Cheatsheet</div>
          <table className="fn-table">
            <thead><tr><th>Operation</th><th><span className="lang-badge lb-cpp">C++</span></th><th><span className="lang-badge lb-py">Python</span></th><th>Time</th></tr></thead>
            <tbody>
              {[
                ["Append", "v.push_back(x)", "a.append(x)", "O(1)*"],
                ["Remove last", "v.pop_back()", "a.pop()", "O(1)"],
                ["Insert at i", "v.insert(it,x)", "a.insert(i,x)", "O(n)"],
                ["Delete at i", "v.erase(it)", "a.pop(i) / del a[i]", "O(n)"],
                ["Length", "v.size()", "len(a)", "O(1)"],
                ["Sort", "sort(v.begin(),v.end())", "a.sort()", "O(n log n)"],
                ["Reverse", "reverse(v.begin(),v.end())", "a.reverse()", "O(n)"],
                ["Find", "find(v.begin(),v.end(),x)", "a.index(x) / x in a", "O(n)"],
              ].map(([op, cpp, py, t]) => (
                <tr key={op}>
                  <td className="op">{op}</td>
                  <td style={{ color: "var(--accent2)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{cpp}</td>
                  <td style={{ color: "var(--accent3)", fontFamily: "'Space Mono',monospace", fontSize: ".72rem" }}>{py}</td>
                  <td style={{ color: "var(--text3)" }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── TOPIC PAGE ──────────────────────────────────────────────────
function TopicPage({ topic, goHome }) {
  const data = DSA_DATA[topic];
  const subtopics = Object.keys(data.subtopics || {});
  const [active, setActive] = useState(subtopics[0] || null);

  function tagCls(d) {
    return d === "easy" ? { bg: "rgba(6,255,165,.12)", color: "var(--green)" }
      : d === "medium" ? { bg: "rgba(255,209,102,.12)", color: "var(--yellow)" }
        : { bg: "rgba(255,92,92,.12)", color: "var(--red)" };
  }

  return (
    <div className="tpage">
      <div className="sidebar">
        <div className="sbt">{topic}</div>
        {subtopics.length === 0
          ? <div style={{ padding: "18px", color: "var(--text3)", fontSize: ".82rem" }}>Content coming soon…</div>
          : subtopics.map(s => {
            const tc = tagCls(data.subtopics[s].diff);
            return (
              <div key={s} className={`sbi${active === s ? " active" : ""}`} onClick={() => setActive(s)}>
                <span>{s}</span>
                <span style={{ fontSize: ".65rem", padding: "2px 8px", borderRadius: 12, fontWeight: 700, background: tc.bg, color: tc.color }}>
                  {data.subtopics[s].diff}
                </span>
              </div>
            );
          })}
      </div>
      <div className="tcontent">
        <div className="bc">
          <span onClick={goHome}>Home</span>
          <span className="bcsep">›</span>
          <span onClick={goHome} style={{ color: "var(--text2)" }}>{topic}</span>
          {active && <><span className="bcsep">›</span><span style={{ color: "var(--accent)" }}>{active}</span></>}
        </div>
        {active
          ? <SubtopicView data={data.subtopics[active]} name={active} />
          : <div className="empty">
            <div className="eicon">{data.icon}</div>
            <div className="etitle">{topic}</div>
            <div className="esub">{data.desc}</div>
          </div>}
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────


// ─── PROGRESS TRACKER ────────────────────────────────────────────
function ProgressTracker({ onNavigate }) {
  const STORAGE_KEY = "dsaforge_progress";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }

  function saveProgress(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
  }

  const [progress, setProgress] = useState(loadProgress);
  const [expanded, setExpanded] = useState(null);
  const [streak, setStreak] = useState(0);

  // streak calculation
  useState(() => {
    try {
      const today = new Date().toDateString();
      const raw = JSON.parse(localStorage.getItem("dsaforge_streak") || "{}");
      const last = raw.lastDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let s = raw.count || 0;
      if (last === today) s = s;
      else if (last === yesterday) s = s + 1;
      else s = 1;
      localStorage.setItem("dsaforge_streak", JSON.stringify({ lastDate: today, count: s }));
      setStreak(s);
    } catch {}
  }, []);

  function toggle(topic, sub) {
    const key = topic + "||" + sub;
    const next = { ...progress, [key]: !progress[key] };
    setProgress(next);
    saveProgress(next);
  }

  const topics = Object.entries(DSA_DATA);
  const totalSubs = topics.reduce((a, [, d]) => a + Object.keys(d.subtopics || {}).length, 0);
  const doneSubs = Object.values(progress).filter(Boolean).length;
  const pct = totalSubs ? Math.round((doneSubs / totalSubs) * 100) : 0;

  const RADIUS = 20, CIRC = 2 * Math.PI * RADIUS;

  return (
    <div className="prog-page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="ai-badge">📊 Your Progress</div>
        <div className="ai-title">Study Tracker</div>
        <p className="ai-sub">Mark subtopics as complete. Your progress is saved locally.</p>
      </div>

      {/* Overview card */}
      <div className="prog-overview">
        <div className="prog-score">
          <div className="prog-score-num">{pct}%</div>
          <div className="prog-score-label">Interview Ready</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", color: "var(--text2)", marginBottom: 8 }}>
            <span>{doneSubs} of {totalSubs} subtopics done</span>
            {streak > 0 && <span className="streak-badge">🔥 {streak} day streak</span>}
          </div>
          <div className="prog-bar-wrap" style={{ height: 8 }}>
            <div className="prog-bar" style={{ width: pct + "%" }} />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14, flexWrap: "wrap" }}>
            {[
              ["Easy", topics.filter(([,d]) => d.diff==="easy").reduce((a,[,d])=>a+Object.keys(d.subtopics||{}).length,0), "var(--green)"],
              ["Medium", topics.filter(([,d]) => d.diff==="medium").reduce((a,[,d])=>a+Object.keys(d.subtopics||{}).length,0), "var(--yellow)"],
              ["Hard", topics.filter(([,d]) => d.diff==="hard").reduce((a,[,d])=>a+Object.keys(d.subtopics||{}).length,0), "var(--red)"],
            ].map(([label, count, color]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: ".74rem", color: "var(--text2)" }}>{label}: {count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topic grid */}
      <div className="prog-grid">
        {topics.map(([name, data]) => {
          const subs = Object.keys(data.subtopics || {});
          if (subs.length === 0) return null;
          const done = subs.filter(s => progress[name + "||" + s]).length;
          const topicPct = subs.length ? Math.round((done / subs.length) * 100) : 0;
          const isOpen = expanded === name;
          const strokeColor = topicPct === 100 ? "var(--green)" : topicPct > 0 ? "var(--accent)" : "var(--border)";

          return (
            <div key={name} className="prog-card" onClick={() => setExpanded(isOpen ? null : name)}>
              <div className="prog-card-header">
                <div className="prog-ring-wrap">
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle className="prog-ring-bg" cx="26" cy="26" r={RADIUS} />
                    <circle
                      className="prog-ring-fill"
                      cx="26" cy="26" r={RADIUS}
                      stroke={strokeColor}
                      strokeDasharray={CIRC}
                      strokeDashoffset={CIRC - (topicPct / 100) * CIRC}
                    />
                  </svg>
                  <div className="prog-pct" style={{ color: strokeColor }}>{topicPct}%</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "1.1rem" }}>{data.icon}</span>
                    <span className="prog-name">{name}</span>
                  </div>
                  <div className="prog-count">{done}/{subs.length} done · click to expand</div>
                </div>
              </div>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 8 }} onClick={e => e.stopPropagation()}>
                  {subs.map(sub => {
                    const key = name + "||" + sub;
                    const isDone = !!progress[key];
                    return (
                      <div key={sub} className="subtopic-check" onClick={() => toggle(name, sub)}>
                        <div className={"check-box" + (isDone ? " done" : "")}>
                          {isDone && <span style={{ color: "#000", fontSize: ".7rem", fontWeight: 900 }}>✓</span>}
                        </div>
                        <span className={"check-label" + (isDone ? " done" : "")}>{sub}</span>
                        <span
                          style={{ fontSize: ".68rem", color: "var(--accent)", cursor: "pointer", marginLeft: 4 }}
                          onClick={e => { e.stopPropagation(); onNavigate(name); }}
                        >→ study</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {doneSubs > 0 && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button className="ai-btn ai-btn-secondary" onClick={() => {
            if (window.confirm("Reset all progress?")) {
              setProgress({});
              saveProgress({});
            }
          }}>↺ Reset Progress</button>
        </div>
      )}
    </div>
  );
}

// ─── AI CODE REVIEWER ────────────────────────────────────────────
function AICodeReviewer() {
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("cpp");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const [error, setError] = useState("");

  const SYSTEM_PROMPT = `You are DSAforge AI, an expert DSA code reviewer for a BITS Pilani CS student preparing for interviews.
Review the given code and respond ONLY in this exact JSON (no markdown, no backticks):
{
  "verdict": "Excellent|Good|Needs Work|Buggy",
  "time_complexity": "O(...) — brief explanation",
  "space_complexity": "O(...) — brief explanation",
  "is_optimal": true or false,
  "optimal_complexity": "O(...) if not optimal, else same as above",
  "issues": [
    {"type": "bug|performance|style|edge-case", "icon": "🐛|⚡|✨|🔍", "text": "description of issue"}
  ],
  "strengths": ["what the code does well (2-3 points)"],
  "improved_code": "cleaner/more optimal version of the code with comments",
  "key_insight": "the single most important thing to learn from this review"
}`;

  async function review_code() {
    if (!code.trim()) return;
    setLoading(true); setError(""); setReview(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{
            role: "user",
            content: `Language: ${lang === "cpp" ? "C++" : "Python"}
${context ? "Problem context: " + context + "
" : ""}
Code to review:
${code}`
          }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      try {
        const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
        setReview(parsed);
      } catch { setError(raw || "Could not parse response."); }
    } catch { setError("Network error. Please try again."); }
    setLoading(false);
  }

  const verdictClass = v => v === "Excellent" ? "verdict-good" : v === "Good" ? "verdict-good" : v === "Needs Work" ? "verdict-ok" : "verdict-bad";
  const verdictEmoji = v => v === "Excellent" ? "🏆" : v === "Good" ? "✅" : v === "Needs Work" ? "⚠️" : "🐛";

  return (
    <div className="reviewer-page">
      <div style={{ marginBottom: 28 }}>
        <div className="ai-badge">🔍 Powered by Claude AI</div>
        <div className="ai-title">AI Code Reviewer</div>
        <p className="ai-sub">Paste your DSA solution and get instant feedback on correctness, complexity, edge cases, and a cleaner rewrite.</p>
      </div>

      {/* Input split */}
      <div className="rev-split">
        <div>
          <div className="ai-input-area" style={{ marginBottom: 0, height: "100%" }}>
            <div className="ai-label">// your code</div>
            <textarea
              className="ai-textarea"
              style={{ minHeight: 220, fontFamily: "'Space Mono',monospace", fontSize: ".76rem" }}
              placeholder={"// Paste your solution here
void twoSum(vector<int>& nums, int target) {
    // ...
}"}
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="ai-input-area" style={{ marginBottom: 0, height: "100%" }}>
            <div className="ai-label">// problem context (optional)</div>
            <textarea
              className="ai-textarea"
              style={{ minHeight: 100 }}
              placeholder={"e.g. Two Sum — find indices of two numbers that add to target in an unsorted array"}
              value={context}
              onChange={e => setContext(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <div className="ai-label" style={{ marginBottom: 8 }}>// language</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["cpp", "python"].map(l => (
                  <button key={l} className={"ai-lang-btn" + (lang === l ? " active" : "")} onClick={() => setLang(l)}>
                    {l === "cpp" ? "C++" : "Python"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-controls" style={{ marginBottom: 24, marginTop: 14 }}>
        <button className="ai-btn ai-btn-primary" onClick={review_code} disabled={loading || !code.trim()}>
          {loading ? <><span className="ai-streaming" /> Reviewing...</> : "🔍 Review My Code"}
        </button>
        <button className="ai-btn ai-btn-secondary" onClick={() => { setCode(""); setReview(null); setContext(""); setError(""); }}>
          ✕ Clear
        </button>
      </div>

      {error && <div className="ai-error">{error}</div>}

      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {["Analysing time & space complexity…", "Checking for bugs and edge cases…", "Writing improved version…"].map((msg, i) => (
            <div key={i} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center", opacity: 1 - i * 0.25 }}>
              <span className="ai-streaming" />
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".76rem", color: "var(--text3)" }}>{msg}</span>
            </div>
          ))}
        </div>
      )}

      {review && (
        <div className="ai-response">
          {/* Verdict header */}
          <div className="ai-response-card">
            <div className="ai-response-header">
              <span className="ai-response-icon">{verdictEmoji(review.verdict)}</span>
              <span className="ai-response-title">Verdict</span>
              <span className={"verdict-badge " + verdictClass(review.verdict)} style={{ marginLeft: "auto" }}>
                {review.verdict}
              </span>
            </div>
            <div className="ai-response-body">
              <div className="ai-complexity-row">
                {[["Time", review.time_complexity], ["Space", review.space_complexity]].map(([l, v]) => (
                  <div key={l} className="ai-cx"><div className="ai-cx-label">{l}</div><div className="ai-cx-val">{v}</div></div>
                ))}
                {!review.is_optimal && (
                  <div className="ai-cx" style={{ borderColor: "rgba(255,209,102,.3)" }}>
                    <div className="ai-cx-label" style={{ color: "var(--yellow)" }}>Optimal</div>
                    <div className="ai-cx-val" style={{ color: "var(--yellow)" }}>{review.optimal_complexity}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Issues + Strengths */}
          <div className="rev-split">
            <div className="ai-response-card" style={{ marginBottom: 0 }}>
              <div className="ai-response-header">
                <span className="ai-response-icon">⚠️</span>
                <span className="ai-response-title">Issues Found</span>
                <span style={{ marginLeft: "auto", fontSize: ".7rem", color: "var(--text3)", fontFamily: "'Space Mono',monospace" }}>
                  {(review.issues || []).length} issue{(review.issues || []).length !== 1 ? "s" : ""}
                </span>
              </div>
              <div style={{ padding: "12px 16px" }}>
                {(review.issues || []).length === 0 ? (
                  <div style={{ color: "var(--green)", fontSize: ".82rem" }}>✓ No issues found!</div>
                ) : (review.issues || []).map((iss, i) => (
                  <div key={i} className="issue-item">
                    <span className="issue-icon">{iss.icon || "•"}</span>
                    <div>
                      <div style={{ fontSize: ".68rem", color: "var(--accent2)", fontFamily: "'Space Mono',monospace", marginBottom: 3, textTransform: "uppercase" }}>{iss.type}</div>
                      <div className="issue-text">{iss.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-response-card" style={{ marginBottom: 0 }}>
              <div className="ai-response-header">
                <span className="ai-response-icon">💪</span>
                <span className="ai-response-title">Strengths</span>
              </div>
              <div style={{ padding: "12px 16px" }}>
                {(review.strengths || []).map((s, i) => (
                  <div key={i} className="issue-item">
                    <span className="issue-icon">✅</span>
                    <div className="issue-text">{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key insight */}
          {review.key_insight && (
            <div className="ai-response-card" style={{ marginTop: 14 }}>
              <div className="ai-response-header">
                <span className="ai-response-icon">🎯</span>
                <span className="ai-response-title">Key Insight</span>
              </div>
              <div className="ai-response-body" style={{ borderLeft: "3px solid var(--accent2)", marginLeft: 20, marginRight: 20, paddingLeft: 14, borderRadius: 4 }}>
                {review.key_insight}
              </div>
            </div>
          )}

          {/* Improved code */}
          {review.improved_code && (
            <div className="ai-response-card" style={{ marginTop: 14 }}>
              <div className="ai-response-header">
                <span className="ai-response-icon">✨</span>
                <span className="ai-response-title">Improved Version</span>
                <button
                  className="copy-btn"
                  style={{ position: "static", marginLeft: "auto" }}
                  onClick={() => navigator.clipboard.writeText(review.improved_code)}
                >Copy</button>
              </div>
              <div style={{ background: "var(--bg2)", padding: "18px 22px", overflowX: "auto" }}>
                <pre style={{ fontFamily: "'Space Mono',monospace", fontSize: ".77rem", lineHeight: 1.8, color: "var(--text)", margin: 0 }}>
                  {review.improved_code}
                </pre>
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <button className="ai-btn ai-btn-secondary" onClick={() => { setCode(""); setReview(null); setContext(""); }}>
              ← Review Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI PROBLEM SOLVER ───────────────────────────────────────────
function AISolver() {
  const [problem, setProblem] = useState("");
  const [lang, setLang] = useState("cpp");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [streaming, setStreaming] = useState("");

  const EXAMPLES = [
    "Two Sum — find two numbers that add to target",
    "LRU Cache — design a cache with O(1) get and put",
    "Maximum subarray sum in O(n)",
    "Detect cycle in a linked list",
    "Number of islands in a grid",
    "Longest palindromic substring",
    "Merge k sorted linked lists",
    "Word ladder minimum transformations"
  ];

  const SYSTEM_PROMPT = `You are DSAforge AI, an expert DSA tutor for a CS student at BITS Pilani. 
When given a problem, respond in this EXACT JSON format (no markdown, no backticks, pure JSON):
{
  "pattern": "name of the DSA pattern(s) used",
  "difficulty": "easy|medium|hard",
  "time": "O(...)",
  "space": "O(...)",
  "intuition": "2-3 sentences on the core insight — WHY this approach works",
  "approach": "numbered step-by-step algorithm in plain English (5-8 steps)",
  "code_cpp": "complete working C++ solution with comments",
  "code_python": "complete working Python solution with comments",
  "edge_cases": "3-4 important edge cases to test",
  "followup": "2 follow-up variations of this problem"
}`;

  async function solve() {
    if (!problem.trim()) return;
    setLoading(true); setError(""); setResponse(null); setStreaming("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: `Solve this DSA problem in ${lang === "cpp" ? "C++" : "Python"} (primary): ${problem}` }]
        })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || "";
      try {
        const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
        setResponse(parsed);
      } catch {
        setError(raw);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="ai-page">
      <div className="ai-hero">
        <div className="ai-badge">🤖 Powered by Claude AI</div>
        <div className="ai-title">AI Problem Solver</div>
        <p className="ai-sub">Paste any DSA problem and get the pattern, intuition, step-by-step approach, and full code — instantly.</p>
      </div>

      {/* Input */}
      <div className="ai-input-area">
        <div className="ai-label">// paste your problem</div>
        <textarea
          className="ai-textarea"
          placeholder={"E.g. — Given an array of integers, find two numbers that add up to a target. Return their indices.\n\nOr just describe it: 'find longest palindromic substring'"}
          value={problem}
          onChange={e => setProblem(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) solve(); }}
        />
        <div className="ai-controls">
          <button className={"ai-btn ai-btn-primary"} onClick={solve} disabled={loading || !problem.trim()}>
            {loading ? <><span className="ai-streaming"/> Solving...</> : <> ⚡ Solve It</>}
          </button>
          <button className="ai-btn ai-btn-secondary" onClick={() => { setProblem(""); setResponse(null); setError(""); }}>
            ✕ Clear
          </button>
          <div className="ai-lang">
            {["cpp","python"].map(l => (
              <button key={l} className={"ai-lang-btn"+(lang===l?" active":"")} onClick={() => setLang(l)}>
                {l==="cpp"?"C++":"Python"}
              </button>
            ))}
          </div>
        </div>
        <div style={{fontSize:".68rem",color:"var(--text3)",marginTop:8,fontFamily:"'Space Mono',monospace"}}>
          Ctrl+Enter to solve
        </div>
      </div>

      {/* Examples */}
      {!response && !loading && (
        <div>
          <div style={{fontSize:".72rem",color:"var(--text3)",fontFamily:"'Space Mono',monospace",marginBottom:8}}>// try an example</div>
          <div className="ai-examples">
            {EXAMPLES.map((ex, i) => (
              <div key={i} className="ai-example" onClick={() => setProblem(ex)}>
                {ex}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && <div className="ai-error" style={{marginTop:16}}>⚠ {error}</div>}

      {/* Loading skeleton */}
      {loading && (
        <div style={{marginTop:24,display:"flex",flexDirection:"column",gap:14}}>
          {["Identifying pattern…","Writing approach…","Generating code…"].map((msg,i) => (
            <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:"16px 20px",display:"flex",alignItems:"center",gap:12,opacity:1-i*0.25,animation:"fadeIn .4s ease",animationDelay:`${i*0.15}s`,animationFillMode:"both"}}>
              <span className="ai-streaming"/>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:".78rem",color:"var(--text3)"}}>{msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="ai-response" style={{marginTop:8}}>

          {/* Pattern + Difficulty */}
          <div className="ai-response-card">
            <div className="ai-response-header">
              <span className="ai-response-icon">🎯</span>
              <span className="ai-response-title">Pattern Identified</span>
            </div>
            <div className="ai-response-body">
              <div style={{marginBottom:12,display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
                {(response.pattern||"").split(/[,+&\/]/).map((p,i) => (
                  <span key={i} className="ai-pattern-tag">◆ {p.trim()}</span>
                ))}
                <span style={{fontSize:".72rem",padding:"3px 10px",borderRadius:20,fontWeight:700,background:response.difficulty==="easy"?"rgba(6,255,165,.12)":response.difficulty==="medium"?"rgba(255,209,102,.12)":"rgba(255,92,92,.12)",color:response.difficulty==="easy"?"var(--green)":response.difficulty==="medium"?"var(--yellow)":"var(--red)",fontFamily:"'Space Mono',monospace"}}>
                  {response.difficulty}
                </span>
              </div>
              <div className="ai-complexity-row">
                {[["Time",response.time],["Space",response.space]].map(([label,val]) => (
                  <div key={label} className="ai-cx">
                    <div className="ai-cx-label">{label}</div>
                    <div className="ai-cx-val">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intuition */}
          <div className="ai-response-card">
            <div className="ai-response-header">
              <span className="ai-response-icon">💡</span>
              <span className="ai-response-title">Core Intuition</span>
            </div>
            <div className="ai-response-body">{response.intuition}</div>
          </div>

          {/* Approach */}
          <div className="ai-response-card">
            <div className="ai-response-header">
              <span className="ai-response-icon">📋</span>
              <span className="ai-response-title">Step-by-Step Approach</span>
            </div>
            <div className="ai-response-body">
              {(response.approach||"").split("\n").map((line,i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                const match = trimmed.match(/^(\d+\.?)\s*(.*)/);
                if (match) return (
                  <div key={i} style={{display:"flex",gap:12,marginBottom:10,alignItems:"flex-start"}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:"var(--accent)",color:"#fff",fontSize:".7rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Space Mono',monospace"}}>{match[1].replace(".","")}</div>
                    <div style={{paddingTop:3,lineHeight:1.7}}>{match[2]}</div>
                  </div>
                );
                return <div key={i} style={{marginBottom:6}}>{trimmed}</div>;
              })}
            </div>
          </div>

          {/* Code */}
          <div className="ai-response-card">
            <div className="ai-response-header">
              <span className="ai-response-icon">💻</span>
              <span className="ai-response-title">Code Solution</span>
              <div style={{marginLeft:"auto",display:"flex",gap:6}}>
                {["cpp","python"].map(l => (
                  <button key={l} className={"ai-lang-btn"+(lang===l?" active":"")} onClick={() => setLang(l)}>
                    {l==="cpp"?"C++":"Python"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{background:"var(--bg2)",padding:"18px 22px",overflowX:"auto"}}>
              <pre style={{fontFamily:"'Space Mono',monospace",fontSize:".78rem",lineHeight:1.8,color:"var(--text)",margin:0}}>
                {lang==="cpp" ? (response.code_cpp||"") : (response.code_python||"")}
              </pre>
            </div>
          </div>

          {/* Edge Cases + Follow-up */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[
              {icon:"🔍",title:"Edge Cases to Test",content:response.edge_cases},
              {icon:"🚀",title:"Follow-up Problems",content:response.followup}
            ].map(({icon,title,content}) => (
              <div key={title} className="ai-response-card" style={{marginBottom:0}}>
                <div className="ai-response-header">
                  <span className="ai-response-icon">{icon}</span>
                  <span className="ai-response-title">{title}</span>
                </div>
                <div className="ai-response-body">{content}</div>
              </div>
            ))}
          </div>

          {/* Solve another */}
          <div style={{marginTop:20,textAlign:"center"}}>
            <button className="ai-btn ai-btn-secondary" onClick={() => { setProblem(""); setResponse(null); }}>
              ← Solve Another Problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [aiPage, setAiPage] = useState(false);
  const [activePanel, setActivePanel] = useState(null); // "solver"|"reviewer"|"progress"
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchIndex = useMemo(() => {
    const idx = [];
    Object.entries(DSA_DATA).forEach(([topic, td]) => {
      idx.push({ label: topic, sub: "Topic", topic });
      Object.keys(td.subtopics || {}).forEach(s => idx.push({ label: s, sub: topic, topic }));
    });
    return idx;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(i => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q)).slice(0, 8);
  }, [query, searchIndex]);

  function goTo(topic) { setPage(topic); setAiPage(false); setActivePanel(null); setQuery(""); setShowResults(false); }

  return (
    <div className={dark ? "" : "light"} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "all .25s" }}>
      <style>{css + `@keyframes fadeIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={() => { setPage("home"); setAiPage(false); setActivePanel(null); }}>DSA<span>forge</span></div>
        <div className="sw">
          <span className="s-icon">⌕</span>
          <input className="si" placeholder="Search topics or algorithms…" value={query}
            onChange={e => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 180)}
          />
          {showResults && results.length > 0 && (
            <div className="sr">
              {results.map((r, i) => (
                <div key={i} className="sri" onMouseDown={() => goTo(r.topic)}>
                  <div className="sri-t">{r.label}</div>
                  <div className="sri-s">{r.sub}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="tbtn" onClick={() => setDark(!dark)}>{dark ? "☀ Light" : "☾ Dark"}</button>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          <button className="nbtn" style={{background:activePanel==="solver"?"var(--accent)":undefined}} onClick={() => { setActivePanel("solver"); setAiPage(false); setPage("home"); }}>⚡ Solver</button>
          <button className="nbtn" style={{background:activePanel==="reviewer"?"var(--accent)":undefined,backgroundImage:activePanel==="reviewer"?"none":undefined}} onClick={() => { setActivePanel("reviewer"); setAiPage(false); setPage("home"); }}>🔍 Reviewer</button>
          <button className="nbtn" style={{background:activePanel==="progress"?"var(--accent)":undefined,backgroundImage:activePanel==="progress"?"none":undefined}} onClick={() => { setActivePanel("progress"); setAiPage(false); setPage("home"); }}>📊 Progress</button>
        </div>
      </nav>

      {/* PAGES */}
      {activePanel === "solver" ? (
        <AISolver />
      ) : activePanel === "reviewer" ? (
        <AICodeReviewer />
      ) : activePanel === "progress" ? (
        <ProgressTracker onNavigate={(topic) => { setPage(topic); setActivePanel(null); }} />
      ) : page === "home" ? (
        <main className="home">
          <div className="hero">
            <div className="htag">⚡ BITS Pilani CS · Interview Ready</div>
            <h1>Master DSA,<br />Ace Every Interview.</h1>
            <p>Structured, visual, and code-first. Every major algorithm with explanations, dry runs, complexity tables, and C++ / Python code.</p>
            <div className="stats">
              <div><div className="sn">18</div><div className="sl">Topics</div></div>
              <div><div className="sn">50+</div><div className="sl">Algorithms</div></div>
              <div><div className="sn">C++</div><div className="sl">& Python</div></div>
            </div>
          </div>
          <div className="slabel">// explore all topics</div>
          <div className="tgrid">
            {Object.entries(DSA_DATA).map(([name, d]) => (
              <div key={name} className="tc" onClick={() => setPage(name)}>
                <div className="tci">{d.icon}</div>
                <div className="tcn">{name}</div>
                <div className="tcc">{Object.keys(d.subtopics || {}).length} subtopics</div>
                <Tag diff={d.diff} />
              </div>
            ))}
          </div>
        </main>
      ) : (
        <TopicPage topic={page} goHome={() => { setPage("home"); setAiPage(false); setActivePanel(null); }} />
      )}
    </div>
  );
}
