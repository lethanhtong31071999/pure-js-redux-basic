// Import
const { createStore } = window.Redux;

// Reducer
const initialHobbyState = JSON.parse(localStorage.getItem("hobby_list")) || {};
console.log(initialHobbyState);
function todoReducer() {
  return {};
}

function hobbyReducer(state = initialHobbyState, action) {
  switch (action.type) {
    case "ADD_HOBBY":
      const newState = { ...state };

      if (newState.hobbies) {
        newState.hobbies.push(action.payload);
      } else {
        newState.hobbies = [action.payload];
      }

      return newState;
    default:
      return state;
  }
}

// store
function rootReducer() {
  return {
    hobbyReducer: hobbyReducer(),
    todoReducer: todoReducer(),
  };
}
const store = createStore(hobbyReducer);

// Render Function
function renderHobbyList(hobbyList) {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;

  // reset
  ulElement.innerHTML = "";
  hobbyList.forEach(function (hobby, i) {
    const liElement = document.createElement("li");
    liElement.innerText = hobby;
    ulElement.appendChild(liElement);
  });
}

// RENDER INITIAL HOBBY LIST
const storeState = store.getState();
// renderHobbyList(storeState.hobbyReducer.hobbies);
renderHobbyList(storeState.hobbies);

// HANDLE FORM SUBMIT
const hobbyFormElement = document.querySelector("#hobbyFormId");

if (hobbyFormElement) {
  function handleFormSubmit(event) {
    event.preventDefault();
    const inputElement = document.querySelector("#hobbyTextId");
    const action = {
      type: "ADD_HOBBY",
      payload: inputElement.value,
    };
    store.dispatch(action);
    hobbyFormElement.reset();
  }
  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(function () {
  const storeState = store.getState();
  // renderHobbyList(storeState.hobbyReducer.hobbies);
  renderHobbyList(storeState.hobbies);
  localStorage.setItem("hobby_list", JSON.stringify(storeState));
});
