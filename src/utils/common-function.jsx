export const navigateToProfile = (e, navigate, username, pageId) => {
  e.preventDefault();
  e.stopPropagation();
  navigate(`/profile/${username}`, { state: { from: pageId } });
};

export const isToggleContent = (input, number) => {
  return input.length > number;
};

export const sliceContent = (string, number) => {
  return `${string.slice(0, number)}...`;
};
