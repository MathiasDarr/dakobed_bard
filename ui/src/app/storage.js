
export const loadState = () => {
  try{
    const storedState = localStorage.getItem('state')
    return storedState ? JSON.parse(storedState) : {};
  }catch(e){
    console.error("COULD NOT LOAD STATE");
    return {}
  }
}

export const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state))
  }catch(e){
    console.error("COULD NOT PERSIST STATE", e)
  }
}