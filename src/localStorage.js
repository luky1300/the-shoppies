export const loadState = (initialState) => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      let parsedNominates = JSON.parse(serializedState);
      initialState.nominates = parsedNominates.nominates;

      return initialState;
    } catch (err) {
      return initialState;
    }
  }; 

  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      console.log(err)
    }
  };

  