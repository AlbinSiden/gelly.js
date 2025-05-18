function home() {
  let count = 0;

  let countSpan = span(count);

  function updateCount() {
    count++;
    countSpan.innerHTML = count;
  }

  return div(
    h1("Welcome to my cool site built with gelly.js!"),
    div(countSpan, button({ onclick: updateCount }, "Plus plus"))
  );
}

router({
  "/": () => home(),
  "/projects": () => div(h1("Coola Projects")),
});
