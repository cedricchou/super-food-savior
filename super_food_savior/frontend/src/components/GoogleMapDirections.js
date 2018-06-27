import React from "react";
/* global google */
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");

export default class GoogleMapDirections extends React.PureComponent {
  render() {
    const { GMAP_KEY, current_user_data, user_data } = this.props;
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new google.maps.DirectionsService();

          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                current_user_data.latitude,
                current_user_data.longitude
              ),
              destination: new google.maps.LatLng(
                user_data.latitude,
                user_data.longitude
              ),
              travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      })
    )(props => (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{
          lat: current_user_data.latitude,
          lng: current_user_data.longitude
        }}
      >
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    ));

    return <MapWithADirectionsRenderer />;
  }
}
