function findO() {
  var args = [].slice.call(arguments)
  return args.filter(a => a.includes('o'))
}

console.log(findO("orchid", "tulip", "rose", "lilac"))