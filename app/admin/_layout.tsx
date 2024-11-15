// app/admin/_layout.tsx
import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin Dashboard',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="menu-management"
        options={{
          title: 'Menu Management',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="qr-codes"
        options={{
          title: 'QR Codes',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
    </Stack>
  );
}