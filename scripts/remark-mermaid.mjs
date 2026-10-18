const escape = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

// Draw ```mermaid fences as client-side diagrams: emit a placeholder element
// (which also degrades to readable text when JavaScript is off) and skip the
// syntax highlighter, which has no grammar for Mermaid sources.
export default function remarkMermaid() {
  return (tree) => {
    (function walk(node) {
      if (!node.children) return;
      node.children.forEach((child, index) => {
        if (child.type === 'code' && (child.lang || '').toLowerCase() === 'mermaid') {
          node.children[index] = { type: 'html', value: `<pre class="mermaid">${escape(child.value)}</pre>` };
          return;
        }
        walk(child);
      });
    })(tree);
  };
}
