function findO() {
  var args = [].slice.call(arguments)
  return args.filter(a => a.includes('o'))
}

findO("orchid", "tulip", "rose", "lilac")