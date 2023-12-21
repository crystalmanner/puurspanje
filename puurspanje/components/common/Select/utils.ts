export enum Keys {
  Backspace = "Backspace",
  Clear = "Clear",
  Down = "ArrowDown",
  End = "End",
  Enter = "Enter",
  Escape = "Escape",
  Home = "Home",
  Left = "ArrowLeft",
  PageDown = "PageDown",
  PageUp = "PageUp",
  Right = "ArrowRight",
  Space = " ",
  Tab = "Tab",
  Up = "ArrowUp",
}

export enum MenuActions {
  Close,
  CloseSelect,
  First,
  Last,
  Next,
  Open,
  Previous,
  Select,
  Space,
  Type,
}

export function getActionFromKey(key, menuOpen = true) {
  if (!menuOpen && key === Keys.Down) {
    return MenuActions.Open;
  }

  if (key === Keys.Down) {
    return MenuActions.Next;
  } else if (key === Keys.Up) {
    return MenuActions.Previous;
  } else if (key === Keys.Home) {
    return MenuActions.First;
  } else if (key === Keys.End) {
    return MenuActions.Last;
  } else if (key === Keys.Escape) {
    return MenuActions.Close;
  } else if (key === Keys.Enter || key === Keys.Space) {
    return MenuActions.CloseSelect;
  } else if (key === Keys.Backspace || key === Keys.Clear || key.length === 1) {
    return MenuActions.Type;
  }
}

export function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

export function maintainScrollVisibility(activeElement, scrollParent) {
  if (!activeElement || !scrollParent) return;

  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

export function positionBottom(parentEl, childEl, offset = 5) {
  const { left, width, top, height } = parentEl.getBoundingClientRect();
  childEl.style.left = left + "px";
  childEl.style.top = top + height + offset + "px";
  childEl.style.width = width + "px";
}
