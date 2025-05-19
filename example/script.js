function useState(initalValue) {
  let subscribers = [];

  const observed = new Proxy(
    { value: initalValue },
    {
      set(target, property, value) {
        target[property] = value;
      },

      get(target, property) {
        return target[property];
      },
    }
  );

  const setState = (value) => {
    observed.value = value;

    subscribers.forEach((node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.__isDynamic) {
          node.removeChild(child);
        }
      });

      const dynamicNode = document.createTextNode(String(observed.value));
      dynamicNode.__isDynamic = true;
      node.appendChild(dynamicNode);
    });
  };

  const getState = (parent) => {
    if (parent && !subscribers.includes(parent)) {
      subscribers.push(parent);
    }
    return observed.value;
  };

  return [getState, setState];
}

function home() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("hej");

  return div(
    h1("Welcome to my cool site built with gelly.js!"),
    div(
      span("hej ", count),
      button({ onclick: () => setCount(count() + 1) }, "Plus plus")
    ),
    div(
      span("Reactive text: ", text),
      div(
        input({
          placeholder: "type in me!",
          oninput: (e) => setText(e.target.value),
        })
      )
    )
  );
}

router({
  "/": () => home(),
  "/projects": () => div(h1("Coola Projects")),
});

setup();
