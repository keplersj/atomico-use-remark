import { h, useState, useMemo } from "atomico";
import { Plugin, unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { Root, toH } from "hast-to-hyperscript";

const rehypeVdom: Plugin<any[], Root, ReturnType<typeof h>> = function () {
  Object.assign(this, {
    Compiler: (tree: Root) => {
      return toH(h, tree);
    },
  });
};

interface RemarkHookOptions {
  remarkPlugins: Plugin[];
  rehypePlugins: Plugin[];
}

const defaultHookOptions: RemarkHookOptions = {
  remarkPlugins: [],
  rehypePlugins: [],
};

export function useRemark(
  initialContent = "",
  options: Partial<RemarkHookOptions> = defaultHookOptions
) {
  const [content, setContent] = useState(initialContent);

  const remarkProcessor = useMemo(
    () =>
      unified()
        .use(remarkParse)
        .use(options.remarkPlugins || defaultHookOptions.remarkPlugins)
        .use(remarkRehype)
        .use(options.rehypePlugins || defaultHookOptions.rehypePlugins)
        .use(rehypeVdom),
    [JSON.stringify(options)]
  );

  const tree = useMemo(
    () => remarkProcessor.processSync(content).result,
    [remarkProcessor, content]
  );

  return [tree, setContent] as const;
}
