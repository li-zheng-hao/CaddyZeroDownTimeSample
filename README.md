# CaddyZeroDownTimeSample
使用Caddy进行0停机的负载均衡配置示例

# 环境

1. caddy 2.x  windows x64版本
2. nodejs 16.x

# 测试

开启caddy之后,第一个cmd窗口执行：

```sh
node server1.js
```

第二个窗口执行:

```sh
node server2.js
```

第三个窗口执行:

```sh
node client.js
```

使用过程中随机停止server1或server2，查看client是否有非200相应。

测试结果：在停止server1时，正在执行的请求会中断并换一个节点重试，最后依然返回200，只是响应时间增加

