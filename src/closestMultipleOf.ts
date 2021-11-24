export const closestMultipleOf = (multiple: number, comparison: number) => {
  const closestDown = comparison - (comparison % multiple);
  const closestUp = comparison + (8 - (comparison % multiple));
  if (Math.abs(closestDown - comparison) < Math.abs(closestUp - comparison))
    return closestDown;
  else return closestUp;
};
