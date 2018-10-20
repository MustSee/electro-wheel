export function randomNumber (max) {
  return Math.floor(Math.random() * max);
}

export function findNewIndex (lastIndex, length) {
  let newIndex = randomNumber(length);
  while (newIndex === lastIndex) {
    newIndex = randomNumber(length);
  }
  return newIndex;
}

export function choosePieceAndFindTitle (artist) {
  const hasAlbums = artist.albums;
  let album = {}, song = {};
  if (hasAlbums) {
    const albumsNumber = hasAlbums.length;
    const albumIndex = randomNumber(albumsNumber);
    album = artist.albums[albumIndex];
    const { title } = album;
    return {album, song, title};
  } else {
    const songsNumber = artist.songs.length;
    const songIndex = randomNumber(songsNumber);
    song = artist.songs[songIndex];
    const { title } = song;
    return {album, song, title};
  }
}