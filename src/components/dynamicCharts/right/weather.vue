<template>
  <div class="es-block">
    <Title>天气</Title>
    <div style="width: 100%; height: calc(100% - var(--el-title-height))">
      <div class="container">
        <div class="approximately">
          <div class="city-name">{{ weatherData.city }}</div>
          <p class="weather">{{ weatherData.weather }}</p>
          <h2 class="temp">
            <em>{{ weatherData.temperature }}</em
            >℃
          </h2>
        </div>
        <div class="detail">
          <span>风力：{{ weatherData.windPower }}级</span> |
          <span>风向：{{ weatherData.windDirection }}</span> |
          <span>空气湿度：{{ weatherData.humidity }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import Title from '../Title.vue';
import AMapLoader from '@amap/amap-jsapi-loader';
const localTime = ref<string | number>('00:00');
let weatherData = reactive<any>({});
onMounted(() => {
  setInterval(() => {
    localTime.value = new Date().toLocaleTimeString();
  }, 1000);

  initAMap();
});
onBeforeUnmount(() => {
  clearInterval(localTime.value as number);
});
const initAMap = () => {
  AMapLoader.load({
    key: '0ca3ab7c32bffa60361cb7006d055cd0', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch();

      citySearch.getLocalCity(function (status: string, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          console.log(result.city);

          //加载天气查询插件
          AMap.plugin('AMap.Weather', function () {
            //创建天气查询实例
            var weather = new AMap.Weather();

            //执行实时天气信息查询
            weather.getLive(result.city, function (err: object, data: object) {
              console.log(err, data);
              Object.assign(weatherData, data);
            });
          });
        }
      });
    });
  });
};
</script>
<style lang="less" scoped>
.es-block {
  width: 100%;
  height: 100%;
}
.container {
  height: 100%;
  width: 100%;
  // background-color: #0000006e;
  // color: #fff;
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .approximately {
    display: flex;
    align-items: center;
    .city-name {
      padding: 0 10px;
    }
    .weather {
      padding: 0 5px;
    }
    .temp {
      font-size: 26px;
      em {
        font-style: normal;
        font-size: 34px;
      }
    }
  }
}
</style>
