import {Fragment, type ComponentChild} from 'preact';
import {CodeBlock} from '../../code-block';

interface MarkdownProps {
  source: string;
}

type MarkdownNode =
  | {type: 'heading'; depth: number; text: string}
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]}
  | {type: 'code'; code: string; language?: string};

function parseMarkdown(source: string): MarkdownNode[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const nodes: MarkdownNode[] = [];
  let paragraph: string[] = [];
  let list: string[] | undefined;
  let inCode = false;
  let codeLanguage = '';
  let codeLines: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      nodes.push({type: 'paragraph', text: paragraph.join(' ')});
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list && list.length) {
      nodes.push({type: 'list', items: list});
    }
    list = undefined;
  };

  const flushCode = () => {
    if (codeLines.length) {
      nodes.push({
        type: 'code',
        code: codeLines.join('\n'),
        language: codeLanguage || undefined,
      });
    }
    codeLines = [];
    codeLanguage = '';
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        flushCode();
      } else {
        flushParagraph();
        flushList();
        codeLanguage = line.slice(3).trim();
      }
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith('#')) {
      flushParagraph();
      flushList();
      const match = /^(#+)\s*(.*)$/.exec(trimmed);
      if (match) {
        nodes.push({
          type: 'heading',
          depth: Math.min(match[1].length, 6),
          text: match[2].trim(),
        });
        continue;
      }
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      if (!list) list = [];
      list.push(trimmed.slice(2).trim());
      continue;
    }

    if (list) {
      list[list.length - 1] += ' ' + trimmed;
      continue;
    }

    paragraph.push(trimmed);
  }

  if (inCode) flushCode();
  flushParagraph();
  flushList();

  return nodes;
}

function renderInline(text: string): ComponentChild[] {
  const nodes: ComponentChild[] = [];
  const pattern = /(\`[^\`]+\`|\[[^\]]+\]\([^\)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('`')) {
      nodes.push(<code>{token.slice(1, -1)}</code>);
    } else if (token.startsWith('[')) {
      const closing = token.indexOf(']');
      const label = token.slice(1, closing);
      const url = token.slice(closing + 2, -1);
      nodes.push(
        <a href={url} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function Markdown({source}: MarkdownProps) {
  const nodes = parseMarkdown(source);

  return (
    <div class="component-markdown">
      {nodes.map((node, index) => {
        switch (node.type) {
          case 'heading': {
            const Tag = (`h${Math.min(node.depth, 6)}` as unknown) as keyof JSX.IntrinsicElements;
            return (
              <Tag key={index}>
                {renderInline(node.text)}
              </Tag>
            );
          }
          case 'paragraph':
            return (
              <p key={index}>{renderInline(node.text)}</p>
            );
          case 'list':
            return (
              <ul key={index}>
                {node.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case 'code':
            return <CodeBlock key={index} code={node.code} />;
          default:
            return <Fragment key={index} />;
        }
      })}
    </div>
  );
}
