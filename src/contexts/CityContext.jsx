import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:8000";
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  curCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, curCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        curCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((cur) => cur.id !== action.payload),
        isLoading: false,
        curCity: {},
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [curCity, setCurCity] = useState({});

  const [{ cities, isLoading, curCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log("there is error while loading the cities...");
        console.error(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      // console.log(id, curCity.id);
      if (id === String(curCity?.id)) return;
      try {
        dispatch({ type: "loading" });
        const resp = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await resp.json();
        if (!data) throw new Error("something went wrong");
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.log("there is a error while fetch the city by id....");
        console.error(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
    },
    [curCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const resp = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();

      // manually sync the ui state and remote state instead of fetching manuall again
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.log("there is a error while created a city ...");
      console.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // manually sync the ui state and remote state instead of fetching manuall again
      // setCities((cities) => cities.filter((cur) => cur.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.log("there is a error while deleting a city...");
      console.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }
  return (
    <CityContext.Provider
      value={{ cities, isLoading, curCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used outside of CityProvider");
  return context;
}
