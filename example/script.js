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
