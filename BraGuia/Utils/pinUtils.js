import Pin from "../Model/pin";

export const extractPinsFromEdges = (edges) => {
    const pins = [];
  
    edges.forEach((edge) => {
      const { edge_start, edge_end } = edge;
  
      const startPin = new Pin(
        edge_start.pin_name,
        edge_start.pin_lat,
        edge_start.pin_lng,
        edge_start.pin_alt
      );
      const endPin = new Pin(
        edge_end.pin_name,
        edge_end.pin_lat,
        edge_end.pin_lng,
        edge_end.pin_alt
      );
  
      // Add start and end pins to the list if they are not already present
      if (!pins.some((pin) => pin.lat === startPin.lat && pin.lng === startPin.lng && pin.alt === startPin.alt)) {
        pins.push(startPin);
      }
      if (!pins.some((pin) => pin.lat === endPin.lat && pin.lng === endPin.lng && pin.alt === endPin.alt)) {
        pins.push(endPin);
      }
    });
  
    return pins;
  };

  