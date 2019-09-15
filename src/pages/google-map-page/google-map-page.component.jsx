import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import {
  setNearbyRestaurants,
  setCenterOfMap,
  toggleRestaurantInfoWindow
} from "../../redux/geoInfo/geoInfo.action";
import {
  selectRestaurants,
  selectCenterOfMap,
  selectInfoWindow
} from "../../redux/geoInfo/geoinfo.selectors";
import { selectCurrentLocation } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import CustomMapMarker from "../../components/custom-map-marker/custom-map-marker.component";

class GoogleMapPage extends Component {
  state = {
    map: null,
    maps: null
  };

  componentDidMount() {
    const { currentLocation, setCenterOfMap } = this.props;
    setCenterOfMap(currentLocation);
  }

  handleApiLoaded = (map, maps) => {
    const {
      center: { latitude, longitude }
    } = this.props;
    this.setState({ map, maps }, () =>
      this.searchNearbyRestaurants(latitude, longitude)
    );
  };

  searchNearbyRestaurants = (latitude, longitude) => {
    const { map, maps } = this.state;
    const { setNearbyRestaurants } = this.props;
    if (map && maps) {
      let placesService = new maps.places.PlacesService(map);
      let location = new maps.LatLng(latitude, longitude);
      var request = {
        location: location,
        rankBy: maps.places.RankBy.DISTANCE,
        type: ["restaurant"]
      };
      placesService.nearbySearch(request, restaurants => {
        setNearbyRestaurants(restaurants);
      });
    } else {
      console.log("map and maps are not loaded");
    }
  };

  getRestaurantLocation = restaurant => ({
    lat: restaurant.geometry.location.lat(),
    lng: restaurant.geometry.location.lng()
  });

  handleClick = data => {
    const { setCenterOfMap } = this.props;
    setCenterOfMap({
      latitude: data.lat,
      longitude: data.lng
    });
    this.searchNearbyRestaurants(data.lat, data.lng);
  };

  handleChildClick = (child, childProps) => {
    const { toggleRestaurantInfoWindow } = this.props;
    if (childProps.place) {
      toggleRestaurantInfoWindow(childProps.place.id);
    }
  };

  render() {
    const {
      restaurants,
      center: { latitude, longitude },
      currentLocation,
      infoWindow
    } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCUxzgZX2YodxqBWnuOOxhz8Y5IfWHYGfw",
            language: "zh-TW",
            region: "zh-TW"
          }}
          defaultZoom={17}
          center={[latitude, longitude]}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          onClick={this.handleClick}
          onChildClick={this.handleChildClick}
        >
          <CustomMapMarker
            imageURL="https://cdn4.vectorstock.com/i/1000x1000/33/63/man-icon-male-symbol-glyph-pictogram-vector-20293363.jpg"
            lat={currentLocation.latitude}
            lng={currentLocation.longitude}
          />
          <CustomMapMarker
            imageURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_El-oPJSohSlzqa5E27l67gatHiYfSjHS6_B3ZzBBK1rpAPEM"
            lat={latitude}
            lng={longitude}
          />
          {restaurants &&
            restaurants.map(restaurant => {
              let location = this.getRestaurantLocation(restaurant);
              let show =
                infoWindow.restaurantId === restaurant.id && infoWindow.isOpen;
              return (
                <CustomMapMarker
                  imageURL="https://rfclipart.com/image/big/e2-3e-5b/restaurant-icon-fork-and-spoon-Download-Royalty-free-Vector-File-EPS-142041.jpg"
                  key={restaurant.id}
                  lat={location.lat}
                  lng={location.lng}
                  show={show}
                  place={restaurant}
                />
              );
            })}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants,
  currentLocation: selectCurrentLocation,
  center: selectCenterOfMap,
  infoWindow: selectInfoWindow
});

const mapDispatchToProps = dispatch => ({
  setNearbyRestaurants: restaurants =>
    dispatch(setNearbyRestaurants(restaurants)),
  setCenterOfMap: center => dispatch(setCenterOfMap(center)),
  toggleRestaurantInfoWindow: restaurantId =>
    dispatch(toggleRestaurantInfoWindow(restaurantId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMapPage);
