interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <pre
      className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
      data-language={language}
    >
      <code>{code}</code>
    </pre>
  );
}
