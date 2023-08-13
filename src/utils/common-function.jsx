export const NavigateToProfile = (e, navigate, username, pageId) => {
  e.preventDefault();
  e.stopPropagation();
  navigate(`/profile/${username}`, { state: { from: pageId } });
};
