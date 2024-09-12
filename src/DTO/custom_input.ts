export type CustomInputType = {
  className: string;
  type: string;
  value: string;
  onChange: (data: string) => void;
  dir?: string;
  aria?: string;
  name?: string;
  validation?: boolean;
  textErr?: string;
};
