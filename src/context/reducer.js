export const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "added_picture":
      return {
        ...state,
        picture: action.payload,
      };
    case "show_pic":
      return {
        ...state,
        previewPic: action.payload,
      };
    case "added_logo":
      return {
        ...state,
        logo: action.payload,
      };
    case "show_logo":
      return {
        ...state,
        previewLogo: action.payload,
      };
    case "updated_tag":
      return {
        ...state,
        type: action.payload,
      };
    case "updated_title":
      return {
        ...state,
        title: action.payload,
      };

    case "updated_description":
      return {
        ...state,
        description: action.payload,
      };
    case "updated_house":
      return {
        ...state,
        house: action.payload,
      };
    case "updated_street":
      return {
        ...state,
        street: action.payload,
      };
    case "updated_city":
      return {
        ...state,
        city: action.payload,
      };
    case "updated_country":
      return {
        ...state,
        country: action.payload,
      };
    case "update_categories":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case "update_b_model":
      return {
        ...state,
        business_models: [...state.business_models, action.payload],
      };
    case "updated_trlId":
      return {
        ...state,
        trlId: action.payload,
      };
    case "updated_trl":
      return {
        ...state,
        trlName: action.payload,
      };
    case "updated_video":
      return {
        ...state,
        video: action.payload,
      };
    case "updated_cost":
      return {
        ...state,
        investment_effort: action.payload,
      };
    case "show_message": {
      return {
        showMess: action.payload,
      };
    }
    case "res_message": {
      return {
        resMess: action.payload,
      };
    }
    default:
      return state;
  }
};
