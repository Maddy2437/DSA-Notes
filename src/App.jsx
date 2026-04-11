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
  Stack: { icon: "📚", diff: "easy", desc: "LIFO. Powers recursion, expression parsing, monotonic stack problems.", subtopics: {} },
  Queue: { icon: "🎫", diff: "easy", desc: "FIFO. BFS, task scheduling, sliding window maximum.", subtopics: {} },
  Recursion: { icon: "🔄", diff: "medium", desc: "Self-reference. The mental model behind trees, graphs, and DP.", subtopics: {} },
  Searching: { icon: "🔍", diff: "easy", desc: "Linear O(n) to Binary O(log n). Master binary search and its variants.", subtopics: {} },
  Hashing: { icon: "#️⃣", diff: "medium", desc: "O(1) average lookups. HashMap, HashSet, collision handling, frequency counting.", subtopics: {} },
  Trees: { icon: "🌳", diff: "medium", desc: "Hierarchical data. DFS, BFS traversals, diameter, LCA — core interview topics.", subtopics: {} },
  "Binary Search Trees": { icon: "🌲", diff: "medium", desc: "Ordered trees enabling O(log n) search, insert, delete. Inorder gives sorted output.", subtopics: {} },
  Heaps: { icon: "🏔️", diff: "medium", desc: "Priority queues, top-K problems, scheduling. Max-heap and min-heap.", subtopics: {} },
  Graphs: { icon: "🕸️", diff: "hard", desc: "BFS, DFS, Dijkstra, Bellman-Ford, Topological Sort, Union-Find.", subtopics: {} },
  "Dynamic Programming": { icon: "💡", diff: "hard", desc: "Overlapping subproblems + optimal substructure. The crown jewel of FAANG interviews.", subtopics: {} },
  "Greedy Algorithms": { icon: "🏆", diff: "medium", desc: "Locally optimal choices lead to global optimum. Interval scheduling, Huffman coding.", subtopics: {} },
  Backtracking: { icon: "↩️", diff: "hard", desc: "Systematic trial-and-error with pruning. N-Queens, Sudoku, permutations.", subtopics: {} },
  Tries: { icon: "📖", diff: "hard", desc: "Prefix trees for autocomplete, spell-check, and word search problems.", subtopics: {} }
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
  return (
    <div>
      <div className="code-tabs">
        <button className={`ctab${lang === "cpp" ? " active" : ""}`} onClick={() => setLang("cpp")}>C++</button>
        <button className={`ctab${lang === "python" ? " active" : ""}`} onClick={() => setLang("python")}>Python</button>
      </div>
      <div className="cblock">
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

      {/* ── STANDARD SECTIONS (renders for ALL subtopics) ── */}
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
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
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

  function goTo(topic) { setPage(topic); setQuery(""); setShowResults(false); }

  return (
    <div className={dark ? "" : "light"} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", transition: "all .25s" }}>
      <style>{css + `@keyframes fadeIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={() => setPage("home")}>DSA<span>forge</span></div>
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
      </nav>

      {/* PAGES */}
      {page === "home" ? (
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
        <TopicPage topic={page} goHome={() => setPage("home")} />
      )}
    </div>
  );
}
