// Formats a state's Formal Name to be used as a router SLUG
export function formatState(state: string) {
  // Convert the state name to lowercase
  const lowercaseState = state.toLowerCase();

  // Replace spaces with hyphens
  const formattedState = lowercaseState.replace(/\s+/g, "-");

  return formattedState;
}
