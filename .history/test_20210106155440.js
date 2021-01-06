function findO() {
  var args = Array.prototype.slice.call(arguments)
  return args.filter(a => a.includes('o'))
}

findO("orchid", "tulip", "rose", "lilac")