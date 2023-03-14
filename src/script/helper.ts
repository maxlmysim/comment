type CreateTag = (tag: string, className: string | string[], value?: string) => HTMLElement;
export const createTag: CreateTag = (tag: string, className: string | string[], value?: string) => {
  const elem = document.createElement(tag);

  if (value) {
    elem.innerHTML = value;
  }

  if (className) {
    if (Array.isArray(className)) {
      elem.classList.add(...className);
    } else {
      elem.classList.add(className);
    }
  }

  return elem;
};

type CreateInput = (
  type: string, className: string | string[],
  name: string, placeholder?: string, value?: string) => HTMLInputElement;

export const createInput: CreateInput = (
  type: string,
  className: string | string[],
  name: string,
  placeholder?: string,
  value?: string,
) => {
  const elem = document.createElement('input') as HTMLInputElement;
  elem.type = type;
  if (value) {
    elem.value = value;
  }

  if (name) {
    elem.name = name;
  }

  if (placeholder) {
    elem.placeholder = placeholder;
  }

  if (className) {
    if (Array.isArray(className)) {
      elem.classList.add(...className);
    } else {
      elem.classList.add(className);
    }
  }

  return elem;
};


export const getCurrenTime = (): string => {
  return  new Date().toLocaleTimeString('en-US', { hour12: false,
    hour: "numeric",
    minute: "numeric"});
}



