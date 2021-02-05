import Vue from 'vue';
import axios from "axios";

export const loadCarMakes = ({commit}, year) => {
    axios.get("/json/vehicle-data/"+year+".json").then(function (response) {
        commit("setCarMakes", response.data.vehicles);
    });
}
export const loadData = ({commit}) => {
    Vue.http.get('data.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                const stocks = data.stocks;
                const funds = data.funds;
                const stockPortfolio = data.stockPortfolio;

                const portfolio = {
                    stockPortfolio,
                    funds
                };

                commit('SET_STOCKS', stocks);
                commit('SET_PORTFOLIO', portfolio);
            }
        });
};