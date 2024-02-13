// Formats a state's Formal Name to be used as a router SLUG
export function formatState(state: string) {
  // Convert the state name to lowercase
  const lowercaseState = state.toLowerCase();

  // Replace spaces with hyphens
  const formattedState = lowercaseState.replace(/\s+/g, "-");

  return formattedState;
}



export function getStateFullName(state: string | undefined): string | null | undefined{
  const states: { [key: string]: string } = {
      'al': 'Alabama',
      'ak': 'Alaska',
      'az': 'Arizona',
      'ar': 'Arkansas',
      'ca': 'California',
      'co': 'Colorado',
      'ct': 'Connecticut',
      'de': 'Delaware',
      'fl': 'Florida',
      'ga': 'Georgia',
      'hi': 'Hawaii',
      'id': 'Idaho',
      'il': 'Illinois',
      'in': 'Indiana',
      'ia': 'Iowa',
      'ks': 'Kansas',
      'ky': 'Kentucky',
      'la': 'Louisiana',
      'me': 'Maine',
      'md': 'Maryland',
      'ma': 'Massachusetts',
      'mi': 'Michigan',
      'mn': 'Minnesota',
      'ms': 'Mississippi',
      'mo': 'Missouri',
      'mt': 'Montana',
      'ne': 'Nebraska',
      'nv': 'Nevada',
      'nh': 'New Hampshire',
      'nj': 'New Jersey',
      'nm': 'New Mexico',
      'ny': 'New York',
      'nc': 'North Carolina',
      'nd': 'North Dakota',
      'oh': 'Ohio',
      'ok': 'Oklahoma',
      'or': 'Oregon',
      'pa': 'Pennsylvania',
      'ri': 'Rhode Island',
      'sc': 'South Carolina',
      'sd': 'South Dakota',
      'tn': 'Tennessee',
      'tx': 'Texas',
      'ut': 'Utah',
      'vt': 'Vermont',
      'va': 'Virginia',
      'wa': 'Washington',
      'wv': 'West Virginia',
      'wi': 'Wisconsin',
      'wy': 'Wyoming'
  };

  // Convert state abbreviation to lowercase
  state = state?.toLowerCase();

  // Check if the state abbreviation exists in the states object
  if(state !== undefined && states[state] !== undefined) {
  if (states[state]) {
    return states[state]?.toLowerCase();
}
  } 

  // Check if the full name of the state exists in the states object
  if (states !== undefined) {
  for (const abbr in states) {
      if (states.hasOwnProperty(abbr)) {
          if ( states[abbr]?.toLowerCase() === state) {
              return states[abbr]?.toLowerCase();
          }
      }
  }
} 

  return null; 

}







