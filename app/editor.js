import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Text } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useLocalSearchParams } from 'expo-router';

export default function Editor() {
  const { imageUri } = useLocalSearchParams();
  const [editedImage, setEditedImage] = useState(imageUri);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);

  const applyEdits = async () => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          { brightness: brightness },
          { contrast: contrast },
          { saturate: saturation }
        ],
        { format: 'jpeg' }
      );
      setEditedImage(manipulatedImage.uri);
    } catch (error) {
      console.error('Error applying edits:', error);
    }
  };

  const saveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to save the image!');
        return;
      }

      const asset = await MediaLibrary.createAssetAsync(editedImage);
      await MediaLibrary.createAlbumAsync('PhotoEditPro', asset, false);
      alert('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: editedImage }} style={styles.image} />
      
      <ScrollView style={styles.controls}>
        <View style={styles.controlItem}>
          <Text>Brightness</Text>
          <Slider
            style={styles.slider}
            minimumValue={-1}
            maximumValue={1}
            value={brightness}
            onValueChange={setBrightness}
            onSlidingComplete={applyEdits}
          />
        </View>

        <View style={styles.controlItem}>
          <Text>Contrast</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={2}
            value={contrast}
            onValueChange={setContrast}
            onSlidingComplete={applyEdits}
          />
        </View>

        <View style={styles.controlItem}>
          <Text>Saturation</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={2}
            value={saturation}
            onValueChange={setSaturation}
            onSlidingComplete={applyEdits}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
          <MaterialIcons name="save" size={24} color="white" />
          <Text style={styles.saveButtonText}>Save Image</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  controls: {
    flex: 1,
    padding: 20,
  },
  controlItem: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});
