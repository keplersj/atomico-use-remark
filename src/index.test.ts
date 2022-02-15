import { jest } from "@jest/globals";
import { render, h } from "atomico";
import { createHooks } from "atomico/test-hooks";
import { Plugin } from "unified";

afterEach(() => {
  document.querySelectorAll("html")[0].innerHTML = "";
});

describe("Remark Hook for Atomico", () => {
  describe("module", () => {
    it("matches expectations", async () => {
      const module_ = await import("./index");

      expect(module_).toMatchInlineSnapshot(`
        Object {
          "useRemark": [Function],
        }
      `);
    });
  });

  describe("hook, tree from initial content", () => {
    it("returns a result object when run", async () => {
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      document.body.append(host);
      const hooks = createHooks(jest.fn(), host);

      const { useRemark } = await import("./index");
      const remarkResult = hooks.load(() =>
        useRemark(`
# Test Content

*This* is **test content** for ***the*** \`remark\` hook for \`atomico\`.
      `)
      );

      expect(remarkResult).toMatchSnapshot();

      expect(document.documentElement).toMatchSnapshot();

      render(h("host", undefined, remarkResult[0]), host);

      expect(document.documentElement).toMatchSnapshot();
    });
  });

  describe("hook, tree from set content", () => {
    it("returns a result object when run", async () => {
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      document.body.append(host);
      const hooks = createHooks(() => {
        [tree, setContent] = hooks.load(() => useRemark());
        render(h("host", undefined, tree), host);
      }, host);

      const { useRemark } = await import("./index");
      let [tree, setContent] = hooks.load(() => useRemark());

      expect(tree).toMatchSnapshot();

      expect(document.documentElement).toMatchSnapshot();

      render(h("host", undefined, tree), host);

      expect(document.documentElement).toMatchSnapshot();

      setContent(`
# Set Test Content

*This* is **set test content** for ***the*** \`remark\` hook for \`atomico\`.
        `);

      expect(tree).toMatchSnapshot();

      expect(document.documentElement).toMatchSnapshot();
    });
  });

  describe("hook options", () => {
    it("accepts Remark Plugins", async () => {
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      document.body.append(host);
      const hooks = createHooks(jest.fn(), host);

      const mockRemarkPlugin = jest.fn();

      expect(mockRemarkPlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [],
          "instances": Array [],
          "invocationCallOrder": Array [],
          "results": Array [],
        }
      `);

      const { useRemark } = await import("./index");
      hooks.load(() =>
        useRemark("", { remarkPlugins: [mockRemarkPlugin as Plugin] })
      );

      expect(mockRemarkPlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [
            Array [],
          ],
          "instances": Array [
            [Function],
          ],
          "invocationCallOrder": Array [
            1,
          ],
          "lastCall": Array [],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
    });

    it("accepts Rehype Plugins", async () => {
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      document.body.append(host);
      const hooks = createHooks(jest.fn(), host);

      const mockRehypePlugin = jest.fn();

      expect(mockRehypePlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [],
          "instances": Array [],
          "invocationCallOrder": Array [],
          "results": Array [],
        }
      `);

      const { useRemark } = await import("./index");
      hooks.load(() =>
        useRemark("", { rehypePlugins: [mockRehypePlugin as Plugin] })
      );

      expect(mockRehypePlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [
            Array [],
          ],
          "instances": Array [
            [Function],
          ],
          "invocationCallOrder": Array [
            2,
          ],
          "lastCall": Array [],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
    });

    it("accepts Remark and Rehype Plugins", async () => {
      const host = document.createElement("div");
      host.attachShadow({ mode: "open" });
      document.body.append(host);
      const hooks = createHooks(jest.fn(), host);

      const mockRemarkPlugin = jest.fn();
      const mockRehypePlugin = jest.fn();

      expect(mockRemarkPlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [],
          "instances": Array [],
          "invocationCallOrder": Array [],
          "results": Array [],
        }
      `);

      expect(mockRehypePlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [],
          "instances": Array [],
          "invocationCallOrder": Array [],
          "results": Array [],
        }
      `);

      const { useRemark } = await import("./index");
      hooks.load(() =>
        useRemark("", {
          remarkPlugins: [mockRemarkPlugin as Plugin],
          rehypePlugins: [mockRehypePlugin as Plugin],
        })
      );

      expect(mockRemarkPlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [
            Array [],
          ],
          "instances": Array [
            [Function],
          ],
          "invocationCallOrder": Array [
            3,
          ],
          "lastCall": Array [],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);

      expect(mockRehypePlugin.mock).toMatchInlineSnapshot(`
        Object {
          "calls": Array [
            Array [],
          ],
          "instances": Array [
            [Function],
          ],
          "invocationCallOrder": Array [
            4,
          ],
          "lastCall": Array [],
          "results": Array [
            Object {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
    });
  });
});
