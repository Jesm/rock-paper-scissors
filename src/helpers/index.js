export const createElement = (tag, parent = null) => {
  const element = document.createElement(tag);

  if(parent)
    parent.appendChild(element);

  return element;
}
