export const generateGoogleMapsLink = (pins) => {
    // Extract start and destination pins
    const startPin = pins[0];
    const destinationPin = pins[pins.length - 1];
  
    // Extract latitude and longitude values from start and destination pins
    const startLat = startPin.lat;
    const startLng = startPin.lng;
    const destinationLat = destinationPin.lat;
    const destinationLng = destinationPin.lng;
  
    // Construct the waypoints parameter string
    const waypoints = pins
      .slice(1, pins.length - 1)
      .map((pin) => `${pin.lat},${pin.lng}`)
      .join('|');
  
    // Generate the Google Maps link with the start, destination, and waypoints
    const link = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&travelmode=driving&waypoints=${waypoints}`;
  
    return link;
  };
  