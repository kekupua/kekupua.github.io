
export const scrollToAnchor = (props: { id: string }) => {
  const { id } = props;

  document.getElementById(id)?.scrollIntoView();
}
