export function getAvaterImage(user) {
  return user.image
    ? `data:${user.image.contentType};base64,${user.image.data}`
    : null;
}
