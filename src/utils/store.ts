export const setLocalItems = (key: string, object: unknown) => {
  localStorage.setItem(`test-${key}`, JSON.stringify(object));
};

export const getLocalItems = (key: string): unknown => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(`test-${key}`) + "");
  } else {
    return null;
  }
};
