import { marked, type Token, type Tokens } from "marked";
import {
  A,
  Badge,
  Blockquote,
  CodeBlock,
  Divider,
  H1,
  H2,
  H3,
  InlineCode,
  LI,
  OL,
  OptionalAttributeHeader,
  P,
  RequiredAttributeHeader,
  UL,
} from "./layout";

const KEYWORD_HEADING = /^`([^`]+)` — (required|optional)$/;

function renderInline(tokens: Token[]): any[] {
  return tokens.map((token, i) => {
    switch (token.type) {
      case "text": {
        const text = token as Tokens.Text;
        return text.tokens ? renderInline(text.tokens) : text.text;
      }
      case "codespan":
        return <InlineCode key={i}>{(token as Tokens.Codespan).text}</InlineCode>;
      case "strong":
        return <strong key={i}>{renderInline((token as Tokens.Strong).tokens)}</strong>;
      case "em":
        return <em key={i}>{renderInline((token as Tokens.Em).tokens)}</em>;
      case "link": {
        const link = token as Tokens.Link;
        return (
          <A key={i} href={link.href}>
            {renderInline(link.tokens)}
          </A>
        );
      }
      default:
        return (token as any).raw ?? "";
    }
  });
}

function renderCell(cell: Tokens.TableCell, key: number) {
  const text = cell.text.trim();
  if (text === "required" || text === "optional") {
    return (
      <td key={key} class="py-3 pr-8 align-top">
        <Badge kind={text} />
      </td>
    );
  }
  return (
    <td
      key={key}
      class="py-3 pr-8 text-stone-900/70 dark:text-stone-200/70 leading-relaxed align-top"
    >
      {renderInline(cell.tokens)}
    </td>
  );
}

function Table({ token }: { token: Tokens.Table }) {
  return (
    <table class="w-full text-sm mb-6">
      <thead>
        <tr>
          {token.header.map((cell, i) => (
            <th
              key={i}
              class="text-left text-xs uppercase tracking-widest text-stone-900/40 dark:text-stone-200/40 pb-3 pr-8 font-medium"
            >
              {renderInline(cell.tokens)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {token.rows.map((row, i) => (
          <tr key={i} class="border-t border-stone-900/10 dark:border-stone-200/10">
            {row.map((cell, j) => renderCell(cell, j))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Markdown({ children }: { children: string }) {
  const tokens = marked.lexer(children);
  const nodes: any[] = [];

  for (const [i, token] of tokens.entries()) {
    switch (token.type) {
      case "heading": {
        const heading = token as Tokens.Heading;
        if (heading.depth === 1) {
          nodes.push(<H1 key={i}>{renderInline(heading.tokens)}</H1>);
          break;
        }
        if (heading.depth === 2) {
          nodes.push(<H2 key={i}>{heading.text}</H2>);
          break;
        }

        const keyword = KEYWORD_HEADING.exec(heading.text);
        if (keyword) {
          const [, name, kind] = keyword;
          nodes.push(
            kind === "required" ? (
              <RequiredAttributeHeader key={i}>{name}</RequiredAttributeHeader>
            ) : (
              <OptionalAttributeHeader key={i}>{name}</OptionalAttributeHeader>
            ),
          );
        } else {
          nodes.push(<H3 key={i}>{heading.text}</H3>);
        }
        break;
      }

      case "paragraph":
        nodes.push(<P key={i}>{renderInline((token as Tokens.Paragraph).tokens)}</P>);
        break;

      case "code":
        nodes.push(<CodeBlock key={i}>{(token as Tokens.Code).text}</CodeBlock>);
        break;

      case "blockquote":
        nodes.push(<Blockquote key={i}>{(token as Tokens.Blockquote).text}</Blockquote>);
        break;

      case "list": {
        const list = token as Tokens.List;
        const Container = list.ordered ? OL : UL;
        nodes.push(
          <Container key={i}>
            {list.items.map((item, j) => (
              <LI key={j}>{renderInline(item.tokens)}</LI>
            ))}
          </Container>,
        );
        break;
      }

      case "table":
        nodes.push(<Table key={i} token={token as Tokens.Table} />);
        break;

      case "hr":
        nodes.push(<Divider key={i} />);
        break;

      case "space":
        break;

      default:
        break;
    }
  }

  return <>{nodes}</>;
}
