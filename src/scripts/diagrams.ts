// Render ```mermaid diagram placeholders. Mermaid is imported lazily so only
// pages that actually contain a diagram download it.
export {};
const containers = [...document.querySelectorAll<HTMLElement>('.prose .mermaid')];
if (containers.length) {
  const sources = containers.map((container) => (container.textContent ?? '').trim());
  const { default: mermaid } = await import('mermaid');
  let rendered = 0;
  const draw = () => Promise.all(containers.map(async (container, index) => {
    try {
      const { svg } = await mermaid.render(`diagram-${index}-${rendered}`, sources[index]);
      container.innerHTML = svg;
    } catch { // leave the source readable when a diagram fails to parse
      container.textContent = sources[index];
    }
  }));
  const start = () => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default',
      themeVariables: { fontFamily: "'DM Sans Variable', sans-serif" },
    });
    rendered += 1;
    return draw();
  };
  await start();
  new MutationObserver(start).observe(document.documentElement, { attributeFilter: ['data-theme'] });
}
