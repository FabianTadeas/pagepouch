import type { Action } from "svelte/action";
import IDB from "../../IDB";

type Options = {
  id: number;
  preventDrop?: (ev: DragEvent) => boolean;
};

type DragEventWithTarget = DragEvent & {
  target: EventTarget & HTMLElement;
  currentTarget: EventTarget & HTMLElement;
  relatedTarget: EventTarget & HTMLElement;
};

const drop: Action<
  HTMLElement,
  Options,
  {
    "on:dropready": (ev: CustomEvent) => void;
    "on:dropreadyend": (ev: CustomEvent) => void;
  }
> = (node, options) => {
  node.dataset.drop = "";

  function onDrop(ev: DragEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    node.dispatchEvent(new CustomEvent("dropreadyend"));
    if (ev.dataTransfer.types.includes("pagepouch/id")) {
      const droppedId = parseInt(ev.dataTransfer.getData("pagepouch/id"));
      IDB.tiles.update(droppedId, { parentId: options.id });
    } else {
      let url = ev.dataTransfer.getData("text/uri-list");
      IDB.tiles.add({
        type: "bookmark",
        title: url,
        added: new Date().getTime(),
        url,
        parentId: options.id,
      });
    }
  }
  function allowDrop(ev: DragEventWithTarget) {
    return (
      (ev.dataTransfer.types.includes("text/uri-list") ||
        ev.dataTransfer.types.includes("pagepouch/id")) &&
      (options.preventDrop === undefined || !options.preventDrop(ev))
    );
  }
  function onEnter(ev: DragEventWithTarget) {
    ev.stopPropagation();
    if (allowDrop(ev)) {
      ev.preventDefault();
      if (ev.relatedTarget?.closest("[data-drop]") !== node) {
        node.dispatchEvent(new CustomEvent("dropready"));
      }
    }
  }
  function onLeave(ev: DragEventWithTarget) {
    ev.stopPropagation();
    if (allowDrop(ev)) {
      if (ev.relatedTarget?.closest("[data-drop]") !== node) {
        node.dispatchEvent(new CustomEvent("dropreadyend"));
      }
    }
  }
  function onOver(ev: DragEventWithTarget) {
    ev.stopPropagation();
    if (allowDrop(ev)) {
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
    },
    update(newOptions) {
      options = newOptions;
    },
  };
};

export default drop;
