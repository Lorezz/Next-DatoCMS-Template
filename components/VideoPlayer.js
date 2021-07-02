import VideoInternal from 'components/VideoInternal';
import VideoHls from 'components/VideoHls';

export default function VideoPlayer(props) {
  if (props.videoFile.video) {
    return (
      <VideoHls
        autoplay={props.autoplay ? true : false}
        loop={props.loop}
        controls={true}
        muted={true}
        src={props.videoFile.video.streamingUrl}
      />
    );
  } else {
    return <VideoInternal controls={true} muted={true} {...props} />;
  }
}
