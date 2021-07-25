---
layout: post
title: Arduino Sonar
Author: "Mark Chen"
tags: ["Arduino"]
---

## 材料

|      | 材料                 | 数量 |
| ---- | -------------------- | ---- |
| 1    | Arduino UNO 3 开发板 | 1    |
| 2    | 9G 舵机              | 1    |
| 3    | 超声波传感器         | 1    |
| 4    | 面包板               | 1    |
| 5    | 跳线                 | 若干 |

## 原理

### 超声波测距仪

向超声波测距仪的 `trig` 脚发送高电平时，超声波测距仪发出超声波，当收到回波时，`echo` 脚会从低电平转化为高电平。通过测量向 `trig` 脚发送高电平和 `echo` 脚收到高电平之间的时间差，我们可以计算出障碍物与超声波测距仪之间的距离。

这里我们用了一个叫做 `newping.h` 的库，这个库在超声波测距的基础上添加了一些实用功能，例如“测三次距取中位数”等。

### 舵机

通过 Arduino 官方提供的 `servo.h` 库，我们可以精确的控制舵机旋转的角度。

### 串口通信


<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210725165800.png" alt="serial-connection" style="height: 50%; width: 50%"/>

只要计算机与 Arduino 使用相同的速率发送 / 接收信号（相同的波特率），我们就可以用串口（USB线）在两个设备间进行通信。Python 通过 `serial` 库可以接收 Arduino 通过 `Serial.print` 输出的内容。

## 实现

<img src="http://markdown-img-1304853431.cosgz.myqcloud.com/20210725174523.png" style="width: 60%;"/>

<h3>官方文档链接</h3>
<div class="button-box info">
    <button class="main-button" onclick="window.location.href='https://www.arduino.cc/reference/en/libraries/newping/'">NewPing.h 官方文档</button>
    <button class="main-button" onclick="window.location.href='https://www.arduino.cc/reference/en/libraries/servo/'">Servo.h 官方文档</button>
</div>

<details>
    <summary><h3>上传到 Arduino 中的代码 - <code>Sonar.ino</code></h3>（点击查看）</summary>
<div markdown=1 style="margin-top: 1rem;">
```c++
#include <NewPing.h>
#include <Servo.h>
int servo_port = 4;
int trig_port = 9;
int echo_port = 10;
const int STEP = 2;
const int SONIC_ITER = 3;
Servo servo;
NewPing sonar(trig_port, echo_port, MAX_DISTANCE);

void setup() {
  Serial.begin(230400);
  servo.attach(servo_port);
  servo.write(0); // Initialize servo at 0 deg

  pinMode(trig_port, OUTPUT);
  pinMode(echo_port, INPUT);
}

void loop() {
   for (int deg = 20; deg <= 160; deg += STEP) {
    servo.write(deg);
    float distance = get_distance(SONIC_ITER);
    send_data(deg, distance, STEP);
  }
  for (int deg = 160; deg > 20; deg -= STEP) {
    servo.write(deg);
    float distance = get_distance(SONIC_ITER);
    send_data(deg, distance, STEP);
  }
}

void send_data(int degree, float distance, int STEP){
  Serial.print(degree);
  Serial.print(",");
  Serial.print(distance);
  Serial.print(",");
  Serial.println(STEP);
}

float get_distance(int iter){
  float distance = sonar.ping_median(iter) / 100;
  return distance;
}
```
</div>
</details>



<details>
    <summary><h3>在电脑端 Python 运行的代码 - <code>sonar_display.py</code></h3>（点击查看）</summary>
<div markdown=1 style="margin-top: 1rem;">
```python
import serial
import time
import matplotlib.pyplot as plt
import numpy as np

arduino = serial.Serial(port='COM3', baudrate=230400)

def read_arduino():
    global arduino
    try:   
        raw_data = arduino.readline().decode("ascii").strip().split(",")
        degree, distance, step = map(float, raw_data)
        return int(degree), int(distance), int(step)
    except:
        print("Failed to read from Arduino! Retrying ...")
        time.sleep(0.1)
        return 20, 0, 0

def draw_rader(ax1, all_points, degree, distance):
    ax1.clear()
    ax1.set_thetamax(170)
    ax1.set_thetamin(10)
    ax1.scatter(list(all_points.keys()), list(all_points.values()), c="green", s=8)
    ax1.vlines([degree], 0, max(all_points.values()), color="red" if distance == 0 else "blue" )
    plt.pause(0.00001)

if __name__ == "__main__":
    fig = plt.figure()
    fig.suptitle("Arduino Sonar")
    ax1 = fig.add_subplot(projection="polar")
    all_points = dict()
    while True:
        degree, distance, step = read_arduino()
        degree, step = np.deg2rad(degree), np.deg2rad(step)
        all_points[degree] = distance
        draw_rader(ax1, all_points, degree, distance)
```
</div>
</details>

## 效果

<center><iframe src="//player.bilibili.com/player.html?aid=546895551&bvid=BV1zq4y1H7id&cid=376395023&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 50vw;"></iframe></center>

### 附：超声波测距仪支架简易制作方法

材料：硬卡纸一张

![image-20210725213348687](http://markdown-img-1304853431.cosgz.myqcloud.com/20210725213348.png)
