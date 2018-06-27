import React from "react";

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require("react-google-maps");
const google = window.google;

export default class GoogleMapDirections extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
          this.props.GMAP_KEY
        }`,
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
                this.props.current_user_data.latitude,
                this.props.current_user_data.longitude
              ),
              destination: new google.maps.LatLng(
                this.props.user_data.latitude,
                this.props.user_data.longitude
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
          lat: 49.2827,
          lng: -123.1207
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
