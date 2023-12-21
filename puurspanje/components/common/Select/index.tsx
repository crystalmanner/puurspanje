import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePortal } from "lib/usePortal";
import uniqid from "uniqid";
import styles from "./Select.module.scss";
import cn from "classnames";
import {
  getActionFromKey,
  isScrollable,
  maintainScrollVisibility,
  MenuActions,
  positionBottom,
} from "./utils";

export const Select = React.forwardRef<any, any>((props, ref) => {
  const {
    id: _id,
    name,
    items = [
      { label: "a", value: 1 },
      { label: "b", value: 2 },
      { label: "c", value: 3 },
      { label: "d", value: 4 },
    ],
    closeOnSelect = true,
    onChange,
    className,
    prefix,
    placeholder,
  } = props;
  const [id, setId] = useState(_id);
  const [isOpen, setIsOpen] = useState(false);
  const Modal = usePortal();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const currentElRef = useRef<HTMLLIElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    !id && setId(uniqid());
  }, []);

  const selectItem = useCallback(
    (index) => {
      setCurrentIndex(index);
      setSelectedIndex(index);
      onChange && onChange(items[index]);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    },
    [
      items,
      onChange,
      closeOnSelect,
      setCurrentIndex,
      setSelectedIndex,
      setIsOpen,
    ]
  );

  const clear = useCallback(() => {
    setCurrentIndex(0);
    setSelectedIndex(null);
  }, [setCurrentIndex, setSelectedIndex]);

  const select = useCallback(
    (value) => {
      const index = items.findIndex((item) => item.value === value);
      selectItem(index !== -1 ? index : null);
    },
    [items, selectItem]
  );

  useEffect(() => {
    if (ref && typeof ref === "function") {
      ref({
        clear,
        select,
      });
    }
  }, [clear, select]);

  useEffect(() => {
    const listEl = listRef.current;
    const currentEl = currentElRef.current;
    if (listEl && currentEl && isScrollable(listEl)) {
      maintainScrollVisibility(currentEl, listEl);
    }
  }, [currentIndex]);

  useEffect(() => {
    const parent = triggerRef.current;
    const child = listRef.current;
    if (!parent || !child) return;
    if (isOpen) {
      positionBottom(parent, child);
      child.style.display = "block";
      child.focus();
    } else {
      child.style.display = "none";
      parent.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const cb = (e) => {
        if (!e.target.closest(`#${id}, #${id}-list`)) {
          setIsOpen(false);
          window.removeEventListener("click", cb);
        }
      };
      window.addEventListener("click", cb);
      return () => window.removeEventListener("click", cb);
    }
  }, [isOpen, setIsOpen]);

  const onButtonKeydown = (event) => {
    const { key } = event;
    const action = getActionFromKey(key);

    switch (action) {
      case MenuActions.Next:
        event.preventDefault();
        setIsOpen(true);
        return;
    }
  };

  const onListKeydown = (event) => {
    const { key } = event;
    const action = getActionFromKey(key);

    switch (action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
      case MenuActions.CloseSelect:
      case MenuActions.Close:
        event.preventDefault();
    }

    switch (action) {
      case MenuActions.Next:
        setCurrentIndex((i) =>
          i < items.length - 1 ? i + 1 : items.length - 1
        );
        break;
      case MenuActions.Last:
        setCurrentIndex(items.length - 1);
        break;
      case MenuActions.First:
        setCurrentIndex(0);
        break;
      case MenuActions.Previous:
        setCurrentIndex((i) => (i > 0 ? i - 1 : 0));
        break;
      case MenuActions.CloseSelect:
        selectItem(currentIndex);
        break;
      case MenuActions.Close:
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      id={id}
      className={cn(styles.select, className, {
        [styles.open]: isOpen,
      })}
    >
      <select
        className={styles.hiddenSelect}
        name={name || `select-${id}`}
        value={
          selectedIndex != null &&
          items[selectedIndex] &&
          items[selectedIndex].value
        }
        tabIndex={-1}
        // @ts-ignore
        readOnly
      >
        {/* @ts-ignore */}
        <option value={null} />
        {items.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <button
        ref={triggerRef}
        className={styles.button}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        onKeyDown={onButtonKeydown}
        type="button"
      >
        {prefix && <span>{prefix}</span>}
        {(selectedIndex != null &&
          items[selectedIndex] &&
          items[selectedIndex].label) ||
          placeholder ||
          "select"}
      </button>
      <Modal>
        <ul
          ref={listRef}
          id={`${id}-list`}
          className={styles.menu}
          onKeyDown={onListKeydown}
          tabIndex={1}
        >
          {items.map((item, i) => (
            <li
              ref={i === currentIndex ? currentElRef : null}
              key={i}
              className={cn(styles.option, {
                [styles.current]: i === currentIndex,
                [styles.selected]: i === selectedIndex,
              })}
              onClick={() => selectItem(i)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
});
