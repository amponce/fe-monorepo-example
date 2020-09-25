import prettyFormat from 'pretty-format';

const { DOMElement, DOMCollection } = prettyFormat.plugins;

const prettyDOM = (htmlElement, maxLength?, options?) => {
  if (htmlElement.documentElement) {
    // eslint-disable-next-line no-param-reassign
    htmlElement = htmlElement.documentElement;
  }

  const debugContent = prettyFormat(
    htmlElement,
    Object.assign(
      {
        plugins: [DOMElement, DOMCollection],
        printFunctionName: false,
        highlight: true,
      },
      options
    )
  );
  return maxLength !== undefined && htmlElement.outerHTML.length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
};

// eslint-disable-next-line no-console
const debug = (el = document, maxLength?, options?) =>
  // eslint-disable-next-line no-console
  console.log(prettyDOM(el, maxLength, options));

export { debug };
