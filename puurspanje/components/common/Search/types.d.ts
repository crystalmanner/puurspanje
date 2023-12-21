export type FormState = Record<string, { value: string; filled: boolean }>;

export type Action =
  | { type: "submit" }
  | { type: "update"; payload: { key: string; value: string } };

export interface Input {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

export interface SearchInputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  filled: boolean;
  onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}
