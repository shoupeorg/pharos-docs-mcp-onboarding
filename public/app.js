const byId = id => document.getElementById(id);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);

async function load() {
  const response = await fetch("/evidence/manifest.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`manifest HTTP ${response.status}`);
  const manifest = await response.json();
  byId("evidence-version").textContent = manifest.evidenceVersion;
  byId("onboarding-list").innerHTML = (manifest.onboarding ?? []).map(step => `<li><strong>${escapeHtml(step.title)}</strong><br>${escapeHtml(step.detail)} <span class="badge ${escapeHtml(step.statusClass)}">${escapeHtml(step.status)}</span></li>`).join("");
  byId("evidence-rows").innerHTML = manifest.items.map(item => `<tr><td><code>${escapeHtml(item.id)}</code></td><td>${escapeHtml(item.query)}</td><td><span class="badge ${escapeHtml(item.statusClass)}">${escapeHtml(item.outcome)}</span></td><td>${escapeHtml(item.completedAt ?? "UNKNOWN")}</td><td><a class="raw-link" href="/evidence/${encodeURIComponent(item.file)}">JSON</a></td></tr>`).join("");
  const gaps = manifest.gaps ?? [];
  byId("gap-cards").innerHTML = gaps.length ? gaps.map(gap => `<article class="gap-card"><p class="classification">${escapeHtml(gap.classification)}</p><h3>${escapeHtml(gap.title)}</h3><p>${escapeHtml(gap.impact)}</p><p><strong>Proposed fix:</strong> ${escapeHtml(gap.proposedFix)}</p></article>`).join("") : `<article class="gap-card"><p class="classification">UNMET REQUIREMENT</p><h3>0 of 3 supported documentation gaps</h3><p>The available evidence contains UI and environment failures, not documentation answers. No gap is fabricated.</p><p><a class="raw-link" href="/gaps.md">Open manual query set</a></p></article>`;
  byId("limitations").innerHTML = (manifest.limitations ?? []).map(x => `<p>${escapeHtml(x)}</p>`).join("") + `<p><a class="button" href="/final-report.md">Open final report</a> <a class="button" href="/onboarding-log.md">Open ordered log</a> <a class="button" href="/gaps.md">Open manual queries</a> <a class="button" href="/evidence/manifest.json">Open JSON evidence</a></p>`;
  byId("manifest-status").textContent = `${manifest.items.length} evidence records • ${manifest.gaps?.length ?? 0} classified gaps`;
}

load().catch(error => {
  byId("manifest-status").textContent = `Evidence load failed: ${error.message}`;
  byId("evidence-rows").innerHTML = `<tr><td colspan="5">${escapeHtml(error.message)}</td></tr>`;
});
