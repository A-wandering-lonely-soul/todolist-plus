<template>
  <RenderMedia />
</template>
<script setup lang="tsx">
const AUDIO_TYPE = ['mp3', 'ogg', 'mpeg'];
const VIDEO_TYPE = ['mp4', 'ogg', 'webm'];
const props = defineProps({
  viewType: {
    type: String,
    default: 'video',
  },
  viewFileUrl: {
    type: String,
    default:
      'http://192.168.0.111/file/media/original/dd6ebdb0-9dc3-48b6-9f62-7b0bb56eacb7/43641371.mp4',
  },
});

const controls: any = 'controls';
const renderAudio = () => (
  <audio
    class="media-content__audio"
    controls={controls}
    controlslist="nodownload"
  >
    {AUDIO_TYPE.map((type) => (
      <source width="100%" src={props.viewFileUrl} type={`audio/${type}`} />
    ))}
    <embed width="100%" src={props.viewFileUrl} />
    <embed width="100%" src={props.viewFileUrl} />
  </audio>
);

const renderVideo = () => (
  <video
    class="media-content__video"
    controls={controls}
    controlslist="nodownload"
    disablePictureInPicture // disablePictureInPicture取消画中画
  >
    {VIDEO_TYPE.map((type) => (
      <source width="100%" src={props.viewFileUrl} type={`video/${type}`} />
    ))}
    <object data={props.viewFileUrl} width="100%">
      <embed src={props.viewFileUrl} width="100%" />
    </object>
  </video>
);

const RenderMedia = () => (
  <div class="media-content">
    {props.viewType === 'audio' ? renderAudio() : renderVideo()}
  </div>
);
</script>
<style lang="less" scoped>
.media-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
