declare module 'get-video-id' {
  interface VideoInfo {
    id: string;
    service: string;
  }

  const getVideoId: (url: string) => VideoInfo;
  export default getVideoId;
}
