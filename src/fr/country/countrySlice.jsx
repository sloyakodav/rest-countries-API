import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
// import url from "./../../data.json";
const url = "https://restcountries.com/v2/all";
// const url = "./../../data.json";
const initialState = {
  countries: [
    {
      name: "Afghanistan",
      topLevelDomain: [".af"],
      alpha2Code: "AF",
      alpha3Code: "AFG",
      callingCodes: ["93"],
      capital: "Kabul",
      altSpellings: ["AF", "Afġānistān"],
      subregion: "Southern Asia",
      region: "Asia",
      population: 40218234,
      latlng: [33, 65],
      demonym: "Afghan",
      area: 652230,
      timezones: ["UTC+04:30"],
      borders: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
      nativeName: "افغانستان",
      numericCode: "004",
      flags: {
        svg: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
        png: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png",
      },
      currencies: [
        {
          code: "AFN",
          name: "Afghan afghani",
          symbol: "؋",
        },
      ],
      languages: [
        {
          iso639_1: "ps",
          iso639_2: "pus",
          name: "Pashto",
          nativeName: "پښتو",
        },
        {
          iso639_1: "uz",
          iso639_2: "uzb",
          name: "Uzbek",
          nativeName: "Oʻzbek",
        },
        {
          iso639_1: "tk",
          iso639_2: "tuk",
          name: "Turkmen",
          nativeName: "Türkmen",
        },
      ],
      translations: {
        br: "Afghanistan",
        pt: "Afeganistão",
        nl: "Afghanistan",
        hr: "Afganistan",
        fa: "افغانستان",
        de: "Afghanistan",
        es: "Afganistán",
        fr: "Afghanistan",
        ja: "アフガニスタン",
        it: "Afghanistan",
        hu: "Afganisztán",
      },
      flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
      regionalBlocs: [
        {
          acronym: "SAARC",
          name: "South Asian Association for Regional Cooperation",
        },
      ],
      cioc: "AFG",
      independent: true,
    },
  ],
  loading: false,
  error: null,
  darkMode: true,
  backUp: [],
  regionName: { name: "Filter By Region" },
  regionListShow: {
    filterMain: { display: "none" },
    arrow: `fa-solid fa-chevron-up`,
  },
  problemNotFound: "",
  showCountry: false,
};
export const getCountriesItem = createAsyncThunk(
  "countries/getCountriesItem",
  () => {
    return fetch(url)
      .then((rsp) => rsp.json())
      .catch((err) => console.log(err));
  }
);
const block = {
  filterMain: { display: "block" },
  arrow: `fa-solid fa-chevron-down`,
};
const none = {
  filterMain: { display: "none" },
  arrow: `fa-solid fa-chevron-up`,
};
const CountrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    enableDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    filterByRegion: (state, { payload }) => {
      state.countries = [...state.backUp];

      state.countries =
        Array.isArray(payload.data) && payload.data.length > 0
          ? payload.data
          : state.countries;
      state.regionName.name = payload.name;
    },
    regionSelect: (state) => {
      if (JSON.stringify(state.regionListShow) === JSON.stringify(block)) {
        state.regionListShow = none;
      } else {
        state.regionListShow = block;
      }
    },
    searchOneCountry: (state, { payload }) => {
      state.countries = payload.data;
      state.problemNotFound = payload.notFound;
    },
    showOneCountry: (state, { payload }) => {
      state.countries = payload;
      state.showCountry = true;
    },
    BackOneCountry: (state) => {
      state.showCountry = false;
      state.countries = state.backUp;
    },
  },
  extraReducers: {
    [getCountriesItem.pending]: (state) => {
      state.loading = true;
    },
    [getCountriesItem.fulfilled]: (state, action) => {
      state.loading = false;

      state.countries = action.payload;
      state.backUp = action.payload;
    },
    [getCountriesItem.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  enableDarkMode,
  filterByRegion,
  reAddCountry,
  backUpRegions,
  regionSelect,
  searchOneCountry,
  showOneCountry,
  BackOneCountry,
} = CountrySlice.actions;
export default CountrySlice.reducer;
