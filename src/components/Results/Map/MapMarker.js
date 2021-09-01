import { Marker } from "google-maps-react";

class MapMarker extends Marker
{
    constructor(props) {
        super(props)
        this.state = {
          isMounted: false,
        }
      }
  
    componentDidMount() {
        this.setState({ isMounted: true })
        super.componentDidMount()
    }
      
    componentWillUnmount() {
        this.setState({ isMounted: false })
        super.componentWillUnmount()
    }

    // only render/rerender if icon changes of if component hasn't mounted yet
    // comment out the below to re-render on every 
    shouldComponentUpdate(nextProps, nextState) {        
        
        if (this.state.isMounted === false) {
            return true
        }

        if(this.props.icon !== nextProps.icon) {
            return true
        }
        else  {
            return false
        }
    }
}

export default MapMarker;
