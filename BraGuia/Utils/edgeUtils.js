import Media from "../Model/media";

export const  getMediaList = (edges)=> {
  const mediaSet = new Set();
  const mediaFiles = new Set();

  edges.forEach((edge) => {
    const mediaEndArray = edge.edge_end.media;
    const mediaStartArray = edge.edge_start.media;

    const mediaArray = [...mediaEndArray, ...mediaStartArray];
    mediaArray.forEach((media) => {
      if (media.media_type !== 'R' && !mediaFiles.has(media.media_file)) {
        const mediaObject = new Media(media.media_file, media.media_type);
        mediaSet.add(mediaObject);
        mediaFiles.add(media.media_file);
      }
    });
  });

  const mediaList = Array.from(mediaSet);

  return mediaList;
}
