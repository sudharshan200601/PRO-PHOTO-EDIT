import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'PhotoEditPro',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="editor" 
        options={{ 
          title: 'Edit Photo',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}
