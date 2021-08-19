<!-- This is a one-line comment.
--> Yet another one-line comment, but it only works when it starts at the beginning of a line.

let i = 10
// `-->` isn't an operator here. Instead, the below line should be read as `while ((i--) > 0) {`.
while (i --> 0) {
  console.log(i) // 9, 8, 7, ..., 0
}
