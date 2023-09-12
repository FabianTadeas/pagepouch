import type { Action } from "svelte/action";

const dragIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#737373" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
</svg>
`;
let dragIcon = new Image();
dragIcon.src = "data:image/svg+xml;base64," + btoa(dragIconSvg);

type Options = {
  data: {
    id: number;
    parentId: number;
    type: "directory" | "bookmark" | "stackbookmark";
    url?: string;
  };
  icon?: string;
};

const drag: Action<HTMLElement, Options> = (node, options) => {
  node.draggable = true;

  function onDragStart(ev: DragEvent) {
    ev.dataTransfer.setDragImage(dragIcon, 0, 0);
    ev.dataTransfer.setData("pagepouch/id", options.data.id.toString());
    ev.dataTransfer.setData("pagepouch/id/" + options.data.id.toString(), "");
    ev.dataTransfer.setData(
      "pagepouch/parentid",
      options.data.parentId.toString()
    );
    ev.dataTransfer.setData(
      "pagepouch/parentid/" + options.data.parentId.toString(),
      ""
    );
    ev.dataTransfer.setData("pagepouch/type", options.data.type);
    ev.dataTransfer.setData("pagepouch/type/" + options.data.type, "");
    ev.dataTransfer.setData("text/uri-list", options.data.url);
    ev.dataTransfer.setData("text/plain", options.data.url);
  }
  function onDragEnd() {}

  node.addEventListener("dragstart", onDragStart);
  node.addEventListener("dragend", onDragEnd);
  return {
    destroy() {
      node.removeEventListener("dragstart", onDragStart);
      node.removeEventListener("dragend", onDragEnd);
    },
    update(newOptions) {
      options = newOptions;
    },
  };
};

export const move: Action<HTMLButtonElement> = (node) => {
  function onClick() {
    console.log("move")
  }
  node.addEventListener("click", onClick);
  return {
    destroy() {
      node.removeEventListener("click", onClick);
    },
  };
};

export default drag;
