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
import { createStructuredSelector } from "reselect";
import CustomMapMarker from "../../components/custom-map-marker/custom-map-marker.component";

class GoogleMapPage extends Component {
  state = {
    map: null,
    maps: null,
    searchPoint: {
      latitude: this.props.currentLocation.latitude,
      longitude: this.props.currentLocation.longitude
    }
  };

  componentDidMount() {
    const { currentLocation, setCenterOfMap } = this.props;
    setCenterOfMap(currentLocation);
  }

  //only being called once
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
      let request = {
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

  handleClick = data => {
    const { setCenterOfMap } = this.props;
    setCenterOfMap({
      latitude: data.lat,
      longitude: data.lng
    });
    this.searchNearbyRestaurants(data.lat, data.lng);
    this.setState({
      searchPoint: {
        latitude: data.lat,
        longitude: data.lng
      }
    });
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
      infoWindow
    } = this.props;
    const { searchPoint } = this.state;
    console.log("render", this.props.center);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCUxzgZX2YodxqBWnuOOxhz8Y5IfWHYGfw",
            language: "zh-TW",
            region: "zh-TW"
          }}
          defaultZoom={18}
          center={[latitude, longitude]}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          onClick={this.handleClick}
          onChildClick={this.handleChildClick}
        >
          {restaurants &&
            restaurants.map(restaurant => {
              return (
                <CustomMapMarker
                  imageURL="https://www.trzcacak.rs/myfile/full/19-199239_kitchen-icon-emblem.png"
                  key={restaurant.id}
                  lat={restaurant.geometry.location.lat()}
                  lng={restaurant.geometry.location.lng()}
                  show={
                    infoWindow.restaurantId === restaurant.id &&
                    infoWindow.isOpen
                  }
                  place={restaurant}
                />
              );
            })}
          <CustomMapMarker
            imageURL="https://cdn3.iconfinder.com/data/icons/monsters-3/66/11-512.png"
            lat={searchPoint.latitude}
            lng={searchPoint.longitude}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants,
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
