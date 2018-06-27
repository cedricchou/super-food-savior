import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

export default class GoogleMapComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false
    };
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 1000);
  };

  render() {
    const Mapping = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
          this.props.GMAP_KEY
        }`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{
          lat: this.props.current_user_data.latitude,
          lng: this.props.current_user_data.longitude
        }}
      >
        {props.isMarkerShown && (
          <Marker
            position={{
              lat: this.props.current_user_data.latitude,
              lng: this.props.current_user_data.longitude
            }}
          />
        )}
      </GoogleMap>
    ));

    return <Mapping isMarkerShown={this.state.isMarkerShown} />;
  }
}
