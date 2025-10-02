// renderPredictions.js

export const renderPredictions = (predictions, ctx) => {
  // Clear previous drawings
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox; // bbox array
    const isPerson = prediction.class === "person"; // fix comparison

    // Draw bounding box
    ctx.strokeStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    // Draw semi-transparent fill for person
    ctx.fillStyle = `rgba(255,0,0,${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);

    // Draw label background
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    // Draw text
    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);
   
  });
};
