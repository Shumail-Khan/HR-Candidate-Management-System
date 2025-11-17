import localforage from "localforage";

const queueKey = "offlineQueue";

// Initialize queue in localForage
const getQueue = async () => (await localforage.getItem(queueKey)) || [];
const setQueue = async (queue) => localforage.setItem(queueKey, queue);

// Add a new offline action to the queue
export const enqueue = async (type, entity, args) => {
  const queue = await getQueue();
  queue.push({ type, entity, args });
  await setQueue(queue);
};

// Process the queue when back online
export const processQueue = async (apiFunctions) => {
  const queue = await getQueue();
  console.log(queue);
  if (!queue.length) return;

  const failedActions = []; // Will hold items that failed to process

  for (let i = 0; i < queue.length; i++) {
    const action = queue[i]; // Store the action for logging
    const { type, entity, args } = action;
    try {
      if (apiFunctions[type] && apiFunctions[type][entity]) {
        await apiFunctions[type][entity](...args);
      } else {
        console.warn("No handler registered for offline action, keeping it in queue:", action);
        failedActions.push(action);
      }
    } catch (err) {
      console.error("Failed processing offline action:", { action, error: err });
      failedActions.push(action); // Keep the failed action
    }
  }

  // Only the failed actions are retained in the queue
  await setQueue(failedActions);
};