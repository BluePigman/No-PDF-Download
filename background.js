chrome.runtime.onInstalled.addListener(() => {
  const rulesFileUrl = chrome.runtime.getURL('rules.json');
  fetch(rulesFileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((rules) => {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: rules.map((rule) => rule.id),
          addRules: rules
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log('Rules successfully added!');
          }
        }
      );
    })
    .catch((error) => {
      console.error('Failed to load rules:', error);
    });
});
