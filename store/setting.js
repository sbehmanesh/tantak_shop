export const state = () => ({
  city: [],
  main_setting:[],
  main_slider:[],
});

export const mutations = {
  set_city: function (state, data) {
    state.city = data;
  },
  set_main_setting:function(state,data){
    data.map((x)=>{
      if(x.key == 'main_setting'){
        state.main_setting.push(JSON.parse(x.value))
      }
      if(x.key == 'main_slider'){
        state.main_slider.push(JSON.parse(x.value))
      }
    })
  }
};

export const actions = {
  getCityServer({ state, commit }) {
    return new Promise((res, rej) => {
      // if (state.city.length > 0) {
      //     res(state.city)
      //     return
      // }
      this.$reqApi(`/country_division`, {
        row_number: 3000,
        filters: { level: "city" },
      })
        .then(async (response) => {
          let items = response.model.data
            .sort((a, b) => {
              if (a.name == "قاین") {
                return -1;
              }
              if (b.name == "قاین") {
                return 1;
              }
              if (a.cd2_name == "خراسان جنوبی") {
                return -1;
              }
              if (b.cd2_name == "خراسان جنوبی") {
                return 1;
              }
              if (a.cd2_name > b.cd2_name) {
                return 1;
              }
              if (a.cd2_name < b.cd2_name) {
                return -1;
              }
              return 0;
            })
            .map((x) => ({
              text: x.name,
              value: x.id,
              sub_title: x.cd2_name,
              search_text: `${x.name} ${x.cd2_name}`,
            }));
          await commit("set_city", items);
          res(items);
        })
        .catch((error) => {
          res();
        });
    });
  },
  getMainSeeting({ state, commit }) {
    return new Promise((res, rej) => {
        this.$reqApi(`/shop/setting`,)
          .then(async (response) => {
                let main_setting = response.model.data
                await commit('set_main_setting', main_setting)
                res(main_setting)
            })
          .catch((err)=>{
            rej(err)
            return err
          })
    })
  },
};
