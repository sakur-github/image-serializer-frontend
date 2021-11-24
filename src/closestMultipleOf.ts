export const closestMultipleOf = (multiple: number, comparison: number) => {
  let closestDown = Math.round(comparison);
  while (closestDown % multiple !== 0) closestDown -= 1;

  let closestUp = Math.round(comparison);
  while (closestUp % multiple !== 0) closestUp += 1;

  if (Math.abs(closestDown - comparison) < Math.abs(closestUp - comparison))
    return closestDown;
  else return closestUp;
};
