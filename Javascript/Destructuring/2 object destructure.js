function selectEntries({ start = 0, end = -1, step = 1 } = {}) {
  console.log("start, end, step ", start, end, step);
}

selectEntries({ start: 10, end: 30, step: 2 });
selectEntries({ step: 3 });
selectEntries({});
selectEntries();
