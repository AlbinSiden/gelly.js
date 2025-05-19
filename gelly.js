const tags = [
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "li",
  "input",
  "span",
  "p",
  "button",
];

let routes = {};
let app;

function element(tag) {
  return function (attributes, ...children) {
    const el = document.createElement(tag);

    if (
      attributes === null ||
      typeof attributes !== "object" ||
      attributes instanceof Node ||
      Array.isArray(attributes)
    ) {
      children.unshift(attributes);
      attributes = {};
    }

    Object.entries(attributes || {}).forEach(([key, value]) => {
      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else {
        el.setAttribute(key, value);
      }
    });

    children
      .filter((child) => child != null)
      .forEach((child) => {
        if (child instanceof Node) {
          el.appendChild(child);
        } else if (typeof child === "function") {
          const value = child(el);
          const dynamicNode = document.createTextNode(String(value));
          dynamicNode.__isDynamic = true;
          el.appendChild(dynamicNode);
        } else {
          el.appendChild(document.createTextNode(String(child)));
        }
      });

    return el;
  };
}

function createElements() {
  tags.forEach((tag) => {
    window[tag] = element(tag);
  });
}

function renderRoute() {
  const path = window.location.hash.slice(1) || "/";
  const route = routes[path];

  app.innerHTML = "";

  if (route) {
    app.appendChild(route());
  } else {
    app.innerHTML = "<h1>404 Page not found</h1>";
  }
}

function router(newRoutes) {
  routes = newRoutes;
  renderRoute();
}

function setup() {
  app = document.createElement("div");
  app.setAttribute("id", "app");

  document.body.appendChild(app);

  window.addEventListener("popstate", renderRoute);

  createElements();
}

setup();
