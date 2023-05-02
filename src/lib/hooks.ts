import { readable } from "svelte/store";

// useState
export function useState(initState) {
  let setValue;

  const theStore = readable(initState, set => {
    setValue = set;
  });

  theStore.subscribe(val => {});

  return [theStore, setValue];
}

// useEffect