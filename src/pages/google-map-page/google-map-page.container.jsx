import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  selectIsLocationLoading,
  selectCurrentLocation
} from "../../redux/user/user.selectors";
import WithSpinner from "../../hoc//with-spinner/with-spinner.component";
import GoogleMapPage from "./google-map-page.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLocationLoading,
  currentLocation: selectCurrentLocation
});

const GoogleMapPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(GoogleMapPage);

export default GoogleMapPageContainer;
