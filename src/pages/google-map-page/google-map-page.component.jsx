import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import {
  setNearbyRestaurants,
  setCenterOfMap
} from "../../redux/geoInfo/geoInfo.action";
import {
  selectRestaurants,
  selectCenterOfMap
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
    this.setState({ map, maps }, this.searchNearbyRestaurants);
  };

  searchNearbyRestaurants = () => {
    const { map, maps } = this.state;
    const {
      setNearbyRestaurants,
      center: { latitude, longitude }
    } = this.props;
    if (map && maps) {
      let placesService = new maps.places.PlacesService(map);
      let location = new maps.LatLng(latitude, longitude);
      var request = {
        location: location,
        radius: "1000",
        type: ["restaurant"]
      };
      placesService.nearbySearch(request, restaurants => {
        setNearbyRestaurants(restaurants);
      });
    }
  };

  getRestaurantLocation = restaurant => ({
    lat: restaurant.geometry.location.lat(),
    lng: restaurant.geometry.location.lng()
  });

  onBoundsChange = data => {
    const { setCenterOfMap } = this.props;
    setCenterOfMap({
      latitude: data.center.lat,
      longitude: data.center.lng
    });
    this.searchNearbyRestaurants();
  };

  render() {
    const {
      restaurants,
      center: { latitude, longitude },
      currentLocation
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
          defaultZoom={15}
          center={[latitude, longitude]}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          onChange={this.onBoundsChange}
        >
          <CustomMapMarker
            imageURL="https://cdn4.vectorstock.com/i/1000x1000/33/63/man-icon-male-symbol-glyph-pictogram-vector-20293363.jpg"
            lat={currentLocation.latitude}
            lng={currentLocation.longitude}
          />
          {restaurants &&
            restaurants.map(restaurant => {
              let location = this.getRestaurantLocation(restaurant);
              return (
                <CustomMapMarker
                  imageURL="https://rfclipart.com/image/big/e2-3e-5b/restaurant-icon-fork-and-spoon-Download-Royalty-free-Vector-File-EPS-142041.jpg"
                  key={restaurant.id}
                  lat={location.lat}
                  lng={location.lng}
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
  center: selectCenterOfMap
});

const mapDispatchToProps = dispatch => ({
  setNearbyRestaurants: restaurants =>
    dispatch(setNearbyRestaurants(restaurants)),
  setCenterOfMap: center => dispatch(setCenterOfMap(center))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMapPage);
