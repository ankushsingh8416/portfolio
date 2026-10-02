import { renderRichText } from "@/lib/richText";

export default function ArticleBlocks({ blocks }) {
  return blocks.map((block, index) => {
    switch (block.type) {
      case "heading":
        return <h2 key={index}>{renderRichText(block.text)}</h2>;

      case "paragraph":
        return <p key={index}>{renderRichText(block.text)}</p>;

      case "list":
        return (
          <ul className="block-list" key={index}>
            {block.items.map((item, i) => (
              <li key={i}>{renderRichText(item)}</li>
            ))}
          </ul>
        );

      case "image":
        return (
          <figure className="block-image" key={index}>
            <img
              src={`/assets/images/${block.src}`}
              alt={block.alt || ""}
              draggable="false"
            />
            {block.caption && (
              <figcaption>{renderRichText(block.caption)}</figcaption>
            )}
          </figure>
        );

      case "image-pair":
        return (
          <div className="block-image-pair" key={index}>
            {block.images.map((img, i) => (
              <figure key={i}>
                <img
                  src={`/assets/images/${img.src}`}
                  alt={img.alt || ""}
                  draggable="false"
                />
                {img.caption && (
                  <figcaption>{renderRichText(img.caption)}</figcaption>
                )}
              </figure>
            ))}
          </div>
        );

      case "table":
        return (
          <div className="block-table-wrap" key={index}>
            <table className="block-table">
              <thead>
                <tr>
                  {block.headers.map((heading, i) => (
                    <th key={i}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{renderRichText(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption && (
              <p className="block-table-caption">{renderRichText(block.caption)}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  });
}
