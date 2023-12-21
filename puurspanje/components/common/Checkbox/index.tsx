import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Input.module.scss";
import Check from "./checkbox-check.svg";
import Radio from "./radiobox-check.svg";
import cn from "classnames";
import { useUniqueId } from "lib/useUniqueId";

export const Input = (props) => {
  const {
    type: _type,
    id: _id,
    name,
    label,
    value,
    checked,
    disabled = false,
    onChange,
    wrapperClass,
    children,
  } = props;

  const id = useUniqueId(_id);

  const type = _type === "checkbox" ? "checkbox" : "radio";

  return (
    <div
      className={cn(
        styles.input,
        {
          [styles.checked]: checked,
          [styles.disabled]: disabled,
        },
        wrapperClass
      )}
    >
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>
        <span
          className={cn(styles.checkbox, {
            [styles.radio]: type === "radio",
          })}
        >
          {type === "checkbox" ? <Check /> : <Radio />}
        </span>
        {children || label}
      </label>
    </div>
  );
};

export const CheckBoxField = React.forwardRef<any, any>((props, ref) => {
  const {
    title,
    type: _type,
    name,
    items,
    onChange: _onChange,
    children,
    wrapperClass,
  } = props;
  const type = useMemo(() => (_type === "radio" ? "radio" : "checkbox"), [
    _type,
  ]);
  const renderItem = useMemo(
    () => (typeof children === "function" ? children : null),
    [children]
  );
  const [checkedItems, setCheckedItems] = useState({});

  const onChange = useCallback(
    (item, checked) => {
      if (type === "checkbox") {
        setCheckedItems((items) => ({
          ...items,
          [item.label]: checked,
        }));
      } else {
        setCheckedItems(() => ({
          [item.label]: checked,
        }));
      }
      _onChange &&
        _onChange({
          ...item,
          checked,
        });
    },
    [type, _onChange, setCheckedItems]
  );

  const clear = useCallback(() => {
    setCheckedItems({});
  }, [setCheckedItems]);

  const select = useCallback(
    (value) => {
      const item = items.find((item) => item.value === value);
      item && onChange(item, true);
    },
    [type, items, onChange]
  );

  useEffect(() => {
    if (ref && typeof ref === "function") {
      ref({
        clear,
        select,
      });
    }
  }, [clear, select]);

  return (
    <div className={cn(styles.checkboxField, wrapperClass)}>
      {title && <h3>{title}</h3>}
      <ul>
        {items.map((item, i) => (
          <li key={item.label}>
            <Input
              type={type}
              name={item.name || name || title}
              label={item.label}
              value={item.value || item.label}
              checked={checkedItems[item.label] || false}
              onChange={(e) => onChange(item, e.target.checked)}
            >
              {renderItem && renderItem(item)}
            </Input>
          </li>
        ))}
      </ul>
    </div>
  );
});

export const CheckBox = (props) => <Input {...props} type="checkbox" />;
export const RadioBox = (props) => <Input {...props} type="radio" />;
