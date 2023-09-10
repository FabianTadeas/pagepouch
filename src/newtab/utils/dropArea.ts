import { get, type Readable } from "svelte/store";
import IDB from "../../IDB";

export default function dropArea(
  node: HTMLElement,
  options: {
    id: number | Readable<number>;
    abortDrop?: (ev: DragEvent) => boolean;
    openOnHover?: boolean;
  }
) {
  let timeout = undefined;
  function onDrop(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    clearTimeout(timeout);
    if (options.abortDrop && options.abortDrop(ev)) return;
    const id = typeof options.id === "number" ? options.id : get(options.id);
    if (ev.dataTransfer.types.includes("pagepouch/id")) {
      const droppedId = parseInt(ev.dataTransfer.getData("pagepouch/id"));
      IDB.tiles.update(droppedId, { parentId: id });
    } else {
      let url = ev.dataTransfer.getData("text/uri-list");
      IDB.tiles.add({
        type: "bookmark",
        title: url,
        added: new Date().getTime(),
        url,
        parentId: id,
      });
    }
  }
  function onEnter(
    ev: DragEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) {
    if (
      ev.dataTransfer.types.includes("text/uri-list") ||
      ev.dataTransfer.types.includes("pagepouch/id")
    ) {
      ev.preventDefault();
    }
    if (
      options.openOnHover &&
      !ev.currentTarget.contains(ev.relatedTarget as Node)
    ) {
      timeout = setTimeout(() => {
        location.hash =
          "#" + (typeof options.id === "number" ? options.id : get(options.id));
      }, 1000);
    }
  }
  function onLeave(
    ev: DragEvent & {
      currentTarget: EventTarget & HTMLElement;
    }
  ) {
    if (
      options.openOnHover &&
      !ev.currentTarget.contains(ev.relatedTarget as Node)
    ) {
      clearTimeout(timeout);
    }
  }
  function onOver(ev: DragEvent) {
    if (
      ev.dataTransfer.types.includes("text/uri-list") ||
      ev.dataTransfer.types.includes("pagepouch/id")
    ) {
      ev.preventDefault();
    }
  }
  node.addEventListener("drop", onDrop);
  node.addEventListener("dragenter", onEnter);
  node.addEventListener("dragover", onOver);
  node.addEventListener("dragleave", onLeave);
  return {
    destroy() {
      node.removeEventListener("drop", onDrop);
      node.removeEventListener("dragenter", onEnter);
      node.removeEventListener("dragover", onOver);
      node.removeEventListener("dragleave", onLeave);
      clearTimeout(timeout);
    },
  };
}
