const useClickOutside = (
  event: React.MouseEvent<HTMLElement>,
  button: React.RefObject<HTMLElement>,
  component: React.RefObject<HTMLElement>,
  toggle: (boolean: boolean) => void,
  state: boolean
) => {
  const handleOutsideClick = () => toggle(false);
  if (
    button.current &&
    component.current &&
    !button.current.contains(event.target as Node) &&
    !component.current.contains(event.target as Node)
  ) {
    return handleOutsideClick();
  }
  return toggle(!state);
};
export default useClickOutside;
