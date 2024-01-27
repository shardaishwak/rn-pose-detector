import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { GLView } from 'expo-gl';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs-react-native';  // <-- This is important


export default function PoseDetection() {
  const cameraRef = useRef(null);
  const glViewRef = useRef(null);
  const [poses, setPoses] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);

  const detectPose = async () => {

    if (cameraRef.current && glViewRef.current && cameraReady) {
      const width = cameraRef.current.props.style.width; // Get the camera feed's width
      const height = cameraRef.current.props.style.height; // Get the camera feed's height

      const glContext = glViewRef.current.getContext();

      const imageTensor = tf.browser.fromPixelsAsync(glContext.drawingBufferWidth, glContext.drawingBufferHeight);

      const pose = await net.estimateSinglePose(imageTensor);

     
      setPoses([pose]);

      requestAnimationFrame(detectPose);
    }
  };
  useEffect(() => {
    (async () => {
      await tf.ready();
      posenet.load()

      requestAnimationFrame(detectPose);

    })();
  }, []);



  const handleCameraReady = () => {
    setCameraReady(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ height: 400}}
        type={Camera.Constants.Type.front}
        ref={cameraRef}        onCameraReady={handleCameraReady}
      >
        <GLView
          ref={glViewRef}
          onContextCreate={async (gl) => {
            console.log(gl)
            await tf.ready();
          }}
        />
      </Camera>
      <View>
      <Text>Poses</Text>
        {poses.map((pose, index) => (
          <View key={index}>
            <Text>Pose {index + 1}</Text>
            {/* Display pose keypoints or draw them on the camera feed */}
          </View>
        ))}
      </View>
    </View>
  );
}
